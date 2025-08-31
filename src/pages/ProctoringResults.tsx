import { useState } from "react";
import styles from "../css/proctoring_results.module.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import Table from "../components/TableResults";
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";

interface Filters {
  studentName: string;
  subjectName: string;
  proctoringName: string;
}


const ProctoringResults = () => {

  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    studentName: '',
    subjectName: '',
    proctoringName: ''
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
