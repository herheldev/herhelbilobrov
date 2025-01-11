"use client";

import {
  doc,
  setDoc,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/bd/firebase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface WhyData {
  Box1: {
    Title: string;
    Descrip: string;
    Img: string[];
  };
  Box2: {
    Title: string;
    Descrip: string;
    Img: string[];
  };
  Box3: {
    Title: string;
    Descrip: string;
    Img: string[];
  };
}
interface TranslationData {
  uk?: {
    WHY?: WhyData;
  };
  en?: {
    WHY?: WhyData;
  };
  pl?: {
    WHY?: WhyData;
  };
}
export default function WhyLang() {
  const bd = getFirestore(app);
  const storage = getStorage(app);
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const [dataFormWhy, setDataFormWhy] = useState<TranslationData | null>(null);
  async function getDataWhy() {
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

    setDataFormWhy(spotObg);
  }
  async function submitData() {}
  async function saveData(
    lang: string,
    box: string,
    type: string,
    data: string
  ) {
    const docWhy = doc(bd, "translation", lang);
    await setDoc(
      docWhy,
      { WHY: { [box]: { [type]: data } } },
      { merge: true }
    ).then(() => getDataWhy());
  }
  async function handlerBlur(e: any) {
    const lang = e.target.name.split("_")[0];
    const box = e.target.name.split("_")[1];
    const type = e.target.name.split("_")[2];
    const data = e.target.value.toString();

    saveData(lang, box, type, data);
  }
  async function deleteImage(id:string) {
    
  }
  async function saveImage(e: any) {
    const nameFile = e.target.files[0].name;
    const box: string = e.target.name.split("_")[0];
    const indexImg = parseInt(e.target.name.split("_")[1].slice(-1)) - 1;
    const refImg = ref(storage, nameFile);
    const mobObj: any = {};
    let mobArr: any = [];
    if (!e.target.files || e.target.files.length === 0) {
      console.log("Файл не вибраний.");
      return;
    } else {
      (await getDocs(collection(bd, "translation"))).forEach((doc) => {
        switch (doc.id) {
          case "en":
            {
              mobObj.en = doc.data();
            }
            break;
          case "uk":
            {
              mobObj.uk = doc.data();
            }
            break;
          case "pl":
            {
              mobObj.pl = doc.data();
            }
            break;
        }
      });
      await uploadBytes(refImg, e.target.files[0]);
      const urlImg = await getDownloadURL(refImg).then((i) => i);
      if(Array.isArray(mobObj?.en?.WHY?.[box]?.Img)){
        mobArr = [...mobObj?.en?.WHY?.[box]?.Img];
        mobArr[indexImg] = urlImg
        const newArray = Array.from(mobArr, i => i === undefined ? "" : i);
        for(let i = 0; i <= 2; i++){
          switch(i){
            case 0: {
              await setDoc(doc(bd, "translation", "en"), {WHY:{[box]: {Img: newArray}}},{merge:true})
            }
            break;
            case 1: {
              await setDoc(doc(bd, "translation", "pl"), {WHY:{[box]: {Img: newArray}}},{merge:true})
            }
            break;
            case 2: {
              await setDoc(doc(bd, "translation", "uk"), {WHY:{[box]: {Img: newArray}}},{merge:true}).then(()=> getDataWhy())
            }
            break;
          }
        }
        
        
        
        
        
      } else {
        mobArr[indexImg] = urlImg;
        const newArr = Array.from(mobArr, i => i === undefined ? "" : i)
        for(let i = 0; i <= 2; i++){
          switch(i){
            case 0: {
              await setDoc(doc(bd, "translation", "en"), {WHY:{[box]: {Img: newArr}}},{merge:true})
            }
            break;
            case 1: {
              await setDoc(doc(bd, "translation", "pl"), {WHY:{[box]: {Img: newArr}}},{merge:true})
            }
            break;
            case 2: {
              await setDoc(doc(bd, "translation", "uk"), {WHY:{[box]: {Img: newArr}}},{merge:true}).then(()=> getDataWhy())
            }
            break;
          }
        }
        
        
      }
      
      
    }
  }
  useEffect(() => {
    getDataWhy();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(submitData)}
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
        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td colSpan={3}>Блок 1</td>
          </tr>
          <tr>
            <td colSpan={3}>Заголовок</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormWhy?.en?.WHY?.Box1?.Title}
                defaultValue={dataFormWhy?.en?.WHY?.Box1?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Box1_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.pl?.WHY?.Box1?.Title}
                defaultValue={dataFormWhy?.pl?.WHY?.Box1?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Box1_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.uk?.WHY?.Box1?.Title}
                defaultValue={dataFormWhy?.uk?.WHY?.Box1?.Title}
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
                placeholder={dataFormWhy?.en?.WHY?.Box1?.Descrip}
                defaultValue={dataFormWhy?.en?.WHY?.Box1?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Box1_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.pl?.WHY?.Box1?.Descrip}
                defaultValue={dataFormWhy?.pl?.WHY?.Box1?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Box1_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.uk?.WHY?.Box1?.Descrip}
                defaultValue={dataFormWhy?.uk?.WHY?.Box1?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Box1_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className="translationRoot_content__form_label-img-wrap">
                <label
                  htmlFor="box1_img1"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box1_img1"
                    type="file"
                    {...register("Box1_Img1", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box1?.Img?.[0]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box1_img2"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box1_img2"
                    type="file"
                    {...register("Box1_Img2", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box1?.Img?.[1]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box1_img3"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box1_img3"
                    type="file"
                    {...register("Box1_Img3", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box1?.Img?.[2]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box1_img4"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box1_img4"
                    type="file"
                    {...register("Box1_Img4", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box1?.Img?.[3]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box1_img5"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box1_img5"
                    type="file"
                    {...register("Box1_Img5", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box1?.Img?.[4]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box1_img6"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box1_img6"
                    type="file"
                    {...register("Box1_Img6", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box1?.Img?.[5]}
                  />
                  <button>X</button>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
        {/* БЛОК 2 */}
        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td>Блок 2</td>
            <td></td>
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
                placeholder={dataFormWhy?.en?.WHY?.Box2?.Title}
                defaultValue={dataFormWhy?.en?.WHY?.Box2?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Box2_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.pl?.WHY?.Box2?.Title}
                defaultValue={dataFormWhy?.pl?.WHY?.Box2?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Box2_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
              
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.uk?.WHY?.Box2?.Title}
                defaultValue={dataFormWhy?.uk?.WHY?.Box2?.Title}
                className="translationRoot_content__form_textarea"
                {...register("uk_Box2_Title", {
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
                placeholder={dataFormWhy?.en?.WHY?.Box2?.Descrip}
                defaultValue={dataFormWhy?.en?.WHY?.Box2?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Box2_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.pl?.WHY?.Box2?.Descrip}
                defaultValue={dataFormWhy?.pl?.WHY?.Box2?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Box2_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.uk?.WHY?.Box2?.Descrip}
                defaultValue={dataFormWhy?.uk?.WHY?.Box2?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Box2_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className="translationRoot_content__form_label-img-wrap">
                <label
                  htmlFor="box2_img1"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box2_img1"
                    type="file"
                    {...register("Box2_Img1", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.uk?.WHY?.Box2?.Img?.[0]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box2_img2"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box2_img2"
                    type="file"
                    {...register("Box2_Img2", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.uk?.WHY?.Box2?.Img?.[1]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box2_img3"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box2_img3"
                    type="file"
                    {...register("Box2_Img3", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.uk?.WHY?.Box2?.Img?.[2]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box2_img4"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box2_img4"
                    type="file"
                    {...register("Box2_Img4", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.uk?.WHY?.Box2?.Img?.[3]}
                  />
                  <button>X</button>
                </label>

                <label
                  htmlFor="box2_img5"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box2_img5"
                    type="file"
                    {...register("Box2_Img5", {
                      onChange: saveImage,
                    })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.uk?.WHY?.Box2?.Img?.[4]}
                  />
                  <button>X</button>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        {/* БЛОК 3 */}
        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td colSpan={3}>Блок 3</td>
          </tr>
          <tr>
            <td colSpan={3}>Заголовок</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormWhy?.en?.WHY?.Box3?.Title}
                defaultValue={dataFormWhy?.en?.WHY?.Box3?.Title}
                className="translationRoot_content__form_textarea"
                {...register("en_Box3_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.pl?.WHY?.Box3?.Title}
                defaultValue={dataFormWhy?.pl?.WHY?.Box3?.Title}
                className="translationRoot_content__form_textarea"
                {...register("pl_Box3_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.uk?.WHY?.Box3?.Title}
                defaultValue={dataFormWhy?.uk?.WHY?.Box3?.Title}
                className="translationRoot_content__form_textarea"
                {...register("uk_Box3_Title", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Опис</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormWhy?.en?.WHY?.Box3?.Descrip}
                defaultValue={dataFormWhy?.en?.WHY?.Box3?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("en_Box3_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.pl?.WHY?.Box3?.Descrip}
                defaultValue={dataFormWhy?.pl?.WHY?.Box3?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("pl_Box3_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormWhy?.uk?.WHY?.Box3?.Descrip}
                defaultValue={dataFormWhy?.uk?.WHY?.Box3?.Descrip}
                className="translationRoot_content__form_textarea translationRoot_content__form_textarea_p"
                {...register("uk_Box3_Descrip", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handlerBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className="translationRoot_content__form_label-img-wrap">
                <label
                  htmlFor="box3_img1"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box3_img1"
                    type="file"
                    {...register("Box3_Img1", { onChange: saveImage })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box3?.Img?.[0]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box3_img2"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box3_img2"
                    type="file"
                    {...register("Box3_Img2", { onChange: saveImage })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box3?.Img?.[1]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box3_img3"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box3_img3"
                    type="file"
                    {...register("Box3_Img3", { onChange: saveImage })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box3?.Img?.[2]}
                  />
                  <button>X</button>
                </label>
                <label
                  htmlFor="box3_img4"
                  className="translationRoot_content__form_input-file-img-small"
                >
                  <input
                    id="box3_img4"
                    type="file"
                    {...register("Box3_Img4", { onChange: saveImage })}
                  />
                  <img
                    width={"50px"}
                    height={"50px"}
                    src={dataFormWhy?.en?.WHY?.Box3?.Img?.[3]}
                  />
                  <button>X</button>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
