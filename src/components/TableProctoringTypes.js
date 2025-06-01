import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css"

const Table = () => {
    const results = [
        {
            id: 1,
            name: "Основные параметры",
            no_student: false,
            extra_person: false,
            other_person: false,
            averting_the_gaze: true,
            talk: false,
            hints: true,
        },
    ];

    const button_delete = () => {
        return <button className="button-delete" name="button-delete" />;
    };

    const button_edit = () => {
        return <button className="button-edit" name="button-edit" />;
    };

    return (
        <DataTable stripedRows paginator rows={10} value={results} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Название" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="no_student" header="Отсутствие студента" headerClassName="table-header-text"></Column>
            <Column field="extra_person" header="Лишний человек" headerClassName="table-header-text"></Column>
            <Column field="other_person" header="Другой человек" headerClassName="table-header-text"></Column>
            <Column field="averting_the_gaze" header="Взгляд в сторону" headerClassName="table-header-text"></Column>
            <Column field="talk" header="Разговор" headerClassName="table-header-text"></Column>
            <Column field="hints" header="Подсказки" headerClassName="table-header-text"></Column>
            <Column field="" header="" style={{ width: "50px", minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" body={button_edit} style={{ width: "50px" }}></Column>

        </DataTable>
    );
};

export default Table;