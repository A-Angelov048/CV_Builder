import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePortfolio } from "../../hooks/usePortfolio";
import portfolioValidation from "../../utils/portfolioValidation";
import SocialLinksDynamic from "./SocialLinksDynamic";
import SocialLinksStatic from "./SocialLinksStatic";

export default function SocialLinks() {
  const { username } = useParams();
  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  return (
    <section className="max-width">
      {(viewType.canView || viewType.isOwner || viewType.isUser) && username ? (
        <SocialLinksDynamic portfolio={portfolio} viewType={viewType} />
      ) : (
        <SocialLinksStatic />
      )}
    </section>
  );
}
