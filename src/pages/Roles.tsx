import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/roles.module.css";
import "../css/sidebar.css"
import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from 'primereact/button';
import Table from "../components/TableRoles";
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";

interface Filters {
  name: string;
}

const Roles = () => {

  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Filters>({
    name: ''
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
        <h3 className={styles.page_title}>Роли</h3>
      </div>
      <div className={styles.div_container}>
        <input className={styles.search_by_role} name="name" type="text" placeholder="Поиск роли"
          value={filters.name}
          onChange={handleChange} />
        <Button className={styles.button} onClick={() => navigate("/create-role")} type="submit">Добавить роль</Button>
      </div>
      <div className={styles.div_table}>
        <Table filters={filters} />
      </div>
      <Footer />
    </div >
  );
};

export default Roles;
