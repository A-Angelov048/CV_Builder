import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeCV from "./pages/HomeCV";
import Register from "./pages/guestPages/Register";
import Login from "./pages/guestPages/Login";

import { useScroll } from "./hooks/useScroll";
import { ContextProvider } from "./context/authContext";

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
    <ContextProvider>
      <Header scrollFunc={scrollToSection} />

      <ScrollToTop scrollUp={scrollToUp}>
        <Routes>
          <Route path="/" element={<HomeCV sectionRefs={sectionRefs} />} />
          <Route
            path="/:username"
            element={<HomeCV sectionRefs={sectionRefs} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ScrollToTop>

      <Footer />
    </ContextProvider>
  );
}
