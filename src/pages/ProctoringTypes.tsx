import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/proctoring_types.module.css";
import "../css/sidebar.css"
import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from 'primereact/button';
import Table from "../components/TableProctoringTypes";
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";

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
