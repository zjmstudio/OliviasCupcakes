import { useEffect, useState } from "react";
import logo from "../../assets/logo/olivias logo green.svg";
import cartBlack from "../../assets/icons/shopping cart_black.svg";
import cartGreen from "../../assets/icons/shopping cart_green.svg";

const LINKS = [
  { label: "About", href: "#whychooseus", id: "whychooseus" },
  { label: "Our Menu", href: "#menu", id: "menu" },
  { label: "Catering", href: "#catering", id: "catering" },
  { label: "Locations", href: "#", id: null },
  { label: "Contact", href: "#", id: "null" },
];

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ids = LINKS.filter((l) => l.id).map((l) => l.id);

    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = null;

      setIsScrolled(window.scrollY > 4);

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y) current = id;
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    if (id) setActive(id);
    setOpen(false);
  };

  return (
    <header className={`navWrap ${isScrolled ? "isScrolled" : ""}`}>
      <div className="navBar">
        <a
          className="navLogo"
          href="#top"
          aria-label="Olivia’s home"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="Olivia’s" />
        </a>

        <nav className="navLinks" aria-label="Primary navigation">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`navLink ${l.id && active === l.id ? "isActive" : ""}`}
              onClick={() => handleNavClick(l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="cartButton"
          type="button"
          aria-label="View cart"
          onMouseEnter={() => setCartHover(true)}
          onMouseLeave={() => setCartHover(false)}
        >
          <img
            src={cartHover ? cartGreen : cartBlack}
            alt=""
            aria-hidden="true"
          />
        </button>

        <button
          className="hamburger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobilePanel ${open ? "open" : ""}`}>
        <nav className="mobileLinks" aria-label="Mobile navigation">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`mobileLink ${l.id && active === l.id ? "isActive" : ""}`}
              onClick={() => handleNavClick(l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
