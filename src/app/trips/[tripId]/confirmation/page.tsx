"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Trip } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
    const [trip, setTrip] = useState<Trip | null>();
    const [totalPrice, setTotalPrice] = useState<number | null>();

    const searchParams = useSearchParams();

    const router = useRouter()

    const { status } = useSession();

    const fetchTrip = async () => {
        const response = await fetch('http://localhost:3000/api/trips/check', {
            method: 'POST',
            body: Buffer.from(JSON.stringify({
                startDate: searchParams.get('startDate'),
                endDate: searchParams.get('endDate'),
                tripId: params.tripId,
            }))
        })

        const { trip, totalPrice, error } = await response.json();

        if (error) {
            return router.push('/');
        }

        setTrip(trip);
        setTotalPrice(totalPrice);
    }

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }

        fetchTrip();
    }, [params, router, status])

    if (!trip) return null;

    const startDate = new Date(searchParams.get('startDate') as string);
    const endDate = new Date(searchParams.get('endDate') as string);
    const guests = searchParams.get('guests');

    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

            <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
                <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
                    <div className="relative h-[106px] w-[124px]">
                        <Image src={trip.coverImage} fill style={{ objectFit: 'cover' }} className="rounded-lg" alt={trip.name} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
                        <div className="flex items-center gap-1">
                            <ReactCountryFlag
                                countryCode={trip.countryCode}
                                svg
                            />
                            <p className="text-xs text-grayPrimary underline">{trip.location}</p>
                        </div>
                    </div>
                </div>

                <h3 className="font-semibold text-lg text-primaryDarker">Informações sobre o preço</h3>

                <div className="flex justify-between mt-1">
                    <p className="text-primaryDarker">Total:</p>
                    <p className="font-medium">R${totalPrice}</p>
                </div>


            </div>

            <div className="flex flex-col mt-5 text-primaryDarker">
                <h3 className="font-semibold">Data</h3>
                <div className="flex items-center gap-1 mt-1">
                    <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
                    {' - '}
                    <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
                </div>

                <h3 className="font-semibold mt-5">Hóspedes</h3>

                <p>{guests} hóspedes</p>

                <Button className="mt-5">Finalizar compra</Button>
            </div>
        </div>
    );
}

export default TripConfirmation;