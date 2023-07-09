import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { userId } }: { params: { userId: string } }) {
    if (!userId) {
        return {
            status: 400,
            body: {
                message: 'missing userId'
            }
        };
    };

    const reservations = await prisma.tripReservation.findMany({
        where: { userId },
        include: { trip: true }
    });

    return new NextResponse(JSON.stringify(reservations), { status: 200 });
}