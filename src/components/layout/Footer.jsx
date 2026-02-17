import "../../styles/footer.css";
import logo from "../../assets/logo/olivias logo light.svg";

import mailIcon from "../../assets/icons/mail icon.svg";
import phoneIcon from "../../assets/icons/phone icon.svg";
import locationIcon from "../../assets/icons/location icon.svg";
import instagramIcon from "../../assets/images/instagram.svg";

export default function Footer() {
  return (
    <footer className="footerSection" aria-label="Footer">
      <div className="footerWrap">
        <div className="footerGrid">
          <div className="footerBrand">
            <img className="footerLogo" src={logo} alt="Olivia’s Cupcakes" />

            <p className="footerDesc">
              Boutique cupcakes made in small batches, finished by hand, and packed to
              gift beautifully.  Bold flavors.  Zero shortcuts.
            </p>

           
            <a
              className="footerSocial"
              href="https://www.instagram.com/oliviascupcakeboutique/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Olivia’s Cupcakes on Instagram"
            >
              <img
                src={instagramIcon}
                alt=""
                className="footerSocialIcon"
                aria-hidden="true"
              />
            </a>
          </div>

          <nav className="footerLinks" aria-label="Quick links">
            <p className="footerKicker">Quick Links</p>
            <a className="footerLink" href="#about">About</a>
            <a className="footerLink" href="#menu">Our Menu</a>
            <a className="footerLink" href="#catering">Catering</a>
            <a className="footerLink" href="#locations">Locations</a>
            <a className="footerLink" href="#contact">Contact</a>
          </nav>

          <div className="footerContact">
            <p className="footerKicker">Contact</p>

            <div className="footerRow">
              <img src={locationIcon} alt="" className="footerIcon" aria-hidden="true" />
              <div className="footerRowText">
                214 South Congress Avenue<br />
                Austin, TX 78704
              </div>
            </div>

            <a className="footerRow footerRowLink" href="tel:+15125550198">
              <img src={phoneIcon} alt="" className="footerIcon" aria-hidden="true" />
              <div className="footerRowText">(512) 555-0198</div>
            </a>

            <a
              className="footerRow footerRowLink"
              href="mailto:hello@oliviascupcakeboutique.com"
            >
              <img src={mailIcon} alt="" className="footerIcon" aria-hidden="true" />
              <div className="footerRowText">
                hello@oliviascupcakeboutique.com
              </div>
            </a>
          </div>
        </div>

        <div className="footerBottom">
          <span>© {new Date().getFullYear()} Olivia’s Cupcakes</span>
          <span className="footerSep" aria-hidden="true">•</span>
          <span>
            Powered by{" "}
            <a className="footerPoweredLink" href="https://www.zjmstudio.com/">
              ZJM Studio
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
