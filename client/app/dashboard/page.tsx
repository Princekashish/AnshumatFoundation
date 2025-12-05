"use client"

import Allshifts from "@/components/Allshifts";
import CreateShift from "@/components/CreateShift";
import MyShifts from "@/components/MyShifts";
import Sidebar, { ActiveType } from "@/components/Sidebar"
import axios from "axios";
import { useEffect, useState } from "react";

type User = {
    _id: string,
    role: string,
}
export default function Dashboard() {
    const [active, setActive] = useState<ActiveType>("myShifts");
    const [user, setUser] = useState<User>({ _id: "", role: "" });


    useEffect(() => {
        const userProfile = async () => {
            try {
                const request = await axios.get("http://localhost:8000/auth/v1/profile", {
                    withCredentials: true,
                });
                setUser(request.data.user);

            } catch (err) {
                console.error("Error fetching user profile", err);
            }
        };
        userProfile();
    }, []);




    return (
        <>
            <div className="flex">
                <Sidebar active={active} setActive={setActive} role={user.role} />
                <main className="flex-1 bg-black p-6">
                    {active === "myShifts" && <MyShifts role={user.role} />}
                    {active === "createShift" && <CreateShift role={user.role} _id={user._id} />}
                    {active === "Shifts" && <Allshifts />}
                </main>
            </div>
        </>
    )
}
