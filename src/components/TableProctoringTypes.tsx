import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";

interface ProctoringType {
    name: string;
    absencePerson: boolean;
    extraPerson: boolean;
    personSubstitution: boolean;
    lookingAway: boolean;
    mouthOpening: boolean;
    hintsOutside: boolean;
    [key: string]: any;
}

interface RawRow {
    [key: string]: any;
}

type PreparedRow = {
    name: string;
    absencePerson: React.ReactNode;
    extraPerson: React.ReactNode;
    personSubstitution: React.ReactNode;
    lookingAway: React.ReactNode;
    mouthOpening: React.ReactNode;
    hintsOutside: React.ReactNode;
    [key: string]: any;
};

const Table = () => {
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState<number>(0);
    const [results, setResults] = useState<PreparedRow[]>([]);

    async function fetchResults(): Promise<ProctoringType[]> {
        const response = await api.get("v1/proctoring/proctoringType");
        console.log(response.data);
        return response.data;
    }

    async function prepareResults() {
        const rawResults: RawRow[] = await fetchResults();
        const newResults: PreparedRow[] = [];

        for (const row of rawResults) {
            const newRow: PreparedRow = {
                name: row.name,
                absencePerson: typeof row.detectedAbsencePerson === "boolean"
                    ? (row.absencePerson
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.absencePerson,
                extraPerson: typeof row.extraPerson === "boolean"
                    ? (row.extraPerson
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.extraPerson,
                personSubstitution: typeof row.personSubstitution === "boolean"
                    ? (row.personSubstitution
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.personSubstitution,
                lookingAway: typeof row.lookingAway === "boolean"
                    ? (row.lookingAway
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.lookingAway,
                mouthOpening: typeof row.mouthOpening === "boolean"
                    ? (row.mouthOpening
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.mouthOpening,
                hintsOutside: typeof row.hintsOutside === "boolean"
                    ? (row.hintsOutside
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.hintsOutside
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
        console.log(results);
    }

    useEffect(() => {
        prepareResults()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`v1/proctoring/proctoringType/${id}`);
            setResults(results.filter(item => item.id !== id));
            setModalActive(false);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    const button_delete = (id: number) => {
        return <button className="button_delete" name="button-delete" onClick={() => {
            setModalActive(true);
            setRecordIdToDelete(id);
        }} />;
    };

    const button_edit = (id: number) => {
        return <button className="button_edit" name="button-edit" onClick={() => navigate(`/edit-type/${id}`)} />;
    };

    return (
        <div>
            <DataTable stripedRows paginator rows={10} value={results} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Название" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="absencePerson" header="Отсутствие студента" headerClassName="table-header-text"></Column>
                <Column field="extraPerson" header="Лишний человек" headerClassName="table-header-text"></Column>
                <Column field="personSubstitution" header="Другой человек" headerClassName="table-header-text"></Column>
                <Column field="lookingAway" header="Взгляд в сторону" headerClassName="table-header-text"></Column>
                <Column field="mouthOpening" header="Разговор" headerClassName="table-header-text"></Column>
                <Column field="hintsOutside" header="Подсказки" headerClassName="table-header-text"></Column>
                <Column field="" header="" style={{ width: "50px", minWidth: '30px' }} body={(rowData) => button_delete(rowData.id)}></Column>
                <Column field="" header="" body={(rowData) => button_edit(rowData.id)} style={{ width: "50px" }}></Column>
            </DataTable>
            <DeleteModal active={modalActive} setActive={setModalActive} onConfirm={() => handleDelete(recordIdToDelete)} />
        </div>
    );
};

export default Table;