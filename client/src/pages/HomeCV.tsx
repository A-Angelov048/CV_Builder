import ContactMe from "../components/contactMe/ContactMe";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ProfileCard from "../components/profileCard/ProfileCard";
import Education from "../components/progress/Education";
import Experience from "../components/progress/Experience";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import SocialLinks from "../components/socialLinks/SocialLinks";

export default function HomeCV() {
  return (
    <>
      <Header />
      <ProfileCard />
      <SocialLinks />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <ContactMe />
      <Footer />
    </>
  );
}
