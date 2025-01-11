"use client"
import { useRouter } from "next/navigation"
import {app} from "@/bd/firebase";
import {getFirestore, doc, getDoc, setDoc, deleteField, updateDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import PrevSvg from "@/components/Icon/PrevSvg";
import "../page.scss";
import {useForm} from "react-hook-form";
import {ItemService} from "@/app/[locale]/admin/services/add-service/page";
import {saveService} from "@/app/[locale]/admin/services/add-service/page";

export default function AdminServiceEitId({params}:{params:string}){
    const {handleSubmit, register, reset, formState: {isValid}, unregister} = useForm({mode: "onSubmit"})
    const bd = getFirestore(app);
    const id = decodeURIComponent(params?.id)
    const [dataService, setDataService] = useState(null);
    const [local,setLocal] = useState(null);
    const [category,setCategory] = useState(null);
    const [countServices,setCountServices] = useState([]);
    const [dataItem, setDataItem] = useState(null);
    function addServiceItem(dataService) {
        if (dataService.length === 0) {
            setCountServices([...countServices,{id: dataService.length + 1}]);

        } else if(dataService.length > 0)
        {
            const maxId = countServices.reduce((max, current) => (current.id > max ? current.id : max), -Infinity)
            setCountServices([...countServices,{id: maxId + 1}]);


        }

    }
    async function getData(){
        const refDoc = doc(bd,"products","services");
        await getDoc(refDoc).then((doc)=> setDataService(doc.data()[id]));
    }
    async function getLocal(){
        const refDoc = doc(bd,"products","local");
        await getDoc(refDoc).then((doc)=> setLocal(doc.data()));
    }
    async function getCategory(){
        const refDoc = doc(bd,"products","category");
        await getDoc(refDoc).then((doc)=> setCategory(doc.data()));
    }
    async function saveData(data: object){

        const resultObj = {};
        const nameService = dataService?.id ? dataService?.id : dataService?.en?.name;
        resultObj[nameService] =
            {
                id: nameService,
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
    async function deleteServices(){
        const refDoc = doc(bd,"products","services");
        if(confirm("Видалити послугу?")) {
            await updateDoc(refDoc, {
                [id]: deleteField()
            }).then(() => {
                alert("Успішно видалено")
                reset();
                router.back()

            })
        } else return

    }
    function deleteService(id: string  ) {
        unregister(`pl_item_${id}`);
        unregister(`uk_item_${id}`);
        unregister(`en_item_${id}`);
        unregister(`price_item_${id}`);

        setCountServices(countServices.filter(service => service.id !== id))
    }
    function defaultServiceItem(data){
        const dt = Object.entries(data);
        const mobObj = {}
        const objCount = []
        dt.forEach((i)=>{
            if(i[0] === "uk" || i[0] === "en" || i[0] === "pl"){
                mobObj[i[0]] = i[1]
            }
        })
        const count = Object.keys(mobObj.uk.service).length
        for (let i= 1; i<=count; i++){
           objCount.push({id: i})
        }

        setCountServices(objCount);
        setDataItem(mobObj)
    }
    useEffect(() => {
getData()
getLocal();
getCategory()

    }, []);
    useEffect(() => {
        if(dataService){
            defaultServiceItem(dataService);
        }
    }, [dataService]);

const router = useRouter()
    return (


    <div className="service-new">
        <div className="service-new_header">

            <button onClick={() => router.back()}
                    className="btn-admin-back"><PrevSvg width="32px" height="32px"/>
            </button>
            <h1>{decodeURIComponent(params?.id)}</h1>
            <button type={"button"} onClick={() => deleteServices()}
                    className="btn-admin-main">Видалити
            </button>
        </div>
        <div className="service-new_table">
            <form onSubmit={handleSubmit(saveData)}>
                <table>
                <thead>
                    <tr>
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
                                <option  defaultValue value={dataService && dataService?.local}>
                                    {dataService && dataService?.local}
                                </option>
                                {local && Object.entries(local).map(([key,value]) =>{
                                    if(key === dataService?.local){ return } else return <option key={key} value={key}>{key}</option>}
                                )}
                            </select>
                        </td>
                        <td>Категорія:</td>
                        <td>
                            <select {...register(`category`, {required: {value: true, message: "required"}})} className={"admin-input-style"}>

                                    {category && Object.entries(category).map(([key,value]) =>{
                                        if(key === dataService?.category) {
                                            return <option defaultValue  key={key} value={key}>{value?.uk_cat}</option>
                                        }
                                    })}

                                {category && Object.entries(category).map(([key,value]) => {
                                        if (key === dataService?.category) { return
                                        } else return <option key={key} value={key}>{value?.uk_cat}</option>
                                    }
                                )}
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>Назва послуги:</td>
                        <td>
                            <input className={"admin-input-style"}defaultValue={dataService?.uk?.name} placeholder={dataService?.uk?.name} type={"text"}
                                   {...register("uk_name_service", {required: {value: true, message: "required"}})}
                            />
                        </td>
                        <td>
                            <input className={"admin-input-style"}defaultValue={dataService?.pl?.name} placeholder={dataService?.pl?.name} type={"text"}
                                   {...register("pl_name_service", {required: {value: true, message: "required"}})}
                            />
                        </td>
                        <td>
                            <input className={"admin-input-style"} defaultValue={dataService?.en?.name} placeholder={dataService?.en?.name} type={"text"}
                                   {...register("en_name_service", {required: {value: true, message: "required"}})}
                            />
                        </td>
                        <td></td>

                    </tr>
                    <tr>
                        <td>Опис</td>
                        <td>
                            <input className={"admin-input-style"} type={"text"} defaultValue={dataService?.uk?.descrip} placeholder={dataService?.uk?.descrip} {...register("uk_descrip_service", {
                                required: {value: true, message: "required"},


                            }
                            )}/>
                        </td>
                        <td>
                            <input className={"admin-input-style"} type={"text"} defaultValue={dataService?.pl?.descrip} placeholder={dataService?.pl?.descrip} {...register("pl_descrip_service", {required: {value: true, message: "required"}})}/>
                        </td>
                        <td>
                            <input className={"admin-input-style"} type={"text"} defaultValue={dataService?.en?.descrip} placeholder={dataService?.en?.descrip} {...register("en_descrip_service", {required: {value: true, message: "required"}})}/>
                        </td>
                        <td></td>

                    </tr>
                    <tr>
                        <td>Послуги</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{textAlign: "right"}}>
                            <button onClick={() => addServiceItem(countServices)} style={{margin: "auto"}} >ADD</button>
                        </td>

                    </tr>
                    {countServices.map((item) => <ItemService register={register} key={item?.id} id={item?.id} data={dataItem && dataItem}
                                                              deleteService={deleteService}/>)}

                    <tr>
                        <td colSpan={4}></td>

                        <td colSpan={1}>
                            <button style={{marginLeft: "auto"}} disabled={!isValid} className="btn-admin-main">Зберегти
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
    )
}