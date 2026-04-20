import { forwardRef } from "react";

import { usePortfolio } from "../../../hooks/usePortfolio";
import { useAuth } from "../../../hooks/useAuth";
import useHandleForm from "../../../hooks/useHandleForm";

import portfolioValidation from "../../../utils/portfolioValidation";

import HeadingContainer from "../../heading-container/HeadingContainer";
import EducationDynamic from "./EducationDynamic";

export default forwardRef<HTMLDivElement>(function Education(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  const checkPortfolioEducation = portfolio.education && portfolio.education.length > 0;

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"EDUCATION"}
        status={flagForm}
        changeStatus={changeState}
        viewType={viewType}
        buttonCondition={checkPortfolioEducation}
      />

      <EducationDynamic
        portfolio={portfolio}
        flagForm={flagForm}
        viewType={viewType}
        changeStatus={changeState}
      />
    </section>
  );
});
