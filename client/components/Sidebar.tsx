"use client";

import { Calendar, Plus, User } from "lucide-react";
export type ActiveType = "myShifts" | "createShift" | "Users" | "Shifts";

interface Active {
    active: ActiveType;
    setActive: (v: ActiveType) => void;
    role?: string;
}

export default function Sidebar({ active, setActive, role }: Active) {

    const menuItems = [
        {
            key: "myShifts",
            label: role === "admin" ? "Users" : "My Shifts",
            icon: role === "admin" ? <User size={20} /> : <Calendar size={20} />,
            roles: ["admin", "user"],
        },
        {
            key: "createShift",
            label: "Create Shift",
            icon: <Plus size={20} />,
            roles: ["admin", "user"],
        },
        {
            key: "Shifts",
            label: "All Shifts",
            icon: <Calendar size={20} />,
            roles: ["admin"],
        }
    ];


    // Filter menu based on user role
    const allowedMenu = menuItems.filter((item) => item.roles.includes(role || "user"));

    return (
        <aside className="w-64 h-[95vh] bg-white shadow-md mt-10 p-6 flex flex-col">
            <nav className="flex flex-col gap-4 mt-6">
                {allowedMenu.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setActive(item.key as "myShifts" | "createShift")}
                        className={`
                            flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300
                            hover:bg-gray-100 hover:scale-[1.02]
                            ${active === item.key ? "bg-gray-200 text-black font-semibold scale-[1.03]" : "text-gray-700"}
                        `}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}
