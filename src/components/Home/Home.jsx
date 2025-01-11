import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Main = () => {
  


return (
  <>

    <Outlet />
    <Footer />
  </>
);}

export default Main;
