import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import "../css/proctoring_results.css";

const Table = () => {
    const results = [
        {
            id: 1,
            fio: "Проверяющий",
            login: "login",
            role: "роль",
        },
    ];

    const button_delete = () => {
        return <button className="button-delete" name="button-delete"/>;
    };

    const button_edit = () => {
        return <button className="button-edit" name="button-edit"/>;
    };

    return (
        <DataTable stripedRows paginator rows={10} value={results} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID"></Column>
            <Column field="fio" header="ФИО"></Column>
            <Column field="login" header="Логин"></Column>
            <Column field="role" header="Роль"></Column>
            <Column field="" header="" style={{width: "50px", minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" body={button_edit} style={{width: "50px"}}></Column>

        </DataTable>
    );
};

export default Table;