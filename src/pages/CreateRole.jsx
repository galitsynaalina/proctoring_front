import api from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/create_role.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "../components/Footer";

const CreateRole = () => {

  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    rightsCreate: false,
    rightsRead: false,
    rightsUpdate: false,
    rightsDelete: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
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
              <Sidebar visible={visible}
                onHide={() => { setVisible(false) }}
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
            <label className="text-checkbox" name="rightsRead">Права на чтение</label>
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
