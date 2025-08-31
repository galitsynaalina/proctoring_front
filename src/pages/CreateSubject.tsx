import api from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/create_subject.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";

interface FormData {
  name: string;
}

const CreateSubject = () => {

  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('v1/subject', formData);

      if (response.status === 201) {
        setFormData({
          name: ''
        });
        navigate("/subjects")
      }
    } catch (error) {
      console.error('Ошибка при создании записи:', error);
    }
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
      <div className="div-title">
        <h3 className="page-title">Создание предмета</h3>
      </div>
      <div className="div-container-edit">
        <div className="div-content">
          <span className="input-name-active">Название предмета</span>
          <input className="input-text-active" type="text" name="name"
            value={formData.name}
            onChange={handleInputChange} />

          <Button className="button" onClick={handleSubmit}>Сохранить</Button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateSubject;
