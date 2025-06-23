import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";

const Table = ({ filters }) => {

    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const [results, setResults] = useState([]);

    async function fetchResults() {
        const response = await api.get("v1/proctoring-result");
        console.log(response.data);
        return response.data;
    }

    async function prepareResults() {
        const rawResults = await fetchResults();
        const newResults = [];

        for (const row of rawResults) {
            const newRow = {};

            for (const key in row) {
                const value = row[key];

                if (typeof value === "boolean") {
                    newRow[key] = value
                        ? <img src="../images/success.svg" />
                        : <img src="../images/error.svg" />;
                } else {
                    newRow[key] = value;
                }
            }
            newResults.push(newRow);
        }
        setResults(newResults);
        console.log(results);
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`v1/proctoring-result/${id}`);
            setResults(results.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    useEffect(() => {
        prepareResults()
    }, [])

    const filteredResults = results.filter(item => {
    return (
        item.userName.toLowerCase().includes(filters.studentName.toLowerCase()) &&
        item.subjectName.toLowerCase().includes(filters.subjectName.toLowerCase()) &&
        item.proctoringName.toLowerCase().includes(filters.proctoringName.toLowerCase())
    );
});

    const button_delete = (id) => {
        return <button className="button-delete" name="button-delete" onClick={() => {
            setModalActive(true);
            setRecordIdToDelete(id);
        }
        } />;
    };

    const button_edit = (id) => {
        return <button className="button-edit" name="button-edit" onClick={() => navigate(`/edit-proctoring-results/${id}`)} />;
    };


    return (
        <div>
            <DataTable stripedRows paginator rows={10} dataKey="id" value={filteredResults} tableStyle={{ minWidth: '50rem' }}>
                <Column field="userName" header="Студент" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="subjectName" header="Предмет" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="proctoringName" header="Тип прокторинга" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="detectedAbsencePerson" header="Отсутствие студента" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedExtraPerson" header="Лишний человек" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedPersonSubstitution" header="Другой человек" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedLookingAway" header="Взгляд в сторону" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedMouthOpening" header="Разговор" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedHintsOutside" header="Подсказки" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column style={{ minWidth: '30px' }} body={(rowData) => button_delete(rowData.id)} ></Column>
                <Column body={(rowData) => button_edit(rowData.id)}></Column>
            </DataTable>
            <DeleteModal active={modalActive} setActive={setModalActive} onConfirm={() => handleDelete(recordIdToDelete)} />
        </div>
    );
};

export default Table;