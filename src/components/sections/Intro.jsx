import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import cupcakeAnim from "../../assets/images/cupcake animation_official.json";
import "../../styles/intro.css";

export default function Intro() {
  const animRef = useRef();
  const sectionRef = useRef();
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          animRef.current?.play();
          setHasPlayed(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <section id="intro" className="introSection" ref={sectionRef}>
      <div className="introWrap">
        <div className="introCard">
          <div className="introMedia" aria-hidden="true">
            <Lottie
              lottieRef={animRef}
              animationData={cupcakeAnim}
              loop={false}
              autoplay={false}
              className="introLottie"
            />
          </div>

          <div className="introContent">
            <p className="introEyebrow">The Cupcake Workshop</p>
            <h3 className="introTitle">Design Your Own Cupcake</h3>

            <p className="introText">
              Craft your masterpiece step by step. Choose a wrapper, pick your
              frosting, add sprinkles, and crown it with the cherry. Perfect for
              gifts, parties, or your personal dessert era.
            </p>

            <div className="introCtas">
              <a className="btnPrimary" href="#menu">
                Build Your Cupcake
              </a>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
