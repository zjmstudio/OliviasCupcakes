// src/pages/Workshop.jsx
import { useEffect, useMemo, useState } from "react";
import "../styles/workshop.css";
import { useCart } from "../context/CartContext";

const workshopImages = import.meta.glob(
  "../assets/images/workshop/**/*.{png,webp,jpg,jpeg}",
  { eager: true, import: "default" }
);

function getImg(category, key, preferredExt = "png") {
  if (!key || key === "none") return null;

  const exts = preferredExt
    ? [preferredExt, "webp", "jpg", "jpeg"]
    : ["png", "webp", "jpg", "jpeg"];

  for (const ext of exts) {
    const path = `../assets/images/workshop/${category}/${key}.${ext}`;
    if (workshopImages[path]) return workshopImages[path];
  }
  return null;
}

const OPTIONS = {
  base: ["vanilla", "chocolate", "lemon", "red_velvet"],
  frosting: ["cookies_cream", "chocolate", "vanilla", "strawberry", "cream_cheese"],
  topping1: [
    "none",
    "sprinkles",
    "mms",
    "chocolate_drizzle",
    "caramel_drizzle",
    "reeses_pieces",
    "coconut_shavings",
  ],
  topping2: ["none", "cherry", "mini_reeses_cup", "oreo_cookie", "strawberry"],
};

const LABELS = {
  base: "Base",
  frosting: "Frosting",
  topping1: "Topping",
  topping2: "Garnish",
};

const TITLES = {
  none: "None",

  vanilla: "Vanilla",
  chocolate: "Chocolate",
  lemon: "Lemon",
  red_velvet: "Red Velvet",

  cookies_cream: "Cookies & Cream",
  strawberry: "Strawberry",
  cream_cheese: "Cream Cheese",

  sprinkles: "Sprinkles",
  mms: "M&M’s",
  chocolate_drizzle: "Chocolate Drizzle",
  caramel_drizzle: "Caramel Drizzle",
  reeses_pieces: "Reese’s Pieces",
  coconut_shavings: "Coconut Shavings",

  cherry: "Cherry",
  mini_reeses_cup: "Mini Reese’s Cup",
  oreo_cookie: "Oreo Cookie",
};

function cycle(list, current, dir) {
  const idx = list.indexOf(current);
  if (idx === -1) return list[0];
  const next =
    dir === "next"
      ? (idx + 1) % list.length
      : (idx - 1 + list.length) % list.length;
  return list[next];
}

function ControlRow({ label, valueTitle, onPrev, onNext }) {
  return (
    <div className="row">
      <div className="rowLabel">{label}</div>

      <div className="rowControl">
        <button
          className="arrowBtn"
          type="button"
          onClick={onPrev}
          aria-label={`${label} previous`}
        >
          ‹
        </button>

        <div className="rowValue" aria-live="polite">
          {valueTitle}
        </div>

        <button
          className="arrowBtn"
          type="button"
          onClick={onNext}
          aria-label={`${label} next`}
        >
          ›
        </button>
      </div>
    </div>
  );
}

function PreviewLayer({ src, alt, zIndex, missingLabel, allowMissing = false }) {
  if (!src) {
    if (allowMissing) return null;
    return (
      <div className="layer layerMissing" style={{ zIndex }}>
        <div className="layerMissingInner">{missingLabel}</div>
      </div>
    );
  }
  return (
    <img
      className="layer"
      style={{ zIndex }}
      src={src}
      alt={alt}
      draggable={false}
    />
  );
}

export default function Workshop() {
  const { addToCart } = useCart();

  const [cupcake, setCupcake] = useState(() => ({
    base: OPTIONS.base[0],
    frosting: "vanilla",
    topping1: "none",
    topping2: "none",
  }));

  const expected = useMemo(() => {
    return {
      base: { category: "base", key: cupcake.base },
      frosting: { category: "frosting", key: cupcake.frosting },
      topping1: { category: "topping1", key: cupcake.topping1 },
      topping2: { category: "topping2", key: cupcake.topping2 },
    };
  }, [cupcake]);

  const images = useMemo(() => {
    return {
      base: getImg(expected.base.category, expected.base.key),
      frosting: getImg(expected.frosting.category, expected.frosting.key),
      topping1: getImg(expected.topping1.category, expected.topping1.key),
      topping2: getImg(expected.topping2.category, expected.topping2.key),
    };
  }, [expected]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const missing = [];
    for (const [slot, { category, key }] of Object.entries(expected)) {
      if (key === "none") continue;
      if (!images[slot]) {
        missing.push({
          slot,
          expectedPath: `src/assets/images/workshop/${category}/${key}.png`,
        });
      }
    }

    if (missing.length) {
      console.groupCollapsed(
        `%cWorkshop missing ${missing.length} image(s)`,
        "color:#b45309;font-weight:700;"
      );
      console.table(missing);
      console.groupEnd();
    }
  }, [expected, images]);

  function setCategory(category, dir) {
    const list = OPTIONS[category];
    setCupcake((prev) => ({
      ...prev,
      [category]: cycle(list, prev[category], dir),
    }));
  }

  const titleFor = (key) => TITLES[key] || key;

  function handleAddToCart() {
    addToCart({
      type: "custom",
      name: "Custom Cupcake",
      config: cupcake,
      qty: 1,
      price: 4.95,
    });
  }

  return (
    <main className="workshop">
      <div className="workshopInner">
        <header className="header">
          <h1>Build Your Cupcake</h1>
        </header>

        <section className="builder">
          <aside className="controls" aria-label="Cupcake customization controls">
            <ControlRow
              label={LABELS.topping2}
              valueTitle={titleFor(cupcake.topping2)}
              onPrev={() => setCategory("topping2", "prev")}
              onNext={() => setCategory("topping2", "next")}
            />
            <ControlRow
              label={LABELS.topping1}
              valueTitle={titleFor(cupcake.topping1)}
              onPrev={() => setCategory("topping1", "prev")}
              onNext={() => setCategory("topping1", "next")}
            />
            <ControlRow
              label={LABELS.frosting}
              valueTitle={titleFor(cupcake.frosting)}
              onPrev={() => setCategory("frosting", "prev")}
              onNext={() => setCategory("frosting", "next")}
            />
            <ControlRow
              label={LABELS.base}
              valueTitle={titleFor(cupcake.base)}
              onPrev={() => setCategory("base", "prev")}
              onNext={() => setCategory("base", "next")}
            />
          </aside>

          <section className="stage" aria-label="Cupcake preview">
            <div className="stageFrame">
              <div className="stageBg" />
              <div className="cupcakeStack" role="img" aria-label="Your customized cupcake">
                <PreviewLayer
                  src={images.base}
                  alt=""
                  zIndex={10}
                  missingLabel={`Missing: base/${expected.base.key}.png`}
                />
                <PreviewLayer
                  src={images.frosting}
                  alt=""
                  zIndex={20}
                  missingLabel={`Missing: frosting/${expected.frosting.key}.png`}
                />
                <PreviewLayer
                  src={images.topping1}
                  alt=""
                  zIndex={30}
                  missingLabel={`Missing: topping1/${expected.topping1.key}.png`}
                  allowMissing={expected.topping1.key === "none"}
                />
                <PreviewLayer
                  src={images.topping2}
                  alt=""
                  zIndex={40}
                  missingLabel={`Missing: topping2/${expected.topping2.key}.png`}
                  allowMissing={expected.topping2.key === "none"}
                />
              </div>
            </div>

            <button className="addToCart" type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </section>
        </section>
      </div>
    </main>
  );
}