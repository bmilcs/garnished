import Layout from "@/Layout";
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
import { PageTracker } from "@/components/services/PageTracker/PageTracker";
import { ScrollToTop } from "@/components/services/ScrollToTop/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuthContext";
import { initAnalytics } from "@/utils/analytics";
import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const App: FC = () => {
  const location = useLocation();
  initAnalytics();

  return (
    <AuthProvider>
      <Layout>
        <ScrollToTop />
        <PageTracker />
        <Routes key={location.key} location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seasonal-menus" element={<SeasonalMenus />} />
          <Route path="/user/update" element={<UserUpdate />} />
          <Route path="/user" element={<User />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/event/new" element={<EventForm />} />
          <Route path="/event/:id/update" element={<EventUpdate />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
