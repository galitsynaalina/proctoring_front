import api from "../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/edit_type.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "../components/Footer";


interface ProctoringTypeData {
  id: number;
  name: string;
  absencePerson: boolean,
  extraPerson: boolean,
  personSubstitution: boolean,
  lookingAway: boolean,
  mouthOpening: boolean,
  hintsOutside: boolean
}

interface FormData {
  name: string;
  absencePerson: boolean,
  extraPerson: boolean,
  personSubstitution: boolean,
  lookingAway: boolean,
  mouthOpening: boolean,
  hintsOutside: boolean
}

const EditType = () => {
  const username = localStorage.getItem('username');
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    absencePerson: false,
    extraPerson: false,
    personSubstitution: false,
    lookingAway: false,
    mouthOpening: false,
    hintsOutside: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ProctoringTypeData>(`v1/proctoring/ProctoringType/${id}`);
        const data = response.data;

        setFormData({
          name: data.name || '',
          absencePerson: Boolean(data.absencePerson),
          extraPerson: Boolean(data.extraPerson),
          personSubstitution: Boolean(data.personSubstitution),
          lookingAway: Boolean(data.lookingAway),
          mouthOpening: Boolean(data.mouthOpening),
          hintsOutside: Boolean(data.hintsOutside)
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные.');
        navigate('/proctoring-types'); // перенаправление обратно
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
      const response = await api.patch<ProctoringTypeData>(`/v1/proctoring/ProctoringType/${id}`, formData);
      console.log('Данные успешно обновлены:', response.data);
      alert('Результат успешно сохранён!');
      navigate('/proctoring-types');
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
        <h3 className="page-title">Редактирование типа</h3>
      </div>
      <div className="div-container-edit">
        <div className="div-content">
          <span className="input-name-active">Название типа прокторинга</span>
          <input className="input-text-active" type="text" name="name"
            value={formData.name}
            onChange={handleInputChange} />

          <div className="div-checkbox">
            <input type="checkbox" name="absencePerson"
              checked={formData.absencePerson}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Отсутствие студента</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="extraPerson"
              checked={formData.extraPerson}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Лишний человек</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="personSubstitution"
              checked={formData.personSubstitution}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Другой человек</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="lookingAway"
              checked={formData.lookingAway}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Вгляд в сторону</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="mouthOpening"
              checked={formData.mouthOpening}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Разговор</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="hintsOutside"
              checked={formData.hintsOutside}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Подсказки</label>
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

export default EditType;
