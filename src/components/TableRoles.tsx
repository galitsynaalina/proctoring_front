import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";

interface Filters {
    name: string;
}

interface Roles {
    id: number;
    name: string;
    rightsCreate: boolean;
    rightsRead: boolean;
    rightsUpdate: boolean;
    rightsDelete: boolean;
    [key: string]: any;
}

interface RawRow {
    [key: string]: any;
}

type PreparedRow = {
    id: number;
    name: string;
    rightsCreate: React.ReactNode;
    rightsRead: React.ReactNode;
    rightsUpdate: React.ReactNode;
    rightsDelete: React.ReactNode;
    [key: string]: any;
};

const Table = ({ filters }: { filters: Filters }) => {
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState<number>(0);
    const [results, setResults] = useState<PreparedRow[]>([]);

    async function fetchResults(): Promise<Roles[]> {
        const response = await api.get("v1/role");
        console.log(response.data);
        return response.data;
    }

    async function prepareResults() {
        const rawResults: RawRow[] = await fetchResults();
        const newResults: PreparedRow[] = [];

        for (const row of rawResults) {
            const newRow: PreparedRow = {
                id: row.id,
                name: row.name,
                rightsCreate: typeof row.rightsCreate === "boolean"
                    ? (row.rightsCreate
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.rightsCreate,
                rightsRead: typeof row.rightsRead === "boolean"
                    ? (row.rightsRead
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.rightsRead,
                rightsUpdate: typeof row.rightsUpdate === "boolean"
                    ? (row.rightsUpdate
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.rightsUpdate,
                rightsDelete: typeof row.rightsDelete === "boolean"
                    ? (row.rightsDelete
                        ? <img src="../images/success.svg" alt="success" />
                        : <img src="../images/error.svg" alt="error" />)
                    : row.rightsDelete
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

    useEffect(() => {
        prepareResults()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`v1/role/${id}`);
            setResults(results.filter(item => item.id !== id));
            setModalActive(false);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };


    const filteredResults = results.filter(item => {
        return (
            item.name.toLowerCase().includes(filters.name.toLowerCase())
        );
    });

    const button_delete = (id: number) => {
        return <button className="button-delete" name="button-delete" onClick={() => {
            setModalActive(true);
            setRecordIdToDelete(id);
        }} />;
    };

    const button_edit = (id: number) => {
        return <button className="button-edit" name="button-edit" onClick={() => navigate(`/edit-role/${id}`)} />;
    };

    return (
        <div>
            <DataTable stripedRows paginator rows={10} value={filteredResults} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Название роли" className="table-text" headerClassName="table-header-text"></Column>
                <Column field="rightsCreate" header="Права на создание" headerClassName="table-header-text"></Column>
                <Column field="rightsRead" header="Права на чтение" headerClassName="table-header-text"></Column>
                <Column field="rightsUpdate" header="Права на редактирование" headerClassName="table-header-text"></Column>
                <Column field="rightsDelete" header="Права на удаление" headerClassName="table-header-text"></Column>
                <Column field="" header="" style={{ width: "50px", minWidth: '30px' }} body={(rowData) => button_delete(rowData.id)}></Column>
                <Column field="" header="" body={(rowData) => button_edit(rowData.id)} style={{ width: "50px" }}></Column>
            </DataTable>
            <DeleteModal active={modalActive} setActive={setModalActive} onConfirm={() => handleDelete(recordIdToDelete)} />
        </div>
    );
};

export default Table;