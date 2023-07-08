import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { tripId, startDate, endDate, userId, totalPaid, guests } = await request.json();

    const trip = await prisma.trip.findUnique({
        where: { id: tripId }
    });

    if (!trip) {
        return new NextResponse(JSON.stringify({
            error: {
                code: 'TRIP_NOT_FOUND',
            }
        }));
    }

    await prisma.tripReservation.create({
        data: {
            tripId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId,
            totalPaid,
            guests,
        }
    });

    return new NextResponse(JSON.stringify({ success: true }), { status: 201 });
}