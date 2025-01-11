"use client"
import { useRouter } from "next/navigation"
import "../page.scss"
import { useEffect, useState } from "react";
import AdminModalWindow from "@/components/AdminModalWindow/AdminModalWindow";
import FormAddLocalAdmin from "@/components/FormAddLocalAdmin/FormAddLocalAdmin";
import PrevSvg from "@/components/Icon/PrevSvg";
import { app } from "@/bd/firebase";
import { getFirestore, doc, getDoc, updateDoc, deleteField } from "firebase/firestore";


export default function AddLocal() {
   const router = useRouter();
   const [modalState, setModalState] = useState(false);
   const [stateForm, setStateForm] = useState(false);
   const [dataLocal, setDataLocal] = useState(undefined)
  const bd = getFirestore(app)

   async function getDatalocal() {
      const refLocal = doc(bd, "products", "local");
     const data =  (await getDoc(refLocal)).data();
     setDataLocal(data)
   }
   async function deleteLocal(key:string){
if(confirm(`Ви впевнені що хочете видалити ${key}?`)) {
    const refLocal = doc(bd, "products", "local");
    await  updateDoc(refLocal, {[key]: deleteField()})
    await getDatalocal()
       } else return


   }
   useEffect(()=>{
      getDatalocal().then()
   },[])
 return (
   <div className="service-new">
      <div className="service-new_header">
      <button onClick={()=> router.back()} className="btn-admin-back"><PrevSvg width="32px" height="32px"/></button>
      <button  className="btn-admin-main" onClick={()=>setModalState(true)}>Додати локал</button>
      </div>
      <div className="service-new_table">
         <table>
            <thead>

                 <tr>
                     <th>Локаль</th>
                  <th>Переклади</th>
                  <th>Дії</th>
                  </tr>

               
            </thead>
            <tbody>
            {dataLocal && Object.entries(dataLocal).map(([key, val]:[key: string, val: any])=>{
                return (<tr key={key}>
                    <td>{key}</td>
                    <td>{val.ua_loc}<br></br>{val.pl_loc}<br></br>{val.en_loc}</td>
                    <td onClick={()=>deleteLocal(key)}>Видалити</td>
                </tr>)
            })}
            </tbody>
         </table>
      </div>
      <AdminModalWindow state={modalState} setState={setModalState} setStateForm={setStateForm} stateForm={stateForm}>
          <FormAddLocalAdmin getData={getDatalocal} state={modalState} setState={setModalState} setStateForm={setStateForm}/>
      </AdminModalWindow>
   </div>
   
 )
}