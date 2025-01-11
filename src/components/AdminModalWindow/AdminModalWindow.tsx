import "./AdminModalWindow.scss";
import React, { ReactNode, useState } from "react";
import DeleteSvg from "@/components/Icon/DeleteSvg";
export default function AdminModalWindow({
  state,
  setState,
  children,
  stateForm,
  setStateForm,
}: {
  state?: boolean;
  setState: any;
  children: ReactNode;
  stateForm: boolean;
  setStateForm: any;
}) {
  function closeWindow() {
    if (stateForm) {
      if (confirm("Дійсно закрити? Незбережені дані будуть втрачені!")) {
        setState(false);
        setStateForm(false)
      } else return;
    } else {setState(false), setStateForm(false)};
  }

  return (
    <div className="admin-modal" style={{ display: state ? "flex" : "none" }}>
      <button className="admin-modal_btn-close" onClick={() => closeWindow()}>

        закрити
      </button>
      <div className="admin-modal_window">{children}</div>
    </div>
  );
}
