import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-bg-base px-6">
            <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="font-bold text-[6rem] leading-none text-bg-elevated select-none">
                        404
                    </span>
                    <h1 className="font-bold tracking-widest uppercase text-accent text-2xl">
                        Page Not Found
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        Looks like this page doesn't exist. It may have been
                        moved, deleted, or you might have mistyped the URL.
                    </p>
                </div>

                <div className="w-full h-px bg-(--border)" />

                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-[0.75rem] tracking-wider font-medium text-text-secondary bg-bg-elevated hover:bg-bg-hover hover:text-text-primary border border-(--border-strong) rounded-lg transition-colors duration-200"
                >
                    <Home size={14} />
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
