import Image from "next/image";

const QuickSearch = () => {
    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-greyLighter"></div>
                <h2 className="px-5 font-medium text-greyPrimary whitespace-nowrap">Tente pesquisar por</h2>
                <div className="w-full h-[1px] bg-greyLighter"></div>
            </div>

            <div className="flex w-full justify-between mt-5">
                <div className="flex flex-col items-center gap-1">
                    <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />

                    <p className="text-sm text-greyPrimary">Hotel</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Image width={35} height={35} src="/farm-icon.png" alt="Fazenda" />

                    <p className="text-sm text-greyPrimary">Fazenda</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Image width={35} height={35} src="/cottage-icon.png" alt="Chalé" />

                    <p className="text-sm text-greyPrimary">Chalé</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Image width={35} height={35} src="/inn-icon.png" alt="Pousada" />

                    <p className="text-sm text-greyPrimary">Pousada</p>
                </div>
            </div>
        </div>
    );
}
 
export default QuickSearch;