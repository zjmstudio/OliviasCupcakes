import "../../styles/catering.css";
import boxImg from "../../assets/images/box.jpg";

export default function Catering() {
  return (
    <section id="catering" className="cateringSection">
      <div className="cateringWrap">
        <div className="cateringGrid">
          <div className="cateringContent">
            <h3 className="h3 cateringTitle">Cupcakes for Every Kind of Party</h3>

            <p className="body cateringText">
              Birthdays, weddings, office parties, baby showers.  You name it.
              We’ll help you pick the right flavors, quantities, and packaging,
              then bake everything fresh for your date.  Need it shipped? We can
              deliver nationwide too.
            </p>

            <div className="cateringActions">
              <a className="btnPrimary" href="#contact">
                Order Catering
              </a>
              
            </div>
          </div>

          <div className="cateringMedia" aria-hidden="true">
            <img className="cateringImg" src={boxImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
