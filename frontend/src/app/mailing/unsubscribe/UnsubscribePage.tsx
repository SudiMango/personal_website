"use client";
import apiClient from "@/lib/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Home } from "lucide-react";

const UnsubscribePage = () => {
    const searchParams = useSearchParams();
    const enroll_id = searchParams.get("enroll_id");
    const email = searchParams.get("email");

    useEffect(() => {
        const handleUnenroll = async () => {
            if (!enroll_id || !email) {
                toast.error("No enroll_id or email in url.");
                return;
            }
            const id = toast.loading("Unenrolling from mailing list...");
            try {
                await apiClient.delete("/mailinglist/unenroll", {
                    data: { enroll_id, email },
                });
                toast.success("Successfully unenrolled from mailing list!", {
                    id,
                });
            } catch (err: any) {
                toast.error("Error unenrolling from mailing list.", { id });
            }
        };
        handleUnenroll();
    }, []);

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-bg-base px-6">
            <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="font-bold tracking-widest uppercase text-accent text-2xl">
                        Unsubscribed :(
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        I'm sorry to see you go, but I totally get it, inboxes
                        get crowded! If you ever want to come back, the door is
                        always open!
                    </p>
                </div>

                <div className="w-full h-px bg-(--border)" />

                <a
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-[0.75rem] tracking-wider font-medium text-text-secondary bg-bg-elevated hover:bg-bg-hover hover:text-text-primary border border-(--border-strong) rounded-lg transition-colors duration-200"
                >
                    <Home size={14} />
                    Return to Home
                </a>
            </div>
        </div>
    );
};

export default UnsubscribePage;
