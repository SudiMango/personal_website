import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-(--border) bg-bg-sunken px-10 py-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm text-text-primary tracking-wide">
                        Sudipto Islam
                    </span>
                    <span className="text-[0.7rem] text-text-muted">
                        Computer Science @ UBC · Vancouver, BC
                    </span>
                </div>

                <div className="flex items-center gap-5">
                    {/* Email */}
                    <a
                        href="mailto:sudi2005@proton.me"
                        className="text-text-muted hover:text-text-secondary transition-colors duration-200"
                    >
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <polyline points="2,4 12,13 22,4" />
                        </svg>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/SudiMango"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-secondary transition-colors duration-200"
                    >
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/sudipto-islam/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-secondary transition-colors duration-200"
                    >
                        <svg
                            width="17"
                            height="17"
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
                    </a>

                    {/* YouTube */}
                    <a
                        href="https://www.youtube.com/@MangoDev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-secondary transition-colors duration-200"
                    >
                        <svg
                            width="17"
                            height="17"
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
                    </a>
                </div>

                <span className="text-[0.65rem] text-text-muted">
                    © {new Date().getFullYear()}
                </span>
            </div>
        </footer>
    );
};

export default Footer;
