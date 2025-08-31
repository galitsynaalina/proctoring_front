import { useState, useRef } from "react";
import "../css/edit_proctoring.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import { Dropdown } from "primereact/dropdown";
import SidebarMenu from "../components/Sidebar";

const EditProctoring = () => {

  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div>
        <header className="header-style">
          <div className="div-container-header">
            <div className="menu-area">
              <Button className="button-menu" onClick={() => { setVisible(true) }} />
              <SidebarMenu
                visible={visible}
                onHide={() => setVisible(false)}
                username={username}
              />
            </div>
            <div className="user-exit">
              <span className="username">{username}</span>
              <button className="button-exit" name="button-exit"></button>
            </div>
          </div>
        </header>
      </div>
      <div className="div-title">
        <h3 className="page-title">Редактирование прокторинга</h3>
      </div>
      <div className="div-container-edit">
        <div className="div-content">

          <span className="input-name-active">Тип прокторинга</span>
          <Dropdown className="input-text-active" type="text" />

          <span className="input-name-active">Предмет</span>
          <input className="input-text-active" type="text" />

          <span className="input-name-active">Студент</span>
          <input className="input-text-active" type="text" />

          <Button className="button">Сохранить</Button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default EditProctoring;
