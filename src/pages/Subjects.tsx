import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/subjects.module.css";
import "../css/sidebar.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Table from "../components/TableSubjects";
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";

interface Filters {
  name: string;
}

const Subjects = () => {

  const closeIconRef = useRef<Button>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
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
        <h3 className={styles.table_title}>Предметы</h3>
      </div>
      <div className={styles.div_container}>
        <input className={styles.search_by_subject} name="name" type="text" placeholder="Поиск по предмету"
          value={filters.name}
          onChange={handleChange} />
        <Button className={styles.button} onClick={() => navigate("/create-subject")}>Добавить предмет</Button>
      </div>
      <div className={styles.div_table}>
        <Table filters={filters} />
      </div>
      <div>
        <Footer />
      </div>
    </div >
  );
};

export default Subjects;
