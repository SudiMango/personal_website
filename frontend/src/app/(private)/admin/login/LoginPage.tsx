"use client";
import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: connect to backend
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
                        className="text-sm px-3 py-2 rounded-lg border border-(--border) bg-bg-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:border-(--border-strong) transition-colors duration-200"
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
                        className="text-sm px-3 py-2 rounded-lg border border-(--border) bg-bg-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:border-(--border-strong) transition-colors duration-200"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 text-sm px-4 py-2 rounded-lg border border-(--border-strong) bg-bg-elevated text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
