import Layout from "@/Layout";
import { ScrollToTop } from "@/components/common/ScrollToTop/ScrollToTop";
import { Footer } from "@/components/layout/Footer/Footer";
import { Contact } from "@/components/pages/Contact/Contact";
import { ErrorPage } from "@/components/pages/ErrorPage/ErrorPage";
import { Event } from "@/components/pages/Event/Event";
import { EventForm } from "@/components/pages/EventForm/EventForm";
import { EventUpdate } from "@/components/pages/EventUpdate/EventUpdate";
import { Gallery } from "@/components/pages/Gallery/Gallery";
import { GetStarted } from "@/components/pages/GetStarted/GetStarted";
import { Home } from "@/components/pages/Home/Home";
import { Login } from "@/components/pages/Login/Login";
import { SeasonalMenus } from "@/components/pages/SeasonalMenus/SeasonalMenus";
import { Services } from "@/components/pages/Services/Services";
import { Signup } from "@/components/pages/Signup/Signup";
import { User } from "@/components/pages/User/User";
import { UserUpdate } from "@/components/pages/UserUpdate/UserUpdate";
import { AuthProvider } from "@/hooks/useAuthContext";
import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const App: FC = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <Layout>
        <AnimatePresence>
          <ScrollToTop />
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/update" element={<UserUpdate />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/event/new" element={<EventForm />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/event/:id/update" element={<EventUpdate />} />
            <Route path="/seasonal-menus" element={<SeasonalMenus />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <Footer />
    </AuthProvider>
  );
};

export default App;
