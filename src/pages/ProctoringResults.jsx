import React, { useState, useRef } from "react";
import "../css/proctoring_results.css";
import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Avatar } from 'primereact/avatar';
// import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
// import { Table, Theme } from "@radix-ui/themes";
import DataTable from "../components/DataTable";
import SidebarComponent from "../components/SideBar";

const ProctoringResults = () => {
  
  const [visible, setVisible] = useState(false);

  const ToggleSidebar = () => {
    !visible ? setVisible(true) : setVisible(false);
  }

  return (
    <div>
      <div>
        <header className="header-style">
          <div className="div-conteiner-header">
            <div className="menu-area">
              <Button className="button-menu" onClick={ToggleSidebar} />
            </div>
            <div className="user-exit">
              <span className="username">Пользователь</span>
              <button className="button-exit" name="button-exit"></button>
            </div>
          </div>
        </header>
        <SidebarComponent></SidebarComponent>
      </div>
      <div className="div-title">
        <h3 className="proctoring-results-title">Результаты прокторинга</h3>
      </div>
      <div className="div-search">
        <input className="search_by_student" name="search_by_student" type="text" placeholder="Поиск по студенту" />
        <input className="search_by_subject" name="search_by_subject" type="text" placeholder="Поиск по предмету" />
        <input className="search_by_type" name="search_by_type" type="text" placeholder="Поиск по типу" />
      </div>
      <div className="div-table">
        <DataTable />
      </div>
      <div>
        <footer className="footer-style" />
      </div>
    </div>
  );
};

export default ProctoringResults;
