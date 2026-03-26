"use client";
import apiClient from "@/lib/client";
import React, { useState } from "react";
import { toast } from "sonner";

const BlogPage = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setSubmitted(true);
        const id = toast.loading("Enrolling in mailing list...");

        try {
            await apiClient.post("/mailinglist/enroll", { email: email });
            toast.success("Successfully enrolled in mailing list!", { id });
        } catch (err: any) {
            toast.error("Error enrolling in mailing list.", { id });
            setSubmitted(false);
        }
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-bg-base">
            <div className="flex flex-col items-center gap-8 text-center px-10 max-w-md">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="font-bold tracking-widest uppercase text-accent text-2xl">
                        Blog
                    </h1>
                    <p className="text-text-secondary text-sm leading-relaxed">
                        Blogs coming soon! I will be posting small blogs
                        whenever I make something interesting.
                    </p>
                </div>

                <div className="w-full h-px bg-(--border)" />

                <div className="w-full flex flex-col gap-4 px-5 py-5 rounded-xl border border-(--border) bg-bg-surface">
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-text-primary text-sm">
                            Get notified when I post
                        </span>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={submitted}
                            placeholder="your@email.com"
                            className={`flex-1 text-[0.7rem] px-3 py-2 rounded-lg border border-(--border) bg-bg-elevated placeholder:text-text-muted focus:outline-none focus:border-(--border-strong) transition-colors duration-200 ${submitted ? "text-text-secondary" : "text-text-primary"}`}
                        />
                        <button
                            type="submit"
                            className="text-[0.7rem] tracking-wider px-3 py-2 rounded-lg border border-(--border-strong) bg-bg-elevated text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all duration-200 shrink-0"
                        >
                            {submitted ? "Done!" : "Notify me"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
