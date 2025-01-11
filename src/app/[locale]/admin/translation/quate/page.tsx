"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { app } from "@/bd/firebase";
import { getFirestore, doc, setDoc, collection,getDocs } from "firebase/firestore";
interface QuateData {
    Quate?: string;
    Author?: string
  }
  interface TranslationData {
    en?: {
      QUATE?: QuateData;
    };
    uk?: {
        QUATE?: QuateData;
    };
    pl?: {
        QUATE?: QuateData;
    };
  }
export default function QuateLang() {
    const {handleSubmit, register, formState: {errors, isValid}, reset} = useForm({mode: "onBlur"})
    const bd = getFirestore(app)
    const [dataFormQuate, setDataFormQuate] = useState<TranslationData | null>(null)
    function submitData(){}
    async function saveDataQuate(lang:string, type: string, value:string){
        const docQuate = doc(bd, "translation", lang);
        await setDoc(docQuate, {QUATE: {[type]: value}}, {merge: true}).then(()=>getDataQuate())
    }
    async function getDataQuate() {
        const spotObg: any = {};
    const headerRef = await getDocs(collection(bd, "translation"));
    headerRef.forEach((doc) => {
      switch (doc.id) {
        case "en":
          spotObg.en = doc.data();
          break;
        case "pl":
          spotObg.pl = doc.data();
          break;
        case "uk":
          spotObg.uk = doc.data();
          break;
      }
    });
    setDataFormQuate(spotObg);
    }
    async function handlerBlur(e:any){
        let type = e.target.name.substring(2).toString();
        let value = e.target.value.toString();
        let lang = e.target.name.slice(0,2).toString();

        saveDataQuate(lang,type,value)
        

    }
    useEffect(()=>{
        getDataQuate()
    },[])
  return (
    <form onSubmit={handleSubmit(submitData)} className="translationRoot_content__form">
      <table>
        <thead>
            <tr>
          <th>English</th>
          <th>Polski</th>
          <th>Українська</th>
          </tr>
        </thead>
        <tbody>
            <tr><h4>Цитата</h4></tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormQuate?.en?.QUATE?.Quate}
                defaultValue={dataFormQuate?.en?.QUATE?.Quate}
                className="translationRoot_content__form_textarea"
                {...register("enQuate", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormQuate?.pl?.QUATE?.Quate}
                defaultValue={dataFormQuate?.pl?.QUATE?.Quate}
                className="translationRoot_content__form_textarea"
                {...register("plQuate", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormQuate?.uk?.QUATE?.Quate}
                defaultValue={dataFormQuate?.uk?.QUATE?.Quate}
                className="translationRoot_content__form_textarea"
                {...register("ukQuate", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr><h4>Автор</h4></tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormQuate?.en?.QUATE?.Author}
                defaultValue={dataFormQuate?.en?.QUATE?.Author}
                className="translationRoot_content__form_textarea"
                {...register("enAuthor", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormQuate?.pl?.QUATE?.Author}
                defaultValue={dataFormQuate?.pl?.QUATE?.Author}
                className="translationRoot_content__form_textarea"
                {...register("plAuthor", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormQuate?.uk?.QUATE?.Author}
                defaultValue={dataFormQuate?.uk?.QUATE?.Author}
                className="translationRoot_content__form_textarea"
                {...register("ukAuthor", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
