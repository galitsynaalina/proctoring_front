import React, { useState, useRef } from "react";
import "../css/proctoring_results.css";
import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Avatar } from 'primereact/avatar';
// import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { Table, Theme } from "@radix-ui/themes";
import {SidebarComponent} from "../components/Sidebar";

const ProctoringResults = () => {
  const [visible, setVisible] = useState(false);
  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);
  const btnRef4 = useRef(null);
  return (
    <div>
      <div>
        <header className="header-style">
          <div className="div-conteiner-header">
            <div className="menu-area">
              {/* <button className="button-menu"></button> */}
              <Button className="button-menu" onClick={() => setVisible(true)} />
            </div>
            <div className="user-exit">
              <span className="username">Пользователь</span>
              <button className="button-exit" name="button-exit"></button>
            </div>
          </div>
        </header>
        <SidebarComponent></SidebarComponent>
      </div>
      <div className="div-title">
        <h3 className="proctoring-results-title">Результаты прокторинга</h3>
      </div>
      <div className="div-search">
        <input className="search_by_student" name="search_by_student" type="text" placeholder="Поиск по студенту" />
        <input className="search_by_subject" name="search_by_subject" type="text" placeholder="Поиск по предмету" />
        <input className="search_by_type" name="search_by_type" type="text" placeholder="Поиск по типу" />
      </div>
      <div className="div-table">
        <Theme panelBackground="solid" radius="none" style={{minHeight: "100px"}}>
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
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>123434</Table.Cell>
                <Table.Cell>
                  <button className="button-delete" name="button-delete"></button>
                  <button className="button-edit" name="button-edit"></button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Theme>
      </div>
      <div>
        <footer className="footer-style" />
      </div>
    </div>
  );
};

export default ProctoringResults;
