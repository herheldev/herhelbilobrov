"use client"
import LineVertical from "../Icon/LineVertical";
import "./ServiceSection.scss";
import Button from "../Button/Button";
import LineHorizontalBlack from "../Icon/LineHorizontalBlack";
import ArrowSvg from "../Icon/ArrowSvg";
import { useEffect, useRef, useState } from "react";
import { app } from "../../bd/firebase";
import { getFirestore, collection, getDocs , doc, getDoc} from "firebase/firestore";
import PrevSvg from "../Icon/PrevSvg";
import { useInView } from "react-intersection-observer";
import {useLocale} from "next-intl";
import {log} from "node:util";
import {valueOf} from "node";
const ServiceSection = () => {

  const db = getFirestore(app);
  const [dataService, setDataService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataCategory, setDataCategory] = useState(null);
  const [detailService, setDetailService] = useState(null);
  const [notMobile, setNotMobile] = useState(true);
  const {ref,inView} = useInView({threshold: 0.2})
  const d = useLocale()
  const [displayMobile, setDisplayMobile] = useState(false)

  const getServiceData = async () => {
    const docRef = doc(db, "products", "services");
    await  getDoc(docRef).then((data) => setDataService(data.data()));

  };
  const getCategoryData = async () => {
    const docRef = doc(db, "products", "category");
    await  getDoc(docRef).then((data) => setDataCategory(data.data()));
  }
  useEffect(() => {
    getServiceData();
    getCategoryData()
  }, []);

  useEffect(() => {
    if(dataService){
      setDetailService(Object.entries(dataService)[0][1][d])
      setSelectedCategory(Object.entries(dataService)[0][1].category);
      setSelectedItem(Object.entries(dataService)[0][1][d].name)
    }
  }, [dataService]);
function showMobile(){
  const width = window.innerWidth;
  if(width < 768){
    setDisplayMobile(true);
  }
}

  function hideMobile(){
    const width = window.innerWidth;
    if(width < 768){
      setDisplayMobile(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      // Перевіряємо ширину вікна і встановлюємо значення true/false
      setNotMobile(window.innerWidth >= 768);
    };

    // Викликаємо функцію під час завантаження компонента, щоб встановити початкове значення
    handleResize();

    // Додаємо слухача подій для зміни стану при зміні розміру вікна
    window.addEventListener("resize", handleResize);

    // Очищуємо слухача подій при демонтажі компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section id="service" className="service">
      <div className="container service__container container--column">
        <div className="service__header">
          <h1 className="section__title">
            {d === "en" && "Our services"}
            {d === "uk" && "Наші послуги"}
            {d === "pl" && "Nasze usługi"}


          </h1>
        </div>
        <div ref={ref} className={`service__content ${inView ? "show-animate": "hide-animate"}`}>
          <div  className="service__list" style={{display: notMobile ? "flex" : (displayMobile ? "none" : "flex")} }>
            {dataCategory &&
              Object.entries(dataCategory).map((item, value) =>

                  <ul key={Math.random() + item[0]} className={"service__item"}>
                    <li>
                      <button
                          className={`service__btn  ${selectedCategory === item[0] ? "service__btn--active" : ""}`}
                          onClick={() => setSelectedCategory(item[0])}
                      >
                        {item[1]?.[`${d}_cat`]}
                        <LineHorizontalBlack />
                      </button>
                    </li>
                    <ul>
                    {dataService && Object.entries(dataService).map((it, val) =>
                    it[1]?.category === item[0] && it[1]?.local === "WARSAWHERHELCLINIC" && <li key={Math.random() + it[0]} ><button className={`service__item___btn ${it[1]?.[`${d}`].name === selectedItem ? "service__item___btn--active":""}`} onClick={()=> {setDetailService(it[1]?.[`${d}`]); setSelectedCategory(item[0]); setSelectedItem(it[1]?.[`${d}`].name); showMobile() } }>{it[1]?.[`${d}`].name} <ArrowSvg width={"32px"} height={"24px"}/></button></li>
                    )}
                    </ul>
                  </ul>
              )}
          </div>
          <div className="service__detail" style={{display: notMobile ? "flex" : (displayMobile ? "flex" : "none")}}>
            <div className="service__detail_content">
              <h2>{detailService && detailService?.name}</h2>
              <p>{detailService && detailService?.descrip}</p>
              <ul className="service__detail_content_services">
                {detailService && Object.entries(detailService.service).map((it, val) =>
                    <li key={Math.random() + it[0]} >
                      <span>{it[0]}</span>
                      <span>{it[1]} ZL</span>
                    </li>
                )}


              </ul>
              <LineVertical stroke="#333333"/>
              <Button
                href="https://booksy.com/uk-pl/229392_herhel-clinic_medycyna-estetyczna_3_warszawa?do=invite#ba_s=dl_1"
                type="sandy-fill"
                target="__blank"
              >
                {d === "pl" && "UMOW WIZYTE"}
                {d === "en" && "VISIT AGREEMENTS"}
                {d === "uk" && "ЗАПИШІТЬСЯ"}

              </Button>
            </div>

            <div className="service__detail_img">
              <img loading="lazy" src={"/img/CLEAN.webp"}/>
            </div>
            <button
              className="service__detail_backBtn"
              onClick={()=>hideMobile()}
            >
              <PrevSvg />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
