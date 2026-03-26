import { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
    title: "Login",
    description: "Admin login",
};

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <LoginPage />
        </div>
    );
};

export default Home;
