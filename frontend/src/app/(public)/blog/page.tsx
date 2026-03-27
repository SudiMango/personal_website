import BlogPage from "@/components/public/BlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Blog",
};

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <BlogPage />
        </div>
    );
};

export default Home;
