"use client"
import { useForm } from "react-hook-form";
import "./AdminServices.scss";
import { useState } from "react";
import { app } from "../../bd/firebase";
import {
  getFirestore,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { TRUE } from "sass";
import { set } from "firebase/database";
import AddSvg from "../Icon/AddSvg";
import AllListSvg from "../Icon/AllListSvg";
const ItemEditServiceCurrent = ({ data, regist, objValid }) => {
  const length = data.pl.item.length;
  const [arrItem, setArrItem] = useState([]);

  useEffect(() => {
    const mobArr = [];
    for (let i = 0; i < length; i++) {
      const namePl = Object.keys(data.pl.item[i]);
      const nameEn = Object.keys(data.en.item[i]);

      mobArr.push(
        <>
          <input
            type="text"
            defaultValue={namePl}
            placeholder={namePl}
            {...regist(`item${i + 1}PL`, objValid)}
          />

          <input
            type="text"
            defaultValue={nameEn}
            placeholder={nameEn}
            {...regist(`item${i + 1}EN`, objValid)}
          />
          <input
            type="number"
            defaultValue={Object.values(data.pl.item[i])[0]}
            placeholder={Object.values(data.pl.item[i])[0]}
            {...regist(`item${i + 1}Price`)}
          />
        </>
      );
    }

    setArrItem(mobArr);
  }, [data]);
  return (
    <>
      {arrItem.map((item) => (
        <div key={Math.random()}>{item}</div>
      ))}
    </>
  );
};
const ItemEditService = ({ fullData, setFullData, data, upload }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ mode: "onChange" });
  const db = getFirestore(app);

  const updateDataService = async (dataObj) => {
    const docRef = doc(db, "service", data.id);
    const resultObj = {};

    const itemCount = (Object.keys(dataObj).length - 6) / 3;
    const objUpdatePL = {
      nameService: dataObj.nameServicePL,
      titleService: dataObj.titleServicePL,
      pService: dataObj.pServicePL,
      item: [],
    };

    const objUpdateEN = {
      nameService: dataObj.nameServiceEN,
      titleService: dataObj.titleServiceEN,
      pService: dataObj.pServiceEN,
      item: [],
    };

    for (let i = 1; i <= itemCount; i++) {
      const mobObjEN = {};
      const mobObjPL = {};

      mobObjEN[dataObj[`item${i}EN`]] = dataObj[`item${i}Price`];
      objUpdateEN.item.push(mobObjEN);
      mobObjPL[dataObj[`item${i}PL`]] = dataObj[`item${i}Price`];
      objUpdatePL.item.push(mobObjPL);
    }
    (resultObj.id = data.id),
      (resultObj.pl = objUpdatePL),
      (resultObj.en = objUpdateEN);

    await updateDoc(docRef, { pl: objUpdatePL, en: objUpdateEN })
      .then(async () => {
        alert("Зміни збережено");
      })
      .catch(() => alert("Помилка"));
    const arrBool = fullData.filter((item) => item.id != data.id);
    arrBool.push(resultObj);
    setFullData(arrBool);
  };
  const deleteService = async (id) => {
    const docRef = doc(db, "service", id);
    const answer = confirm("Ви впенені що хочете видалити послугу?");
    if (answer) {
      await deleteDoc(docRef)
        .then(() => {
          alert("Успішно видалено"), upload();
        })
        .catch(() => console.log("Помилка"));
    } else {
      return;
    }
    // await deleteDoc(docRef)
  };
  useEffect(() => {
    reset();
  }, [data]);
  return (
    <>
      {data === null ? (
        <h1>Завантаження</h1>
      ) : (
        <form
          onSubmit={handleSubmit(updateDataService)}
          className="admin-services__content_form"
        >
          <div className="admin-services__content_form-row">
            <h2>Назва послуга</h2>
          </div>
          <div className="admin-services__content_form-row">
            <label>
              PL{" "}
              {errors?.nameServicePL?.message && (
                <span style={{ color: "red" }}>
                  {errors.nameServicePL.message}
                </span>
              )}
              <input
                type="text"
                placeholder={data.pl.nameService}
                defaultValue={data.pl.nameService}
                {...register("nameServicePL", {
                  required: {
                    value: true,
                    message: "Поле не може бути пустим",
                  },
                  minLength: {
                    value:1,
                    message: "Мінімум 10 символів",
                  },
                })}
              />
            </label>
            <label>
              EN{" "}
              {errors?.nameServiceEN?.message && (
                <span style={{ color: "red" }}>
                  {errors.nameServiceEN.message}
                </span>
              )}
              <input
                type="text"
                defaultValue={data.en.nameService}
                placeholder={data.en.nameService}
                {...register("nameServiceEN", {
                  required: {
                    value: true,
                    message: "Поле не може бути пустим",
                  },
                  minLength: {
                    value: 1,
                    message: "Мінімум 10 символів",
                  },
                })}
              />
            </label>
          </div>
          <div className="admin-services__content_form-row">
            <h2>Заголовок послуги</h2>
          </div>
          <div className="admin-services__content_form-row">
            <label>
              PL{" "}
              {errors?.titleServicePL?.message && (
                <span style={{ color: "red" }}>
                  {errors.titleServicePL.message}
                </span>
              )}
              <input
                type="text"
                defaultValue={data.pl.titleService}
                placeholder={data.pl.titleService}
                {...register("titleServicePL", {
                  required: {
                    value: true,
                    message: "Поле не може бути пустим",
                  },
                  minLength: {
                    value: 1,
                    message: "Мінімум 10 символів",
                  },
                })}
              />
            </label>
            <label>
              EN{" "}
              {errors?.titleServiceEN?.message && (
                <span style={{ color: "red" }}>
                  {errors.titleServiceEN.message}
                </span>
              )}
              <input
                type="text"
                defaultValue={data.en.titleService}
                placeholder={data.en.titleService}
                {...register("titleServiceEN", {
                  required: {
                    value: true,
                    message: "Поле не може бути пустим",
                  },
                  minLength: {
                    value: 1,
                    message: "Мінімум 10 символів",
                  },
                })}
              />
            </label>
          </div>
          <div className="admin-services__content_form-row">
            <h2>Опис послуги</h2>
          </div>
          <div className="admin-services__content_form-row">
            <label>
              PL{" "}
              {errors?.pServicePL?.message && (
                <span style={{ color: "red" }}>
                  {errors.pServicePL.message}
                </span>
              )}
              <input
                type="text"
                defaultValue={data.pl.pService}
                placeholder={data.pl.pService}
                {...register("pServicePL", {
                  required: {
                    value: true,
                    message: "Поле не може бути пустим",
                  },
                  minLength: {
                    value: 1,
                    message: "Мінімум 10 символів",
                  },
                })}
              />
            </label>
            <label>
              EN{" "}
              {errors?.pServiceEN?.message && (
                <span style={{ color: "red" }}>
                  {errors.pServiceEN.message}
                </span>
              )}
              <input
                type="text"
                defaultValue={data.en.pService}
                placeholder={data.en.pService}
                {...register("pServiceEN", {
                  required: {
                    value: true,
                    message: "Поле не може бути пустим",
                  },
                  minLength: {
                    value: 1,
                    message: "Мінімум 10 символів",
                  },
                })}
              />
            </label>
          </div>
          <div className="admin-services__content_form-row">
            <h2>Ціни та назва послуги</h2>
          </div>
          <div className="admin-services__content_form-column">
            <ItemEditServiceCurrent
              data={data}
              regist={register}
              objValid={{
                required: {
                  value: true,
                  message: "Поле не може бути пустим",
                },
                minLength: {
                  value: 1,
                  message: "Мінімум 5 символів",
                },
              }}
            />
          </div>
          <div className="admin-services__content_form-row">
            <button disabled={!isValid}>Записати зміни</button>
            <button type="button" onClick={() => deleteService(data.id)}>
              Видалити
            </button>
          </div>
        </form>
      )}
    </>
  );
};

