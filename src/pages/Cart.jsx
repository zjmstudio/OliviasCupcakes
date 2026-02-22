import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

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

function MiniCupcake({ config }) {
  if (!config) return null;

  const base = getImg("base", config.base);
  const frosting = getImg("frosting", config.frosting);
  const topping1 = getImg("topping1", config.topping1);
  const topping2 = getImg("topping2", config.topping2);

  return (
    <div className="miniCupcake" aria-hidden="true">
      {base && <img className="miniLayer" src={base} alt="" draggable={false} />}
      {frosting && <img className="miniLayer" src={frosting} alt="" draggable={false} />}
      {topping1 && <img className="miniLayer" src={topping1} alt="" draggable={false} />}
      {topping2 && <img className="miniLayer" src={topping2} alt="" draggable={false} />}
    </div>
  );
}

function formatMoney(n) {
  const v = Number(n || 0);
  return v.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function configLabel(config) {
  if (!config) return "";
  const pretty = (s) => (s || "").replaceAll("_", " ");
  const t1 = config.topping1 && config.topping1 !== "none" ? pretty(config.topping1) : "none";
  const t2 = config.topping2 && config.topping2 !== "none" ? pretty(config.topping2) : "none";
  return `Base: ${pretty(config.base)}  •  Frosting: ${pretty(config.frosting)}  •  Topping: ${t1}  •  Garnish: ${t2}`;
}

export default function Cart() {
  const { items, subtotal, increment, decrement, updateQty, removeFromCart, clearCart } = useCart();

  const totalItems = useMemo(
    () => items.reduce((sum, x) => sum + (Number(x.qty) || 0), 0),
    [items]
  );

  return (
    <main className="cartPage">
      <div className="cartInner">
        <header className="cartHeader">
          <h1>Your Cart</h1>
          <div className="cartMeta">
            <span>{totalItems} item{totalItems === 1 ? "" : "s"}</span>
            {items.length > 0 && (
              <button className="linkBtn" type="button" onClick={clearCart}>
                Clear cart
              </button>
            )}
          </div>
        </header>

        {items.length === 0 ? (
          <div className="cartEmpty">
            <p>Your cart is empty.</p>
            <p>Add a custom cupcake from the Workshop or a Biggest Hit from the menu.</p>
          </div>
        ) : (
          <div className="cartGrid">
            <section className="cartList" aria-label="Cart items">
              {items.map((item) => {
                const lineTotal = (Number(item.price) || 0) * (Number(item.qty) || 0);

                return (
                  <article key={item.id} className="cartItem">
                    <div className="cartThumb">
                      {item.type === "custom" ? (
                        <MiniCupcake config={item.config} />
                      ) : (
                        <div className="presetThumb" />
                      )}
                    </div>

                    <div className="cartInfo">
                      <div className="cartTitleRow">
                        <div className="cartTitle">{item.name || "Cupcake"}</div>
                        <div className="cartPrice">{formatMoney(lineTotal)}</div>
                      </div>

                      {item.type === "custom" && item.config && (
                        <div className="cartDesc">{configLabel(item.config)}</div>
                      )}

                      <div className="cartActions">
                        <div className="qty">
                          <button type="button" className="qtyBtn" onClick={() => decrement(item.id)} aria-label="Decrease quantity">
                            −
                          </button>

                          <input
                            className="qtyInput"
                            inputMode="numeric"
                            value={item.qty}
                            onChange={(e) => updateQty(item.id, e.target.value)}
                            aria-label="Quantity"
                          />

                          <button type="button" className="qtyBtn" onClick={() => increment(item.id)} aria-label="Increase quantity">
                            +
                          </button>
                        </div>

                        <button type="button" className="linkBtn" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="cartSummary" aria-label="Order summary">
              <div className="summaryCard">
                <h2>Summary</h2>
                <div className="summaryRow">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <button className="checkoutBtn" type="button">
                  Checkout
                </button>
                
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}