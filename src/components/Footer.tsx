import Image from "next/image";

const Footer = () => {
    return (
        <div className="flex flex-col bg-walterWhite p-5 items-center justify-center">
            <Image src="/logo.png" width={133} height={23} alt="Full Stack Week" />
            <p className="text-sm font-medium mt-1 text-primaryDarker">Todos os direitos reservados.</p>
        </div>
    );
}

export default Footer;