import React, { useState, useRef } from "react";
import styles from "../css/proctoring_results.module.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Table from "../components/TableResults";
import Footer from "../components/Footer";

const ProctoringResults = () => {

  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);

  const [filters, setFilters] = useState({
    studentName: '',
    subjectName: '',
    proctoringName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div>
        <header className="header-style">
          <div className="div-container-header">
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
                          <a href="/proctoring-types" className="menu-item" >
                            <div className="menu-item-text">Типы прокторинга</div>
                          </a>
                          <a href="/proctoring" className="menu-item" >
                            <div className="menu-item-text">Прокторинги</div>
                          </a>
                          {username === 'admin' && (
                            <>
                              <a href="/roles" className="menu-item">
                                <div className="menu-item-text">Роли</div>
                              </a>
                              <a href="/users" className="menu-item">
                                <div className="menu-item-text">Пользователи</div>
                              </a>
                            </>
                          )}
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
              <span className="username">{username}</span>
              <button className="button-exit" name="button-exit"></button>
            </div>
          </div>
        </header>
      </div>
      <div className={styles.div_title}>
        <h3 className={styles.page_title}>Результаты прокторинга</h3>
      </div>
      <div className={styles.div_search}>
        <input className={styles.search_by_student} name="studentName" type="text" placeholder="Поиск по студенту"
          value={filters.studentName}
          onChange={handleChange} />
        <input className={styles.search_by_subject} name="subjectName" type="text" placeholder="Поиск по предмету"
          value={filters.subjectName}
          onChange={handleChange} />
        <input className={styles.search_by_type} name="proctoringName" type="text" placeholder="Поиск по типу"
          value={filters.proctoringName}
          onChange={handleChange} />
      </div>
      <div className={styles.div_table}>
        <Table filters={filters} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProctoringResults;
