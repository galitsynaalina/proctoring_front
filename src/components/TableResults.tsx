import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";

interface Filters {
    studentName: string;
    subjectName: string;
    proctoringName: string;
}

interface Results {
    userName: string;
    subjectName: string;
    proctoringName: string;
    detectedAbsencePerson: boolean;
    detectedExtraPerson: boolean;
    detectedPersonSubstitution: boolean;
    detectedLookingAway: boolean;
    detectedMouthOpening: boolean;
    detectedHintsOutside: boolean;
    [key: string]: any;
}

interface RawRow {
    [key: string]: any;
}

type PreparedRow = {
    userName: string;
    subjectName: string;
    proctoringName: string;
    detectedAbsencePerson: React.ReactNode;
    detectedExtraPerson: React.ReactNode;
    detectedPersonSubstitution: React.ReactNode;
    detectedLookingAway: React.ReactNode;
    detectedMouthOpening: React.ReactNode;
    detectedHintsOutside: React.ReactNode;
    [key: string]: any;
};

const Table = ({ filters }: { filters: Filters }) => {

    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState<number>(0);
    const [results, setResults] = useState<PreparedRow[]>([]);

    async function fetchResults(): Promise<Results[]> {
        const response = await api.get("v1/proctoring-result");
        console.log(response.data);
        return response.data;
    }

    async function prepareResults() {
        const rawResults: RawRow[] = await fetchResults();
        const newResults: PreparedRow[] = [];

        for (const row of rawResults) {
            const newRow: PreparedRow = {
                userName: row.userName,
                subjectName: row.subjectName,
                proctoringName: row.proctoringName,
                detectedAbsencePerson: typeof row.detectedAbsencePerson === "boolean"
                    ? (row.detectedAbsencePerson
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.detectedAbsencePerson,
                detectedExtraPerson: typeof row.detectedExtraPerson === "boolean"
                    ? (row.detectedExtraPerson
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.detectedExtraPerson,
                detectedPersonSubstitution: typeof row.detectedPersonSubstitution === "boolean"
                    ? (row.detectedPersonSubstitution
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.detectedPersonSubstitution,
                detectedLookingAway: typeof row.detectedLookingAway === "boolean"
                    ? (row.detectedLookingAway
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.detectedLookingAway,
                detectedMouthOpening: typeof row.detectedMouthOpening === "boolean"
                    ? (row.detectedMouthOpening
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.detectedMouthOpening,
                detectedHintsOutside: typeof row.detectedHintsOutside === "boolean"
                    ? (row.detectedHintsOutside
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.detectedHintsOutside
            };

            for (const key in row) {
                if (Object.prototype.hasOwnProperty.call(row, key)) {
                    
                    if (key in newRow) continue;

                    const value = row[key];
                    if (typeof value === "boolean") {
                        newRow[key] = value
                            ? <img src="../images/success.svg" alt="success" />
                            : <img src="../images/error.svg" alt="error" />;
                    } else {
                        newRow[key] = value;
                    }
                }
            }
            newResults.push(newRow);
        }
        setResults(newResults);
    }

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`v1/proctoring-result/${id}`);
            setResults(results.filter(item => item.id !== id));
            setModalActive(false);
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

    const button_delete = (id: number) => {
        return <button className="button-delete" name="button-delete" onClick={() => {
            setModalActive(true);
            setRecordIdToDelete(id);
        }
        } />;
    };

    const button_edit = (id: number) => {
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