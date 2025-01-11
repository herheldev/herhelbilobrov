"use client"

import { useRouter } from "next/navigation"
import PrevSvg from "@/components/Icon/PrevSvg";
import "../page.scss";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { app } from "@/bd/firebase";
import {getFirestore, getDoc, doc, setDoc} from "firebase/firestore";



export function ItemService({id, deleteService, register, data}: {id: string, deleteService: any, register: any, data?: any}) {
    const uk = data && Object.entries(data?.uk?.service);
    const pl = data && Object.entries(data?.pl?.service);
    const en = data && Object.entries(data?.en?.service);
    return(
        <tr>
            <td>
                <button onClick={() => deleteService(id)}>DEL</button>
            </td>
            <td><input className={"admin-input-style"} type="text" defaultValue={data && uk[id-1]?.[0]}  placeholder={`uk_item_${id}`} {...register(`uk_item_${id}`,
                {require: {value: true, message: "required"}}
            )}/></td>
            <td><input className={"admin-input-style"} type="text" defaultValue={data && pl[id-1]?.[0]} placeholder={`pl_item_${id}`} {...register(`pl_item_${id}`,{required: {value: true, message: "required"}})}/></td>
            <td><input className={"admin-input-style"} type="text" defaultValue={data && en[id-1]?.[0]} placeholder={`en_item_${id}`} {...register(`en_item_${id}`,{required: {value: true, message: "required"}})}/></td>
            <td><input className={"admin-input-style"} onChange={(e)=> console.log(e.target.value)} type="text" defaultValue={data && uk[id-1]?.[1]} placeholder="Ціна" {...register(`price_item_${id}`,{required: {value: true, message: "required"}})}/></td>

        </tr>
    )
}

