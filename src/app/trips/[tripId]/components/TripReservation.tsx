"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { useForm, Controller } from "react-hook-form";

interface TripReservationProps {
    tripId: string
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
    tripId,
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
        watch,
        setError
    } = useForm<TripReservationForm>();

    const router = useRouter();

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    const onSubmit = async (data: TripReservationForm) => {
        const response = await fetch('/api/trips/check', {
            method: 'POST',
            body: Buffer.from(JSON.stringify({
                startDate: data.startDate,
                endDate: data.endDate,
                tripId,
            }))
        })

        const res = await response.json();

        if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
            setError('startDate', {
                type: 'manual',
                message: 'Esta data já está reservada.',
            });

            return setError('endDate', {
                type: 'manual',
                message: 'Esta data já está reservada.',
            });
        }

        if (res?.error?.code === 'INVALID_START_DATE') {
            setError('startDate', {
                type: 'manual',
                message: 'Data inválida.',
            });
        }

        if (res?.error?.code === 'INVALID_END_DATE') {
            return setError('endDate', {
                type: 'manual',
                message: 'Data inválida.',
            });
        }

        router.push(`/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`)
    }

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
                    },
                    max: {
                        value: maxGuests,
                        message: `Número de hóspedes não pode ser maior que ${maxGuests}.`
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
            <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3">Reservar agora</Button>
        </div>
    );
}

export default TripReservation;