import ContactMe from "../components/contactMe/ContactMe";
import ProfileCard from "../components/profileCard/ProfileCard";
import Education from "../components/progress/Education";
import Experience from "../components/progress/Experience";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import SocialLinks from "../components/socialLinks/SocialLinks";
import RegisterNow from "../components/registerNow/RegisterNow";

type Section =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "contact";

type HomeCVProps = {
  sectionRefs: React.RefObject<Record<Section, HTMLDivElement | null>>;
};

export default function HomeCV({ sectionRefs }: HomeCVProps) {
  return (
    <>
      <ProfileCard ref={(el) => void (sectionRefs.current.about = el)} />
      <SocialLinks />
      <Skills ref={(el) => void (sectionRefs.current.skills = el)} />
      <Projects ref={(el) => void (sectionRefs.current.projects = el)} />
      <Experience ref={(el) => void (sectionRefs.current.experience = el)} />
      <Education ref={(el) => void (sectionRefs.current.education = el)} />
      <ContactMe ref={(el) => void (sectionRefs.current.contact = el)} />
      <RegisterNow />
    </>
  );
}
