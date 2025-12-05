import Navbar from "@/components/Navbar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className=" ">
                {children}
            </main>

        </div>
    );
}
