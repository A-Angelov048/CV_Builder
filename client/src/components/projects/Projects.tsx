import { forwardRef } from "react";

import { useAuth } from "../../hooks/useAuth";
import { usePortfolio } from "../../hooks/usePortfolio";

import HeadingContainer from "../heading-container/HeadingContainer";
import useHandleForm from "../../hooks/useHandleForm";
import portfolioValidation from "../../utils/portfolioValidation";
import ProjectsDynamic from "./ProjectsDynamic";

export default forwardRef<HTMLDivElement>(function Projects(_, ref) {
  const { flagForm, changeState } = useHandleForm(true);

  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  const checkPortfolioProjects = portfolio.projects && portfolio.projects.length > 0;

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"PROJECTS"}
        status={flagForm}
        changeStatus={changeState}
        viewType={viewType}
        buttonCondition={checkPortfolioProjects}
      />

      <ProjectsDynamic
        portfolio={portfolio}
        flagForm={flagForm}
        viewType={viewType}
        changeStatus={changeState}
      />
    </section>
  );
});
