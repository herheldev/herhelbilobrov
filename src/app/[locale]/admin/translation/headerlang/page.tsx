"use client";
import { useForm } from "react-hook-form";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { app } from "@/bd/firebase";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
interface HeaderData {
  Media?: string;
  H3?: string;
  H1?: string;
  P?: string;
  BtnVisit?: string;
  BtnKnow?: string;
  Street?: string;
}
interface TranslationData {
  en?: {
    HEADER?: HeaderData;
  };
  uk?: {
    HEADER?: HeaderData;
  };
  pl?: {
    HEADER?: HeaderData;
  };
}
export default function LangHeader() {
  const {
    register,
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const [dataFormHeader, setDataFormHeader] = useState<TranslationData | null>(
    null
  );
  const [stateForm, setStateForm] = useState("");
  const imgOrVideo = () => {
    if(dataFormHeader){
      const iOV = dataFormHeader?.en?.HEADER?.Media?.split("?")[0].split(".").at(-1)
      if(iOV === "MP4"){
        return "VIDEO"
      } else if(iOV === "PNG"|| iOV === "JPEG" || iOV === "JPG"){
        return "IMG"
      }
      
      
    }
  }
  const bd = getFirestore(app);
  const storage = getStorage(app);
  const submitForm = async () => {};
  const saveFormData = async (lang: string, type: string, data: string) => {
    const docHeader = doc(bd, "translation", lang);
    await setDoc(docHeader, { HEADER: { [type]: data } }, { merge: true })
      .then(() => getFormData())
      .catch(() => alert("ERROR"));
    setStateForm("Зміни збережено");
    setTimeout(() => setStateForm(""), 2000);
    
  };

  async function getFormData() {
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
    setDataFormHeader(spotObg);
  
  }
  async function saveMedia(e: any) {
    if(!e.target.files || e.target.files.length === 0){
      console.log("Файл не вибрано");
      return;
      
    }
    let nameFile:string = e.target.files[0].name;
    const refMedia = ref(storage, nameFile)
    await uploadBytes(refMedia, e.target.files[0])
    const mediaURL = await getDownloadURL(refMedia).then(i => i)
    for(let i = 0; i <= 2; i++){
      switch(i){
        case 0:{
          await setDoc(doc(bd, 'translation', 'uk'), {HEADER: {Media: mediaURL}}, {merge: true})
        }
        break;
        case 1:{
          await setDoc(doc(bd, 'translation', 'pl'), {HEADER: {Media: mediaURL}}, {merge: true})
        }
        break;
        case 2:{
          await setDoc(doc(bd, 'translation', 'en'), {HEADER: {Media: mediaURL}}, {merge: true}).then(()=>getFormData())
        }
        break;
      }
    }
    


  }
 
  
  function handlerBlur(e: any) {
    let stringKeyLang = e.target.name.slice(0, 2).toString();
    let stringKeyType = e.target.name.substring(2).toString();
    let stringKeyData = e.target.value.toString();
    saveFormData(stringKeyLang, stringKeyType, stringKeyData);
    console.log(stringKeyData, stringKeyLang, stringKeyType);
  }
  useEffect(() => {
    getFormData();
  
    
  }, []);

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="translationRoot_content__form"
    >
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>Polski</th>
            <th>Українська</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {imgOrVideo() === "VIDEO" && <video width="100%" playsInline loop autoPlay muted src={dataFormHeader?.en?.HEADER?.Media}></video>}
              {imgOrVideo() === "IMG" && <img width="100%" height="100px"src={dataFormHeader?.en?.HEADER?.Media}/>}
              </td>
            <td>
              <input
                type="file"
                className="translationRoot_content__form_textarea"
                {...register("Media", {
                  onChange: saveMedia,
                })}
              />
            </td>
            <td></td>
          </tr>

          <tr>
            <h4>Найменший заголовок</h4>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormHeader?.en?.HEADER?.H3}
                defaultValue={dataFormHeader?.en?.HEADER?.H3}
                className="translationRoot_content__form_textarea"
                {...register("enH3", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.pl?.HEADER?.H3}
                defaultValue={dataFormHeader?.pl?.HEADER?.H3}
                className="translationRoot_content__form_textarea"
                {...register("plH3", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.uk?.HEADER?.H3}
                defaultValue={dataFormHeader?.uk?.HEADER?.H3}
                className="translationRoot_content__form_textarea"
                {...register("ukH3", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <h4>Найбільший заголовок</h4>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormHeader?.en?.HEADER?.H1}
                defaultValue={dataFormHeader?.en?.HEADER?.H1}
                className="translationRoot_content__form_textarea"
                {...register("enH1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.pl?.HEADER?.H1}
                defaultValue={dataFormHeader?.pl?.HEADER?.H1}
                className="translationRoot_content__form_textarea"
                {...register("plH1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.uk?.HEADER?.H1}
                defaultValue={dataFormHeader?.uk?.HEADER?.H1}
                className="translationRoot_content__form_textarea"
                {...register("ukH1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <h4>Опис</h4>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormHeader?.en?.HEADER?.P}
                defaultValue={dataFormHeader?.en?.HEADER?.P}
                className="translationRoot_content__form_textarea"
                {...register("enP", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.pl?.HEADER?.P}
                defaultValue={dataFormHeader?.pl?.HEADER?.P}
                className="translationRoot_content__form_textarea"
                {...register("plP", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.uk?.HEADER?.P}
                defaultValue={dataFormHeader?.uk?.HEADER?.P}
                className="translationRoot_content__form_textarea"
                {...register("ukP", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <h4>Адреса</h4>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormHeader?.en?.HEADER?.Street}
                defaultValue={dataFormHeader?.en?.HEADER?.Street}
                className="translationRoot_content__form_textarea"
                {...register("enStreet", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.pl?.HEADER?.Street}
                defaultValue={dataFormHeader?.pl?.HEADER?.Street}
                className="translationRoot_content__form_textarea"
                {...register("plStreet", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.uk?.HEADER?.Street}
                defaultValue={dataFormHeader?.uk?.HEADER?.Street}
                className="translationRoot_content__form_textarea"
                {...register("ukStreet", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <h4>Кнопка запису на візит</h4>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormHeader?.en?.HEADER?.BtnVisit}
                defaultValue={dataFormHeader?.en?.HEADER?.BtnVisit}
                className="translationRoot_content__form_textarea"
                {...register("enBtnVisit", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.pl?.HEADER?.BtnVisit}
                defaultValue={dataFormHeader?.pl?.HEADER?.BtnVisit}
                className="translationRoot_content__form_textarea"
                {...register("plBtnVisit", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.uk?.HEADER?.BtnVisit}
                defaultValue={dataFormHeader?.uk?.HEADER?.BtnVisit}
                className="translationRoot_content__form_textarea"
                {...register("ukBtnVisit", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <h4>Другорядна кнопка</h4>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormHeader?.en?.HEADER?.BtnKnow}
                defaultValue={dataFormHeader?.en?.HEADER?.BtnKnow}
                className="translationRoot_content__form_textarea"
                {...register("enBtnKnow", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.pl?.HEADER?.BtnKnow}
                defaultValue={dataFormHeader?.pl?.HEADER?.BtnKnow}
                className="translationRoot_content__form_textarea"
                {...register("plBtnKnow", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormHeader?.uk?.HEADER?.BtnKnow}
                defaultValue={dataFormHeader?.uk?.HEADER?.BtnKnow}
                className="translationRoot_content__form_textarea"
                {...register("ukBtnKnow", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>{stateForm}</div>
    </form>
  );
}
