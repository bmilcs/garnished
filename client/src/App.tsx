import Layout from "@/Layout";
import { ScrollToTop } from "@/components/common/ScrollToTop/ScrollToTop";
import { Contact } from "@/components/pages/Contact/Contact";
import { Event } from "@/components/pages/Event/Event";
import { EventForm } from "@/components/pages/EventForm/EventForm";
import { Gallery } from "@/components/pages/Gallery/Gallery";
import { GetStarted } from "@/components/pages/GetStarted/GetStarted";
import { Home } from "@/components/pages/Home/Home";
import { Services } from "@/components/pages/Services/Services";
import { Signup } from "@/components/pages/Signup/Signup";
import { User } from "@/components/pages/User/User";
import { AuthProvider } from "@/hooks/useAuthContext";
import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/pages/Login/Login";

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
            <Route path="/new-event" element={<EventForm />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/event/:id" element={<Event />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
