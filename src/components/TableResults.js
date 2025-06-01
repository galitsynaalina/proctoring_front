import { React, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";

const Table = () => {

 const [modalActive, setModalActive] = useState(false);

    const results = [
        {
            id: 1,
            student: "Иванов Иван",
            subject: "Машинное обучение",
            proctoring_type: "Основные параметры",
            no_student: false,
            extra_person: false,
            other_person: false,
            averting_the_gaze: true,
            talk: false,
            hints: true,
        },
    ];

    const button_delete = () => {
        return <button className="button-delete" name="button-delete" onClick={() => setModalActive(true)} />;
    };

    const button_edit = () => {
        return <button className="button-edit" name="button-edit" />;
    };

    return (
        <div>
        <DataTable stripedRows paginator rows={10} value={results} tableStyle={{ minWidth: '50rem' }}>
            <Column field="student" header="Студент" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="subject" header="Предмет" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="proctoring_type" header="Тип прокторинга" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="no_student" header="Отсутствие студента" headerClassName="table-header-text"></Column>
            <Column field="extra_person" header="Лишний человек" headerClassName="table-header-text"></Column>
            <Column field="other_person" header="Другой человек" headerClassName="table-header-text"></Column>
            <Column field="averting_the_gaze" header="Взгляд в сторону" headerClassName="table-header-text"></Column>
            <Column field="talk" header="Разговор" headerClassName="table-header-text"></Column>
            <Column field="hints" header="Подсказки" headerClassName="table-header-text"></Column>
            <Column style={{ minWidth: '30px' }} body={button_delete} ></Column>
            <Column body={button_edit}></Column>
        </DataTable>
        <DeleteModal active={modalActive} setActive={setModalActive}/>
        </div>
    );
};

export default Table;