import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/table.css";
import DeleteModal from "../pages/DeleteModal";
import { saveAs } from 'file-saver'; 

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
    const [loadingReport, setLoadingReport] = useState<number | null>(null);
    const [proctoringMap, setProctoringMap] = useState<Record<number, number>>({});

    async function fetchResults(): Promise<Results[]> {
        const response = await api.get("v1/proctoring-result");
        console.log(response.data);
        return response.data;
    }

    async function fetchProctorings() {
    try {
        const response = await api.get('/v1/proctoring');
        const proctorings = response.data;

        const map: Record<number, number> = {};
        proctorings.forEach((p: any) => {
            if (p.resultId) {
                map[p.resultId] = p.id;
            }
        });

        setProctoringMap(map);
    } catch (error) {
        console.error('Ошибка при загрузке прокторингов:', error);
    }
}

    async function prepareResults() {
        const rawResults: RawRow[] = await fetchResults();
        const newResults: PreparedRow[] = [];

        for (const row of rawResults) {

            const proctoringId = proctoringMap[row.id]
            
            const newRow: PreparedRow = {
                proctoringId: proctoringId,
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
        fetchProctorings(); 
    }, []);

    useEffect(() => {
    if (Object.keys(proctoringMap).length > 0) {
        prepareResults();
    }
}, [proctoringMap]);

    const filteredResults = results.filter(item => {
        return (
            item.userName.toLowerCase().includes(filters.studentName.toLowerCase()) &&
            item.subjectName.toLowerCase().includes(filters.subjectName.toLowerCase()) &&
            item.proctoringName.toLowerCase().includes(filters.proctoringName.toLowerCase())
        );
    });

    const downloadReport = async (proctoringId: number, rowIndex: number) => {
        setLoadingReport(rowIndex);
        try {
            const response = await api.get(`v1/proctoring/${proctoringId}/report`, {
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'];
            let filename = `proctoring_report_${proctoringId}.pdf`;
            if (contentDisposition) {
                const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (match && match[1]) {
                    filename = match[1].replace(/['"]/g, '');
                }
            }

            saveAs(response.data, filename);
            } catch (error) {
            console.error('Ошибка при загрузке отчета:', error);
        } finally {
            setLoadingReport(null);
        }
    };

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

    const pdfReportTemplate = (rowData: PreparedRow, column: any) => {
        const rowIndex = results.findIndex(r => r.id === rowData.id);
        const isDownloading = loadingReport === rowIndex;

        return (
            <div className="flex justify-center">
                <button
                    onClick={() => downloadReport(rowData.proctoringId, rowIndex)}
                    disabled={isDownloading}
                    className={`p-2 rounded-full ${isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    title="Скачать отчёт PDF"
                >
                    {isDownloading ? (
                        <i className="pi pi-spin pi-spinner text-xl w-8 h-8  text-blue-600" style={{ fontSize: '32px' }}></i>
                    ) : (
                        <i className="pi pi-file-pdf text-xl w-8 h-8 text-red-600 " style={{ fontSize: '32px' }}></i>
                    )}
                </button>
            </div>
        );
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
                <Column field="detectedHintsOutside" header="Поворот головы" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                <Column field="detectedMouthOpening" header="Разговор" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column>
                {/* <Column field="detectedHintsOutside" header="Подсказки" headerClassName="table-header-text center-header-text" bodyClassName="center-column-body"></Column> */}
                <Column
                    header="Отчёт PDF"
                    body={pdfReportTemplate}
                    headerClassName="table-header-text center-header-text"
                    bodyClassName="center-column-body"
                ></Column>
                <Column style={{ minWidth: '30px' }} body={(rowData) => button_delete(rowData.id)} ></Column>
                <Column body={(rowData) => button_edit(rowData.id)}></Column>
            </DataTable>
            <DeleteModal active={modalActive} setActive={setModalActive} onConfirm={() => handleDelete(recordIdToDelete)} />
        </div>
    );
};

export default Table;