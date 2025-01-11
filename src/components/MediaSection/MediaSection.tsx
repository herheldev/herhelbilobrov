"use client"
import { useRef } from "react";
import LineHorizontalBlack from "../Icon/LineHorizontalBlack";
import LineVerticalBlack from "../Icon/LineVerticalBlack";
import LineHorizontalSmall from "../Icon/LineVerticalSmall";
import NextSvg from "../Icon/NextSvg";
import PrevSvg from "../Icon/PrevSvg";
import MediaArticle from "../MediaArticle/MediaArticle";
import "./MediaSection.scss";
import { useInView } from "react-intersection-observer";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "../../bd/firebase";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
const MediaTitle = ({ title }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <h1 ref={ref} className={`section__title ${inView ? "show-animate" : ""}`}>
      {title}
    </h1>
  );
};
const MediaDescrip = ({ descrip }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <p ref={ref} className={`${inView ? "show-animate" : ""}`}>
      {descrip}
    </p>
  );
};
const MediaSection = () => {
  const sliderBrand = useRef()
  const slider = useRef();
  function scrollBrand(action){
    const clientWidth = sliderBrand.current.clientWidth;
    const scrollWidth = sliderBrand.current.scrollWidth;
    const scrollLeft = Math.floor(sliderBrand.current.scrollLeft);
    const maxScroll = scrollWidth - clientWidth;
   

    switch (action) {
      case "PREV":
        if (scrollLeft <= 50) {
          sliderBrand.current.scrollLeft = maxScroll;
        } else {
          sliderBrand.current.scrollLeft = scrollLeft - 295;
        }
        break;
      case "NEXT":
        if (maxScroll - scrollLeft <= 50) {
          sliderBrand.current.scrollLeft = 0;
        } else {
          sliderBrand.current.scrollLeft = scrollLeft + 295;
        }

        break;
    }
  }
  function scrollSlide(action) {
    const clientWidth = slider.current.clientWidth;
    const scrollWidth = slider.current.scrollWidth;
    const scrollLeft = Math.floor(slider.current.scrollLeft);
    const maxScroll = scrollWidth - clientWidth;
   

    switch (action) {
      case "PREV":
        if (scrollLeft <= 50) {
          slider.current.scrollLeft = maxScroll;
        } else {
          slider.current.scrollLeft = scrollLeft - 295;
        }
        break;
      case "NEXT":
        if (maxScroll - scrollLeft <= 50) {
          slider.current.scrollLeft = 0;
        } else {
          slider.current.scrollLeft = scrollLeft + 295;
        }

        break;
    }
  }
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.2 });
  const [dataArr, setArrData] = useState([]);
  const [dataMediaLang, setDataMediaLang] = useState(null);
  const db = getFirestore(app);
  const t = useTranslations("MEDIA");
  const getMedia = async () => {
    const dataMedia = await getDocs(collection(db, "media"));
    const arrMob = [];
    dataMedia.forEach((doc) => {
      const mobObj = doc.data();
      mobObj.id = doc.id;
      arrMob.push(mobObj);
      // setArrData([...dataArr, mobObj])
    });
    setArrData(arrMob);
  };
  const getMediaLang = async () => {
    const docMedia = doc(db, "lang", "media");
    await getDoc(docMedia)
      .then((doc) => setDataMediaLang(doc.data()))
      .catch(() => getMediaLang());
  };
  useEffect(() => {
    getMedia();
    getMediaLang();
  }, []);

  return (
    <section id="media" className="media">
      <div className="media__container container container--column">
        <div className="media__header">
          <div className="media__header_title">
            <MediaTitle
              title={t("H1")}
            />
            <MediaDescrip
              descrip={t("DESCRIPTION")}
            />
          </div>
          <div
            ref={ref1}
            className={`media__header_control ${inView1 ? "show-animate" : ""}`}
          >
            <button onClick={() => scrollSlide("PREV")}>
              <PrevSvg />
            </button>
            <LineHorizontalBlack width="73px" />
            <button onClick={() => scrollSlide("NEXT")}>
              <NextSvg />
            </button>
          </div>
        </div>
        <div className="media__content">
          <div ref={slider} className="media__content_slider">
            {dataArr.map((item) => (
              <MediaArticle
                key={item.id}
                title={item.title}
                urlImg={item.img}
                urlPost={item.url}
                read={t("BTNREAD")}
              />
            ))}
          </div>
          <ul ref={sliderBrand} className="media__content_brand">
            <button onClick={()=>scrollBrand("PREV")} className="media__content_brand_btn media__content_brand_btn_prev"><img src="/img/prev.svg" width={"20px"}/></button>
            <li>
              <img src="/img/marieclaire.svg" width={"100px"} alt="" />
            </li>
            <li>
              <img src="/img/vogue-polska-logo.svg" width={"100px"} alt="" />
            </li>
            <li>
              <img src="/img/talk.webp" width={"100px"} alt="" />
            </li>
            <li>
              <img src="/img/elle.svg" width={"100px"} alt="" />
            </li>
            <li>
              <img src="/img/chance.svg" width={"100px"} alt="" />
            </li>
            
            <button onClick={()=>scrollBrand("NEXT")} className="media__content_brand_btn media__content_brand_btn_next"><img src="/img/next.svg" width={"20px"}/> </button>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
