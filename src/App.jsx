import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Intro from "./components/sections/Intro";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import MenuAssemblyLine from "./components/sections/MenuAssemblyLine";
import Catering from "./components/sections/Catering";
import Testimonials from "./components/sections/Testimonials";
import InstagramSection from "./components/sections/InstagramSection";

import Footer from "./components/layout/Footer";


export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Intro />
        <WhyChooseUs />
        <MenuAssemblyLine />
        <Catering />
        <Testimonials />
        <InstagramSection />
       
      </main>

      <Footer />
    </>
  );
}
