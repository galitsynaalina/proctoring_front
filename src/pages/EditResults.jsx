import api from "../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/edit_results.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "../components/Footer";

const EditResults = () => {

  const username = localStorage.getItem('username');

  const { id } = useParams();

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    subjectName: '',
    proctoringName: '',
    detectedAbsencePerson: false,
    detectedExtraPerson: false,
    detectedPersonSubstitution: false,
    detectedLookingAway: false,
    detectedMouthOpening: false,
    detectedHintsOutside: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`v1/proctoring-result/${id}`);
        const data = response.data;

        setFormData({
          userName: data.userName || '',
          subjectName: data.subjectName || '',
          proctoringName: data.proctoringName || '',
          detectedAbsencePerson: Boolean(data.detectedAbsencePerson),
          detectedExtraPerson: Boolean(data.detectedExtraPerson),
          detectedPersonSubstitution: Boolean(data.detectedPersonSubstitution),
          detectedLookingAway: Boolean(data.detectedLookingAway),
          detectedMouthOpening: Boolean(data.detectedMouthOpening),
          detectedHintsOutside: Boolean(data.detectedHintsOutside)
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные.');
        navigate('/proctoring-results'); // перенаправление обратно
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    try {
      const response = await api.patch(`/v1/proctoring-result/${id}`, formData);
      console.log('Данные успешно обновлены:', response.data);
      alert('Результат успешно сохранён!');
      navigate('/proctoring-results');
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
        <h3 className="page-title">Редактирование результата</h3>
      </div>
      <div className="div-container-edit">
        <div className="div-content">
          <span className="input-name">ФИО студента</span>
          <input className="input-text" name="userName"
            value={formData.userName}
            onChange={handleInputChange} type="text" />

          <span className="input-name">Название предмета</span>
          <input className="input-text" name="subjectName"
            value={formData.subjectName}
            onChange={handleInputChange} type="text" />

          <span className="input-name">Название типа прокторинга</span>
          <input className="input-text" name="proctoringName"
            value={formData.proctoringName}
            onChange={handleInputChange} type="text" />

          <div className="div-checkbox">
            <input type="checkbox" name="detectedAbsencePerson"
              checked={formData.detectedAbsencePerson}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Отсутствие студента</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="detectedExtraPerson"
              checked={formData.detectedExtraPerson}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Лишний человек</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="detectedPersonSubstitution"
              checked={formData.detectedPersonSubstitution}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Другой человек</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="detectedLookingAway"
              checked={formData.detectedLookingAway}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Вгляд в сторону</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="detectedMouthOpening"
              checked={formData.detectedMouthOpening}
              onChange={handleCheckboxChange} className="checkbox" />
            <label className="text-checkbox">Разговор</label>
          </div>

          <div className="div-checkbox">
            <input type="checkbox" name="detectedHintsOutside"
              checked={formData.detectedHintsOutside}
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

export default EditResults;
