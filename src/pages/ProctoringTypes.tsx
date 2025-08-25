import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/proctoring_types.module.css";
import "../css/sidebar.css"
import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Table from "../components/TableProctoringTypes";
import Footer from "../components/Footer";

const ProctoringTypes = () => {

  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

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
                          <Button type="button" ref={closeIconRef as React.Ref<Button>} onClick={(e) => hide(e)} className="button-menu"></Button>
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
        <h3 className={styles.page_title}>Типы прокторинга</h3>
      </div>
      <div className={styles.div_container}>
        {/* <input className="search_by_subject" name="search_by_subject" type="text" placeholder="Поиск по предмету" /> */}
        <Button className={styles.button} onClick={() => navigate("/create-type")}>Добавить тип прокторинга</Button>
      </div>
      <div className={styles.div_table}>
        <Table />
      </div>
      <div>
        <Footer />
      </div>
    </div >
  );
};

export default ProctoringTypes;
