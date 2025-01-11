"use client"
import React, { useState } from "react";
import { app } from "../../../bd/firebase";
import { getAuth, onAuthStateChanged} from "firebase/auth";

import AdminPanel from "@/components/AdminPanel/AdminPanel";
import AdminLogin from "@/components/AdminLogin/AdminLogin";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [user, setUser] = useState<boolean | null>(null)
    const auth = getAuth(app);
    onAuthStateChanged(auth, (us)=>setUser(!!us))
  return (
    <>
    {user && <AdminPanel>{children}</AdminPanel>}
    {user === false && <AdminLogin/>}
      
    </>
  );
}
