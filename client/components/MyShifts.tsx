"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarX, CalendarCheck, History, User } from "lucide-react";

interface userRole {
    role?: string;
}

type Shift = {
    _id: string;
    date: string,
    start_time: string;
    end_time: string;
    createdAt: string;
    userId: {
        _id: string;
        employeeCode: string;
        user: string;
        role?: string;
    };
};

type user = {
    _id: string,
    department: string,
    email: string,
    user: string,
    role: string,
    employeeCode: string,

}

export default function MyShifts({ role }: userRole) {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<user[]>([]);


    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const res = await axios.get("https://hrdashboard-r3uf.onrender.com/shift", {
                    withCredentials: true,
                });

                setShifts(res.data.shift || []);
            } catch (err) {
                console.error("Failed to fetch shifts:", err);
            } finally {
                setLoading(false);
            }
        };
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8000/employees", {
                    withCredentials: true,
                });


                setUsers(res.data.employeelist || []);
            } catch (err) {
                console.error("Failed to fetch shifts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser()

        fetchShifts();
    }, []);


    const today = new Date().toLocaleDateString("en-CA");

    const getShiftDate = (createdAt: string) =>
        new Date(createdAt).toLocaleDateString("en-CA");

    // Normal user shift filtering
    const todaysShifts = shifts.filter(
        (s) => getShiftDate(s.createdAt) === today
    );

    const previousShifts = shifts
        .filter((s) => getShiftDate(s.createdAt) < today)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (loading) {
        return <div className="text-xl mt-10 animate-pulse">Loading shifts...</div>;
    }

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (role === "admin") {
        return (
            <div className="mt-10 p-4">
                <h1 className="text-4xl font-semibold mb-6 flex items-center gap-3">
                    <User /> Employees
                </h1>

                <div className="overflow-x-auto rounded-xl shadow-md border">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-left text-black">
                            <tr>
                                <th className="py-3 px-4 font-medium">Employee</th>
                                <th className="py-3 px-4 font-medium">Email</th>
                                <th className="py-3 px-4 font-medium">Department</th>
                                <th className="py-3 px-4 font-medium">Role</th>

                            </tr>
                        </thead>

                        <tbody>
                            {users.map((users) => (
                                <tr
                                    key={users._id}
                                    className="border-t hover:bg-gray-900 transition-all"
                                >
                                    <td className="py-3 px-4">{users.user}</td>
                                    <td className="py-3 px-4">{users.email}</td>
                                    <td className="py-3 px-4">{users.department}</td>
                                    <td className="py-3 px-4">{users.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

                {shifts.length === 0 && (
                    <p className="text-gray-500 mt-4">No employee shift data found.</p>
                )}


                <div className="mt-28">
                    <p className="text-2xl font-semibold">Testing as a User use</p>
                    <p><span className="font-semibold">Email</span> test@test.com</p>
                    <p><span className="font-semibold">password</span> 123456</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-10 p-4">
            <h1 className="text-4xl font-semibold mb-6">My Shifts</h1>

            {/* TODAY SHIFT */}
            <div className="mb-10">
                {todaysShifts.length > 0 ? (
                    todaysShifts.map((shift) => (
                        <div
                            key={shift._id}
                            className="p-6 bg-white shadow rounded-xl border hover:shadow-lg text-black transition-all duration-300 mb-4"
                        >
                            <div className="flex items-center gap-3 text-green-600 mb-2">
                                <CalendarCheck />
                                <span className="font-semibold">Shift Assigned</span>
                            </div>

                            <p>
                                <strong>Time:</strong> {formatTime(shift.start_time)} – {formatTime(shift.end_time)}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="p-6 bg-white shadow rounded-xl border">
                        <div className="flex items-center gap-3 text-red-500 mb-2">
                            <CalendarX />
                            <span className="font-semibold">No Shift Assigned Today</span>
                        </div>
                    </div>
                )}
            </div>

            {/* PREVIOUS SHIFTS TABLE */}
            <div>
                <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                    <History size={22} /> Previous Shifts
                </h2>

                {previousShifts.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl shadow-md border">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-black text-left">
                                <tr>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Start</th>
                                    <th className="py-3 px-4">End</th>
                                </tr>
                            </thead>

                            <tbody>
                                {previousShifts.map((shift) => (
                                    <tr key={shift._id} className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4">{getShiftDate(shift.createdAt)}</td>
                                        <td className="py-3 px-4">{formatTime(shift.start_time)}</td>
                                        <td className="py-3 px-4">{formatTime(shift.end_time)}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-4 bg-gray-50 border rounded-xl text-gray-500">
                        No previous shifts found.
                    </div>
                )}
            </div>
        </div>
    );
}
