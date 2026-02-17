import { useEffect, useState } from "react";
import heroImg from "../../assets/images/heroimage2.png";
import "../../styles/hero.css";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section
      id="top"
      className={`hero ${loaded ? "isLoaded" : ""}`}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="heroInner">
        <h1 className="heroTitle">Delicious Cupcakes</h1>
        <p className="heroSubtitle">Baked Fresh Daily</p>
        <a className="heroBtn" href="#menu">
          Order Now
        </a>
      </div>
    </section>
  );
}
