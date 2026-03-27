import HomePage from "@/components/public/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
};

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <HomePage />
        </div>
    );
};

export default Home;
