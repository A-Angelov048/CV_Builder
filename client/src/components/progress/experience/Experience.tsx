import { forwardRef } from "react";

import { useHandleForm } from "../../../hooks/useHandleForm";
import { usePortfolio } from "../../../hooks/usePortfolio";
import { useAuth } from "../../../hooks/useAuth";
import portfolioValidation from "../../../utils/portfolioValidation";

import ExperienceDynamic from "./ExperienceDynamic";
import HeadingContainer from "../../heading-container/HeadingContainer";

export default forwardRef<HTMLDivElement>(function Experience(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

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

      <ExperienceDynamic
        portfolio={portfolio}
        flagForm={flagForm}
        viewType={viewType}
        changeStatus={changeState}
      />
    </section>
  );
});
