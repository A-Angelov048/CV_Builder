import { forwardRef } from "react";

import { useHandleForm } from "../../../hooks/useHandleForm";
import { usePortfolio } from "../../../hooks/usePortfolio";
import { useAuth } from "../../../hooks/useAuth";
import portfolioValidation from "../../../utils/portfolioValidation";

import TechSkillsDynamic from "./TechSkillsDynamic";
import HeadingContainer from "../../heading-container/HeadingContainer";

export default forwardRef<HTMLDivElement>(function TechSkills(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  const checkPortfolioSkills = portfolio.techSkills && portfolio.techSkills.length > 0;

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"TECH SKILLS"}
        status={flagForm}
        changeStatus={changeState}
        viewType={viewType}
        buttonCondition={checkPortfolioSkills}
      />
      <TechSkillsDynamic
        portfolio={portfolio}
        flagForm={flagForm}
        viewType={viewType}
        changeStatus={changeState}
      />
    </section>
  );
});
