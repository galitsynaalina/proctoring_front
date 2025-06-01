import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css"

const Table = () => {
    const results = [
        {
            id: 1,
            name: "Машинное обучение",
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
            <Column field="id" header="ID" className="table-text" headerClassName="table-header-text"></Column>
            <Column field="name" header="Название предмета"  className="table-text" headerClassName="table-header-text"></Column>
            <Column field="" header="" style={{width: "50px", minWidth: '30px' }} body={button_delete}></Column>
            <Column field="" header="" body={button_edit} style={{width: "50px"}}></Column>

        </DataTable>
    );
};

export default Table;