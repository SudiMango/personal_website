import { Metadata } from "next";
import AdminExperiencesPage from "./AdminExperiencePage";

export const metadata: Metadata = {
    title: "Experience",
};

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <AdminExperiencesPage />
        </div>
    );
};

export default Home;
