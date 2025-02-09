"use client";
import { useForm } from "react-hook-form";
import {
  getFirestore,
  doc,
  getDocs,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "@/bd/firebase";
import { useEffect, useState } from "react";
interface DataAbout {
  H1?: string;
  P?: string;
  Box1?: {
    Img?: string;
    Title?: string;
    Desc?: string;
    Pic?: string;
  };
  Box2?: {
    Img?: string;
    Title?: string;
    Desc?: string;
    Pic?: string;
  };
  Box3?: {
    Img?: string;
    Title?: string;
    Desc?: string;
    Pic?: string;
  };
  Box4?: {
    Img?: string;
    Title?: string;
    Desc?: string;
    Pic?: string;
  };
}
interface TranslationData {
  en?: {
    ABOUT: DataAbout;
  };
  pl?: {
    ABOUT: DataAbout;
  };
  uk?: {
    ABOUT: DataAbout;
  };
}
export default function LangAbout() {
  const { handleSubmit, setValue, register } = useForm({ mode: "onBlur" });
  const [dataFormAbout, setDataFormAbout] = useState<TranslationData | null>(
    null
  );
  const [formState, setFormState] = useState("");
  const storage = getStorage(app);
  const bd = getFirestore(app);
  async function saveDataAbout(
    lang: string,
    type: string,
    data: string,
    box: string
  ) {
    const docAbout = doc(bd, "translation", lang);
    if (type === "P" || type === "H1") {
      await setDoc(docAbout, { ABOUT: { [type]: data } }, { merge: true }).then(
        () => {
          setFormState("Зміни збережено");
          setTimeout(() => {
            setFormState("");
          }, 2000);
        }
      );
    } else if (box || box != "") {
      await setDoc(
        docAbout,
        { ABOUT: { [box]: { [type]: data } } },
        { merge: true }
      ).then(() => {
        setFormState("Зміни збережено");
        setTimeout(() => {
          setFormState("");
        }, 2000);
      });
    }
  }
  async function getDataAbout() {
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
    setDataFormAbout(spotObg);
  }
  function handlerBlur(e: any) {
    const lang = e.target.name.split("_")[0];
    let type: string = e.target.name.split("_")[1].toString();
    let box = "";
    if (type.includes("Box")) {
      box = type;
      type = e.target.name.split("_")[2];
    }
    const data = e.target.value.toString();

    saveDataAbout(lang, type, data, box);
  }
  async function saveImage(e: any) {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("Файл не вибраний.");
      return;
    }
    const type: string = e.target.name.split("_")[0];
    const picOrImg: string = e.target.name.split("_")[1];
    const nameFile: string = e.target.files[0].name;
    if (picOrImg || picOrImg != "") {
      const refImage = ref(storage, nameFile);
      await uploadBytes(refImage, e.target.files[0]);
      const imageUrl = await getDownloadURL(refImage).then((i) => i);
      if (picOrImg === "Img") {
        for (let i = 0; i <= 2; i++) {
          switch (i) {
            case 0: {
              await setDoc(
                doc(bd, "translation", "en"),
                { ABOUT: { [type]: { [picOrImg]: imageUrl } } },
                { merge: true }
              ).then(() => getDataAbout());
            }
            case 1: {
              await setDoc(
                doc(bd, "translation", "pl"),
                { ABOUT: { [type]: { [picOrImg]: imageUrl } } },
                { merge: true }
              ).then(() => getDataAbout());
            }
            case 2: {
              await setDoc(
                doc(bd, "translation", "uk"),
                { ABOUT: { [type]: { [picOrImg]: imageUrl } } },
                { merge: true }
              ).then(() => getDataAbout());
            }
          }
        }
      } else if (picOrImg === "Pic") {
        for (let i = 0; i <= 2; i++) {
          switch (i) {
            case 0: {
              await setDoc(
                doc(bd, "translation", "en"),
                { ABOUT: { [type]: { [picOrImg]: imageUrl } } },
                { merge: true }
              ).then(() => getDataAbout());
            }
            case 1: {
              await setDoc(
                doc(bd, "translation", "pl"),
                { ABOUT: { [type]: { [picOrImg]: imageUrl } } },
                { merge: true }
              ).then(() => getDataAbout());
            }
            case 2: {
              await setDoc(
                doc(bd, "translation", "uk"),
                { ABOUT: { [type]: { [picOrImg]: imageUrl } } },
                { merge: true }
              ).then(() => getDataAbout());
            }
          }
        }
      }
    }
  }
  async function deleteImage(boxtype: string, urlimg?: string) {
    const boxData = await getDocs(collection(bd, "translation"));
    const typeBox = boxtype.split("_")[0];

    for (let i = 0; i <= 2; i++) {
      switch (i) {
        case 0:
          {
            await setDoc(
              doc(bd, "translation", "uk"),
              { ABOUT: { [typeBox]: { Img: "" } } },
              { merge: true }
            );
          }
          break;
        case 1:
          {
            await setDoc(
              doc(bd, "translation", "pl"),
              { ABOUT: { [typeBox]: { Img: "" } } },
              { merge: true }
            );
          }
          break;
        case 2: {
          await setDoc(
            doc(bd, "translation", "en"),
            { ABOUT: { [typeBox]: { Img: "" } } },
            { merge: true }
          ).then(() => {
            getDataAbout(), setValue(boxtype, "");
          });
        }
      }
    }
    if (urlimg || urlimg !== "") {
      const refImage = ref(storage, urlimg);
      await deleteObject(refImage);
    }
  }
  function submitAbout() {}
  useEffect(() => {
    getDataAbout();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(submitAbout)}
      className="translationRoot_content__form"
    >
      <table>
        <thead>
          <tr>{formState}</tr>
          <tr>
            <th>English</th>
            <th>Polski</th>
            <th>Українська</th>
          </tr>
        </thead>
        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td>Заголовок</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.H1}
                defaultValue={dataFormAbout?.en?.ABOUT?.H1}
                className="translationRoot_content__form_textarea"
                {...register("en_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.H1}
                defaultValue={dataFormAbout?.pl?.ABOUT?.H1}
                className="translationRoot_content__form_textarea"
                {...register("pl_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.H1}
                defaultValue={dataFormAbout?.uk?.ABOUT?.H1}
                className="translationRoot_content__form_textarea"
                {...register("uk_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td>Опис</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.P}
                defaultValue={dataFormAbout?.en?.ABOUT?.P}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_P", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.P}
                defaultValue={dataFormAbout?.pl?.ABOUT?.P}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_P", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.P}
                defaultValue={dataFormAbout?.uk?.ABOUT?.P}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_P", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
        </tbody>
        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td>Блок 1</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Фонове зображення</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box1?.Img}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box1?.Img}
                className="translationRoot_content__form_textarea"
                {...register("Box1_Img", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box1?.Img}
                width={"50px"}
                height={"50px"}
              />
            </td>
            <td>
              <button
                onClick={() =>
                  deleteImage("Box1_Img", dataFormAbout?.en?.ABOUT?.Box1?.Img)
                }
              >
                Видалити
              </button>
            </td>
          </tr>
          <tr>
            <td>Піктограма</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box1?.Pic}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box1?.Pic}
                className="translationRoot_content__form_textarea"
                {...register("Box1_Pic", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box1?.Pic}
                width={"50px"}
                height={"50px"}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Заголовок</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box1?.Title}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box1?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Box1_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box1?.Title}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box1?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Box1_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box1?.Title}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box1?.Title}
                className="translationRoot_content__form_textarea"
                {...register("uk_Box1_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td>Опис</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box1?.Desc}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box1?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Box1_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box1?.Desc}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box1?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Box1_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box1?.Desc}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box1?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Box1_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <h4>Блок 2</h4>
          </tr>
          <tr>Фонове зображення</tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box2?.Img}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box2?.Img}
                className="translationRoot_content__form_textarea"
                {...register("Box2_Img", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box2?.Img}
                width={"50px"}
                height={"50px"}
              />
            </td>
            <td>
              <button
                onClick={() =>
                  deleteImage("Box2_Img", dataFormAbout?.en?.ABOUT?.Box2?.Img)
                }
              >
                Видалити
              </button>
            </td>
          </tr>
          <tr>Піктограма</tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box2?.Pic}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box2?.Pic}
                className="translationRoot_content__form_textarea"
                {...register("Box2_Pic", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box2?.Pic}
                width={"50px"}
                height={"50px"}
              />
            </td>
          </tr>
          <tr>Заголовок</tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box2?.Title}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box2?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Box2_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box2?.Title}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box2?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Box2_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box2?.Title}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box2?.Title}
                className="translationRoot_content__form_textarea"
                {...register("uk_Box2_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>Опис</tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box2?.Desc}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box2?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Box2_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box2?.Desc}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box2?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Box2_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box2?.Desc}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box2?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Box2_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <h4>Блок 3</h4>
          </tr>
          <tr>Фонове зображення</tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box3?.Img}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box3?.Img}
                className="translationRoot_content__form_textarea"
                {...register("Box3_Img", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box3?.Img}
                width={"50px"}
                height={"50px"}
              />
            </td>
            <td>
              <button
                onClick={() =>
                  deleteImage("Box3_Img", dataFormAbout?.en?.ABOUT?.Box3?.Img)
                }
              >
                Видалити
              </button>
            </td>
          </tr>
          <tr>Піктограма</tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box3?.Pic}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box3?.Pic}
                className="translationRoot_content__form_textarea"
                {...register("Box3_Pic", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box3?.Pic}
                width={"50px"}
                height={"50px"}
              />
            </td>
          </tr>
          <tr>Заголовок</tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box3?.Title}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box3?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Box3_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box3?.Title}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box3?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Box3_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box3?.Title}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box3?.Title}
                className="translationRoot_content__form_textarea"
                {...register("uk_Box3_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>Опис</tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box3?.Desc}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box3?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Box3_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box3?.Desc}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box3?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Box3_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box3?.Desc}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box3?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Box3_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <h4>Блок 4</h4>
          </tr>
          <tr>Фонове зображення</tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box4?.Img}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box4?.Img}
                className="translationRoot_content__form_textarea"
                {...register("Box4_Img", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box4?.Img}
                width={"50px"}
                height={"50px"}
              />
            </td>
            <td>
              <button
                onClick={() =>
                  deleteImage("Box4_Img", dataFormAbout?.en?.ABOUT?.Box4?.Img)
                }
              >
                Видалити
              </button>
            </td>
          </tr>
          <tr>Піктограма</tr>
          <tr>
            <td>
              <input
                type="file"
                placeholder={dataFormAbout?.en?.ABOUT?.Box4?.Pic}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box4?.Pic}
                className="translationRoot_content__form_textarea"
                {...register("Box4_Pic", {
                  onChange: saveImage,
                })}
              />
            </td>
            <td>
              <img
                src={dataFormAbout?.en?.ABOUT?.Box4?.Pic}
                width={"50px"}
                height={"50px"}
              />
            </td>
          </tr>
          <tr>Заголовок</tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box4?.Title}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box4?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Box4_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box4?.Title}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box4?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Box4_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box4?.Title}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box4?.Title}
                className="translationRoot_content__form_textarea"
                {...register("uk_Box4_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>Опис</tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormAbout?.en?.ABOUT?.Box4?.Desc}
                defaultValue={dataFormAbout?.en?.ABOUT?.Box4?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Box4_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.pl?.ABOUT?.Box4?.Desc}
                defaultValue={dataFormAbout?.pl?.ABOUT?.Box4?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Box4_Desc", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormAbout?.uk?.ABOUT?.Box4?.Desc}
                defaultValue={dataFormAbout?.uk?.ABOUT?.Box4?.Desc}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Box4_Desc", {
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
