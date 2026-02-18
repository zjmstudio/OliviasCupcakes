import { useEffect, useState } from "react";
import heroImg from "../../assets/images/heroimage2.png";
import "../../styles/hero.css";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="top"
      className={`hero ${loaded ? "isLoaded" : ""}`}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="heroInner">
        <h1 className="heroTitle">
          <span className="heroLine1">Delicious Cupcakes</span>
          <span className="heroAccent">Baked Fresh Daily</span>
        </h1>
        <a className="heroBtn" href="#menu">
          Order Now
        </a>
      </div>
    </section>
  );
}
