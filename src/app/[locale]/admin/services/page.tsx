"use client";
import { Link } from "@/i18n/routing";
import "./page.scss";
import ItemServiceAdmin from "@/components/ItemServiceAdmin/ItemServiceAdmin";
import {getFirestore, getDocs, collection, doc, getDoc} from "firebase/firestore";
import {app1} from "@/bd/firebase";
import {useState, useEffect} from "react";

export default function ServicesAdmin() {
const bd = getFirestore(app1);
    const [itemObj, setItemObj] = useState(null);
    const [category, setCategory] = useState(null);
    const [categoryState,setCategoryState] = useState("");
    async function getCategory(){
        const refItem = doc(bd,"products", "category");
    }
async function getItem () {
    const refItem = doc(bd,"products", "services");
    await getDoc(refItem).then((doc)=>setItemObj(doc.data()));}
useEffect(() => {
    getItem()

},[])

  return (
    <div className="service-new">
      <div className="service-new_header">
        <h1>Послуги</h1>
        <ul className="service-new_header_menu-btn">
        <li>
            <Link className="btn-admin-primary" href={"./services/edit-category"}>Редагувати категорії</Link>
          </li>
          
          <li>
            <Link className="btn-admin-primary" href={"./services/edit-local"}>Редагувати локалі</Link>
          </li>
          <li>
            <Link href={"./services/add-service"} className="btn-admin-main">Додати послугу</Link>
          </li>
        </ul>
      </div>
      <div className="service-new_filter">
         <label>
            Локаль:
            <select className={"admin-input-style"}>
               <option>ВСІ</option>
               <option>HERHEL CLINIC WARSZAWA</option>
               <option>HERHEL CLINIC WROCLAW</option>
            </select>
         </label>
         <label>
            Категорія:
            <select className={"admin-input-style"}>
               <option>Уходиве процедури</option>
               <option>HERHEL CLINIC WARSZAWA</option>
               <option>HERHEL CLINIC WROCLAW</option>
            </select>
         </label>
          <label>
              Пошук:
              <input type="search" className={"admin-input-style"}></input>
          </label>

      </div>
        <div className="service-new_table">
         <table>
            <thead>
               <tr>
                  <th>Назва</th>
                  <th>Категорія</th>
                  <th>Локаль</th>
               </tr>
            </thead>
            <tbody>
            {itemObj && Object.entries(itemObj).map(([key, value]) =>

                <ItemServiceAdmin key={key} name={key} category={value?.category} local={value?.local} id={key}/>

            )}





           
            </tbody>
            
         </table>
      </div>
    </div>
  );
}
