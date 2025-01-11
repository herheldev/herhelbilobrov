"use client"
import { useInView } from "react-intersection-observer";
import AllInclusiceSvg from "../Icon/AllInclusiceSvg";
import ChairSvg from "../Icon/ChairSvg";
import HealthSvg from "../Icon/HealthSvg";
import LineHorizontalBlack from "../Icon/LineHorizontalBlack";
import SchoolSvg from "../Icon/SchoolSvg";
import "./AboutSection.scss";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../bd/firebase";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { url } from "inspector";
const HeaderTitle = ({ title }:{title:string}) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <h1 ref={ref} className={`${inView ? "show-animate" : "hide-animate"}`}>
      {title}
    </h1>
  );
};
const HeaderDescrip = ({ descrip }:{descrip:string}) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <p ref={ref} className={`${inView ? "show-animate" : "hide-animate"}`}>
      {descrip}
    </p>
  );
};

const AboutArticle = ({ icon, h2, p, defaultClass, background }: {icon: string, h2: string, p: string, defaultClass:string, background?:string}) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.2 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.2 });
  
  return (
    <div
      ref={ref}
      className={`${defaultClass} ${inView ? "show-animate" : "hide-animate"} ${background && "about__img-black"}` }
      style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}
    >
      <img width="64px" height="64px" src={icon} alt="" />
      <h2
        ref={ref1}
        className={` ${inView1 ? "show-animate" : "hide-animate"} `}
      >
        {h2}
      </h2>
      <p
        ref={ref2}
        className={` ${inView2 ? "show-animate" : "hide-animate"} `}
      >
        {p}
      </p>
    </div>
  );
};
const AboutSection = () => {
  const t = useTranslations("ABOUT")
  const db = getFirestore(app);
  const [dataAbout, setDataAbout] = useState<any>(null);
  const getDataAbout = async () => {
    const docAbout = doc(db, "lang", "about");
    await getDoc(docAbout).then((doc)=>setDataAbout(doc.data())).catch((err)=>console.log(err))
  };
  useEffect(() => {
    getDataAbout()
  }, []);
  

  return (
    <section id="about" className="about">
      <div className="container about__container">
        <div className="about__header">
          <div>
            <HeaderTitle title={t('H1')} />
            <HeaderDescrip
              descrip={t('P')}
            />
          </div>
          <div>
            <LineHorizontalBlack />
          </div>
        </div>
        <div className="about__content">
          <AboutArticle
            icon={t("Box1.Pic")}
            defaultClass="about__content_item"
            p={t("Box1.Desc")}
            h2={t("Box1.Title")}
            background={t("Box1.Img")}
          />
          <AboutArticle
            icon={t("Box2.Pic")}
            defaultClass="about__content_item "
            p={t("Box2.Desc")}
            h2={t("Box2.Title")}
            background={t("Box2.Img")}
          />
          <AboutArticle
            icon={t("Box3.Pic")}
            defaultClass="about__content_item "
            p={t("Box3.Desc")}
            h2={t("Box3.Title")}
            background={t("Box3.Img")}
          />
          <AboutArticle
            icon={t("Box4.Pic")}
            defaultClass="about__content_item"
            p={t("Box4.Desc")}
            h2={t("Box4.Title")}
            background={t("Box4.Img")}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
