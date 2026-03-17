import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeCV from "./pages/HomeCV";
import Register from "./pages/guestPages/Register";
import Login from "./pages/guestPages/Login";
import NotFound from "./components/notFound/NotFound";

import { useScroll } from "./hooks/useScroll";
import { AuthProvider } from "./context/authContext";
import { PortfolioProvider } from "./context/portfolioContext";

type Section =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "contact";

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
      <Header scrollFunc={scrollToSection} />
      <ScrollToTop scrollUp={scrollToUp}>
        <PortfolioProvider>
          <Routes>
            <Route path="/" element={<HomeCV sectionRefs={sectionRefs} />} />
            <Route
              path="/:username"
              element={<HomeCV sectionRefs={sectionRefs} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </PortfolioProvider>
      </ScrollToTop>
      <Footer />
    </AuthProvider>
  );
}