export default function AddService() {
    const [countServices, setCountServices] = useState([]);
    const [localState, setLocalState] = useState(null)
    const [categoryState, setCategoryState] = useState(null)
    const bd = getFirestore(app);
   const router = useRouter();
   const {handleSubmit, register, formState: {isValid}, unregister, watch, getValues, reset} = useForm({mode: "onSubmit"});
   const formField = watch();
   const isFormChange = Object.values(formField).some(value => value !== undefined && value !== "")

     async  function saveService(data:object) {
        const resultObj = {};
        const nameService = data["en_name_service"];
        resultObj[nameService] =
            {
                category: data.category,
                local: data.local,
                uk: {name:data["uk_name_service"], descrip: data["uk_descrip_service"], service: {}},
                en: {name:data["en_name_service"], descrip: data["en_descrip_service"], service: {}},
                pl: {name:data["pl_name_service"], descrip: data["pl_descrip_service"], service: {}}
            }
            Object.entries(data).forEach(([key, value]) => {
                if(key.includes("item") || key.includes("price")){
                    if(key.slice(-2).includes("_")){
                        switch (key.slice(0,2)){
                            case "uk":
                                resultObj[nameService]["uk"]["service"][value] = data[`price_item_${key.at(-1)}`] ;

                                break;
                            case "en":
                                resultObj[nameService]["en"]["service"][value] = data[`price_item_${key.at(-1)}`] ;
                                break;
                            case "pl":
                                resultObj[nameService]["pl"]["service"][value] = data[`price_item_${key.at(-1)}`] ;
                                break;
                        }
                    } else {
                        switch (key.slice(0,2)){
                            case "uk":
                                resultObj[nameService]["uk"]["service"][value] = data[`price_item_${key.slice(-2)}`] ;

                                break;
                            case "en":
                                resultObj[nameService]["en"]["service"][value] = data[`price_item_${key.slice(-2)}`] ;
                                break;
                            case "pl":
                        resultObj[nameService]["pl"]["service"][value] = data[`price_item_${key.slice(-2)}`];
                                break;
                        }
                    }

                }

            })

        const refDoc = doc(bd, "products", "services");
        await setDoc(refDoc, resultObj,{merge:true}).then(()=>{
              alert("Послуга успішно додана!")
                reset();
              router.back()
        })
    }



    function addServiceItem(dataService) {
       if (dataService.length === 0) {
           setCountServices([...countServices,{id: dataService.length + 1}]);

       } else if(dataService.length > 0)
       {
           const maxId = countServices.reduce((max, current) => (current.id > max ? current.id : max), -Infinity)
           setCountServices([...countServices,{id: maxId + 1}]);


       }

    }
    function deleteService(id: string  ) {
        unregister(`pl_item_${id}`);
        unregister(`uk_item_${id}`);
        unregister(`en_item_${id}`);
        unregister(`price_item_${id}`);

            setCountServices(countServices.filter(service => service.id !== id))
    }
    async function getLocal() {
        const  refLocal = doc(bd, "products" , "local");
        await getDoc(refLocal).then(doc => setLocalState(doc.data()));
    }
    async function getCategory(){
        const  refCategory = doc(bd, "products" , "category");
        await getDoc(refCategory).then(doc => setCategoryState(doc.data()));
    }

    useEffect(() => {
        getLocal()
        getCategory()
    }, []);




    return (
     <div className="service-new">
         <div className="service-new_header">
             <button onClick={() =>

             {
                 if(isFormChange){
                     if(confirm("Gjrbyenb?")){
                         router.back()
                     }else {
                         return
                     }
                 } else {
                     router.back()
                 }

             }} className="btn-admin-back"><PrevSvg width="32px" height="32px"/>
             </button>

         </div>
         <div className="service-new_table">
<form onSubmit={handleSubmit(saveService)}>
                <table>
                    <thead>
                    <tr onClick={()=>console.log(getValues())}>
                        <th></th>
                        <th>Українська</th>
                        <th>Polski</th>
                        <th>English</th>
                        <th>Ціна</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Локаль:</td>
                        <td>
                            <select {...register("local", {required:{value:true,message: "required"}})} className={"admin-input-style"}>
                                <option defaultValue value={""}>
                                    {" <Оберіть>"}
                                </option>
                                {localState && Object.entries(localState).map(([key, value]) =>
                                    <option key={key} value={key}>{key}</option>
                                )}
                            </select>
                        </td>
                        <td>Категорія:</td>
                        <td>
                            <select {...register(`category`, {required: {value: true, message: "required"}})}
                                    className={"admin-input-style"}>
                                <option defaultValue value={""}>
                                    {" <Оберіть>"}
                                </option>
                                {categoryState && Object.entries(categoryState).map(([key, value]) =>
                                    <option key={key} value={key}>{value.uk_cat}</option>
                                )}
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    <tr>
                    <td>Назва послуги:</td>
                        <td>
                            <input className={"admin-input-style"} type={"text"} {...register("uk_name_service", {
                                required: {value: true, message: "required"},
                            })}/>
                        </td>
                        <td>
                            <input className={"admin-input-style"} type={"text"}
                                   {...register("pl_name_service", {
                                       required: {value: true, message: "required"},
                                   })}/>
                        </td>
                        <td>
                            <input className={"admin-input-style"} type={"text"}
                                   {...register("en_name_service", {
                                       required: {value: true, message: "required"},
                                   })}
                            />
                        </td>
                        <td></td>

                    </tr>
                    <tr>
                        <td>Опис</td>
                        <td>
                            <input className={"admin-input-style"} type={"text"} {...register("uk_descrip_service", {
                                required: {value: true, message: "required"},
                            })}/>
                        </td>
                        <td>
                            <input className={"admin-input-style"} type={"text"}  {...register("pl_descrip_service", {
                                required: {value: true, message: "required"},
                            })}/>
                        </td>
                        <td>
                            <input className={"admin-input-style"} type={"text"}  {...register("en_descrip_service", {
                                required: {value: true, message: "required"},
                            })}/>
                        </td>
                        <td></td>

                    </tr>
                    <tr>
                        <td>Послуги</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{textAlign: "right"}}>
                            <button style={{margin: "auto"}} onClick={() => addServiceItem(countServices)}>ADD</button>
                        </td>

                    </tr>
                    {countServices.map((item) => <ItemService register={register} key={item?.id} id={item?.id}
                                                              deleteService={deleteService}/>)}
                    <tr>
                        <td colSpan={4}></td>
                       <td colSpan={1} > <button style={{marginLeft: "auto"}} className="btn-admin-main" disabled={!isValid}>Зберегти</button></td>
                    </tr>
                    </tbody>
                </table>
</form>
         </div>
     </div>


 )
}