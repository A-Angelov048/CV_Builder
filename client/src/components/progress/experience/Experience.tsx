import { forwardRef } from "react";

import HeadingContainer from "../../heading-container/HeadingContainer";
import useHandleForm from "../../../hooks/useHandleForm";
import { useParams } from "react-router-dom";
import { usePortfolio } from "../../../hooks/usePortfolio";
import portfolioValidation from "../../../utils/portfolioValidation";
import { useAuth } from "../../../hooks/useAuth";
import ExperienceDynamic from "./ExperienceDynamic";
import ExperienceStatic from "./ExperienceStatic";

export default forwardRef<HTMLDivElement>(function Experience(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { username } = useParams();
  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  const checkPortfolioExperience = portfolio.experience && portfolio.experience.length > 0;
  return (
    <section ref={ref}>
      <HeadingContainer
        header={"EXPERIENCE"}
        status={flagForm}
        changeStatus={changeState}
        viewType={viewType}
        buttonCondition={checkPortfolioExperience}
      />

      {viewType.canView && (viewType.isOwner || checkPortfolioExperience) && username ? (
        <ExperienceDynamic
          portfolio={portfolio}
          flagForm={flagForm}
          viewType={viewType}
          changeStatus={changeState}
        />
      ) : (
        <ExperienceStatic />
      )}
    </section>
  );
});
