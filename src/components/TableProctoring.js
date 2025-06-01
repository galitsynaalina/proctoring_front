import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css"

const Table = () => {
    const results = [
        {
            id: 1,
            type: "Основные параметры",
            subject: "Машинное обучение",
            student: "Иванов Иван Иванович",
        },
    ];

    const button_delete = () => {
        return <button className="button-delete" name="button-delete" />;
    };

    const button_edit = () => {
        return <button className="button-edit" name="button-edit" />;
    };

    const button_link = () => {
        return <button className="button-link" name="button-link" />;
    };

    return (
        <DataTable stripedRows paginator rows={10} value={results} tableStyle={{ minWidth: '50rem' }}>
            <Column field="type" header="Тип" className="table-text" headerClassName="table-header-text" style={{ minWidth: "350px"}}></Column>
            <Column field="subject" header="Предмет" className="table-text" headerClassName="table-header-text" style={{ minWidth: "350px"}}></Column>
            <Column field="student" header="Студент" className="table-text" headerClassName="table-header-text" style={{ minWidth: "350px"}}></Column>
            <Column field="" header="Результат" headerClassName="table-header-text" style={{ minWidth: '150px' }} body={button_link}></Column>
            <Column field="" header="" className="table-text" headerClassName="table-header-text" style={{ width: "50px", minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" className="table-text" headerClassName="table-header-text" body={button_edit} style={{ width: "50px" }}></Column>

        </DataTable>
    );
};

export default Table;