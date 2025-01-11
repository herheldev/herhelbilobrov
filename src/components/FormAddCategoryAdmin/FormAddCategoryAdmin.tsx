import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {app} from "@/bd/firebase"
import {getFirestore, setDoc, doc} from "firebase/firestore";
export default function FormAddLocalAdmin({state,
                                              setStateForm,
                                              setState,
                                              getData,}: {
    state: any;
    setStateForm: any;
    setState: any;
    getData?: any;
}) {


    const {handleSubmit, register, getValues, reset, formState: {isValid}} = useForm({mode: "onSubmit"})
    const bd = getFirestore(app);
    async function saveData(data) {
        const docCategory = doc(bd, "products", "category");
        let nameCategory = ""
        for (const key in data) {
            if (key.includes("en")) {
                nameCategory = data[key].split(" ").join("");
            }

        }
        await setDoc(docCategory, {[nameCategory]: data},{merge: true}).then(()=>{
            setState(false)
            getData()
        });
    }
    useEffect(() => {
        if (state === false) {
            reset();
        }
    }, [state]);
    return (
        <form onSubmit={handleSubmit(saveData)} onMouseLeave={()=>{
            const obj = getValues();
            for (const key in obj) {
                if (obj[key] === "" || obj[key] === undefined) {
                    setStateForm(false);
                    return;
                } else {
                    setStateForm(true);
                    return;
                }
            }
        }} className="admin-modal_window_form">
            <label>
                Назва категорії українською:
                <input type="text" {...register("uk_cat", {
                    required: {value: true, message: "Поле обовязкове до завпонення"},

                })}/>
            </label>
            <label>
                Назва категорії польською:
                <input type="text" {...register("pl_cat" ,{
                    required: {value: true, message: "Поле обовязкове до завпонення"},

                })}/>
            </label>
            <label>
                Назва категорії англійською:
                <input type="text" {...register("en_cat",{
                    required: {value: true, message: "Поле обовязкове до завпонення"},

                })}/>
            </label>
            <button type="submit" disabled={!isValid} className="btn-admin-main">Зберегти</button>
        </form>
    )

}