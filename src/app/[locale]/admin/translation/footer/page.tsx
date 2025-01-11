"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { app } from "@/bd/firebase";
import {
  getDocs,
  setDoc,
  doc,
  collection,
  getFirestore,
} from "firebase/firestore";
interface DataFooter {
  Map?: {
    H1?: string;
    Service?: string;
    About?: string;
    Price?: string;
    Media?: string;
    Contact?: string;
  };
  Time?: {
    H1?: string;
    Sunday?: string;
    EveryDay?: string;
    Days1?: string;
    Days2?: string;
  };
  Contact?: {
    H1?: string;
    Phone?: string;
    Email?: string;
    Addres?: string;
  };
}
interface TranslationData {
  en?: {
    FOOTER?: DataFooter;
  };
  pl?: {
    FOOTER?: DataFooter;
  };
  uk?: {
    FOOTER?: DataFooter;
  };
}
export default function FooterLang() {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const bd = getFirestore(app);
  const [dataFormFooter, setDataFormFooter] = useState<TranslationData | null>(
    null
  );
  async function getDataFooter() {
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
    setDataFormFooter(spotObg);
  }
  function submitFormFooter() {}
  async function saveData(
    lang: string,
    box: string,
    type: string,
    data: string
  ) {
    const docFooter = doc(bd, "translation", lang);
    await setDoc(
      docFooter,
      { FOOTER: { [box]: { [type]: data } } },
      { merge: true }
    ).then(() => getDataFooter());
  }
  async function handleBlur(e: any) {
    const lang = e.target.name.split("_")[0];
    const box = e.target.name.split("_")[1];
    const type = e.target.name.split("_")[2];
    const data = e.target.value.toString();

    saveData(lang, box, type, data);
  }
  useEffect(() => {
    getDataFooter();
  }, []);
  return (
    <form
      onSubmit={handleSubmit(submitFormFooter)}
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
            <td colSpan={3}>БЛОК З ПОСИЛАННЯМИ</td>
          </tr>
          <tr>
            <td colSpan={3}>Заголовок</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Map?.H1}
                defaultValue={dataFormFooter?.en?.FOOTER?.Map?.H1}
                className="translationRoot_content__form_textarea"
                {...register("en_Map_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Map?.H1}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Map?.H1}
                className="translationRoot_content__form_textarea"
                {...register("pl_Map_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Map?.H1}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Map?.H1}
                className="translationRoot_content__form_textarea"
                {...register("uk_Map_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Наші послуги</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Map?.Service}
                defaultValue={dataFormFooter?.en?.FOOTER?.Map?.Service}
                className="translationRoot_content__form_textarea"
                {...register("en_Map_Service", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Map?.Service}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Map?.Service}
                className="translationRoot_content__form_textarea"
                {...register("pl_Map_Service", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Map?.Service}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Map?.Service}
                className="translationRoot_content__form_textarea"
                {...register("uk_Map_Service", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={3}>Про нас</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Map?.About}
                defaultValue={dataFormFooter?.en?.FOOTER?.Map?.About}
                className="translationRoot_content__form_textarea"
                {...register("en_Map_About", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Map?.About}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Map?.About}
                className="translationRoot_content__form_textarea"
                {...register("pl_Map_About", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Map?.About}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Map?.About}
                className="translationRoot_content__form_textarea"
                {...register("uk_Map_About", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Ціни</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Map?.Price}
                defaultValue={dataFormFooter?.en?.FOOTER?.Map?.Price}
                className="translationRoot_content__form_textarea"
                {...register("en_Map_Price", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Map?.Price}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Map?.Price}
                className="translationRoot_content__form_textarea"
                {...register("pl_Map_Price", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Map?.Price}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Map?.Price}
                className="translationRoot_content__form_textarea"
                {...register("uk_Map_Price", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={3}>Ми в медіа</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Map?.Media}
                defaultValue={dataFormFooter?.en?.FOOTER?.Map?.Media}
                className="translationRoot_content__form_textarea"
                {...register("en_Map_Media", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Map?.Media}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Map?.Media}
                className="translationRoot_content__form_textarea"
                {...register("pl_Map_Media", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Map?.Media}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Map?.Media}
                className="translationRoot_content__form_textarea"
                {...register("uk_Map_Media", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={3}>Контакти</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Map?.Contact}
                defaultValue={dataFormFooter?.en?.FOOTER?.Map?.Contact}
                className="translationRoot_content__form_textarea"
                {...register("en_Map_Contact", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Map?.Contact}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Map?.Contact}
                className="translationRoot_content__form_textarea"
                {...register("pl_Map_Contact", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Map?.Contact}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Map?.Contact}
                className="translationRoot_content__form_textarea"
                {...register("uk_Map_Contact", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
        </tbody>

        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td colSpan={3}>ЧАС ПРАЦІ</td>
          </tr>
          <tr>
            <td colSpan={3}>Заголовок</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Time?.H1}
                defaultValue={dataFormFooter?.en?.FOOTER?.Time?.H1}
                className="translationRoot_content__form_textarea"
                {...register("en_Time_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Time?.H1}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Time?.H1}
                className="translationRoot_content__form_textarea"
                {...register("pl_Time_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Time?.H1}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Time?.H1}
                className="translationRoot_content__form_textarea"
                {...register("uk_Time_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Неділя</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Time?.Sunday}
                defaultValue={dataFormFooter?.en?.FOOTER?.Time?.Sunday}
                className="translationRoot_content__form_textarea"
                {...register("en_Time_Sunday", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Time?.Sunday}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Time?.Sunday}
                className="translationRoot_content__form_textarea"
                {...register("pl_Time_Sunday", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Time?.Sunday}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Time?.Sunday}
                className="translationRoot_content__form_textarea"
                {...register("uk_Time_Sunday", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Час роботи в неділю</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Time?.Days2}
                defaultValue={dataFormFooter?.en?.FOOTER?.Time?.Days2}
                className="translationRoot_content__form_textarea"
                {...register("en_Time_Days2", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Time?.Days2}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Time?.Days2}
                className="translationRoot_content__form_textarea"
                {...register("pl_Time_Days2", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Time?.Days2}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Time?.Days2}
                className="translationRoot_content__form_textarea"
                {...register("uk_Time_Days2", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              Будні
            </td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Time?.EveryDay}
                defaultValue={dataFormFooter?.en?.FOOTER?.Time?.EveryDay}
                className="translationRoot_content__form_textarea"
                {...register("en_Time_EveryDay", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Time?.EveryDay}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Time?.EveryDay}
                className="translationRoot_content__form_textarea"
                {...register("pl_Time_EveryDay", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Time?.EveryDay}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Time?.EveryDay}
                className="translationRoot_content__form_textarea"
                {...register("uk_Time_EveryDay", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Чaс роботи в будні</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Time?.Days1}
                defaultValue={dataFormFooter?.en?.FOOTER?.Time?.Days1}
                className="translationRoot_content__form_textarea"
                {...register("en_Time_Days1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Time?.Days1}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Time?.Days1}
                className="translationRoot_content__form_textarea"
                {...register("pl_Time_Days1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Time?.Days1}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Time?.Days1}
                className="translationRoot_content__form_textarea"
                {...register("uk_Time_Days1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
        </tbody>

        <tbody className="translationRoot_content__form_tbody">
          <tr>
            <td colSpan={3}>КОНТАКТИ</td>
          </tr>
          <tr>
            <td colSpan={3}>Заголовок</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Contact?.H1}
                defaultValue={dataFormFooter?.en?.FOOTER?.Contact?.H1}
                className="translationRoot_content__form_textarea"
                {...register("en_Contact_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Contact?.H1}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Contact?.H1}
                className="translationRoot_content__form_textarea"
                {...register("pl_Contact_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Contact?.H1}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Contact?.H1}
                className="translationRoot_content__form_textarea"
                {...register("uk_Contact_H1", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Номер телефону</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Contact?.Phone}
                defaultValue={dataFormFooter?.en?.FOOTER?.Contact?.Phone}
                className="translationRoot_content__form_textarea"
                {...register("en_Contact_Phone", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Contact?.Phone}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Contact?.Phone}
                className="translationRoot_content__form_textarea"
                {...register("pl_Contact_Phone", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Contact?.Phone}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Contact?.Phone}
                className="translationRoot_content__form_textarea"
                {...register("uk_Contact_Phone", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Email</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Contact?.Email}
                defaultValue={dataFormFooter?.en?.FOOTER?.Contact?.Email}
                className="translationRoot_content__form_textarea"
                {...register("en_Contact_Email", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Contact?.Email}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Contact?.Email}
                className="translationRoot_content__form_textarea"
                {...register("pl_Contact_Email", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Contact?.Email}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Contact?.Email}
                className="translationRoot_content__form_textarea"
                {...register("uk_Contact_Email", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Адреса</td>
          </tr>
          <tr>
            <td>
              <textarea
                placeholder={dataFormFooter?.en?.FOOTER?.Contact?.Addres}
                defaultValue={dataFormFooter?.en?.FOOTER?.Contact?.Addres}
                className="translationRoot_content__form_textarea"
                {...register("en_Contact_Addres", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.pl?.FOOTER?.Contact?.Addres}
                defaultValue={dataFormFooter?.pl?.FOOTER?.Contact?.Addres}
                className="translationRoot_content__form_textarea"
                {...register("pl_Contact_Addres", {
                  minLength: { value: 15, message: "Мінімум 15 символів" },
                  onBlur: handleBlur,
                })}
              />
            </td>
            <td>
              <textarea
                placeholder={dataFormFooter?.uk?.FOOTER?.Contact?.Addres}
                defaultValue={dataFormFooter?.uk?.FOOTER?.Contact?.Addres}
                className="translationRoot_content__form_textarea"
                {...register("uk_Contact_Addres", {
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
