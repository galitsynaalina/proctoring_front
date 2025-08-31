import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/create_user.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface RoleData{
  id: number;
  name: string;
}

interface RoleOption {
  label: string;
  value: number;
}

interface FormData {
  fullName: string;
  login: string;
  password: string;
  roleId: number | null;
}

const CreateUser = () => {

  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
  const [roles, setRoles] = useState<RoleOption[]>([]);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    login: '',
    password: '',
    roleId: null
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get<RoleData[]>("v1/role");
        const formattedRoles: RoleOption[] = response.data.map(role => ({
          label: role.name,
          value: role.id
        }));
        setRoles(formattedRoles);
      } catch (error) {
        console.error("Ошибка при загрузке ролей:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== formData.password) {
      setPasswordError('Пароли не совпадают');
    } else {
      setPasswordError('');
    }
  };

  const handleRoleChange = (e: DropdownChangeEvent) => {
    setFormData(prev => ({ ...prev, roleId: e.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.login || !formData.password || !formData.roleId) {
      alert('Заполните все поля');
      return;
    }

    if (formData.password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    api.post('v1/user', formData)
      .then((response) => {
        if (response.status === 201) {
          setFormData({
            fullName: '',
            login: '',
            password: '',
            roleId: null
          });
          setConfirmPassword('');
          setPasswordError('');
          navigate("/users");
        }
      })
      .catch((error) => {
        console.error('Ошибка при создании пользователя:', error);
        alert('Не удалось создать пользователя.');
      });
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
        <h3 className="page-title">Создание пользователя</h3>
      </div>
      <div className="div-container-edit">
        <div className="div-content">
          <span className="input-name-active">ФИО</span>
          <input className="input-text-active" type="text" name="fullName"
            value={formData.fullName}
            onChange={handleInputChange} />

          <span className="input-name-active">Логин</span>
          <input className="input-text-active" type="text" name="login"
            value={formData.login}
            onChange={handleInputChange} />

          <span className="input-name-active">Пароль</span>
          <input className="input-text-active" type="password" name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, password: e.target.value }));
              if (confirmPassword && e.target.value !== confirmPassword) {
                setPasswordError('Пароли не совпадают');
              } else {
                setPasswordError('');
              }
            }} />

          <span className="input-name-active">Подтверждение пароля</span>
          <input className="input-text-active" type="password" name="confirmPassword"
            onChange={handleConfirmPasswordChange} />

          {passwordError && <div style={{ color: 'red', marginBottom: '10px', marginLeft: '20px' }}>{passwordError}</div>}

          <span className="input-name-active">Роль</span>
          <Dropdown className="input-text-active" type="text"
            value={formData.roleId}
            options={roles}
            onChange={handleRoleChange} />

          <Button className="button" onClick={handleSubmit}>Сохранить</Button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateUser;
