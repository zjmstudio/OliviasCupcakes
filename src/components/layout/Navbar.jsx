import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/logo/olivias logo green.svg";
import cartBlack from "../../assets/icons/shopping cart_black.svg";
import cartGreen from "../../assets/icons/shopping cart_green.svg";

const NAV_ITEMS = [
  { label: "Menu", type: "anchor", href: "#menu", id: "menu" },
  { label: "Catering", type: "anchor", href: "#catering", id: "catering" },
  { label: "Locations", type: "anchor", href: "#", id: null },
  { label: "Contact", type: "anchor", href: "#", id: null },
  { label: "Cupcake Workshop", type: "route", to: "/workshop" },
];

export default function Navbar() {
  const location = useLocation();

  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive(null);
      setIsScrolled(false);
      return;
    }

    const ids = NAV_ITEMS.filter((i) => i.type === "anchor" && i.id).map(
      (i) => i.id
    );

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
  }, [location.pathname]);

  const handleAnchorClick = (id) => {
    if (id) setActive(id);
    setOpen(false);
  };

  const handleRouteClick = () => {
    setActive(null);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderLink = (item, mobile = false) => {
    const className = mobile ? "mobileLink" : "navLink";

    if (item.type === "route") {
      return (
        <NavLink
          key={item.label}
          to={item.to}
          className={className}
          onClick={handleRouteClick}
        >
          {item.label}
        </NavLink>
      );
    }

    return (
      <a
        key={item.label}
        href={item.href}
        className={`${className} ${
          item.id && active === item.id ? "isActive" : ""
        }`}
        onClick={() => handleAnchorClick(item.id)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <header className={`navWrap ${isScrolled ? "isScrolled" : ""}`}>
      <div className="navBar">
        {location.pathname === "/" ? (
          <a className="navLogo" href="#top" onClick={() => setOpen(false)}>
            <img src={logo} alt="Olivia’s" />
          </a>
        ) : (
          <NavLink className="navLogo" to="/" onClick={handleRouteClick}>
            <img src={logo} alt="Olivia’s" />
          </NavLink>
        )}

        <nav className="navLinks" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => renderLink(item))}
        </nav>

        <button
          className="cartButton"
          type="button"
          aria-label="View cart"
          onMouseEnter={() => setCartHover(true)}
          onMouseLeave={() => setCartHover(false)}
        >
          <img src={cartHover ? cartGreen : cartBlack} alt="" aria-hidden />
        </button>

        <button
          className="hamburger"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobilePanel ${open ? "open" : ""}`}>
        <div className="mobilePanelInner">
          <nav className="mobileLinks" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => renderLink(item, true))}
          </nav>
        </div>
      </div>
    </header>
  );
}