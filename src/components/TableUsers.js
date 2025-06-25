import api from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";

const Table = ({ filters }) => {

    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const [users, setUsers] = useState([])

    async function fetchUsers() {
        const response = await api.get("/v1/user")
        console.log(response.data)
        setUsers(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDelete = async (id) => {
        try {
            await api.delete(`v1/user/${id}`);
            setUsers(users.filter(item => item.id !== id));
            setModalActive(false);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };


    const filteredResults = users.filter(item => {
        return (
            item.fullName.toLowerCase().includes(filters.fullName.toLowerCase())
        );
    });

    const button_delete = (id) => {
        return <button className="button-delete" name="button-delete" onClick={() => {
            setModalActive(true);
            setRecordIdToDelete(id);
        }}/>;
    };

    const button_edit = (id) => {
        return <button className="button-edit" name="button-edit" onClick={() => navigate(`/edit-user/${id}`)}/>;
    };

    return (
        <div>
        <DataTable stripedRows paginator rows={10} value={filteredResults} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="fullName" header="ФИО" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="login" header="Логин" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="roleName" header="Роль" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="" header="" style={{ width: "50px", minWidth: '30px' }} body={(rowData) => button_delete(rowData.id)}></Column>
            <Column field="" header="" body={(rowData) => button_edit(rowData.id)} style={{ width: "50px" }}></Column>
        </DataTable>
        <DeleteModal active={modalActive} setActive={setModalActive} onConfirm={() => handleDelete(recordIdToDelete)} />
        </div>
    );
};

export default Table;