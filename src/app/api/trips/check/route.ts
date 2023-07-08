import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { tripId, startDate, endDate } = await request.json();

    const reservations = await prisma.tripReservation.findMany({
        where: {
            tripId,
            startDate: {
                lte: new Date(startDate)
            },
            endDate: {
                gte: new Date(endDate)
            },
        }
    })

    if (reservations.length) {
        return new NextResponse(JSON.stringify({
            error: {
                code: 'TRIP_ALREADY_RESERVED',
            }
        }))
    }

    return new NextResponse(JSON.stringify({
        success: true,
    }))
}