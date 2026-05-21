import ContactMe from "../components/contactMe/ContactMe";
import ProfileCard from "../components/profileCard/ProfileCard";
import Education from "../components/progress/education/Education";
import Experience from "../components/progress/experience/Experience";
import Projects from "../components/projects/Projects";
import Skills from "../components/skills/Skills";
import SocialLinks from "../components/socialLinks/SocialLinks";
import RegisterNow from "../components/registerNow/RegisterNow";
import Spinner from "../components/spinner/Spinner";

import { useParams } from "react-router-dom";
import { HomeProps } from "../types/componentsPropsTypes";

import { useGetPortfolio } from "../hooks/usePortfolioResponse";
import { useAuth } from "../hooks/useAuth";

export default function HomeCvUser({ sectionRefs }: HomeProps) {
  const { username } = useParams();
  const { authData } = useAuth();

  const { isLoading } = useGetPortfolio(username);

  if (isLoading) return <Spinner />;

  return (
    <>
      <ProfileCard ref={(el) => void (sectionRefs.current.about = el)} />
      <SocialLinks />
      <Skills ref={(el) => void (sectionRefs.current.skills = el)} />
      <Projects ref={(el) => void (sectionRefs.current.projects = el)} />
      <Experience ref={(el) => void (sectionRefs.current.experience = el)} />
      <Education ref={(el) => void (sectionRefs.current.education = el)} />
      <ContactMe ref={(el) => void (sectionRefs.current.contact = el)} />
      {!authData.accessToken && <RegisterNow />}
    </>
  );
}
