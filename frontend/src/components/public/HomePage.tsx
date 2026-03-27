import HeroPage from "./HeroPage";
import ExperiencesPage from "./ExperiencesPage";
import ProjectsPage from "./ProjectsPage";
import ContactPage from "./ContactsPage";

const HomePage = () => {
    return (
        <div className="flex flex-col">
            <div id="about">
                <HeroPage />
            </div>
            <div id="experiences">
                <ExperiencesPage />
            </div>
            <div id="projects">
                <ProjectsPage />
            </div>
            <div id="contact">
                <ContactPage />
            </div>
        </div>
    );
};

export default HomePage;
