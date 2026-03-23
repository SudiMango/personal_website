"use client";
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

const EMAIL = "sudi2005@proton.me";

const socials = [
    {
        label: "LinkedIn",
        handle: "@sudipto-islam",
        url: "https://www.linkedin.com/in/sudipto-islam/",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        handle: "@MangoDev",
        url: "https://www.youtube.com/@MangoDev",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        handle: "@SudiMango",
        url: "https://github.com/SudiMango",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
];

const ContactPage = () => {
    const [copied, setCopied] = useState(false);
    const [mailingEmail, setMailingEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mailingEmail) return;
        // TODO: connect to backend
        setSubmitted(true);
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-bg-sunken py-20">
            <div className="w-full max-w-md mx-auto px-10 flex flex-col items-center gap-10">
                {/* Heading */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="font-bold tracking-widest uppercase text-accent text-2xl">
                        Contact
                    </h2>
                    <p className="text-sm text-text-muted">
                        Feel free to reach out or connect with me!
                    </p>
                </div>

                {/* Email */}
                <div className="w-full flex items-center justify-between px-5 py-5 rounded-xl border border-(--border) bg-bg-surface">
                    <div className="flex items-center gap-4">
                        <span className="text-text-muted">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="2"
                                    y="4"
                                    width="20"
                                    height="16"
                                    rx="2"
                                />
                                <polyline points="2,4 12,13 22,4" />
                            </svg>
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-text-primary text-sm">
                                Email
                            </span>
                            <span className="text-sm text-text-secondary">
                                {EMAIL}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="text-[0.7rem] tracking-wider px-3 py-1.5 rounded-lg border border-(--border-strong) text-text-secondary bg-bg-elevated hover:bg-bg-hover hover:text-text-primary transition-all duration-200 shrink-0"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                {/* Socials */}
                <div className="w-full flex flex-col gap-3">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-5 py-4 rounded-xl border border-(--border) bg-bg-surface hover:border-(--border-strong) hover:bg-bg-elevated transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-text-muted group-hover:text-text-secondary transition-colors duration-200">
                                    {s.icon}
                                </span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-text-primary text-sm">
                                        {s.label}
                                    </span>
                                    <span className="text-[0.7rem] text-text-muted">
                                        {s.handle}
                                    </span>
                                </div>
                            </div>
                            <ExternalLink
                                size={14}
                                className="text-text-muted transition-opacity duration-200"
                            />
                        </a>
                    ))}
                </div>

                <div className="w-full h-px bg-(--border)" />

                {/* Mailing list */}
                <div className="w-full flex flex-col gap-4 px-5 py-5 rounded-xl border border-(--border) bg-bg-surface">
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-text-primary text-sm">
                            Stay in the loop
                        </span>
                        <span className="text-[0.7rem] text-text-muted">
                            Get notified when I post something new.
                        </span>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="email"
                            value={mailingEmail}
                            onChange={(e) => setMailingEmail(e.target.value)}
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

export default ContactPage;
