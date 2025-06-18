import api from "../api/api";
import React, { useState, useEffect } from "react";
import "../css/create_user.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import { Dropdown } from "primereact/dropdown";

const CreateUser = () => {

  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [roles, setRoles] = useState([]); 
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("v1/role");
        const formattedRoles = response.data.map(role => ({
          label: role.name,
          value: role.id
        }));
        setRoles(formattedRoles);
      } catch (error) {
        console.error("Ошибка при загрузке ролей:", error);
      }
    };

    fetchRoles();
  }, []);

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
                          <a href="/roles" className="menu-item" >
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
        <h3 className="page-title">Создание пользователя</h3>
      </div>
      <div className="div-container-edit">
        <div className="div-content">
          <span className="input-name-active">ФИО</span>
          <input className="input-text-active" type="text" />

          <span className="input-name-active">Логин</span>
          <input className="input-text-active" type="text" />

          <span className="input-name-active">Пароль</span>
          <input className="input-text-active" type="password" />

          <span className="input-name-active">Подтверждение пароля</span>
          <input className="input-text-active" type="password" />

          <span className="input-name-active">Роль</span>
          <Dropdown className="input-text-active" type="text"
            value={selectedRole}
            options={roles}
            onChange={(e) => setSelectedRole(e.value)} />

          <Button className="button">Сохранить</Button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateUser;
