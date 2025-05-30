import React, { useState, useRef } from "react";
import "../css/proctoring_results.css";
import "../css/footer.css"
// import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
// import { Table, Theme } from "@radix-ui/themes";
import Table from "../components/TableResults";
import Footer from "../components/Footer";

const ProctoringResults = () => {

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div>
        <header className="header-style">
          <div className="div-conteiner-header">
            <div className="menu-area">
              <Button className="button-menu" onClick={() => { setVisible(true) }} />
              <Sidebar visible={visible}
                onHide={() => { setVisible(false) }}
                content={({ closeIconRef, hide }) => (
                  <div className="min-h-screen flex relative lg:static surface-ground">
                    <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none">
                      <div>
                        <header className="header-style">
                          <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} className="button-menu"></Button>
                        </header>
                        <div>
                          <a href="/proctoring-results" className="menu-item" >
                          <div className="menu-item-text">Результаты</div>
                          </a>
                          <a href="#" className="menu-item" >
                          <div className="menu-item-text">Типы прокторинга</div>
                          </a>
                          <a href="#" className="menu-item" >
                          <div className="menu-item-text">Прокторинги</div>
                          </a>
                          <a href="/roles-list" className="menu-item" >
                          <div className="menu-item-text">Роли</div>
                          </a>
                          <a href="/users" className="menu-item" >
                          <div className="menu-item-text">Пользователи</div>
                          </a>
                          <a href="/subjects" className="menu-item">
                            <div className="menu-item-text">Предметы</div>
                          </a>
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
            <div className="user-exit">
              <span className="username">Пользователь</span>
              <button className="button-exit" name="button-exit"></button>
            </div>
          </div>
        </header>
      </div>
      <div className="div-title">
        <h3 className="table-title">Результаты прокторинга</h3>
      </div>
      <div className="div-search">
        <input className="search_by_student" name="search_by_student" type="text" placeholder="Поиск по студенту" />
        <input className="search_by_subject" name="search_by_subject" type="text" placeholder="Поиск по предмету" />
        <input className="search_by_type" name="search_by_type" type="text" placeholder="Поиск по типу" />
      </div>
      <div className="div-table">
        <Table />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProctoringResults;
