import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { app } from "@/bd/firebase";
import { getDoc, setDoc, doc,collection, getFirestore } from "firebase/firestore";
export default function FormAddLocalAdmin({
  state,
  setStateForm,
  setState,
  getData,
}: {
  state: any;
  setStateForm: any;
  setState: any;
  getData: any
}) {
  const { handleSubmit, register, reset, getValues, formState: {isValid} } = useForm({
    mode: "onSubmit",
  });
  const bd = getFirestore(app);
  async function submitForm(data:any) {
    const docLocal = doc(bd, 'products', 'local');
    let nameLocal = "";
for (const key in data) {

 if(key.includes("en")){
 nameLocal = data[key].split(" ").join("");
 console.log(nameLocal);
 
 }
 
}
    await setDoc(docLocal, {[nameLocal]: data}, {merge: true}).then(()=>{
      setState(false)
      getData()
    })
    
  }

  useEffect(() => {
    if (state === false) {
      reset();
    }
  }, [state]);
  
  return (
    <form
      onMouseLeave={() => {
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
      }}
      onSubmit={handleSubmit(submitForm)}
      className="admin-modal_window_form"
    >
      <label>
        Назва локалі Українською:
        <input type="text" {...register("uk_loc", {required: {value: true, message: "Поле обовязкове до завпонення"}})} />
      </label>
      <label>
        Назва локалі Польскою:
        <input type="text" {...register("pl_loc", {required: {value: true, message: "Поле обовязкове до завпонення"}})} />
      </label>
      <label>
        Назва локалі Англійською:
        <input type="text" {...register("en_loc", {required: {value: true, message: "Поле обовязкове до завпонення"}})} />
      </label>

      <button type="submit" className="btn-admin-main" disabled={!isValid}>
        Зберегти
      </button>
    </form>
  );
}
