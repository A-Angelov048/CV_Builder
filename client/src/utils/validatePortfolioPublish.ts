import { Portfolio } from "../context/portfolioContext";

const isNotEmpty = (val?: string): boolean => {
  return typeof val === "string" && val.trim().length > 0;
};

const isArrayNotEmpty = <T>(arr?: T[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

const isPortfolioComplete = (data: Portfolio): boolean | undefined => {
  return (
    // owner
    isNotEmpty(data.owner) &&
    // about
    isNotEmpty(data.about.name) &&
    isNotEmpty(data.about.career) &&
    isNotEmpty(data.about.phone) &&
    isNotEmpty(data.about.email) &&
    isNotEmpty(data.about.address) &&
    isNotEmpty(data.about.date) &&
    // images
    isNotEmpty(data.about.imageProfile.image) &&
    isNotEmpty(data.about.imageProfile.public_id) &&
    isNotEmpty(data.about.imageBackground.image) &&
    isNotEmpty(data.about.imageBackground.public_id) &&
    // skills
    isArrayNotEmpty(data.skills) &&
    data.skills?.every((s) => isNotEmpty(s.skill)) &&
    // experience
    isArrayNotEmpty(data.experience) &&
    data.experience?.every(
      (e) =>
        isNotEmpty(e.yearsExperience) &&
        isNotEmpty(e.position) &&
        isNotEmpty(e.companyName) &&
        isNotEmpty(e.activity)
    ) &&
    // education
    isArrayNotEmpty(data.education) &&
    data.education?.every(
      (ed) =>
        isNotEmpty(ed.yearsEducation) &&
        isNotEmpty(ed.degree) &&
        isNotEmpty(ed.nameSchool) &&
        isNotEmpty(ed.infoSchool)
    ) &&
    // links (you can relax this if needed)
    isNotEmpty(data.links?.linkedin) &&
    isNotEmpty(data.links?.shortInfo)
  );
};

export default isPortfolioComplete;
