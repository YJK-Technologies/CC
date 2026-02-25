
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Customers from "@/components/Customers";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FloatingContactBar from "@/components/FloatingContactBar";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Hero />
        <About />
        <Services />
        <Customers />
        <Projects />
        <Footer />
      </div>
      {/* MUST BE HERE */}
  <FloatingContactBar />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
