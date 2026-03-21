import { forwardRef } from "react";

import HeadingContainer from "../heading-container/HeadingContainer";
import useHandleForm from "../../hooks/useHandleForm";
import portfolioValidation from "../../utils/portfolioValidation";
import { usePortfolio } from "../../hooks/usePortfolio";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SkillsDynamic from "./SkillsDynamic";
import SkillsStatic from "./SkillsStatic";

export default forwardRef<HTMLDivElement>(function Skills(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { username } = useParams();
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
      {viewType.canView && (viewType.isOwner || checkPortfolioSkills) && username ? (
        <SkillsDynamic
          portfolio={portfolio}
          flagForm={flagForm}
          viewType={viewType}
          changeStatus={changeState}
        />
      ) : (
        <SkillsStatic />
      )}
    </section>
  );
});
