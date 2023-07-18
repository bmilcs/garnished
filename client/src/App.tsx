import Layout from "@/Layout";
import { Contact } from "@/components/pages/Contact/Contact";
import { Gallery } from "@/components/pages/Gallery/Gallery";
import { Home } from "@/components/pages/Home/Home";
import { Services } from "@/components/pages/Services/Services";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
