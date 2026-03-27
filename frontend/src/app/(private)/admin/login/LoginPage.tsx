"use client";
import apiClient from "@/lib/client";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password || loading) return;

        setLoading(true);
        const id = toast.loading("Authenticating...");

        try {
            await apiClient.post("/auth/login", {
                username: username,
                password: password,
            });

            window.location.href = "/admin/dashboard";
        } catch (err: any) {
            toast.error("Error loggin in.", { id });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-base px-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm flex flex-col gap-4 p-8 rounded-xl border border-(--border) bg-bg-surface"
            >
                <h1 className="font-bold text-text-primary text-lg mb-2">
                    Admin Login
                </h1>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-text-muted tracking-wider uppercase">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        disabled={loading}
                        className="text-sm px-3 py-2 rounded-lg border border-(--border) bg-bg-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:border-(--border-strong) transition-colors duration-200 disabled:opacity-50"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-text-muted tracking-wider uppercase">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        disabled={loading}
                        className="text-sm px-3 py-2 rounded-lg border border-(--border) bg-bg-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:border-(--border-strong) transition-colors duration-200 disabled:opacity-50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 text-sm px-4 py-2 rounded-lg border border-(--border-strong) bg-bg-elevated text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
