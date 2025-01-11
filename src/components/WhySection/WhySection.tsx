"use client"
import { useInView } from "react-intersection-observer";
import LineVertical from "../Icon/LineVertical";
import LineVerticalBlack from "../Icon/LineVerticalBlack";
import "./WhySection.scss";
import WhyGridImage from "./WhyGridImage";
import { app } from "../../bd/firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const WhyTitle = ({ title }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <h1 ref={ref} className={`${inView ? "show-animate" : ""}`}>
      {title}
    </h1>
  );
};
const WhyDescrip = ({ descrip }: {descrip: string}) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <p ref={ref} className={`${inView ? "show-animate" : ""}`}>
      {descrip}
    </p>
  );
};
const WhySection = () => {
  const [dataWhyMe, setDataWhyMe] = useState<any>(null);
  
  const t = useTranslations('WHY')
 
  
  return (
    <section id="why" className="why">
      <div className="container why__container container--column">
        <div className="why__article">
          <div className="why__article_text">
            <LineVerticalBlack />
            <WhyTitle title={t("Box1.Title")} />
            <WhyDescrip
              descrip={t("Box1.Descrip")}
            />

            <LineVerticalBlack />
          </div>
          <div className="why__article_media">
            <div className="why__atmosfera-grid">
              <WhyGridImage img={t("Box1.Img.0")} alt={ t("Box1.Title") } className="why__grid-image atm-grid-1" />
              <WhyGridImage img={t("Box1.Img.1")} alt={t("Box1.Title") } className="why__grid-image atm-grid-2" />
              <WhyGridImage img={t("Box1.Img.2")} alt={t("Box1.Title")} className="why__grid-image atm-grid-3" />
              <WhyGridImage img={t("Box1.Img.3")} alt={t("Box1.Title") } className="why__grid-image atm-grid-4" />
              <WhyGridImage img={t("Box1.Img.4")} alt={t("Box1.Title")} className="why__grid-image atm-grid-5" />
              <WhyGridImage img={t("Box1.Img.5")} alt={t("Box1.Title") } className="why__grid-image atm-grid-6" />
            </div>
          </div>
        </div>
        <div className="why__article">
          <div className="why__article_media">
            <div className="why__tool-grid">
              <WhyGridImage
                img={t("Box2.Img.0")}
                alt={"MODERN EQUIPMENT" }
                className="why__grid-image tool-grid-1"
              />
              <WhyGridImage
                img={t("Box2.Img.1")}
                alt={"MODERN EQUIPMENT" }
                className="why__grid-image tool-grid-2"
              />
              <WhyGridImage
                img={t("Box2.Img.2")}
                alt={"MODERN EQUIPMENT" }
                className="why__grid-image tool-grid-3"
              />
              <WhyGridImage
                img={t("Box2.Img.3")}
                alt={"MODERN EQUIPMENT" }
                className="why__grid-image tool-grid-4"
              />
              <WhyGridImage
                img={t("Box2.Img.4")}
                alt={"MODERN EQUIPMENT" }
                className="why__grid-image tool-grid-5"
              />
            </div>
          </div>
          <div className="why__article_text why__article_text-end">
            <LineVerticalBlack />
            <WhyTitle title={t("Box2.Title")} />
            <WhyDescrip
              descrip={t("Box2.Descrip")}
            />
            <LineVerticalBlack />
          </div>
        </div>
        <div className="why__article">
          <div className="why__article_text">
            <LineVerticalBlack />
            <WhyTitle title={t("Box3.Title")} />
            <WhyDescrip
              descrip={t("Box3.Descrip")}
            />
            <LineVerticalBlack />
          </div>
          <div className="why__article_media">
            <div className="why__medic-grid">
              <WhyGridImage img={t("Box3.Img.0")} alt={"EXPERT DOCTORS" } className="why__grid-image med-grid-1" />
              <WhyGridImage img={t("Box3.Img.1")}  alt={"EXPERT DOCTORS" } className="why__grid-image med-grid-2" />
              <WhyGridImage img={t("Box3.Img.2")}  alt={"EXPERT DOCTORS" } className="why__grid-image med-grid-3" />
              <WhyGridImage img={t("Box3.Img.3")}  alt={"EXPERT DOCTORS" } className="why__grid-image med-grid-4" />
            </div>
          </div>
          
        </div>
        
        
      </div>
    </section>
  );
};

export default WhySection;
