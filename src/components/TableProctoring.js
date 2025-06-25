import api from "../api/api";
import { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css"

const Table = () => {

    // const [results, setResults] = useState([]);

    // async function fetchResults() {
    //     const response = await api.get("v1/proctoring");
    //     console.log(response.data);
    //     return response.data;
    // }

    // async function prepareResults() {
    //     try {
    //         const rawResults = await fetchResults();

    //         if (!rawResults || !Array.isArray(rawResults)) {
    //             throw new Error('Некорректный формат данных');
    //         }

    //         const newResults = rawResults.map(row => ({
    //             ...row
    //         }));

    //         setResults(newResults);
    //         console.log("Обработанные данные:", newResults);
    //     } catch (error) {
    //         console.error("Ошибка при подготовке данных:", error);
    //         alert("Не удалось загрузить данные таблицы");
    //         setResults([]);
    //     }
    // }

    // useEffect(() => {
    //     prepareResults()
    // }, [])

    const results = [
        {
            proctoringName: "Основные параметры",
            subjectName: "Предмет",
            userName: "Администратор",
        },
        {
            proctoringName: "Основные параметры",
            subjectName: "Машинное обучение",
            userName: "Петров Петр",
        },
        ,
        {
            proctoringName: "Основные параметры",
            subjectName: "Предмет",
            userName: "Студент",
        }
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
            <Column field="proctoringName" header="Тип" className="table-text" headerClassName="table-header-text" style={{ minWidth: "350px" }}></Column>
            <Column field="subjectName" header="Предмет" className="table-text" headerClassName="table-header-text" style={{ minWidth: "350px" }}></Column>
            <Column field="userName" header="Студент" className="table-text" headerClassName="table-header-text" style={{ minWidth: "350px" }}></Column>
            <Column field="" header="Результат" headerClassName="table-header-text" style={{ minWidth: '150px' }} body={button_link}></Column>
            <Column field="" header="" className="table-text" headerClassName="table-header-text" style={{ width: "50px", minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" className="table-text" headerClassName="table-header-text" body={button_edit} style={{ width: "50px" }}></Column>
        </DataTable>
    );
};

export default Table;