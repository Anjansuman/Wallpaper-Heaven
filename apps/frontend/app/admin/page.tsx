"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLogin() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/admin/dashboard");
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid email or password.");
        } else {
            router.push("/admin/dashboard");
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAF8]">
                <p className="text-[#6D7278]">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAF8]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-[#E5E7EB]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#3D5A40]">Admin Login</h1>
                    <p className="text-[#6D7278] mt-1 text-sm">Wallpaper Heaven — Admin Panel</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-[#3D5A40] mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@example.com"
                            className="w-full border border-[#D1D5DB] rounded-full px-5 py-3 text-sm text-[#3D5A40] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6DA165] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#3D5A40] mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full border border-[#D1D5DB] rounded-full px-5 py-3 text-sm text-[#3D5A40] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6DA165] transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-medium">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6DA165] text-white py-3 rounded-full font-semibold hover:bg-[#5a914e] transition-colors disabled:opacity-60 mt-2"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
