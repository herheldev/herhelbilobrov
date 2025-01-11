"use client"
import { Link } from "@/i18n/routing";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import "./Footer.scss";
import CallSvg from "../Icon/CallSvg";
import EmailSvg from "../Icon/EmailSvg";
import HomeSvg from "../Icon/HomeSvg";
import { app } from "../../bd/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import InstagramSvg from "../Icon/InstgramSvg";
import { useTranslations } from "next-intl";
const Footer = () => {
 const t = useTranslations("HEADER")
 const tf = useTranslations("FOOTER")
  const db = getFirestore(app);
  const [dataFooter, setFooterData] = useState(null);
  const getDataFooter = async () => {
    const docFooter = doc(db, "lang", "footer");
    await getDoc(docFooter)
      .then((doc) => setFooterData(doc.data()))
      .catch(() => console.log("Помилка завантаження"));
  };
  useEffect(() => {
    getDataFooter();
  }, []);
  return (
    <footer className="footer">
      <div className="container container--column">
        <div className="footer__header">
          <Logo type="ACHOR" />
          <Button target="__blank"type="white-fill" href="https://booksy.com/uk-pl/229392_herhel-clinic_medycyna-estetyczna_3_warszawa?do=invite#ba_s=dl_1">
            {t("BtnVisit")}
            
          </Button>
        </div>
        <div className="footer__menu">
          <ul>
            <li>
              <h2>
                {tf("Contact.H1")}
               
              </h2>
            </li>
            <li>
              <span>
                <CallSvg />
              </span>
              <a
                href={`tel:+48${
                  tf("Contact.Phone")
                }`}
              >
                {tf("Contact.Phone")}
              </a>
            </li>
            <li>
              <span>
                <EmailSvg />
              </span>
              <a
                href={`mailto:${tf("Contact.Email")}`}
              >
                {tf("Contact.Email")}
              </a>
            </li>
            <li>
              <span>
                <HomeSvg />
              </span>
              <a
                href="https://maps.app.goo.gl/SUBTG7s4QVLZySGM7"
                target="__blank"
              >
                {tf("Contact.Addres")}
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <h2>
                {tf("Time.H1")}
               
              </h2>
            </li>
            <li>
              <span>{tf("Time.EveryDay")} :</span>
              {tf("Time.Days1")}
            </li>
            <li>
              <span>{tf("Time.Sunday")} :</span>{tf("Time.Days2")}
            </li>
          </ul>
          <ul>
            <li>
              <h2>
                {tf("Map.H1")}
                
              </h2>
            </li>
            <li>
              <a href="#service">
                {tf("Map.Service")}
               
              </a>
            </li>
            <li>
              <a href="#service">
                {tf("Map.Price")}
               
              </a>
            </li>
            <li>
              <a href="#about">
                {tf("Map.About")}
           
              </a>
            </li>
            <li>
              <a href="#media">
                {tf("Map.Media")}
                
              </a>
            </li>
            <li>
              <a href="#contact">
                {tf("Map.Contact")}
                
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__copyright">
          <ul>
            <li>
              <a href="https://www.andriitopii.com/" target="__blank">
                Powered by Andrii Topii
              </a>
            </li>
            <li>
              <Link href="/police">POLITYKA PRYWATNOSTI</Link>
            </li>
            <li>
              <a href="#">TERMS & CONDITIONS</a>
            </li>
          </ul>

          <p>ALL RIGHTS RECEIVE HERHEL GROUP 2024</p>

          <ul>
            <li>
              <a href="https://www.instagram.com/herhel.clinic" target="__blank"><InstagramSvg/></a>
            </li>
            
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
