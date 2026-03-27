import { Metadata } from "next";
import DashboardPage from "./Dashboard";

export const metadata: Metadata = {
    title: "Dashboard",
};

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <DashboardPage />
        </div>
    );
};

export default Home;
