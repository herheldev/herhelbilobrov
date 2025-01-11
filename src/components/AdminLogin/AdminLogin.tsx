"use client"
import { useForm } from "react-hook-form";
import { app } from "../../bd/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./AdminLogin.scss";
import LogoBlackSvg from "../Icon/LogoBlackSvg";
import Link from "next/link";
const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
   
  } = useForm({ mode: "onSubmit" });
  const auth = getAuth(app);
  const sendLoginForm = (data:any) => {
    signInWithEmailAndPassword(auth, data.login, data.password);
  };
  return (
    <section className="admin-login">
      <div>
        <LogoBlackSvg />
      </div>

      <form
        className="admin-login__form"
        onSubmit={handleSubmit(sendLoginForm)}
      >
        <input
          type="email"
          placeholder="example@mail.com"
          {...register("login", {
            required: { value: true, message: "Email не коректний" },
          })}
        />
        <input
          type="password"
          placeholder="Пароль"
          
          {...register("password", {
            required: true,
            minLength: { value: 6, message: "Пароль не валідний" },
          })}
        />
        <button  disabled={!isValid}>Увійти</button>
      </form>
      <ul>
        <li>© 2024 Copyright, Inc. All rights reserved <Link href="/">HERHEL GROUP</Link></li>
        <li>POWERED BY <a href="https://www.andriitopii.com/">ANDRII TOPII</a></li>
      </ul>
    </section>
  );
};

export default AdminLogin;
