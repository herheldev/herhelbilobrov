import { Helmet } from "react-helmet";
import { app } from "../../bd/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminPanel from "../AdminPanel/AdminPanel";
import { Outlet } from "react-router-dom";
const AdminPage = () => {
  const [user, setUser] = useState(false);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Helmet>
        <title>HERHEL CLINIC | Панель керування</title>
      </Helmet>
      {user === null && <AdminLogin />}
      {user === false && <Loader />}
      {user && (
        <AdminPanel>
          <Outlet />
        </AdminPanel>
      )}
    </main>
  );
};

export default AdminPage;
