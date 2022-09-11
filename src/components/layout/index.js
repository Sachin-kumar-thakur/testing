import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
