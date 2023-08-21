import Layout from "@/Layout";
import { ScrollToTop } from "@/components/common/ScrollToTop/ScrollToTop";
import { Contact } from "@/components/pages/Contact/Contact";
import { Event } from "@/components/pages/Event/Event";
import { EventForm } from "@/components/pages/EventForm/EventForm";
import { Gallery } from "@/components/pages/Gallery/Gallery";
import { GetStarted } from "@/components/pages/GetStarted/GetStarted";
import { Home } from "@/components/pages/Home/Home";
import { Login } from "@/components/pages/Login/Login";
import { Services } from "@/components/pages/Services/Services";
import { Signup } from "@/components/pages/Signup/Signup";
import { User } from "@/components/pages/User/User";
import { UserUpdate } from "@/components/pages/UserUpdate/UserUpdate";
import { AuthProvider } from "@/hooks/useAuthContext";
import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const App: FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
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
          </Routes>
        </Layout>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
