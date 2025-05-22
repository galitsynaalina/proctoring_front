import React from "react";
import "../css/proctoring_results.css";
import "@radix-ui/themes/styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import { Table, Theme } from "@radix-ui/themes";
import {CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavGroup,
  CNavItem,
  CNavTitle,} from '@coreui/react'

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
            <button className="button-exit" name="button-exit"></button>
            </div>
            </div>
        </header>
        
  
    <CSidebar className="border-end" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>CUI</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="#">
        </CNavItem>
        <CNavItem href="#">
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
        <CNavGroup
          toggler={
            <>
            </>
          }
        >
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            Nav dropdown item
          </CNavItem>
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            Nav dropdown item
          </CNavItem>
        </CNavGroup>
        <CNavItem href="https://coreui.io">
        </CNavItem>
        <CNavItem href="https://coreui.io/pro/">
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  

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
            <footer className="footer-style"/>
        </div>
    </div>
    );
};  

export default ProctoringResults;
