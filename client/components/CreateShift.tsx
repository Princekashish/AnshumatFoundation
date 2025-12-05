"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { User, Clock, CalendarPlus } from "lucide-react";

type Employee = {
    _id: string;
    employeeCode: string;
    user: string;
};

interface userRole {
    _id: string;
    role?: string;
}

export default function CreateShift({ role, _id }: userRole) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("https://hrdashboard-r3uf.onrender.com/employees", {
                    withCredentials: true,
                });
                setEmployees(res.data.employeelist || []);
            } catch (err) {
                console.error("Failed to fetch employees:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();

        if (role !== "admin") {
            setSelectedEmployee(_id);
        }
    }, [role, _id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEmployee || !date || !startTime || !endTime) {
            setMessage("Please fill all fields.");
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            const payload = {
                userId: selectedEmployee,
                date: date,
                start_time: startTime,
                end_time: endTime,
            };

            await axios.post("https://hrdashboard-r3uf.onrender.com/shift", payload, {
                withCredentials: true,
            });

            setMessage("Shift created successfully!");
            if (role === "admin") setSelectedEmployee("");
            setDate("");
            setStartTime("");
            setEndTime("");
        } catch (err: any) {
            console.error("Failed to create shift", err.response.data.message);
            setMessage(err.response.data.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-xl mt-10 animate-pulse">Loading employee list...</div>;
    }

    return (
        <div className="mt-10 p-6 max-w-xl">
            <h1 className="text-4xl font-semibold mb-6 flex items-center gap-3">Create Shift</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-xl border space-y-6 transition-all">
                {/* EMPLOYEE SELECT OR USER ID */}
                <div>
                    <label className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <User size={18} /> {role === "admin" ? "Select Employee" : "Your Employee ID"}
                    </label>

                    {role === "admin" ? (
                        <select
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 outline-none text-black transition-all"
                        >
                            <option value="">Choose employee...</option>
                            {employees.map((emp) => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.user} ({emp.employeeCode})
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={selectedEmployee}
                            readOnly
                            className="w-full border rounded-lg px-4 py-2 outline-none text-black bg-gray-100"
                        />
                    )}
                </div>

                {/* DATE */}
                <div>
                    <label className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <CalendarPlus size={18} /> Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 outline-none text-black hover:border-black transition-all"
                    />
                </div>

                {/* START TIME */}
                <div>
                    <label className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <Clock size={18} /> Start Time
                    </label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 outline-none text-black hover:border-black transition-all"
                    />
                </div>

                {/* END TIME */}
                <div>
                    <label className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                        <Clock size={18} /> End Time
                    </label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 outline-none text-black hover:border-black transition-all"
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 active:scale-95 transition-all"
                >
                    {submitting ? "Creating..." : "Create Shift"}
                </button>

                {/* STATUS MESSAGE */}
                {message && <p className="text-center text-sm text-green-700 mt-2">{message}</p>}
            </form>
        </div>
    );
}
