import api from "../api/api";
import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";

const Table = () => {
    const [users, setUsers] = useState([])
    
    async function fetchUsers() {
        const response = await api.get("/v1/user")
        setUsers(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const button_delete = () => {
        return <button className="button-delete" name="button-delete" />;
    };

    const button_edit = () => {
        return <button className="button-edit" name="button-edit" />;
    };

    return (
        <DataTable stripedRows paginator rows={10} value={users} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="fullName" header="ФИО" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="login" header="Логин" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="roleName" header="Роль" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="" header="" style={{ width: "50px", minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" body={button_edit} style={{ width: "50px" }}></Column>

        </DataTable>
    );
};

export default Table;