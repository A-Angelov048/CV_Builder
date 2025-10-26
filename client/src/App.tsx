import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeCV from "./pages/HomeCV";
import Register from "./pages/guestPages/Register";

import { useScroll } from "./hooks/useScroll";
import Login from "./pages/guestPages/Login";

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
    <>
      <Header scrollFunc={scrollToSection} />

      <ScrollToTop scrollUp={scrollToUp}>
        <Routes>
          <Route path="/" element={<HomeCV sectionRefs={sectionRefs} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ScrollToTop>

      <Footer />
    </>
  );
}
