import React, { useState, useRef } from "react";
import "../css/proctoring_results.css";
import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
// import { Table, Theme } from "@radix-ui/themes";
import Table from "../components/Table";

const ProctoringResults = () => {
  const [visible, setVisible] = useState(false);
  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);
  const btnRef4 = useRef(null);
  return (
    <div>
      <div>
        <header className="header-style">
          <div className="div-conteiner-header">
            <div className="menu-area">
              {/* <button className="button-menu"></button> */}
              <Button className="button-menu" onClick={() => setVisible(true)} />
            </div>
            <div className="user-exit">
              <span className="username">Пользователь</span>
              <button className="button-exit" name="button-exit"></button>
            </div>
          </div>
        </header>
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          content={({ closeIconRef, hide }) => (
            <div className="min-h-screen flex relative lg:static surface-ground">
              <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none">
                <div>
                  <header className="header-style">
                    <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} className="button-menu"></Button>
                  </header>
                  <div>
                    <div className="menu-item">
                      <span className="menu-item-text">Результаты</span>
                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Типы прокторинга</span>
                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Прокторинги</span>
                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Роли</span>
                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Пользователи</span>
                    </div>
                  </div>
                </div>
                <div>
                  <footer className="footer-style" />
                </div>
              </div>
            </div>
          )}
        ></Sidebar>
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
        <Table/>
      </div>
      <div>
        <footer className="footer-style" />
      </div>
    </div>
  );
};

export default ProctoringResults;
