import { useAuth } from "../../hooks/useAuth";
import { usePortfolio } from "../../hooks/usePortfolio";
import portfolioValidation from "../../utils/portfolioValidation";
import SocialLinksDynamic from "./SocialLinksDynamic";

export default function SocialLinks() {
  const { authData } = useAuth();
  const { portfolio } = usePortfolio();

  const viewType = portfolioValidation({
    portfolio,
    userDB: authData,
  });

  return (
    <section className="max-width">
      <SocialLinksDynamic portfolio={portfolio} viewType={viewType} />
    </section>
  );
}
