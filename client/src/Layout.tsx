import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";

type TProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: TProps) => {
  return (
    <>
      <Header />
      <main className="column">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
