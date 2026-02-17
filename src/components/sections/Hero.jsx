import heroImg from "../../assets/images/heroimage2.png";
import "../../styles/hero.css";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero"
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
