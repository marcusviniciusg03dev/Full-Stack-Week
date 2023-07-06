"use client";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
 
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
        <header className="container mx-auto px-5 h-[93px] flex justify-between items-center">
            <div className="relative w-[183px] h-[32px]">
                <Image src="/logo.png" alt="Full Stack Week" fill />
            </div>

            {status === 'unauthenticated' && (
                <button onClick={handleSignInClick} className="text-primary text-sm font-semibold">Login</button>
            )}

            {status === 'authenticated' && data.user && (
                <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-full relative">
                    <AiOutlineMenu size={16} onClick={handleMenuClick} />

                    <Image height={35} width={35} src={`${data.user.image}`} alt={`${data.user.name}`} className="rounded-full shadow-md" />

                    {menuOpen && (
                        <div className="absolute top-12 w-full h-full bg-white rounded-full shadow-md flex flex-col justify-center items-center">
                            <button className="text-primary text-sm font-semibold" onClick={handleLogoutClick}>Logout</button>
                        </div>
                    )}
                </div>
            )}
            
        </header>
    );
};
 
export default Header;