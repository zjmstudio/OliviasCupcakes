import "../../styles/testimonials.css";
import stars from "../../assets/images/5stars.svg";
import quoteGreen from "../../assets/images/quote.svg";
import quoteWhite from "../../assets/images/quote_white.svg";

import review1 from "../../assets/images/review1.png";
import review2 from "../../assets/images/review2_2.png";
import review3 from "../../assets/images/review3_2.png";

export default function Testimonials() {
  const quoteA =
    "Ordered for my kid’s birthday and people would not stop talking about them!";
  const quoteB =
    "The box showed up looking like a boutique gift.  Every flavor tasted like it was baked that morning.";
  const quoteC =
    "They looked ridiculous in photos and somehow tasted even better.  This is the cupcake standard now.";

  return (
    <section id="testimonials" className="testimonialsSection">
      <div className="testimonialsWrap">
        <div className="testimonialsHeading">
          <h3 className="h3 testimonialsTitle">Don’t Take Our Word for It</h3>
          <p className="body testimonialsSub">See what our customers have to say.</p>
        </div>

        <div className="testimonialsGrid">
          <article className="tCard">
            <div className="tQuoteBox">
              <img className="tQuoteIcon" src={quoteGreen} alt="" aria-hidden="true" />
              <p className="tText">{quoteA}</p>
              <img className="tStars" src={stars} alt="Five stars" />
              <div className="tMeta">
                <span className="tName">Jenna R.</span>
                <span className="tDot" aria-hidden="true">
                  •
                </span>
                <span className="tCity">Austin</span>
              </div>
            </div>
          </article>

          <div className="tPhoto" role="img" aria-label="Customer photo">
            <img className="tPhotoImg" src={review1} alt="Customer photo" loading="lazy" />
          </div>

          <article className="tCard">
            <div className="tQuoteBox">
              <img className="tQuoteIcon" src={quoteGreen} alt="" aria-hidden="true" />
              <p className="tText">{quoteB}</p>
              <img className="tStars" src={stars} alt="Five stars" />
              <div className="tMeta">
                <span className="tName">Mark T.</span>
                <span className="tDot" aria-hidden="true">
                  •
                </span>
                <span className="tCity">Dallas</span>
              </div>
            </div>
          </article>

          <div className="tPhoto" role="img" aria-label="Customer photo">
            <img className="tPhotoImg" src={review2} alt="Customer photo" loading="lazy" />
          </div>

          <article className="tCard isInverse">
            <div className="tQuoteBox">
              <img className="tQuoteIcon" src={quoteWhite} alt="" aria-hidden="true" />
              <p className="tText">{quoteC}</p>
              <img className="tStars" src={stars} alt="Five stars" />
              <div className="tMeta">
                <span className="tName">Alexis M.</span>
                <span className="tDot" aria-hidden="true">
                  •
                </span>
                <span className="tCity">San Antonio</span>
              </div>
            </div>
          </article>

          <div className="tPhoto" role="img" aria-label="Customer photo">
            <img className="tPhotoImg" src={review3} alt="Customer photo" loading="lazy" />
          </div>
        </div>
        <div className="testimonialsCtas">
  <a href="#contact" className="btnPrimary">
    Leave a Review
  </a>
</div>
      </div>
    </section>
  );
}
