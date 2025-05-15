import React from "react";
import "../index.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import { Button } from "@blueprintjs/core";

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
        <div className="div-search">
            <input name="search_for_student" type="text" placeholder="Поиск по студенту"/>
            <input/>
            <input/>
        </div>
        <div>
        <footer className="footer-style"/>
        </div>
    </div>
    );
};  

export default ProctoringResults;
