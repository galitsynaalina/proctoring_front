import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/create_proctoring.css";
import "../css/footer.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import SidebarMenu from "../components/Sidebar";

interface Subject {
  id: number;
  name: string;
}

interface ProctoringType {
  id: number;
  name: string;
}

interface User {
  id: number;
  fullName: string;
}

interface Option {
  label: string;
  value: number;
}

interface FormData {
  subjectId: number | null;
  userId: number | null;
  typeId: number | null;
}

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

  const [formData, setFormData] = useState<FormData>({
    subjectId: sujects[0]?.id || null,
    userId: null,
    typeId: null
  });

  const [proctoringTypes, setProctoringTypes] = useState<Option[]>([]);
  const [subjects, setSubjects] = useState<Option[]>([]);
  const [students, setStudents] = useState<Option[]>([]);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, studentsRes] = await Promise.all([
          api.get<ProctoringType[]>('v1/proctoring/proctoringType'),
          api.get<User[]>('v1/user')
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


  const handleProctoringTypeChange = (e: DropdownChangeEvent) => {
    setFormData(prev => ({ ...prev, typeId: e.value }));
  };

  const handleSubjectChange = (e: DropdownChangeEvent) => {
    setFormData(prev => ({ ...prev, subjectId: e.value }));
  };

  const handleStudentChange = (e: DropdownChangeEvent) => {
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