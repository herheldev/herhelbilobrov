"use client"
import { Link , useRouter, usePathname} from "@/i18n/routing";
import DragMenuSvg from "../Icon/DragMenuSvg";
import Logo from "../Logo/Logo";
import "./Nav.scss"
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
const Nav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLang = useLocale()
 

    const changeLang = (e) => {
    router.replace(pathname, {locale: e})
   }
    return ( <nav className="nav">
        
            <Logo type=""></Logo>
            
            <select onChange={(e)=> changeLang(e.target.value)} defaultValue={currentLang} className="nav__lang-btn">
                <option value="uk">Українська</option>
                <option value="pl">Polski</option>
                <option value="en">English</option>
            </select>
            
       
    </nav> );
}
 
export default Nav;