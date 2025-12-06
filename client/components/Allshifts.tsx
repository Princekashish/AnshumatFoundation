"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Loader2 } from "lucide-react";
import { TiDeleteOutline } from "react-icons/ti";

type Employee = {
  _id: string;
  user: string;
  employeeCode: string;
};

type Shift = {
  _id: string;
  start_time: string;
  end_time: string;
  createdAt: string;
  userId: Employee; // not array
};

export default function AllShifts() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loadingShifts, setLoadingShifts] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  // Fetch employee list
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/api/employees", {
          withCredentials: true,
        });
        setEmployees(res.data.employeelist || []);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);


  const fetchUserShifts = async (employeeCode: string) => {
    setLoadingShifts(true);
    setShifts([]);

    try {
      const res = await axios.get(
        `/api/shift?employeeCode=${employeeCode}`,
        { withCredentials: true }
      );

      setShifts(res.data.shift || []);
    } catch (err) {
      console.error("Failed to fetch user shifts:", err);
    } finally {
      setLoadingShifts(false);
    }
  };

  const handleDelete = async (shiftId: string) => {
    if (!confirm("Are you sure you want to delete this shift?")) return;

    try {
      await axios.delete("/api/shift", {
        data: { shiftId },
        withCredentials: true,
      });

      setShifts((prev) => prev.filter((shift) => shift._id !== shiftId));
      alert("Shift deleted successfully");
    } catch (err) {
      console.error("Failed to delete shift:", err);
      alert("Failed to delete shift. Try again.");
    }
  };

  const getShiftDate = (createdAt: string) =>
    new Date(createdAt).toLocaleDateString("en-CA");

  const reversedShifts = [...shifts].reverse();

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="mt-10 p-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold mb-6 flex items-center gap-3">
        <Calendar size={32} /> All User Shifts
      </h1>

      {/* EMPLOYEE DROPDOWN */}
      <div className="mb-6">
        <select
          value={selectedEmployee}
          onChange={(e) => {
            setSelectedEmployee(e.target.value);
            fetchUserShifts(e.target.value);
          }}
          className="w-full border rounded-lg px-4 py-2 outline-none transition-all"
        >
          <option value="" className="text-black ">Select a user...</option>

          {!loadingEmployees &&
            employees.map((emp) => (
              <option key={emp._id} value={emp.employeeCode} className="text-black ">
                {emp.user} ({emp.employeeCode})
              </option>
            ))}
        </select>
      </div>

      {/* IF NO USER SELECTED */}
      {!selectedEmployee && (
        <p className="text-gray-300 mt-10">Please select a user to view shifts.</p>
      )}

      {/* LOADING STATE */}
      {loadingShifts && (
        <div className="mt-10 flex items-center gap-3 text-gray-500">
          <Loader2 className="animate-spin" /> Loading shifts...
        </div>
      )}

      {/* SHIFT TABLE */}
      {!loadingShifts && selectedEmployee && (
        <>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <Calendar size={22} /> Shift History
          </h2>

          {shifts.length > 0 ? (
            <div className="overflow-x-auto rounded-xl shadow-md border">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-black text-left">
                  <tr>
                    <th className="py-3 px-4 font-medium">Date</th>
                    <th className="py-3 px-4 font-medium">Start</th>
                    <th className="py-3 px-4 font-medium">End</th>
                    <th className="py-3 px-4 font-medium">User</th>
                    <th className="py-3 px-4 font-medium">Employee Code</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {reversedShifts.map((shift) => (
                    <tr
                      key={shift._id}
                      className="border-t hover:bg-gray-900 transition-all cursor-pointer"
                    >
                      <td className="py-3 px-4">{getShiftDate(shift.createdAt)}</td>
                      <td className="py-3 px-4">{formatTime(shift.start_time)}</td>
                      <td className="py-3 px-4">{formatTime(shift.end_time)}</td>
                      <td className="py-3 px-4">{shift.userId.user}</td>
                      <td className="py-3 px-4">{shift.userId.employeeCode}</td>
                      <td className="py-3 px-4">
                        <button
                          className="cursor-pointer font-medium"
                          onClick={() => handleDelete(shift._id)}
                        >
                          <TiDeleteOutline size={25} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-4 bg-gray-50 border rounded-xl text-gray-500">
              No shifts found for this user.
            </p>
          )}
        </>
      )}
    </div>
  );
}
