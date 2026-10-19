
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,Navigate
} from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminInbox from "./pages/admin/AdminInbox";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      {/*<Skills />
      <Projects />
      <Research />
      <Contact /> */}
    </>
  );
}


function AppLayout() {
  const { pathname } = useLocation();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin routes without the public Navbar and Footer */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/inbox" replace />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/inbox" element={<AdminInbox />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
