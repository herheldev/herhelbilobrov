"use client"

import { useRouter } from "next/navigation"
import PrevSvg from "@/components/Icon/PrevSvg";
import AdminModalWindow from "@/components/AdminModalWindow/AdminModalWindow";
import FormAddCategoryAdmin from "@/components/FormAddCategoryAdmin/FormAddCategoryAdmin";
import {useEffect, useState} from "react";
import "../page.scss";
import {app} from "@/bd/firebase";
import {getDoc, doc, getFirestore, updateDoc, deleteField} from "firebase/firestore";
export default function EditCategory() {
   const router = useRouter()
    const bd = getFirestore(app);
    const [modalState, setModalState] = useState(false);
    const [stateForm, setStateForm] = useState(false);
    const [dataCategory, setDataCategory] = useState(null)
async function getData() {
    await getDoc(doc(bd, "products", "category")).then((data)=>setDataCategory(data.data()));
}
async function deleteCategory(key, name){
    if(confirm(`Ви впевнені що хочете видалити ${name}?`)) {
        const refLocal = doc(bd, "products", "category");
        await  updateDoc(refLocal, {[key]: deleteField()})
        await getData()
    } else return
}
    useEffect(() => {
        getData()
    }, []);

 return (
     <div className="service-new">
         <div className="service-new_header">
             <button onClick={() => router.back()} className="btn-admin-back"><PrevSvg width="32px" height="32px"/>
             </button>
             <button className="btn-admin-main" onClick={()=>setModalState(true)}>Додати категорію</button>
         </div>

         <div className="service-new_table">
             <table>
                 <thead>

                 <tr>
                     <th>Назва</th>
                     <th>Кількість послуг</th>
                     <th>Дії</th>
                 </tr>


                 </thead>
                 <tbody>
                 {dataCategory && Object.entries(dataCategory).map(([key, value]) => {
                     return (
                         <tr key={key}>
                             <td>{value.uk_cat}</td>
                             <td></td>
                             <td><button onClick={()=>deleteCategory(key, value.uk_cat)}>DEL</button></td>
                         </tr>
                     )
                 })}
                 </tbody>
             </table>
         </div>
         <AdminModalWindow  state={modalState} setState={setModalState} stateForm={stateForm} setStateForm={setStateForm}>
                <FormAddCategoryAdmin  setState={setModalState} state={modalState} getData={getData} setStateForm={setStateForm}/>
         </AdminModalWindow>
     </div>

 )
}