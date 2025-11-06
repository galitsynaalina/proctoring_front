import api from "../api/api";
import { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css"

interface Results {
    proctoringName: string;
    userName: string;
    subjectName: string;
    resultId: number;
    // [key: string]: any;
}

type PreparedRow = {
    proctoringName: string;
    userName: string;
    subjectName: string;
    resultId: number;
    // [key: string]: any;
};


const Table = () => {

    const [results, setResults] = useState<PreparedRow[]>([]);
    async function fetchResults(): Promise<Results[]> {
        const response = await api.get("v1/proctoring");
        console.log(response.data);
        return response.data;
    }


    useEffect(() => {
        async function prepareResults() {
        try {
            const rawResults = await fetchResults();
            if (!rawResults || !Array.isArray(rawResults)) {
                throw new Error('Некорректный формат данных');
            }
            const newResults = rawResults.map(row => ({ ...row }));
            setResults(newResults);
            console.log("Обработанные данные:", newResults);
        } catch (error) {
            console.error("Ошибка при подготовке данных:", error);
            setResults([]);
        }
    }

    prepareResults();
    }, [])

    // const results: Results[] = [
    //     {
    //         proctoringName: "Основные параметры",
    //         subjectName: "Предмет",
    //         userName: "Администратор",
    //         resultId: 1
    //     },
    //     {
    //         proctoringName: "Основные параметры",
    //         subjectName: "Машинное обучение",
    //         userName: "Петров Петр",
    //         resultId: 2
    //     },
    //     ,
    //     {
    //         proctoringName: "Основные параметры",
    //         subjectName: "Предмет",
    //         userName: "Студент",
    //         resultId: 3
    //     }
    // ];


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