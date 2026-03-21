import type { AuthData } from "../context/authContext";
import type { Portfolio } from "../context/portfolioContext";

export default function portfolioValidation({
  portfolio,
  userDB,
}: {
  portfolio: Portfolio;
  userDB: AuthData;
}) {
  const isUser = userDB.username !== "" && userDB.userId !== "" && userDB.accessToken !== "";
  const isOwner = isUser && userDB.userId === portfolio.owner;
  const canView = portfolio.isPublished;

  return { isOwner, canView };
}
