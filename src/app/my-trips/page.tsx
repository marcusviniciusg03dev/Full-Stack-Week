"use client";
import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyTrips = () => {
    const [reservations, setReservations] = useState<TripReservation[]>([]);

    const { status, data } = useSession();

    const router = useRouter();

    const fetchReservations = async () => {
        const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`);

        setReservations(await response.json());
    }

    useEffect(() => {
        if (status === 'unauthenticated' && !(data as any)?.user) {
            return router.push('/');
        }

        fetchReservations()
    }, [status]);

    return (
        <div>
            My Trips
        </div>
    );
}

export default MyTrips;