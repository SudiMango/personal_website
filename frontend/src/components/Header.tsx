"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["About", "Experiences", "Projects", "Contact", "Blog"];

export default function Header() {
    const [active, setActive] = useState("About");
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") return;
        const handleScroll = () => {
            const offsets = navLinks
                .filter((l) => l !== "Blog")
                .map((link) => {
                    const el = document.getElementById(link.toLowerCase());
                    if (!el) return { link, top: Infinity };
                    return {
                        link,
                        top: Math.abs(el.getBoundingClientRect().top - 80),
                    };
                })
                .sort((a, b) => a.top - b.top);
            if (offsets[0]) setActive(offsets[0].link);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    useEffect(() => {
        if (pathname === "/blog") setActive("Blog");
    }, [pathname]);

    const handleNav = (link: string) => {
        setActive(link);
        setMenuOpen(false);
        if (link === "Blog") {
            router.push("/blog");
            return;
        }
        if (pathname !== "/") {
            window.location.href = `/#${link.toLowerCase()}`;
            return;
        }
        const el = document.getElementById(link.toLowerCase());
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-15 bg-bg-sunken backdrop-blur-md border-b border-(--border)">
                {/* Logo */}
                <span className="font-mono font-bold text-[0.95rem] tracking-[0.08em] uppercase text-text-primary">
                    Sudipto Islam
                </span>

                {/* Desktop nav */}
                <nav className="hidden min-[1000px]:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <button
                            key={link}
                            onClick={() => handleNav(link)}
                            className={`font-mono text-[0.72rem] tracking-[0.12em] uppercase bg-transparent border-none cursor-pointer pb-0.5 transition-colors duration-200
                ${
                    active === link
                        ? "font-semibold text-accent"
                        : "font-normal text-text-muted border-b-2 border-transparent hover:text-text-secondary"
                }`}
                        >
                            {link}
                        </button>
                    ))}
                </nav>

                {/* Desktop badge */}
                <div className="hidden min-[1000px]:flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--border-strong) bg-bg-elevated">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="font-mono text-[0.65rem] tracking-widest uppercase text-text-secondary">
                        Open to work
                    </span>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="min-[1000px]:hidden text-text-secondary hover:text-text-primary transition-colors duration-200"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="fixed top-15 left-0 right-0 z-40 bg-bg-sunken border-b border-(--border) flex flex-col px-10 py-6 gap-5 min-[1000px]:hidden">
                    {navLinks.map((link) => (
                        <button
                            key={link}
                            onClick={() => handleNav(link)}
                            className={`font-mono text-[0.72rem] tracking-[0.12em] uppercase bg-transparent border-none cursor-pointer text-left transition-colors duration-200
                ${
                    active === link
                        ? "font-semibold text-accent"
                        : "font-normal text-text-muted hover:text-text-secondary"
                }`}
                        >
                            {link}
                        </button>
                    ))}
                    <div className="pt-5 border-t border-(--border)">
                        <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-(--border-strong) bg-bg-elevated">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="font-mono text-[0.65rem] tracking-widest uppercase text-text-secondary">
                                Open to work
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
