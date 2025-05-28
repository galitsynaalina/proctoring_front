import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/proctoring_results.css";

const Table = () => {
    const results = [
        {
            id: 1,
            role_name: "Проверяющий",
            create: true,
            reading: true,
            edit: true,
            delete: false,
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
            <Column field="role_name" header="Название роли"></Column>
            <Column field="create" header="Права на создание"></Column>
            <Column field="reading" header="Права на редактирование"></Column>
            <Column field="edit" header="Права на удаление"></Column>
            <Column field="" header="" style={{ minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" body={button_edit}></Column>

        </DataTable>
    );
};

export default Table;