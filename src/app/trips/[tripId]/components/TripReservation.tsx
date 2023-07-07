"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { FunctionComponent } from "react";
import { useForm, Controller } from "react-hook-form";

interface TripReservationProps {
    tripStartDate: Date
    tripEndDate: Date
    maxGuests: number
    pricePerDay: number
}

interface TripReservationForm {
    guests: number
    startDate: Date | null
    endDate: Date | null
}

const TripReservation: FunctionComponent<TripReservationProps> = ({
    tripStartDate,
    tripEndDate,
    maxGuests,
    pricePerDay
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<TripReservationForm>();

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    return (
        <div className="flex flex-col px-5 pb-10 border-b border-grayLighter">
            <div className="flex gap-4">
                <Controller
                    name="startDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data inicial é obrigatória."
                        }
                    }}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholderText="Data de início"
                            onChange={field.onChange}
                            selected={field.value}
                            error={!!errors.startDate}
                            errorMessage={errors.startDate?.message}
                            className="w-full"
                        />
                    )}
                />
                <Controller
                    name="endDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data final é obrigatória."
                        }
                    }}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholderText="Data final"
                            onChange={field.onChange}
                            selected={field.value}
                            error={!!errors.endDate}
                            errorMessage={errors.endDate?.message}
                            className="w-full"
                            maxDate={tripEndDate}
                            minDate={tripStartDate ?? startDate}
                        />
                    )}
                />
            </div>
            <Input
                {
                ...register('guests', {
                    required: {
                        value: true,
                        message: 'Número de hóspedes é obrigatório.'
                    }
                })
                }
                placeholder={`Número de hospedes (max: ${maxGuests})`}
                className="mt-4"
                error={!!errors.guests}
                errorMessage={`${errors.guests?.message}`}
            />
            <div className="flex justify-between mt-3">
                <p className="font-medium text-sm text-primaryDarker">Total:</p>
                <p className="font-medium text-sm text-primaryDarker">
                    {`R$${startDate && endDate ? differenceInDays(endDate, startDate) * pricePerDay : '0'}`}
                </p>
            </div>
            <Button onClick={() => handleSubmit(console.log)()} className="mt-3">Reservar agora</Button>
        </div>
    );
}

export default TripReservation;