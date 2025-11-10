import api from "../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "../css/edit_user.css";
import "../css/footer.css"
// import '@coreui/coreui/dist/css/coreui.min.css'
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";

interface UserData {
  fullName: string;
  login: string;
  password: string;
  role?: {
    id: number;
    name: string;
  };
  subjects?: SubjectUserData[];
}

interface SubjectData {
  id: number;
  name: string;
}

interface SubjectUserData {
  subjectId: number;
  userId: number;
}

interface RoleOption {
  label: string;
  value: number;
}

interface RoleData {
  id: number;
  name: string;
}

interface FormData {
  fullName: string;
  login: string;
  password?: string;
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

  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectData[]>([]);
  const [userSubjects, setUserSubjects] = useState<SubjectUserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<UserData>(`v1/user/${id}`);
        const data = response.data;



        setFormData({
          fullName: data.fullName || '',
          login: data.login || '',
          password: '',
          roleId: Number(data.role?.id) || null
        });

        const SubjectUser = [
          {
            subjectId: 1,
            userId: 4
          },
          {
            subjectId: 2,
            userId: 4
          },
          {
            subjectId: 2,
            userId: 3
          },

        ];

        setUserSubjects(SubjectUser);

      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные.');
        navigate('/users');
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await api.get<RoleData[]>("/v1/role");
        const formattedRoles: RoleOption[] = response.data.map((role) => ({
          label: role.name,
          value: role.id
        }));
        setRoles(formattedRoles);
      } catch (error) {
        console.error("Ошибка при загрузке ролей:", error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await api.get<SubjectData[]>("/v1/subject");
        setSubjects(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке предметов:", error);
      }
    };


    fetchData();
    fetchRoles();
    fetchSubjects();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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

  const searchSubjects = (event: any) => {
    const query = event.query.toLowerCase();
    const filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  const assignSubject = async (subjectId: number) => {
    try {
      await api.post(`/v1/subject/assignSubject`, {
        subjectId: subjectId,
        userId: id
      });
      alert('Предмет успешно привязан');
      const response = await api.get<UserData>(`/v1/user/${id}`);
      if (response.data.subjects) {
        setUserSubjects(response.data.subjects);
      }
    } catch (error) {
      console.error('Ошибка при привязке предмета:', error);
      alert('Не удалось привязать предмет');
    }
  };

  const addSubject = () => {
    if (!selectedSubject) return;

    const subject = subjects.find(s => s.name === selectedSubject);
    if (subject && !userSubjects.some(us => us.subjectId === subject.id)) {
      assignSubject(subject.id);
      setSelectedSubject("");
    }
  };

  const removeSubject = async (id: number) => {
    // доделать удаление привязки предмета к преподу
    try {
      const response = await api.get<UserData>(`/v1/user/${id}`);
      if (response.data.subjects) {
        setUserSubjects(response.data.subjects);
      }
    } catch (error) {
      console.error('Ошибка при удалении предмета:', error);
      alert('Не удалось обновить список предметов');
    }
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.login || !formData.roleId) {
      alert('Заполните все обязательные поля');
      return;
    }

    if (formData.password && formData.password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    try {
      const updateData: any = {
        fullName: formData.fullName,
        login: formData.login,
        roleId: formData.roleId
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await api.patch<UserData>(`/v1/user/${id}`, updateData);
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

        <div className="flex-1 flex flex-col justify-start">
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
            className="w-[400px] h-[40px] bg-white border-[#1B4E9B] border-[thin] 
                rounded-[2rem] text-black font-montserrat-medium text-base font-bold pl-[17px] pr-[17px] ml-[20px]"

            value={formData.roleId}
            options={roles}
            onChange={handleRoleChange}
            placeholder="Выберите роль"
            filter
          />

          <Button className="button mt-4" onClick={handleSave}>Сохранить</Button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex flex-col">
            <span className="text-black font-montserrat-semibold text-base font-bold mb-2.5 ml-5" style={{ marginTop: '20px' }}>
              Добавление предметов
            </span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginRight: '20px' }}>
              <AutoComplete
                value={selectedSubject}
                suggestions={filteredSubjects.map(s => s.name)}
                completeMethod={searchSubjects}
                onChange={(e) => setSelectedSubject(e.value)}
                placeholder="Начните вводить название предмета"
                className="w-[400px] h-[40px] bg-white border-[#1B4E9B] border-[thin] 
                rounded-[2rem] text-black font-montserrat-medium text-base font-bold pl-[17px] pr-[17px] ml-[20px]"
                inputStyle={{
                  width: '400px', borderRadius: '2rem',
                  color:'black', fontFamily: "'Montserrat SemiBold', sans-serif"
                }}
                style={{ flex: 1 }}
              />
              <Button
                icon="pi pi-plus"
                className="p-button-success p-button-sm"
                onClick={addSubject}
                disabled={!selectedSubject}
              />
            </div>

            <div style={{ marginTop: '10px', borderRadius: '4px', marginLeft: '20px', marginRight: '20px' }}>
              {userSubjects.length === 0 ? (
                <span style={{ color: '#999' }}>Нет привязанных предметов</span>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {userSubjects
                    .filter(subject => subject.userId === Number(id))
                    .map(subject => {
                      const subjectData = subjects.find(s => s.id === subject.subjectId);
                      const subjectName = subjectData?.name || `Предмет ${subject.subjectId}`;
                      return (
                        <li key={subject.subjectId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
                          <input
                            type="text"
                            value={subjectName}
                            className="w-full h-[40px] bg-white  border-[#1B4E9B] border-[thin] rounded-[2rem] text-black font-montserrat-medium text-base font-bold pl-[17px] pr-[17px]"
                            readOnly
                          />
                          <Button
                            icon="pi pi-times"
                            className="p-button-danger p-button-text p-button-sm"
                            onClick={() => removeSubject(subject.subjectId)}
                          />
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
};

export default EditUser;