import { forwardRef } from "react";

import { useHandleForm } from "../../hooks/useHandleForm";
import { usePortfolio } from "../../hooks/usePortfolio";
import { useAuth } from "../../hooks/useAuth";
import portfolioValidation from "../../utils/portfolioValidation";

import SkillsDynamic from "./SkillsDynamic";
import HeadingContainer from "../heading-container/HeadingContainer";

export default forwardRef<HTMLDivElement>(function Skills(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  const checkPortfolioSkills = portfolio.skills && portfolio.skills.length > 0;

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"SKILLS"}
        status={flagForm}
        changeStatus={changeState}
        viewType={viewType}
        buttonCondition={checkPortfolioSkills}
      />
      <SkillsDynamic
        portfolio={portfolio}
        flagForm={flagForm}
        viewType={viewType}
        changeStatus={changeState}
      />
    </section>
  );
});
