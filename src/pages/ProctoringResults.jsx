import React from "react";
import "../css/proctoring_results.css";
import "@radix-ui/themes/styles.css";
import { Table, Theme } from "@radix-ui/themes";

const ProctoringResults = () => {
    return (
    <div>
        <div>
        <header className="header-style">
            <div className="div-conteiner-header">
            <div className="menu-area">  
            <button className="button-menu"></button>
            </div>
            <div className="user-exit">
            <span className="username">Пользователь</span>
            <button className="button-exit"></button>
            </div>
            </div>
        </header>
        </div>
        <div className="div-title">
            <h3 className="proctoring-results-title">Результаты прокторинга</h3>
        </div>
        <div className="div-search">
            <input className="search_by_student" name="search_by_student" type="text" placeholder="Поиск по студенту"/>
            <input className="search_by_subject" name="search_by_subject" type="text" placeholder="Поиск по предмету"/>
            <input className="search_by_type" name="search_by_type" type="text" placeholder="Поиск по типу"/>
        </div>
        <div className="div-table">
         <Theme panelBackground="solid" radius="none"> 
         <Table.Root variant="surface">
	      <Table.Header>
		    <Table.Row>
			<Table.ColumnHeaderCell>Студент</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Предмет</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Тип прокторинга</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Отсутствие студента</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Лишний человек</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Другой человек</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Взгляд в сторону</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Разговор</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Подсказки</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
		     </Table.Row>
	     </Table.Header>

	<Table.Body>
		<Table.Row>
			<Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
			<Table.Cell>danilo@example.com</Table.Cell>
			<Table.Cell>Developer</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
			<Table.Cell>zahra@example.com</Table.Cell>
			<Table.Cell>Admin</Table.Cell>
		</Table.Row>

		<Table.Row>
			<Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
			<Table.Cell>jasper@example.com</Table.Cell>
			<Table.Cell>Developer</Table.Cell>
		</Table.Row>
	        </Table.Body>
           </Table.Root>
          </Theme>
        </div>
        <div>
            <footer className="footer-style"/>
        </div>
    </div>
    );
};  

export default ProctoringResults;
