import styles from "./ProfileCard.module.css";
import { forwardRef } from "react";

import { useAuth } from "../../hooks/useAuth";
import { usePortfolio } from "../../hooks/usePortfolio";

import ProfileCardStatic from "./ProfileCardStatic";
import ProfileCardDynamic from "./ProfileCardDynamic";
import portfolioValidation from "../../utils/portfolioValidation";
import { useParams } from "react-router-dom";

export default forwardRef<HTMLDivElement>(function ProfileCard(_, ref) {
  const { username } = useParams();
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
          "--bg-url":
            portfolio.about.imageBackground.image &&
            portfolio.about.imageBackground.image !== ""
              ? `url(${portfolio.about.imageBackground.image})`
              : "url(programming-background.jpg)",
        } as React.CSSProperties
      }
    >
      {(viewType.canView || viewType.isOwner || viewType.isUser) && username ? (
        <ProfileCardDynamic portfolio={portfolio} viewType={viewType} />
      ) : (
        <ProfileCardStatic />
      )}
    </section>
  );
});
