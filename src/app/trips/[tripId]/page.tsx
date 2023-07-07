import prisma from "@/lib/prisma"
import TripHeader from "./components/TripHeader"
import TripReservation from "./components/TripReservation"
import TripDescription from "./components/TripDescription"
import TripHighlights from "./components/TripHighlights"
import TripLocation from "./components/TripLocation"

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
            <TripReservation
                tripStartDate={trip.startDate}
                tripEndDate={trip.endDate}
                maxGuests={trip.maxGuests}
            />
            <TripDescription description={trip.description} />
            <TripHighlights highlights={trip.highlights} />
            <TripLocation location={trip.location} locationDescription={trip.locationDescription} />
        </div>
    );
}

export default TripDetails;