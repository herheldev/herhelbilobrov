"use client"
import "./ChoseSite.scss";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
export default  function ChoseSite(){
    const router = useRouter();
    const [show, setShow] = useState(true);
    useEffect(()=>{
        const ref = document.referrer
        if(ref.includes("http://herhel.pl")){
            setShow(false);
        }
    })
    return (
        <div className={"chosesite"} style={{ display: show ? "flex" : "none" }}>
            <ul className={"chosesite-list"}>

                    <h1>Оберіть локацію</h1>


                <li>
                    <button className={"chosesite-btn"} onClick={()=> setShow(false)}>HERHEL CLINIC WARSZAWA</button>
                </li>
                <li>
                    <button className={"chosesite-btn"} onClick={()=> {router.push("http://herhelbilobrov.com")}}>HERHEL&BILOBROV WROCLAW</button>
                </li>
                <li>
                    <button className={"chosesite-btn"} onClick={()=> {router.push("http://herhelgasanova.com")}}>HERHEL&GACANOVA BOUTIQUE</button>
                </li>
            </ul>
        </div>
    )
}