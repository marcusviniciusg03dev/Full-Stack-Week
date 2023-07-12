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
        <div className="container mx-auto lg:px-40 lg:pt-10">
            <TripHeader trip={trip} />
            <div className="flex flex-col lg:flex-col lg:mt-12 lg:gap-20">
                <div className="lg:order-1">
                    <TripReservation
                        tripId={trip.id}
                        tripStartDate={trip.startDate}
                        tripEndDate={trip.endDate}
                        maxGuests={trip.maxGuests}
                        pricePerDay={trip.pricePerDay as any}
                    />
                </div>

                <div className="lg:order-2">
                    <TripDescription description={trip.description} />
                    <TripHighlights highlights={trip.highlights} />
                </div>
            </div>
            
            
            <TripLocation location={trip.location} locationDescription={trip.locationDescription} />
        </div>
    );
}

export default TripDetails;