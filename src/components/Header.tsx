"use client";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
 
const Header: FunctionComponent = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { status, data } = useSession();

    const handleSignInClick = () => signIn();

    const handleMenuClick = () => setMenuOpen(prev => !prev);

    const handleLogoutClick = () => {
        setMenuOpen(false);
        signOut();
    }

    return (
        <header className="container mx-auto px-5 h-[93px] flex justify-between items-center lg:border-b lg:border-grayLighter">
            <Link href="/">
                <div className="relative w-[183px] h-[32px]">
                    <Image src="/logo.png" alt="Full Stack Week" fill />
                </div>
            </Link>

            {status === 'unauthenticated' && (
                <button onClick={handleSignInClick} className="text-primary text-sm font-semibold">Login</button>
            )}

            {status === 'authenticated' && data.user && (
                <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-full relative">
                    <AiOutlineMenu size={16} onClick={handleMenuClick} />

                    <Image height={35} width={35} src={`${data.user.image}`} alt={`${data.user.name}`} className="rounded-full shadow-md" />

                    {menuOpen && (
                        <div className="z-50 absolute top-14 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">

                            <Link href="/my-trips" onClick={() => setMenuOpen(false)}>
                                <button className="text-primary pb-2 border-b border-grayLighter border-solid text-sm font-semibold">Minhas Viagens</button>
                            </Link>
                            

                            <button className="text-primary pt-2 text-sm font-semibold" onClick={handleLogoutClick}>Logout</button>
                        </div>
                    )}
                </div>
            )}
            
        </header>
    );
};
 
export default Header;