const ItemService = ({ regist, count, errors, validobj }) => {
  console.log(errors[`item${count}PL`]?.message);
  return (
    <>
    <label>
      PL
     
      
    <input
        type="text"
        placeholder="Послуга PL"
        {...regist(`item${count}PL`, validobj)}
      />
      Мінімум 5 символів
    </label>
     <label>
      EN
     <input
        type="text"
        placeholder="Послуга EN"
        {...regist(`item${count}EN`, validobj)}
      />
      Мінімум 5 символів
     </label>
      <label>
        Ціна
      <input
        type="number"
        placeholder="Ціна"
        {...regist(`item${count}Price`, {minLength: 1})}
      />
      </label>
      
    </>
  );
};
const AdminServices = () => {
  
  const {
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { errors: errors1, isValid: isValid1, isSubmitSuccessful },
    register: register1,
  } = useForm({ mode: "onChange" });
  const [countItem, setCountItem] = useState(1);
  const [addAndEditService, setAddAndEditService] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [dataService, setDataService] = useState([]);
  const [stateFormAdd, setStateFormAdd] = useState(null);
  const [showMobile, setShowMobile] = useState(false)
  const initialItemService = [
    <ItemService regist={register1} count={1} errors={errors1} validobj={{
      required:{value: true, message: "Поле не може бути пустим"},
      minLength: {value: 1, message: "Мінімум 5 символів"}
    }}/>,
  ]
  const [itemService, setItemService] = useState(initialItemService);
  const db = getFirestore(app);

  const saveService = async (data) => {
    setStateFormAdd(false);
    const objPL = {
      nameService: data.nameServicePL,
      titleService: data.titleServicePL,
      pService: data.pServicePL,
      item: [],
    };
    for (let i = 1; i <= countItem; i++) {
      const mobObj = {};
      mobObj[data[`item${i}PL`]] = data[`item${i}Price`];
      objPL.item.push(mobObj);
    }

    const objEN = {
      nameService: data.nameServiceEN,
      titleService: data.titleServiceEN,
      pService: data.pServiceEN,
      item: [],
    };
    for (let i = 1; i <= countItem; i++) {
      const mobObj = {};
      mobObj[data[`item${i}EN`]] = data[`item${i}Price`];

      objEN.item.push(mobObj);
    }
    console.log(data);
    await addDoc(collection(db, "service"), { pl: objPL, en: objEN }).then(
      () => {
        alert("Зміни збережені")
        setStateFormAdd(null)
        setCountItem(1)
        setItemService(initialItemService)
        setAddAndEditService(false)

        getServiceData();
      }
    );

    
  };

  const addItem = () => {
    setItemService([
      ...itemService,
      <ItemService regist={register1} count={countItem + 1} errors={errors1} validobj={{
        required:{value: true, message: "Поле не може бути пустим"},
        minLength: {value: 1, message: "Мінімум 10 символів"}
      }} />,
    ]);

    setCountItem(countItem + 1);
  };

  const deleteItem = () => {
    setItemService(itemService.filter((item) => item.props.count != countItem));
    setCountItem(countItem - 1);
  };
  const getServiceData = async (id) => {
    const dataRef = await getDocs(collection(db, "service"));
    const mobArr = [];
    dataRef.forEach((doc) => {
      const mobObj = doc.data();
      (mobObj.id = doc.id), mobArr.push(mobObj);
    });
    setDataService(mobArr);
    setItemId(mobArr[0]);
  };
  const showServiceEdit = async (id) => {
    setAddAndEditService(false);
    setItemId(dataService.filter((item) => item.id === id)[0]);
  };
  useEffect(() => {
    getServiceData();
    
  }, []);
  useEffect(()=>{
reset1()
  },[isSubmitSuccessful])

  window.addEventListener("resize", ()=>{
    if(window.innerWidth > 767){
      setShowMobile(false)
    }
  })
  return (
    <div className="admin-services">
      <div className="admin-services__mobile">
        <button onClick={()=>setShowMobile(true)}><AllListSvg/></button>
        <button onClick={()=>{setShowMobile(false),setAddAndEditService(true)}}><AddSvg/></button>
        
      </div>
      <div className="admin-services__type" style={{display: showMobile && "flex"}}>
        <button
          className="admin-services__type_add-btn"
          onClick={() => {
            
            setAddAndEditService(true); setItemId(null);
          }}
        >
          Додати послугу
        </button>

        <ul>
          {dataService.map((item) => (
            <li key={item.id}>
              <button
                className={
                  itemId?.id === item.id && itemId != null
                    ? "admin-active-btn"
                    : ""
                }
                onClick={() => {setShowMobile(false);showServiceEdit(item.id)}}
              >
                {item.pl.nameService}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-services__content" style={{display: showMobile && "none"}}>
        {addAndEditService ? (
          <form
            className="admin-services__content_form"
            onSubmit={handleSubmit1(saveService)}
          >
            <div className="admin-services__content_form-row">
              <h2>Дайте назву категорії послуги</h2>
            </div>
            <div className="admin-services__content_form-row">
              <label>
                PL{" "}
                {errors1?.nameServicePL && <span style={{color: "red"}}>{errors1.nameServicePL.message}</span>}
                <input
                  type="text"
                  placeholder="Назва послуги PL"
                  {...register1("nameServicePL", {
                    required:{value: true, message: "Поле не може бути пустим"},
                    minLength: {value: 1, message: "Мінімум 10 символів"}
                  })}
                />
              </label>

              <label>
                EN{" "}
                {errors1?.nameServiceEN && <span style={{color: "red"}}>{errors1.nameServiceEN.message}</span>}
                <input
                  type="text"
                  placeholder="Назва послуги EN"
                  {...register1("nameServiceEN", {
                    required:{value: true, message: "Поле не може бути пустим"},
                    minLength: {value: 1, message: "Мінімум 10 символів"}
                  })}
                />
              </label>
            </div>
            <div className="admin-services__content_form-row">
              <h2>Тут можна додати короткий заголовок або фразу тригер</h2>
            </div>
            <div className="admin-services__content_form-row">
              <label>
                PL{" "}
                {errors1?.titleServicePL && <span style={{color: "red"}}>{errors1.titleServicePL.message}</span>}
              <input
                type="text"
                placeholder="Заголовок PL"
                {...register1("titleServicePL", {
                  required:{value: true, message: "Поле не може бути пустим"},
                  minLength: {value: 1, message: "Мінімум 10 символів"}
                })}
              />
              </label>
              <label>
              EN{" "}
                {errors1?.titleServiceEN && <span style={{color: "red"}}>{errors1.titleServiceEN.message}</span>}
              <input
                type="text"
                placeholder="Заголовок EN"
                {...register1("titleServiceEN", {
                  required:{value: true, message: "Поле не може бути пустим"},
                  minLength: {value: 1, message: "Мінімум 10 символів"}
                })}
              />
              </label>
              
            </div>
            <div className="admin-services__content_form-row">
              <h2>Опишіть свою послугу</h2>
            </div>
            <div className="admin-services__content_form-row">
              <label>
                PL{" "}
                {errors1?.pServicePL && <span style={{color: "red"}}>{errors1.pServicePL.message}</span>}
              <input
                type="text"
                placeholder="Опис PL"
                {...register1("pServicePL", {
                  required:{value: true, message: "Поле не може бути пустим"},
                  minLength: {value: 1, message: "Мінімум 10 символів"}
                })}
              />
              </label>
              <label>
                EN{" "}
                {errors1?.pServiceEN && <span style={{color: "red"}}>{errors1.pServiceEN.message}</span>}
              <input
                type="text"
                placeholder="Опис EN"
                {...register1("pServiceEN", {
                  required:{value: true, message: "Поле не може бути пустим"},
                  minLength: {value: 1, message: "Мінімум 10 символів"}
                })}
              />
              </label>
              
            </div>
            <div className="admin-services__content_form-row">
              <h2>Додайте конкретну назву послуги та її ціну</h2>
              <button type="button" onClick={() => deleteItem()}>
                -
              </button>
              <button type="button" onClick={() => addItem()}>
                +
              </button>
            </div>

            <div className="admin-services__content_form-column">
              
              {itemService.map((item) => (
                
                <div key={item.props.count}>{item}</div>
              ))}
            </div>
            <div className="admin-services__content_form-row">
              <button disabled={!isValid1}>
                {stateFormAdd === null && "Додати послугу"}
                {stateFormAdd === true && "Зміни зьережено"}
                {stateFormAdd === false && "Йде збереження"}
              </button>
            </div>
          </form>
        ) : (
          <ItemEditService
            fullData={dataService}
            setFullData={setDataService}
            data={itemId}
            upload={getServiceData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminServices;
