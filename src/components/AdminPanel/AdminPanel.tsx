import { signOut, getAuth } from "firebase/auth";
import "./AdminPanel.scss";
// import Link from "next/link";
import {Link} from "@/i18n/routing"
import LogoBlackSvg from "../Icon/LogoBlackSvg";
import Logo from "../Logo/Logo";
import LogoWhiteSvg from "../Icon/LogoWhiteSvg";
import SeoIcon from "../Icon/SeoIcon";
import SettingsSvg from "../Icon/SettingsSvg";
import NewsPaperSvg from "../Icon/NewsPaperSvg";
import MedicalSvg from "../Icon/MedicalSvg";
import MailSvg from "../Icon/MailSvg";
import LogoutSvg from "../Icon/LogoutSvg";
import DragMenuSvg from "../Icon/DragMenuSvg";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import AddBoxIcon from "../Icon/AddBox";
import ServiceIcon from "../Icon/ServiceIcon";

const AdminPanel = ({ children } :any) => {
  const rt = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const auth = getAuth();
  const showMobileMenuFn = () => {};
  const signOutAdmin = () => {
    
    signOut(auth);
    rt.push(`/admin`)
  };

  return (
    
    <section className="admin-panel">
      
      <div
        className="admin-panel__mobile-menu"
        style={{ left: showMobileMenu && 0 }}
      >
        <ul>
          <li>
          <Link
              onClick={() => setShowMobileMenu(false)}
              
              href="translation"
              
            >
              <SettingsSvg />
              <h3>Переклади</h3>
              </Link>
          </li>
          <li>
            <Link
              onClick={() => setShowMobileMenu(false)}
              
              href="media"
            >
              <NewsPaperSvg />
              <h3>Згадки в медіа</h3>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setShowMobileMenu(false)}
              
              href="services-price"
            >
              <MedicalSvg />
              <h3>Прайс&Послуги</h3>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setShowMobileMenu(false)}
              title="Повідомлення"
             
              href="message"
            >
              <MailSvg />
              <h3>Повідомлення</h3>
            </Link>
          </li>
          <li>
            <a
              type="button"
              title="Вийти"
              onClick={() => {
                setShowMobileMenu(false);
                signOutAdmin();
              }}
            >
              <LogoutSvg />
              <h3>Вийти</h3>
            </a>
          </li>
        </ul>
      </div>
      <div className="admin-panel__nav">
        
          <Link onClick={() => setShowMobileMenu(false)} className="admin-panel__nav_logo" href={"."}>
            <LogoWhiteSvg />
          </Link>
          <ul className="admin-panel__nav_menu">
          
            
            <li>
              <Link  href="/admin/media">
                <NewsPaperSvg />
              </Link>
            </li>
            <li>
              <Link  href="/admin/services-price">
              <AddBoxIcon/>
                <p>Послуги (OLD)</p>
              </Link>
            </li>
            <li>
              <Link  href="/admin/services">
              <ServiceIcon/>
                <p>Послуги (NEW BETA)</p>
              </Link>
            </li>
            <li>
              <Link title="Повідомлення"  href="/admin/message">
                <MailSvg />
                <p>Повідомлення</p>
              </Link>
            </li>
            <li>
              <Link title="SEO"  href="/admin/seo">
                <SeoIcon />
                <p>SEO</p>
              </Link>
            </li>
            <li>
              <Link  href={"/admin/translation"} >
                <SettingsSvg />
                <p>Налаштування</p>
              </Link>
              </li>
            <li>
              <a type="button" title="Вийти" onClick={() => signOutAdmin()}>
                <LogoutSvg />
              </a>
            </li>
          </ul>
          <button
            className="admin-panel__mobile-menu_btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <DragMenuSvg />
          </button>
        
      </div>
      <div className="admin-panel__content">
        <div className="admin-panel__container">{children}</div>
      </div>
    </section>
  );
};

export default AdminPanel;
