"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { FunctionComponent } from "react";

interface TripReservationProps {
    trip: Trip
}

const TripReservation: FunctionComponent<TripReservationProps> = (props) => {
    return (
        <div>
            <div className="flex flex-col p-5">
                <div className="flex gap-4">
                    <DatePicker placeholderText="Data de início" onChange={() => { }} className="w-full" />
                    <DatePicker placeholderText="Data final" onChange={() => { }} className="w-full" />
                </div>
                <Input placeholder={`Número de hospedes (max: ${props.trip.maxGuests})`} className="mt-4" />
                <div className="flex justify-between mt-3">
                    <p className="font-medium text-sm text-primaryDarker">Total:</p>
                    <p className="font-medium text-sm text-primaryDarker">R$2500</p>
                </div>
                <Button className="mt-3">Reservar agora</Button>
            </div>

        </div>
    );
}

export default TripReservation;