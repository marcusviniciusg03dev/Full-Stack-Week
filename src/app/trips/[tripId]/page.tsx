import prisma from "@/lib/prisma"
import TripHeader from "./components/TripHeader"
import TripReservation from "./components/TripReservation"

interface TripDetailsProps {
    tripId: string
}

const getTripDetails = async (tripId: string) => {
    return await prisma.trip.findUnique({ where: { id: tripId } })
}

const TripDetails = async ({ params: { tripId } }: { params: TripDetailsProps }) => {
    const trip = await getTripDetails(tripId);

    if (!trip) return;

    return (
        <div className="container mx-auto">
            <TripHeader trip={trip} />
            <TripReservation trip={trip} />
        </div>
    );
}

export default TripDetails;