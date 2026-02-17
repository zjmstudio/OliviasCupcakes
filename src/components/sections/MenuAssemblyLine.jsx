import { useEffect, useState } from "react";
import "../../styles/menuAssemblyLine.css";

import cupcake1 from "../../assets/images/cupcake1_chocolate.png";
import cupcake2 from "../../assets/images/cupcake2_caramel.png";
import cupcake3 from "../../assets/images/cupcake3_strawberry.png";
import cupcake4 from "../../assets/images/cupcake4_redvelvet.png";
import cupcake5 from "../../assets/images/cupcake5_coconut.png";
import cupcake6 from "../../assets/images/cupcake6_sprinkles.png";
import cupcake7 from "../../assets/images/cupcake7_oreo.png";

const CUPCAKES = [
  { name: "Chocolate Rush", img: cupcake1, desc: "Rich chocolate cake with chocolate frosting, syrup, and a Reese’s." },
  { name: "Caramel", img: cupcake2, desc: "Vanilla cake topped with buttery caramel drizzle." },
  { name: "Strawberry", img: cupcake3, desc: "Light vanilla topped with strawberry frosting and a fresh strawberry." },
  { name: "Red Velvet", img: cupcake4, desc: "Classic red velvet with cream cheese frosting." },
  { name: "Coconut", img: cupcake5, desc: "Chocolate cake finished with toasted coconut." },
  { name: "Sprinkles", img: cupcake6, desc: "Vanilla cupcake topped with classic rainbow sprinkles." },
  { name: "Oreo", img: cupcake7, desc: "Cookies & cream frosting with Oreo crumble." },
];

export default function MenuAssemblyLine() {
  const [index, setIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 560px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const prev = () =>
    setIndex((i) => (i - 1 + CUPCAKES.length) % CUPCAKES.length);
  const next = () =>
    setIndex((i) => (i + 1) % CUPCAKES.length);

  const visible = (isMobile ? [0] : [-2, -1, 0, 1, 2]).map((offset) => {
    const i = (index + offset + CUPCAKES.length) % CUPCAKES.length;
    return { ...CUPCAKES[i], offset };
  });

  return (
    <section id="menu" className="menuSection">
      <div className="menuWrap">
        <h3 className="h3 menuHeading">Our Biggest Hits</h3>

        <div className="menuRail">
          <button
            className="menuArrow"
            onClick={prev}
            aria-label="Previous cupcake"
          >
            <span>‹</span>
          </button>

          <div className="menuTrack">
            {visible.map((cupcake) => {
              let state = "isFar";
              if (cupcake.offset === 0) state = "isCenter";
              else if (Math.abs(cupcake.offset) === 1) state = "isNear";

              return (
                <button
                  key={`${cupcake.name}-${cupcake.offset}`}
                  className={`menuItem ${state}`}
                  onClick={() =>
                    setIndex(
                      CUPCAKES.findIndex((c) => c.name === cupcake.name)
                    )
                  }
                  aria-label={`Select ${cupcake.name}`}
                >
                  <img src={cupcake.img} alt={cupcake.name} />
                </button>
              );
            })}
          </div>

          <button
            className="menuArrow"
            onClick={next}
            aria-label="Next cupcake"
          >
            <span>›</span>
          </button>
        </div>

        <div className="menuMeta">
          <h4 className="h4">{CUPCAKES[index].name}</h4>
          <p className="body">{CUPCAKES[index].desc}</p>
          <button className="menuAdd">Add to cart</button>
        </div>
      </div>
    </section>
  );
}
