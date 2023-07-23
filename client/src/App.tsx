import Layout from "@/Layout";
import { Contact } from "@/components/pages/Contact/Contact";
import { Gallery } from "@/components/pages/Gallery/Gallery";
import { Home } from "@/components/pages/Home/Home";
import { RequestQuote } from "@/components/pages/RequestQuote/RequestQuote";
import { Services } from "@/components/pages/Services/Services";
import { Signup } from "@/components/pages/Signup/Signup";
import { User } from "@/components/pages/User/User";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/quote" element={<RequestQuote />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
