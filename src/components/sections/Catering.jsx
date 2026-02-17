import { useEffect, useRef, useState } from "react";
import "../../styles/catering.css";
import boxImg from "../../assets/images/box.jpg";

export default function Catering() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="catering"
      className={`cateringSection ${visible ? "isVisible" : ""}`}
    >
      <div className="cateringWrap">
        <div className="cateringGrid">
          <div className="cateringContent">
            <h3 className="h3 cateringTitle cateringRevealTitle">
              Cupcakes for Every Kind of Party
            </h3>

            <p className="body cateringText cateringRevealText">
              Birthdays, weddings, office parties, baby showers. You name it.
              We’ll help you pick the right flavors, quantities, and packaging,
              then bake everything fresh for your date. Need it shipped? We can
              deliver nationwide too.
            </p>

            <div className="cateringActions cateringRevealActions">
              <a className="btnPrimary" href="#contact">
                Order Catering
              </a>
            </div>
          </div>

          <div className="cateringMedia" aria-hidden="true">
            <img className="cateringImg" src={boxImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
