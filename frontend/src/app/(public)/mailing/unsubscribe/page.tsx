import { Metadata } from "next";
import { Suspense } from "react";
import UnsubscribePage from "./UnsubscribePage";

export const metadata: Metadata = {
    title: "Unsubscribed :(",
};

const Loading = () => (
    <div className="min-h-screen w-screen flex items-center justify-center bg-bg-base">
        <div className="flex flex-col items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-(--border-strong) border-t-accent animate-spin" />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase text-text-muted">
                Loading...
            </span>
        </div>
    </div>
);

const Page = () => (
    <Suspense fallback={<Loading />}>
        <UnsubscribePage />
    </Suspense>
);

export default Page;
