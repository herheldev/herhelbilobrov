"use client";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import LineVertical from "../Icon/LineVertical";
import MouseSvg from "../Icon/MouseSvg";
import "./Header.scss";
import LineHorizontal from "../Icon/LineHorizontal";
import { useInView } from "react-intersection-observer";
import Nav from "../Nav/Nav";
import { useLocale, useTranslations } from "next-intl";

import Logo from "../Logo/Logo";
import { app } from "../../bd/firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import InstagramSvg from "../Icon/InstgramSvg";
import { Link } from "@/i18n/routing";

const Header = () => {
  const db = getFirestore(app);
  const [lineDecor, setLineDecor] = useState(true);
  const [imgOrVideo, setImageOrVideo] = useState("");
  const [headerDataSource, setHeaderDataSource] = useState("");
  const { ref, inView } = useInView({ threshold: 0.1 });
  const locale = useLocale();
  const t = useTranslations("HEADER");

  async function getMedia(loc: string) {
    const headerData = await getDoc(doc(db, "translation", loc));
    const mediaURL = headerData.data()?.HEADER.Media;
    const mediaRef = headerData
      .data()
      ?.HEADER.Media.split("?")[0]
      .split(".")
      .at(-1);
    if (mediaRef === "png" || mediaRef === "jpeg" || mediaRef === "jpg") {
      setImageOrVideo("IMG");
    } else if (mediaRef === "mp4" || mediaRef === "avi" || mediaRef === "jpg") {
      setImageOrVideo("VIDEO");
    }
    setHeaderDataSource(mediaURL);
  }

  useEffect(() => {
    getMedia(locale);
  }, []);

 

  return (
    <header ref={ref} id="header" className="header">
      <div className={`header__media`}>
        {imgOrVideo === "IMG" && <img className="header__media_img" src={headerDataSource} />}
        {imgOrVideo === "VIDEO" && (
          <video className="header__media_video" playsInline loop autoPlay muted src={headerDataSource}></video>
        )}
      </div>
      <Nav />

      <div className="header__container container container--row ">
        <div className="header__social">
          <ul>
            <li>
              <a
                href="https://www.instagram.com/herhel.clinic"
                target="__blank"
                title="Instagram"
              >
                <InstagramSvg />
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <MouseSvg />
            </li>
            <li> <LineVertical /></li>
          </ul>
        </div>

        <div className="header__content">
          <h3>{t("H3")}</h3>
          <h1>{t("H1")}</h1>
          <p>{t("P")}</p>

          <div className="header__content_btn-container">
            <Button
              href="https://booksy.com/uk-pl/229392_herhel-clinic_medycyna-estetyczna_3_warszawa?do=invite#ba_s=dl_1"
              type="white-fill"
              target="__blank"
              title={t("BtnVisit")}
            >
              {t("BtnVisit")}
            </Button>
            <Button
              title={t("BtnKnow")}
              href="#service"
              type="white-trans-stroke"
            >
              {t("BtnKnow")}
            </Button>
          </div>
          <a
            className="header__content_adress"
            href="https://maps.app.goo.gl/SUBTG7s4QVLZySGM7"
            target="__blank"
            title="Addres"
          >
            {t("Street")}
          </a>
        </div>
      </div>

      <div>{"WITAMY"}</div>
    </header>
  );
};

export default Header;
