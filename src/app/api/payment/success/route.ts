import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
    console.log({ ok: true });

    const signature = request.headers.get("stripe-signature")!;

    const text = await request.text();

    const event = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEBHOOK_SECRET_KEY!);

    console.log({ event });

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;

        await prisma.tripReservation.create({
            data: {
                startDate: new Date(session.metadata.startDate),
                endDate: new Date(session.metadata.endDate),
                userId: session.metadata.userId,
                tripId: session.metadata.tripId,
                totalPaid: Number(session.metadata.totalPrice),
                guests: Number(session.metadata.guests),
            }
        });
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}