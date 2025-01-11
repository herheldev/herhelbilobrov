"use client"
import { useForm } from "react-hook-form";
import {
  getFirestore,
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";
import { app } from "../../bd/firebase";
import "./AdminMedia.scss";
import { useEffect, useState } from "react";
const AdminMediaArticle = ({ urlPost, urlImg, id, title, delItem }: {urlPost:string, urlImg:string, id:string, title:string, delItem:any}) => {
  return (
    <article className="admin-media__article" >
      <a href={urlPost}>
        <img src={urlImg} />
        <h2>{title}</h2>
      </a>
      <button onClick={() => delItem(id)}>Видалити</button>
    </article>
  );
};
const AdminMedia = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    register,
  } = useForm({ mode: "onChange" });
  const [mediaData, setMediaData] = useState([]);
  const db = getFirestore(app);
  const addMedia = async (data:any) => {
    
    await addDoc(collection(db, "media"), {
      img: data.urlImg,
      url: data.urlPost,
      title: data.title,
    });
    
    reset();
    getMedia()
  };
  const getMedia = async () => {
    const getData = await getDocs(collection(db, "media"));
    const mobArr:any = [];
    getData.forEach((doc) => {
      const mobObj = doc.data();
      mobObj.id = doc.id;
      mobArr.push(mobObj);
    });
    setMediaData(mobArr);
  };
  const deleteItem = async (id:any) => {
    await deleteDoc(doc(db,"media", id))
    const mobArr = [...mediaData];
    setMediaData(mobArr.filter((item:any) => item.id != id));
  };
  useEffect(() => {
    getMedia();
  }, []);
  return (
    <div className="admin-media">
      <div className="admin-media__add">
        <h1>Додайте згадки про вас в медіа</h1>
        <p>
          В цьому розділі ви зможете керувати Ваши згадками в ЗМІ - легко і
          просто
        </p>
        <form onSubmit={handleSubmit(addMedia)}>
          <input
            type="text"
            placeholder="Посилання на зображення"
            {...register("urlImg", { required: { value: true , message: "asd"}, pattern:{
              value: /\.(jpg|jpeg|png|gif)$/i,
              message: "Не коректне посилання на зображення"
            } })}
          />
          <div className="admin-media__add_error">
          {errors?.urlImg && (String(errors?.urlImg?.message) || "Помилка")}
          </div>
          
          <input
            type="text"
            placeholder="Посилання на статтю"
            {...register("urlPost", { required: { value: true,message: "asd" }, pattern: {value: /^(https?:\/\/)?([\w-]+\.)*[\w-]+(:\d{1,5})?(\/[\w-./?%&=]*)?$/i, message: "Ви ввели не посилання"} })}
          ></input>
          <div className="admin-media__add_error">
          {errors?.urlPost && (String(errors?.urlPost?.message) || "Помилка")}
          </div>
          <input
            type="text"
            placeholder="Короткий заголовок"
            {...register("title", { required: { value: true,message: "asd" },minLength:{value:25, message: "Мінімум 25 символів"}, maxLength: {value: 100, message: "Занадто довгий заголовок"} })}
          ></input>
          <div className="admin-media__add_error">
          {errors?.title && (String(errors?.title?.message) || "Помилка")}
          </div>
          <button disabled={!isValid}>Додати</button>
        </form>
      </div>
      <div className="admin-media__content">
        {mediaData.map((item:any) => (
          <AdminMediaArticle
            delItem={deleteItem}
            key={item.id}
            id={item.id}
            title={item.title}
            urlImg={item.img}
            urlPost={item.url}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminMedia;
