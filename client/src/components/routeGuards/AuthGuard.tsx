import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AuthGuard() {
  const { authData } = useAuth();

  console.log(!authData.accessToken);
  return !authData.accessToken ? <Outlet /> : <Navigate to={`/${authData.username}`} />;
}
