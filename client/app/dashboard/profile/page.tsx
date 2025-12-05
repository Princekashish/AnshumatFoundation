"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type UserProfile = {
  _id: string;
  user: string;
  email: string;
  role: string;
  employeeCode?: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editName, setEditName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState("");

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://hrdashboard-r3uf.onrender.com/auth/v1/profile", {
          withCredentials: true,
        });
        setProfile(res.data.user);
        setEditName(res.data.user || "");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  console.log(profile);


  const handleUpdate = async () => {
    if (!editName.trim()) return;

    setUpdating(true);
    setSuccess("");

    try {
      const res = await axios.put(
        "https://hrdashboard-r3uf.onrender.com/auth/v1/update",
        editName,
        { withCredentials: true }
      );

      // Assuming API returns updated user object
      setProfile((prev) => prev && { ...prev, user: res.data.user });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setSuccess("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500 mt-10 animate-pulse">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-red-500 mt-10">No profile found.</div>;
  }

  return (
    <div className="mt-10 p-6 max-w-md bg-white rounded-xl shadow-md text-black">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>

      <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
      <p className="mb-2"><strong>Role:</strong> {profile.role}</p>
      {profile.employeeCode && <p className="mb-2"><strong>Employee Code:</strong> {profile.employeeCode}</p>}

      <div className="mt-4 flex  gap-2 ">
        <label className="font-medium">Name</label>
        <input
          type="text"
          value={editName || ""}
          onChange={(e) => setEditName(e.target.value)}
          placeholder={profile.user || "No name"}
          className="border rounded-lg px-3 py-2 outline-none focus:border-black transition-all"
          disabled={updating}
        />

      </div>
      <button
        onClick={handleUpdate}
        className={`mt-2 bg-black px-5 text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-900 ${updating ? "opacity-60 cursor-not-allowed" : ""
          }`}
        disabled={updating}
      >
        {updating ? "Updating..." : "Update Name"}
      </button>
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
}
