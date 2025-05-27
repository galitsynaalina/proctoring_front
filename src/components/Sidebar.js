import React, { useState, useRef } from "react";
import "../css/proctoring_results.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

export function SidebarComponent(e) {
  const [visible, setVisible] = useState(false);
  return (
    <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          content={({ closeIconRef, hide }) => (
            <div className="min-h-screen flex relative lg:static surface-ground">
              <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none">
                <div>
                  <header className="header-style">
                    <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} className="button-menu"></Button>
                  </header>
                  <div>
                    <div className="menu-item">
                      <span className="menu-item-text">Результаты</span>
                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Типы прокторинга</span>
                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Прокторинги</span>

                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Роли</span>
                    </div>
                    <div className="menu-item">
                      <span className="menu-item-text">Пользователи</span>
                    </div>
                  </div>
                </div>
                <div>
                  <footer className="footer-style" />
                </div>
              </div>
            </div>
          )}
        ></Sidebar>
  )
}

export default SidebarComponent;