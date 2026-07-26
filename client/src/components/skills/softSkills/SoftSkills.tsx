import { forwardRef } from "react";

import { useHandleForm } from "../../../hooks/useHandleForm";
import { usePortfolio } from "../../../hooks/usePortfolio";
import { useAuth } from "../../../hooks/useAuth";
import portfolioValidation from "../../../utils/portfolioValidation";

import HeadingContainer from "../../heading-container/HeadingContainer";
import SoftSkillsDynamic from "./SoftSkillsDynamic";

export default forwardRef<HTMLDivElement>(function SoftSkills(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  const checkPortfolioSkills = portfolio.softSkills && portfolio.softSkills.length > 0;

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"SOFT SKILLS"}
        status={flagForm}
        changeStatus={changeState}
        viewType={viewType}
        buttonCondition={checkPortfolioSkills}
      />
      <SoftSkillsDynamic
        portfolio={portfolio}
        flagForm={flagForm}
        viewType={viewType}
        changeStatus={changeState}
      />
    </section>
  );
});
