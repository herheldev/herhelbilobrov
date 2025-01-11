"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { app } from "@/bd/firebase";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDocs,
} from "firebase/firestore";
interface DataSeo {
  Title?: string;
  Description?: string;
  Keywords?: string;
}

interface TraslationSeo {
  en?: DataSeo;
  pl?: DataSeo;
  uk?: DataSeo;
}
export default function SeoSetings() {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const [dataFormSeo, setDataFormSeo] = useState<TraslationSeo | null>(null);
  const bd = getFirestore(app);
  async function getDataSeo() {
    const spotObg: any = {};
    const headerRef = await getDocs(collection(bd, "seo"));
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
    setDataFormSeo(spotObg);
  }
  async function saveDataSeo(lang: string, type: string, data: string) {
    const docSeo = doc(bd, "seo", lang);
    await setDoc(docSeo, { [type]: data }, { merge: true }).then(() =>
      getDataSeo()
    );
  }
  function handleBlur(e: any) {
    const lang = e.target.name.split("_")[0];
    const type = e.target.name.split("_")[1];
    const data = e.target.value;
    console.log(lang);
    console.log(type);
    console.log(data);
    saveDataSeo(lang, type, data);
  }
  useEffect(() => {
    getDataSeo();
  }, []);
  return (
    <form className="translationRoot_content__form">
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>Polski</th>
            <th>Українська</th>
          </tr>
        </thead>
        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td colSpan={3}>Title</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormSeo?.en?.Title}
                defaultValue={dataFormSeo?.en?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormSeo?.pl?.Title}
                defaultValue={dataFormSeo?.pl?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormSeo?.uk?.Title}
                defaultValue={dataFormSeo?.uk?.Title}
                className="translationRoot_content__form_textarea"
                {...register("uk_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Description</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormSeo?.en?.Description}
                defaultValue={dataFormSeo?.en?.Description}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Description", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormSeo?.pl?.Description}
                defaultValue={dataFormSeo?.pl?.Description}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Description", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormSeo?.uk?.Description}
                defaultValue={dataFormSeo?.uk?.Description}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Description", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Keywords</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormSeo?.en?.Keywords}
                defaultValue={dataFormSeo?.en?.Keywords}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Keywords", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormSeo?.pl?.Keywords}
                defaultValue={dataFormSeo?.pl?.Keywords}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Keywords", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormSeo?.uk?.Keywords}
                defaultValue={dataFormSeo?.uk?.Keywords}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Keywords", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
