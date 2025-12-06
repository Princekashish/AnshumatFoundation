"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Login = {
    email: string,
    password: string
}

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState<Login>({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "/auth/v1/login",
                user,
                { withCredentials: true }
            );

            if (response.status === 202) {
                router.push("/dashboard"); // redirect to dashboard
            }
        } catch (error) {
            console.log("Login failed", error);
        }
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white  rounded-2xl p-10 w-[550px] transition-all duration-300 ">
                <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                    Welcome Back
                </h2>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className="peer w-full border-b-2 border-gray-300 bg-transparent outline-none py-2 text-gray-700 focus:border-black transition-all"
                        />
                        <label
                            className="absolute left-0 top-2 text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm transition-all"
                        >
                            Email
                        </label>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className="peer w-full border-b-2 border-gray-300 bg-transparent outline-none py-2 text-gray-700 focus:border-black transition-all"
                        />
                        <label
                            className="absolute left-0 top-2 text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm transition-all"
                        >
                            Password
                        </label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="mt-4 bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02] active:scale-95"
                    >
                        Log In
                    </button>
                </form>


            </div>
        </div>
    );
}

