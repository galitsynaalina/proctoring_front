import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from 'primereact/button';
import Table from "../components/TableSubjects";
import Footer from "../components/Footer";
import SidebarMenu from "../components/Sidebar";

interface Filters {
  name: string;
}

const Subjects = () => {

  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    name: ''
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div>
        <header className="bg-[#1B4E9B] h-[71px]  relative">
          <div className="h-[71px] grid">
            <div className="row-start-1 row-end-2 col-start-1 col-end-2">
              <Button className="w-[38px] h-[38px] bg-transparent border-none cursor-pointer"
              style={{
                marginLeft: '17px',
                marginTop: '15px',  
                backgroundImage: `url('/images/Menu.svg')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
              onClick={() => { setVisible(true) }} />
              <SidebarMenu
                visible={visible}
                onHide={() => setVisible(false)}
                username={username}
              />
            </div>
            <div className="absolute right-0 top-0 h-full flex items-center pr-14">
              <span className="text-white text-[18px] font-bold font-montserrat-bold w-[137px] text-right">{username}</span>
              <button className="w-[35px] h-[35px] ml-2.5 bg-transparent border-none cursor-pointer"
              name="button-exit"
              style={{
                backgroundImage: `url('/images/Logout.svg')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                marginLeft: '10px',
                marginTop: '18px',               
                marginBottom: '18px',
              }}></button>
            </div>
          </div>
        </header>
      </div>
      <div className="mt-10 px-14">
        <h3 className="text-[32px] font-montserrat-semibold"
        style={{ color: '#1B4E9B' }}>Предметы</h3>
      </div>
      <div className="flex mt-[20px] mb-[20px] justify-between items-end">
        <input className="w-[362px] h-[40px] px-[17.14px] ml-[58px] bg-white border-1 border-[#1B4E9B] rounded-full  text-[#1B4E9B] placeholder:text-[#D9D9D9] text-[12px] font-montserrat-semibold" name="name" type="text" placeholder="Поиск по предмету"
          value={filters.name}
          onChange={handleChange} />
        <Button className="w-[307px] h-[50px] mr-[58px] bg-[#1B4E9B] text-white rounded-full text-[20px] font-montserrat-semibold flex items-center justify-center px-6 transition hover:bg-opacity-90" onClick={() => navigate("/create-subject")}>Добавить предмет</Button>
      </div>
      <div className="ml-[58px] mr-[58px] mt-[20px] mb-[32px]">
        <Table filters={filters} />
      </div>
      <div>
        <Footer />
      </div>
    </div >
  );
};

export default Subjects;
