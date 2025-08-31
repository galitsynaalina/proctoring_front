import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/users.module.css";
import "../css/sidebar.css"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from 'primereact/button';
import Table from "../components/TableUsers";
import SidebarMenu from "../components/Sidebar";

interface Filters {
  fullName: string;
}

const Users = () => {

  const closeIconRef = useRef<Button>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    fullName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
