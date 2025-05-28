import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/proctoring_results.css";

const Table = () => {
    const results = [
        {
            id: 1,
            student: "Иванов Иван",
            subject: "Машинное обучение",
            proctoring_type: "Оснвные параметры",
            no_student: false,
            extra_person: false,
            other_person: false,
            averting_the_gaze: true,
            talk: false,
            hints: true
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
            <Column field="student" header="Студент"></Column>
            <Column field="subject" header="Предмет"></Column>
            <Column field="proctoring_type" header="Тип прокторинга"></Column>
            <Column field="no_student" header="Отсутствие студента"></Column>
            <Column field="extra_person" header="Лишний человек"></Column>
            <Column field="other_person" header="Другой человек"></Column>
            <Column field="averting_the_gaze" header="Взгляд в сторону"></Column>
            <Column field="talk" header="Разговор"></Column>
            <Column field="hints" header="Подсказки"></Column>
            <Column field="" header=" " style={{ minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header=" " body={button_edit}></Column>

        </DataTable>
    );
};

export default Table;