import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/users.module.css";
import "../css/sidebar.css"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Table from "../components/TableUsers";

interface Filters {
  fullName: string;
}

const closeIconRef = useRef<Button>(null);

const Users = () => {

  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    fullName: '' 
  });

  const handleChange = (e: React.ChangeEvent<any>) => {     
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
                          <Button className="button-menu" type="button" ref={closeIconRef as React.Ref<Button>} onClick={(e) => hide(e)}></Button>
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
        <h3 className={styles.table_title}>Пользователи</h3>
      </div>
      <div className={styles.div_container}>
        <input className={styles.search_by_fio} name="fullName" type="text" placeholder="Поиск по ФИО"
          value={filters.fullName}
          onChange={handleChange} />
        <Button className={styles.button} onClick={() => navigate("/create-user")}>Добавить пользователя</Button>
      </div>
      <div className={styles.div_table}>
        <Table filters={filters} />
      </div>
      <div>
        <footer className="footer-style" />
      </div>
    </div >
  );
};

export default Users;
