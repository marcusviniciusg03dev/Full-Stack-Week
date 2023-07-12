import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export async function POST(request: NextRequest) {
    const userSession = await getServerSession(authOptions);

    const { tripId, totalPrice, name, description, coverImage, startDate, endDate, guests } = await request.json();

    const session = await stripe.checkout.sessions.create({
        success_url: process.env.HOST_URL!,
        metadata: {
            tripId,
            startDate,
            endDate,
            guests,
            userId: (userSession?.user as any)?.id,
            totalPrice,
        },
        line_items: [
            {
                price_data: {
                    currency: 'brl',
                    unit_amount: totalPrice * 100,
                    product_data: {
                        name,
                        description,
                        images: [coverImage],
                    }
                },
                quantity: 1,
            }
        ],
        mode: 'payment',
    })

    return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 });
}