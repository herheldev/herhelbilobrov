"use client"
import "./AdminMessage.scss";
import { app } from "../../bd/firebase";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import DoneSvg from "../Icon/DoneSvg";
import DoneAllSvg from "../Icon/DoneAllSvg";
import DeleteSvg from "../Icon/DeleteSvg";
const PopUp = ({ update, message, name, status, time, data, timeId } : {[key:string]: any}) => {
  const [statusRead, setStatusRead] = useState(status);
  const db = getFirestore(app);
  const updateReed = async (id:any) => {
    if (statusRead) {
      return;
    } else {
      setStatusRead(true);
      const docRef = doc(db, "message", data.phone);
      await getDoc(docRef)
        .then((doc:any) => {
          const arrToUpdate = doc.data().message;
          const indexToUpdate = arrToUpdate.findIndex(
            (item:any) => item.time.seconds === id
          );
          arrToUpdate[indexToUpdate].status = true;
          return updateDoc(docRef, {
            message: arrToUpdate,
          });
        })
        .then(() => update());
    }
  };
  return (
    <div
      onClick={(e) => updateReed(timeId)}
      className="message-block__message_pop-up"
    >
      <h4>{name}</h4>
      <p>{message}</p>
      <div className="message-block__message_date-status">
        <span>{time}</span>
        <span>{statusRead ? <DoneAllSvg /> : <DoneSvg />}</span>
      </div>
    </div>
  );
};
const BlockMessage = ({ dataBlock, getNewData, data }:{[key:string]: any}) => {
  const db = getFirestore(app);
  const deleteClient = async (it:any) => {
    const userAnswer = confirm("Видалити весь діалог? Ця дія безповоротна");
    if (userAnswer) {
      await deleteDoc(doc(db, "message", it))
        .then(() => {
          alert("Успішно видалено");
          getNewData();
          dataBlock(false);
        })
        .catch(() => alert("Помилка видалення"));
    } else {
      return;
    }
  };
  return (
    <div className="admin-message__message-block message-block">
      <div className="message-block__header">
        <div className="message-block__header_info">
          <h1>{data.name}</h1>
          <ul>
            <li>
              <h3>+48{data.phone}</h3>
            </li>
            <li>
              <h3>{data.email}</h3>
            </li>
          </ul>
        </div>

        <button title="Видалити" onClick={() => deleteClient(data.phone)}>
          <DeleteSvg />
        </button>
      </div>
      <div className="message-block__message">
        <ul>
          {data?.message?.map((item:any) => (
            <li key={item?.time?.seconds}>
              <PopUp
                update={getNewData}
                timeId={item.time.seconds}
                data={data}
                message={item.message}
                name={data.name}
                status={item.status}
                time={item.time
                  .toDate()
                  .toString()
                  .split(" ")
                  .splice(0, 5)
                  .join(" ")}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="message-block__action">
        <a href={`tel:+48${data.phone}`}>Зателефонувати</a>
        <a href={`mailto:${data.email}`}>Надіслати лист</a>
      </div>
    </div>
  );
};
const AdminMessage = () => {
  const [dataMessage, setDataMessage] = useState(null);
  const [stateBlockMessage, setStateBlockMessage] = useState(false);
  const [blockMessageData, setBlockMessageData] = useState<any>(null);
  const [mobileShow, setMobileShow] = useState(false);
  const db = getFirestore(app);
  const getDataMessage = async () => {
    const colect = collection(db, "message");
    const queryData = await getDocs(colect);
    const mobArr:any = [];
    queryData.forEach((doc) => {
      mobArr.push(doc.data());
    });
    setDataMessage(mobArr);
  };
  const showMessage = (data:any) => {
    setMobileShow(false)
    setStateBlockMessage(true);
    setBlockMessageData(data);
  };
  const unReadMessage = (arr:any) => {
    let count = 0;
    arr.forEach((item:any) => {
      if (item.status === false) {
        count++;
      }
    });
    return count;
  };
  useEffect(() => {
    getDataMessage();
    
  }, []);
  window.addEventListener("resize", ()=>{
    if(window.innerWidth > 767){
      setMobileShow(false)
    }
  })
  return (
    <div className="admin-message">
      <div className="admin-message__mobile">
        <button onClick={()=>setMobileShow(!mobileShow)}>
          {mobileShow === false && blockMessageData === null && "ОБЕРІТЬ КЛІЄНТА"}
          {mobileShow === true && blockMessageData === null && "ОБЕРІТЬ КЛІЄНТА"}
          {mobileShow === false && blockMessageData != null && "ПОВЕРНУТИСЬ ДО СПИСКУ"}
          {mobileShow === true && blockMessageData != null && `ПОВЕРНУТИСЬ ДО ${blockMessageData.name} `}
          
          </button>
      </div>
      <div   className="admin-message__user" style={{display: mobileShow && "flex"}}>
        {dataMessage?.map((item) => (
          <button
            key={item.message[0].time.seconds}
            type="button"
            className={`admin-message__user_btn ${
              blockMessageData?.phone === item.phone &&
              "admin-message__user_btn--active"
            }`}
            onClick={() => showMessage(item)}
          >
            <strong>
              {item.name} - <i>+48{item.phone}</i>
            </strong>
            {unReadMessage(item.message) != 0 && (
              <span>{`${unReadMessage(item.message)} `}</span>
            )}
          </button>
        ))}
      </div>
      <div style={{display: mobileShow && "none"}} className="admin-message__message">
        {stateBlockMessage === false && (
          <div className="admin-message__message_firstDisplay">
            <h1>Оберіть клієнта</h1>
          </div>
        )}
        {stateBlockMessage === true && (
          <BlockMessage
            getNewData={getDataMessage}
            data={blockMessageData}
            dataBlock={setStateBlockMessage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminMessage;
