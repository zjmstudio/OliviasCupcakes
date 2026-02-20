import Hero from "../components/sections/Hero";
import Intro from "../components/sections/Intro";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import MenuAssemblyLine from "../components/sections/MenuAssemblyLine";
import Catering from "../components/sections/Catering";
import Testimonials from "../components/sections/Testimonials";
import InstagramSection from "../components/sections/InstagramSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <WhyChooseUs />
      <MenuAssemblyLine />
      <Catering />
      <Testimonials />
      <InstagramSection />
    </main>
  );
}
