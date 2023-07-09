import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_request: NextRequest, { params: { reservationId } }: { params: { reservationId: string } }) {
    if (!reservationId) {
        return {
            status: 400,
            body: {
                message: 'Missing reservationId'
            }
        }
    }

    const reservation = await prisma.tripReservation.delete({
        where: { id: reservationId }
    });

    return new NextResponse(JSON.stringify(reservation), { status: 200 });
}