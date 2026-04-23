import RegisterNow from "../../components/registerNow/RegisterNow";
import ProfileCardStatic from "../../components/profileCard/ProfileCardStatic";
import SocialLinksStatic from "../../components/socialLinks/SocialLinksStatic";
import SkillsStatic from "../../components/skills/SkillsStatic";
import ProjectsStatic from "../../components/projects/ProjectsStatic";
import ExperienceStatic from "../../components/progress/experience/ExperienceStatic";
import EducationStatic from "../../components/progress/education/EducationStatic";
import ContactMeStatic from "../../components/contactMe/ContactMeStatic";

type Section = "about" | "skills" | "projects" | "experience" | "education" | "contact";

type HomeProps = {
  sectionRefs: React.RefObject<Record<Section, HTMLDivElement | null>>;
};

export default function HomeCv({ sectionRefs }: HomeProps) {
  return (
    <>
      <ProfileCardStatic ref={(el) => void (sectionRefs.current.about = el)} />
      <SocialLinksStatic />
      <SkillsStatic ref={(el) => void (sectionRefs.current.skills = el)} />
      <ProjectsStatic ref={(el) => void (sectionRefs.current.projects = el)} />
      <ExperienceStatic ref={(el) => void (sectionRefs.current.experience = el)} />
      <EducationStatic ref={(el) => void (sectionRefs.current.education = el)} />
      <ContactMeStatic ref={(el) => void (sectionRefs.current.contact = el)} />
      <RegisterNow />
    </>
  );
}
