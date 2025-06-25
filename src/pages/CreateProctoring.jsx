import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/create_proctoring.css";
import "../css/footer.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import { Dropdown } from "primereact/dropdown";

const CreateProctoring = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);

  const sujects = [
    {
      id: 1,
      name: "Предмет",
    },
    {
      id: 2,
      name: "Машинное обучение",
    },
  ];

  const [formData, setFormData] = useState({
    subjectId: sujects[0]?.id || null,
    userId: null,
    typeId: null
  });

  const [proctoringTypes, setProctoringTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, studentsRes] = await Promise.all([
          api.get('v1/proctoring/proctoringType'),
          api.get('v1/user')
        ]);

        setProctoringTypes(typesRes.data.map(t => ({ label: t.name, value: t.id })));
        setSubjects(sujects.map(s => ({ label: s.name, value: s.id })));
        setStudents(studentsRes.data.map(s => ({ label: s.fullName, value: s.id })));
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Не удалось загрузить данные для выпадающих списков");
      }
    };

    fetchData();
  }, []);


  const handleProctoringTypeChange = (e) => {
    setFormData(prev => ({ ...prev, typeId: e.value }));
  };

  const handleSubjectChange = (e) => {
    setFormData(prev => ({ ...prev, subjectId: e.value }));
  };

  const handleStudentChange = (e) => {
    setFormData(prev => ({ ...prev, userId: e.value }));
  };

  const handleSave = async () => {
    if (!formData.typeId || !formData.subjectId || !formData.userId) {
      setError("Все поля обязательны к заполнению");
      return;
    }

    try {
      await api.post('/v1/proctoring', formData);
      alert("Прокторинг создан!");
      navigate("/proctoring");
    } catch (err) {
      console.error("Ошибка при создании прокторинга:", err);
      setError("Не удалось создать запись");
    }
  };

  return (
    <div>
      <div>
        <header className="header-style">
          <div className="div-container-header">
            <div className="menu-area">
              <Button className="button-menu" onClick={() => setVisible(true)} />
              <Sidebar visible={visible}
                onHide={() => setVisible(false)}
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

      <div className="div-title">
        <h3 className="page-title">Создание прокторинга</h3>
      </div>

      <div className="div-container-edit">
        <div className="div-content">

          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <span className="input-name-active">Тип прокторинга</span>
          <Dropdown
            value={formData.typeId}
            options={proctoringTypes}
            onChange={handleProctoringTypeChange}
            filter
            className="input-text-active"
          />

          <span className="input-name-active">Предмет</span>
          <Dropdown
            value={formData.subjectId}
            options={subjects}
            onChange={handleSubjectChange}
            filter
            className="input-text-active"
          />

          <span className="input-name-active">Студент</span>
          <Dropdown
            value={formData.userId}
            options={students}
            onChange={handleStudentChange}
            filter
            className="input-text-active"
          />

          <Button className="button" onClick={handleSave}>Сохранить</Button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateProctoring;