import prisma from "@/lib/prisma";
import { differenceInDays, isAfter, isBefore } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req = await request.json();

    const trip = await prisma.trip.findUnique({
        where: { id: req.tripId }
    });

    if (!trip) {
        return new NextResponse(JSON.stringify({
            error: {
                code: 'TRIP_NOT_FOUND',
            }
        }), { status: 404 })
    }

    if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
        return new NextResponse(JSON.stringify(({
            error: {
                code: 'INVALID_START_DATE'
            }
        })), { status: 400 });
    }

    if (isAfter(new Date(req.endDate), new Date(trip.endDate))) {
        return new NextResponse(JSON.stringify(({
            error: {
                code: 'INVALID_END_DATE'
            }
        })), { status: 400 });
    }

    const reservations = await prisma.tripReservation.findMany({
        where: {
            tripId: req.tripId,
            startDate: {
                lte: new Date(req.startDate)
            },
            endDate: {
                gte: new Date(req.endDate)
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
        trip,
        totalPrice: differenceInDays(new Date(req.endDate), new Date(req.startDate)) * Number(trip.pricePerDay)
    }))
}