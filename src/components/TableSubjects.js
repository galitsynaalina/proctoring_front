import api from "../api/api";
import { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css"

const Table = () => {
    // const [results, setResults] = useState([]);

    // async function fetchResults() {
    //     const response = await api.get("v1/subject");
    //     console.log(response.data);
    //     return response.data;
    // }

    // async function prepareResults() {
    //     const rawResults = await fetchResults();
    //     const newResults = [];

    //     for (const row of rawResults) {
    //         const newRow = {};

    //         for (const key in row) {
    //             const value = row[key];

    //             if (typeof value === "boolean") {
    //                 newRow[key] = value
    //                     ? <img src="../images/success.svg" />
    //                     : <img src="../images/error.svg" />;
    //             } else {
    //                 newRow[key] = value;
    //             }
    //         }
    //         newResults.push(newRow);
    //     }
    //     setResults(newResults);
    //     console.log(results);
    // }

    // useEffect(() => {
    //     prepareResults()
    // }, [])

    const results = [
        {
            id: 1,
            name: "Предмет",
        },
        {
            id: 2,
            name: "Машинное обучение",
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
            <Column field="id" header="ID" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="name" header="Название предмета" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="" header="" style={{ width: "50px", minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" body={button_edit} style={{ width: "50px" }}></Column>

        </DataTable>
    );
};

export default Table;