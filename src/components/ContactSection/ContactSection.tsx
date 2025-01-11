"use client"
import "./ContactSection.scss";
import {app} from "@/bd/firebase";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  arrayUnion,

} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
const ContactSection = () => {
  const [dataContact, setDataContact] = useState(null);
  const [stateForm, setStateForm] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.2 });
  const {
    register,
    reset,
    handleSubmit,
    formState,
    formState: {  isValid,  },
  } = useForm({ mode: "all" });
  const db = getFirestore(app);
  const getDataContact = async () => {
    const docConctact = doc(db, "lang", "contact");
    await getDoc(docConctact)
      .then((doc) => setDataContact(doc.data()))
      .catch((error) =>  console.error("Error fetching data:", error));
  };
  const sendMessage = async (data:any) => {
    const docConctact = doc(db, "message", data.numberContact);
    const date = new Date();
    setStateForm(3);
    await setDoc(
      docConctact,
      {
        name: data.nameContact,
        phone: data.numberContact,
        email: data.emailContact,
        message: arrayUnion({
          message: data.textContact,
          time: date,
          status: false,
        }),
      },
      { merge: true }
    )
      .then(() => {
        setStateForm(2),
          setTimeout(() => setStateForm(1), 4000),
          clearTimeout();
      })
      .catch(() => setStateForm(0));
  };
  useEffect(() => {
    getDataContact();
  }, []);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <section id="contact" className="contact">
      <div className="container contact__container">
        <div
          ref={ref}
          className={`contact__form ${
            inView ? "show-animate" : "hide-animate"
          }`}
        >
          <h1>{dataContact ? dataContact[`pl`]?.title : ""}</h1>
          <p>{dataContact ? dataContact[`pl`]?.descrip : ""}</p>
          {stateForm === 2 && (
            <span>
              {"Successfully sent"}
            </span>
          )}
          {stateForm === 0 && (
            <span>{"Sending error"}</span>
          )}
          {stateForm === 3 && (
            <span>{"Sending..."}</span>
          )}
          {stateForm === 1 && (
            <span style={{ color: "red" }}>
              
            </span>
          )}
          <form onSubmit={handleSubmit(sendMessage)}>
            <input
              placeholder={`${"NAME"}`}
              type="text"
              {...register("nameContact", {
                value: register("nameContact"),
                required: { value: true, message: "Don't be empty" },
                minLength: { value: 5, message: "Minimum 5 symbols" },
              })}
            />
            <input
              placeholder={`PHONE`}
              type="number"
              {...register("numberContact", {
                value: register("numberContact"),
                required: { value: true, message: "Don't be empty" },
                minLength: { value: 5, message: "Minimum 5 symbols" },
              })}
            />
            <input
              placeholder={"EMAIL"}
              type="email"
              {...register("emailContact", {
                value: register("emailContact"),
                required: { value: true, message: "Don't be empty" },
                minLength: { value: 5, message: "Minimum 5 symbols" },
              })}
            />
            <input
              placeholder={"MESSAGE"}
              type="text"
              {...register("textContact", {
                value: register("textContact"),
                required: { value: true, message: "Don't be empty" },
                minLength: { value: 5, message: "Minimum 5 symbols" },
              })}
            />
            <button disabled={!isValid}>
              {"SEND"}
            </button>
          </form>
        </div>
        <div
          ref={ref1}
          className={`contact__img ${
            inView1 ? "show-animate" : "hide-animate"
          }`}
        >
          <img loading="lazy" width={`${100}%`} height={`${100}%`} alt="CONTACT IMG" src="/img/contactimg.webp" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
