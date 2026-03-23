"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const fullText = "Hi, I'm Sudi";
const PAUSE_AT = 3;

const HeroPage = () => {
    const [displayed, setDisplayed] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let i = 0;
        let timeout: ReturnType<typeof setTimeout>;

        const type = () => {
            setDisplayed(fullText.slice(0, i + 1));
            i++;
            if (i === fullText.length) return;
            timeout = setTimeout(type, i === PAUSE_AT ? 500 : 100);
        };

        timeout = setTimeout(type, 120);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setShowCursor((v) => !v), 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-bg-base py-20">
            <div className="flex flex-row">
                <div className="relative w-105 h-120 shrink-0 shadow-md">
                    <Image
                        src="/profile-image.jpg"
                        alt="Profile image"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-cover object-top rounded-2xl border-bg-sunken border-3"
                    />
                </div>
                <div className="flex flex-col flex-1 max-w-sm gap-3 ml-20 items-end justify-center">
                    <span className="font-bold text-4xl mb-5 text-accent">
                        {displayed}
                        <span
                            className={`inline-block w-0.5 h-[1em] bg-current align-middle ml-0.5 transition-opacity duration-75 ${
                                showCursor ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    </span>
                    <span className="text-right">
                        I'm a 2nd year Computer Science student at the
                        University of British Columbia. I like backend
                        development as well as game development.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HeroPage;
