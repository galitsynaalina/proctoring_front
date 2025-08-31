import api from "../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/edit_role.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "../components/Footer";

interface RoleData {
  name: string;
  rightsCreate: boolean;
  rightsRead: boolean;
  rightsUpdate: boolean;
  rightsDelete: boolean;
}

interface FormData {
  name: string;
  rightsCreate: boolean;
  rightsRead: boolean;
  rightsUpdate: boolean;
  rightsDelete: boolean;
}

const EditRole = () => {

  const username = localStorage.getItem('username');
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    rightsCreate: false,
    rightsRead: false,
    rightsUpdate: false,
    rightsDelete: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<RoleData>(`v1/role/${id}`);
        const data = response.data;

        setFormData({
          name: data.name || '',
          rightsCreate: Boolean(data.rightsCreate),
          rightsRead: Boolean(data.rightsRead),
          rightsUpdate: Boolean(data.rightsUpdate),
          rightsDelete: Boolean(data.rightsDelete)
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные.');
        navigate('/roles'); // перенаправление обратно
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<any>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    try {
      const response = await api.patch<RoleData>(`/v1/role/${id}`, formData);
      console.log('Данные успешно обновлены:', response.data);
      alert('Результат успешно сохранён!');
      navigate('/roles');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Не удалось сохранить результат.');
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
                          <Button type="button" ref={closeIconRef as React.Ref<Button>} onClick={(e) => hide(e)} className="button-menu"></Button>
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
        <h3 className="page-title">Редактирование роли</h3>
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


          <Button className="button" onClick={handleSave}>Сохранить</Button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default EditRole;
