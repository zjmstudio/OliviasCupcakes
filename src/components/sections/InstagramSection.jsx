import "../../styles/instagramSection.css";
import instagramLogo from "../../assets/images/instagram.svg";
import vid from "../../assets/images/cupcakevid.webm";

export default function InstagramSection() {
  return (
    <section className="igSection" aria-label="Instagram">
      <div className="igWrap">
        <div className="igCard">
          <div className="igVideoShell" aria-hidden="true">
            <video
              className="igVideo"
              src={vid}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <img
            src={instagramLogo}
            alt="Instagram"
            className="igIcon"
          />

          <h3 className="h3 igTitle">Follow Us on Instagram</h3>

          <p className="body igText">
            Fresh drops, behind-the-scenes, and daily cupcake chaos.
            <br />
            <a
              href="https://instagram.com/oliviascupcakeboutique"
              target="_blank"
              rel="noopener noreferrer"
              className="igHandle"
            >
              @oliviascupcakeboutique →
            </a>
          </p>

         
        </div>
      </div>
    </section>
  );
}
