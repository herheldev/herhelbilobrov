"use client"
import LineHorizontalSmall from "../Icon/LineVerticalSmall";
import "./QuateSection.scss";
import { app } from "../../bd/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

function ShowQuote({ data }) {
  const titleArr = data?.split(" ").filter((el) => el != "");
  let countKey = 0;
  const mobArr = [];
  titleArr?.splice(4, 0, <span className="quate__img1"></span>);
  titleArr?.splice(-6, 0, <span className="quate__img2"></span>);

  for (const i of titleArr) {
   
    if (typeof i === "string") {
      if (i.split("").at(-1) === "." || i.split("").at(-2) === ".") {
        mobArr.push(i);
        mobArr.push(<br></br>);
      } else {
        mobArr.push(i + " ");
      }
    } else {
      mobArr.push(i);
    }
    
  }
  countKey = mobArr.length
  const element = mobArr.map((item) => {
    
    return <span key={countKey--}>{item}</span>
  })
  return <>{element}</>;
}
const QuateSection = () => {
  const t = useTranslations('QUATE')
  const {ref, inView} =useInView({threshold: 0.2})
  const {ref:ref1, inView: inView1} =useInView({threshold: 0.2})
  const db = getFirestore(app);
  

  return (
    <section id="quate" className="quate">
      <div className="container container--column">
        <h1 ref={ref} className={`${inView ? "show-animate" : ""}`}> 
          
            <ShowQuote data={t('Quate')} />
          
        </h1>

        <LineHorizontalSmall />
        <p ref={ref1} className={`${inView1 ? "show-animate" : ""}`}>{t('Author')}</p>
      </div>
    </section>
  );
};

export default QuateSection;
