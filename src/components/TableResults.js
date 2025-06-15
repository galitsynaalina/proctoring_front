import api from "../api/api";
import { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";
import { useNavigate } from "react-router-dom";

const Table = () => {

    const [modalActive, setModalActive] = useState(false);
    const [results, setResults] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    async function fetchResults() {
        const response = await api.get("v1/proctoring-result");
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

    useEffect(() => {
        prepareResults()
    }, [])

    const deleteResult = async () => {
        try {
            await api.delete(`v1/proctoring-result/${selectedId}`);
            setModalActive(false);
            prepareResults(); // обновляем таблицу
        } catch (error) {
            console.error("Ошибка при удалении", error);
        }
    };

    const button_delete = (rowData) => {
        return <button className="button-delete" name="button-delete"
            onClick={() => {
                setSelectedId(rowData.id);
                setModalActive(true);
            }} />;
    };

    const button_edit = (rowData) => {
        return <button className="button-edit" name="button-edit"
            onClick={() => navigate(`/edit-proctoring-results/${rowData.id}`)} />;
    };

    return (
        <div>
            <DataTable stripedRows paginator rows={10} value={results} tableStyle={{ minWidth: '50rem' }}>
                <Column field="userName" header="Студент" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="subjectName" header="Предмет" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="proctoringName" header="Тип прокторинга" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="detectedAbsencePerson" header="Отсутствие студента" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedExtraPerson" header="Лишний человек" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedPersonSubstitution" header="Другой человек" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedLookingAway" header="Взгляд в сторону" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedMouthOpening" header="Разговор" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedHintsOutside" header="Подсказки" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column style={{ minWidth: '30px' }} body={button_delete} ></Column>
                <Column body={button_edit}></Column>
            </DataTable>
            <DeleteModal active={modalActive} setActive={setModalActive} onConfirm={deleteResult} />
        </div>
    );
};

export default Table;