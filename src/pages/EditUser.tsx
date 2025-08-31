import api from "../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/edit_user.css";
import "../css/footer.css"
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface UserData {
  fullName: string;
  login: string;
  password: string;
  role?: {
    id: number;
    name: string;
  };
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

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    login: '',
    password: '',
    roleId: null
  });

  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<UserData>(`v1/user/${id}`);
        const data = response.data;

        setFormData({
          fullName: data.fullName || '',
          login: data.login || '',
          password: data.password || '',
          roleId: Number(data.role?.id) || null
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные.');
        navigate('/users');
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await api.get<UserData[]>("v1/role");
        const formattedRoles: RoleOption[] = response.data.map((role: any) => ({
          label: role.name,
          value: role.id
        }));
        setRoles(formattedRoles);
      } catch (error) {
        console.error("Ошибка при загрузке ролей:", error);
      }
    };

    fetchData();
    fetchRoles();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== formData.password) {
      setPasswordError('Пароли не совпадают');
    } else {
      setPasswordError('');
    }
  };

  const handleRoleChange = (e: DropdownChangeEvent) => {
    setFormData(prev => ({ ...prev, roleId: Number(e.value) }));
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.login || !formData.password || !formData.roleId) {
      alert('Заполните все поля');
      return;
    }

    if (formData.password !== confirmPassword && confirmPassword !== '') {
      setPasswordError('Пароли не совпадают');
      return;
    }

    try {
      await api.patch<UserData>(`/v1/user/${id}`, formData);
      alert('Данные успешно обновлены');
      navigate('/users');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Не удалось сохранить изменения');
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
        <h3 className="page-title">Редактирование пользователя</h3>
      </div>

      <div className="div-container-edit">
        <div className="div-content">

          <span className="input-name-active">ФИО</span>
          <input
            className="input-text-active"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <span className="input-name-active">Логин</span>
          <input
            className="input-text-active"
            type="text"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
          />

          <span className="input-name-active">Пароль</span>
          <input
            className="input-text-active"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, password: e.target.value }));
              if (confirmPassword && e.target.value !== confirmPassword) {
                setPasswordError('Пароли не совпадают');
              } else {
                setPasswordError('');
              }
            }}
          />

          <span className="input-name-active">Подтверждение пароля</span>
          <input
            className="input-text-active"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          {passwordError && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {passwordError}
            </div>
          )}

          <span className="input-name-active">Роль</span>
          <Dropdown
            className="input-text-active"
            value={formData.roleId}
            options={roles}
            onChange={handleRoleChange}
            placeholder="Выберите роль"
            filter
          />

          <Button className="button" onClick={handleSave}>Сохранить</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditUser;