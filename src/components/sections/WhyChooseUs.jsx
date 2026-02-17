import { useEffect, useRef, useState } from "react";
import "../../styles/whyChooseUs.css";
import ingredientsIcon from "../../assets/icons/ingredients.svg";
import pipebagIcon from "../../assets/icons/pipebag.svg";
import sparkleIcon from "../../assets/icons/sparkle.svg";

export default function WhyChooseUs() {
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
      id="whychooseus"
      className={`whySection ${visible ? "isVisible" : ""}`}
    >
      <div className="whyWrap">
        <h3 className="h3 whyRevealTitle">A Step Above the Rest</h3>

        <div className="whyGrid">
          <div className="whyItem whyRevealItem">
            <div className="whyIcon" aria-hidden="true">
              <img src={ingredientsIcon} alt="" />
            </div>
            <h4 className="h4">Premium Ingredients</h4>
            <p className="body">
              Real butter, real vanilla, and zero shortcuts in every batch.
            </p>
          </div>

          <div className="whyItem whyRevealItem">
            <div className="whyIcon" aria-hidden="true">
              <img src={pipebagIcon} alt="" />
            </div>
            <h4 className="h4">Hand Decorated</h4>
            <p className="body">
              Each cupcake is finished by hand for bakery-case perfection.
            </p>
          </div>

          <div className="whyItem whyRevealItem">
            <div className="whyIcon" aria-hidden="true">
              <img src={sparkleIcon} alt="" />
            </div>
            <h4 className="h4">Endless Flavors</h4>
            <p className="body">
              Classics, seasonal drops, and custom builds for any occasion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
