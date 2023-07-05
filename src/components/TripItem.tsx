import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Trip } from "@prisma/client";

interface TripItemProps {
    trip: Trip
}

const TripItem = ({ trip }: TripItemProps) => {
    return (
        <div className="flex flex-col">
            <div className="relative h-[280px] w-[280px]">
                <Image src={trip.coverImage} className="rounded-lg shadow-md" alt={trip.name} fill style={{ objectFit: 'cover' }} />
            </div>

            <h3 className="text-primaryDarker font-medium text-sm mt-2">{trip.name}</h3>
            <div className="flex items-center gap-1 my-1">
                <ReactCountryFlag countryCode={trip.countryCode} svg />
                <p className="text-xs text-greyPrimary">{trip.location}</p>
            </div>

            <p className="text-xs text-greyPrimary"><span className="text-primary font-medium">R$ {trip.pricePerDay.toString()}</span>/dia</p>
        </div>
    );
}

export default TripItem;