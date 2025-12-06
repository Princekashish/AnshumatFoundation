"use client";

import axios from "axios";
import { ChevronUp, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";

type User = {
    email: string;
    user: string;
    role: string;
};

export default function Navbar() {
    const [user, setUser] = useState<User>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const userProfile = async () => {
            try {
                const request = await axios.get("/auth/v1/profile", {
                    withCredentials: true,
                });
                setUser(request.data.user);
            } catch (err) {
                console.error("Error fetching user profile", err);
            }
        };
        userProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(
                "/auth/v1/logout",
                {},
                { withCredentials: true } // important to clear the cookie
            );
            // Redirect to login page after logout
            router.push("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };


    return (
        <nav className="w-full bg-white  px-6 py-4 flex justify-between items-center fixed top-0 z-50">
            <div className="text-2xl font-bold text-black cursor-pointer hover:scale-105 transition-transform">
                HR
            </div>

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors focus:outline-none"
                >
                    <span className="font-medium">{user?.user || "Loading..."}</span>
                    <ChevronUp className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 flex flex-col">
                        <div className="flex justify-start items-center px-5 gap-2 p-2">
                            <div className="h-2 w-2 rounded-full bg-green-600 " />
                            <p className=" text-gray-700 hover:bg-gray-100 transition-colors">{user?.role}</p>
                        </div>
                        <Link href={'/dashboard/profile'} className="px-4 gap-2  text-black flex"> <User size={20} />Profile</Link>
                        <button
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            onClick={handleLogout}
                        >
                            <FiLogOut /> Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
