import { Route, Routes } from "react-router-dom";

import { Section } from "./types/generalTypes";
import { useScroll } from "./hooks/useScroll";
import { AuthProvider } from "./context/authContext";
import { PortfolioProvider } from "./context/portfolioContext";
import { ProfileToggleProvider } from "./context/toggleProfileContext";

import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Register from "./pages/guestPages/Register";
import Login from "./pages/guestPages/Login";
import NotFound from "./pages/notFound/NotFound";
import AuthGuard from "./components/routeGuards/AuthGuard";
import HomeCvUser from "./pages/HomeCvUser";
import HomeCv from "./pages/guestPages/HomeCv";
import ForgotPassword from "./pages/guestPages/ForgotPassword";
import ResetPassword from "./pages/guestPages/ResetPassword";

export default function App() {
  const [sectionRefs, scrollToSection, scrollToUp] = useScroll<Section>([
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "contact",
  ]);

  return (
    <AuthProvider>
      <PortfolioProvider>
        <ProfileToggleProvider>
          <Header scrollFunc={scrollToSection} scrollUp={scrollToUp} />
        </ProfileToggleProvider>
        <ScrollToTop scrollUp={scrollToUp}>
          <Routes>
            <Route path="/" element={<HomeCv sectionRefs={sectionRefs} />} />
            <Route path="/:username" element={<HomeCvUser sectionRefs={sectionRefs} />} />
            <Route element={<AuthGuard />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </PortfolioProvider>
    </AuthProvider>
  );
}
