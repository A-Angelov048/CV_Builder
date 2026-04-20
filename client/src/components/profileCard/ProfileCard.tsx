import styles from "./ProfileCard.module.css";
import { forwardRef } from "react";

import { useAuth } from "../../hooks/useAuth";
import { usePortfolio } from "../../hooks/usePortfolio";

import ProfileCardDynamic from "./ProfileCardDynamic";
import portfolioValidation from "../../utils/portfolioValidation";

export default forwardRef<HTMLDivElement>(function ProfileCard(_, ref) {
  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  return (
    <section
      ref={ref}
      className={styles.hero}
      style={
        {
          "--bg-url": `url(${portfolio.about.imageBackground.image})`,
        } as React.CSSProperties
      }
    >
      <ProfileCardDynamic portfolio={portfolio} viewType={viewType} />
    </section>
  );
});
