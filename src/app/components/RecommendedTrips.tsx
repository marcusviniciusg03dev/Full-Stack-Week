import TripItem from "@/components/TripItem";
import prisma from "@/lib/prisma";
import { Trip } from "@prisma/client";

async function getTrips() {
    return await prisma.trip.findMany();
}

const RecommendedTrips = async () => {
    const data = await getTrips();

    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-greyLighter"></div>
                <h2 className="px-5 font-medium text-greyPrimary whitespace-nowrap">Destinos recomendados</h2>
                <div className="w-full h-[1px] bg-greyLighter"></div>
            </div>

            <div className="flex flex-col items-center mt-5 gap-5">
                {data.map((trip: Trip) => (
                    <TripItem key={trip.id} trip={trip} />
                ))}  
            </div>
        </div>
    );
}
 
export default RecommendedTrips;