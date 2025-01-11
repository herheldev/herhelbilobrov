"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { app } from "@/bd/firebase";
import {
  getFirestore,
  doc,
  getDocs,
  setDoc,
  collection,
} from "firebase/firestore";
interface DataMedia {
  H1?: string;
  DESCRIPTION?: string;
  BTNREAD?: string;
}
interface TranslationData {
  en?: {
    MEDIA?: DataMedia;
  };
  pl?: {
    MEDIA?: DataMedia;
  };
  uk?: {
    MEDIA?: DataMedia;
  };
}
export default function MediaLang() {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const [dataFormMedia, setDataFormMedia] = useState<TranslationData | null>(
    null
  );
  const bd = getFirestore(app);
  function submitFormMedia() {}
  async function getDataMedia() {
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
    setDataFormMedia(spotObg);
  }
  async function saveDataMedia(lang: string, type: string, data: string) {
    const docMedia = doc(bd, "translation", lang);
    await setDoc(docMedia, { MEDIA: { [type]: data } }, { merge: true }).then(
      () => getDataMedia()
    );
  }
  function handleBlur(e: any) {
    const lang = e.target.name.split("_")[0];
    const type = e.target.name.split("_")[1];
    const data = e.target.value;
    saveDataMedia(lang, type, data);
  }
  useEffect(() => {
    getDataMedia();
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit(submitFormMedia)}
        className="translationRoot_content__form"
      >
        <table>
          <thead>
            <th>English</th>
            <th>Polski</th>
            <th>Українська</th>
          </thead>
          <tbody className="translationRoot_content__form_tbody">
            <tr>
              <td colSpan={3}>Заголовок</td>
            </tr>
            <tr>
              <td>
                <textarea
                  placeholder={dataFormMedia?.en?.MEDIA?.H1}
                  defaultValue={dataFormMedia?.en?.MEDIA?.H1}
                  className="translationRoot_content__form_textarea"
                  {...register("en_H1", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
              <td>
                <textarea
                  placeholder={dataFormMedia?.pl?.MEDIA?.H1}
                  defaultValue={dataFormMedia?.pl?.MEDIA?.H1}
                  className="translationRoot_content__form_textarea"
                  {...register("pl_H1", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
              <td>
                <textarea
                  placeholder={dataFormMedia?.uk?.MEDIA?.H1}
                  defaultValue={dataFormMedia?.uk?.MEDIA?.H1}
                  className="translationRoot_content__form_textarea"
                  {...register("uk_H1", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
            </tr>
            {/* Опис */}
            <tr>
              <td colSpan={3}>Опис</td>
            </tr>
            <tr>
              <td>
                <textarea
                  placeholder={dataFormMedia?.en?.MEDIA?.DESCRIPTION}
                  defaultValue={dataFormMedia?.en?.MEDIA?.DESCRIPTION}
                  className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                  {...register("en_DESCRIPTION", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
              <td>
                <textarea
                  placeholder={dataFormMedia?.pl?.MEDIA?.DESCRIPTION}
                  defaultValue={dataFormMedia?.pl?.MEDIA?.DESCRIPTION}
                  className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                  {...register("pl_DESCRIPTION", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
              <td>
                <textarea
                  placeholder={dataFormMedia?.uk?.MEDIA?.DESCRIPTION}
                  defaultValue={dataFormMedia?.uk?.MEDIA?.DESCRIPTION}
                  className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                  {...register("uk_DESCRIPTION", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
            </tr>
            {/* Кнопка */}
            <tr>
              <td colSpan={3}>Кнопка</td>
            </tr>
            <tr>
              <td>
                <textarea
                  placeholder={dataFormMedia?.en?.MEDIA?.BTNREAD}
                  defaultValue={dataFormMedia?.en?.MEDIA?.BTNREAD}
                  className="translationRoot_content__form_textarea"
                  {...register("en_BTNREAD", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
              <td>
                <textarea
                  placeholder={dataFormMedia?.pl?.MEDIA?.BTNREAD}
                  defaultValue={dataFormMedia?.pl?.MEDIA?.BTNREAD}
                  className="translationRoot_content__form_textarea"
                  {...register("pl_BTNREAD", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
              <td>
                <textarea
                  placeholder={dataFormMedia?.uk?.MEDIA?.BTNREAD}
                  defaultValue={dataFormMedia?.uk?.MEDIA?.BTNREAD}
                  className="translationRoot_content__form_textarea"
                  {...register("uk_BTNREAD", {
                    minLength: { value: 15, message: "Мінімум 15 символів" },
                    onBlur: handleBlur,
                  })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
