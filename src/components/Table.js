import React from "react";
import { Table, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default props => (
    <Theme panelBackground="solid" radius="none" style={{ minHeight: "100px" }}>
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell >Студент</Table.ColumnHeaderCell>
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
                    <Table.Cell>Danilo Sousa</Table.Cell>
                    <Table.Cell>danilo@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>123434</Table.Cell>
                    <Table.Cell>
                        {/* <button className="button-delete" name="button-delete"></button>
                        <button className="button-edit" name="button-edit"></button> */}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    </Theme>

    
)
;

