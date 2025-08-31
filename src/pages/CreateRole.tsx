import api from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/create_role.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";

interface FormData {
  name: string;
  rightsCreate: boolean;
  rightsRead: boolean;
  rightsUpdate: boolean;
  rightsDelete: boolean;
}

const CreateRole = () => {

  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    rightsCreate: false,
    rightsRead: false,
    rightsUpdate: false,
    rightsDelete: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('v1/role', formData);

      if (response.status === 201) {
        setFormData({
          name: '',
          rightsCreate: false,
          rightsRead: false,
          rightsUpdate: false,
          rightsDelete: false
        });
        navigate("/roles")
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
        <h3 className="page-title">Создание роли</h3>
      </div>
      <div className="div-container-edit">
        <div className="div-content">
          <span className="input-name-active">Название роли</span>
          <input className="input-text-active" name="name" type="text"
            value={formData.name}
            onChange={handleInputChange} />

          <div className="div-checkbox">
            <input type="checkbox" className="checkbox" name="rightsCreate"
              checked={formData.rightsCreate}
              onChange={handleCheckboxChange} />
            <label className="text-checkbox">Права на создание</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" className="checkbox" name="rightsRead"
              checked={formData.rightsRead}
              onChange={handleCheckboxChange} />
            <label className="text-checkbox">Права на чтение</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" className="checkbox" name="rightsUpdate"
              checked={formData.rightsUpdate}
              onChange={handleCheckboxChange} />
            <label className="text-checkbox">Права на редактирование</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" className="checkbox" name="rightsDelete"
              checked={formData.rightsDelete}
              onChange={handleCheckboxChange} />
            <label className="text-checkbox">Права на удаление</label>
          </div>

          <Button onClick={handleSubmit} className="button">Создать</Button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div >
  );
};

export default CreateRole;
