import { useRef } from "react"; 
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

interface SidebarMenuProps {
    visible: boolean;
    onHide: () => void;
    username: string | null;
}

const SidebarMenu = ({ visible, onHide, username }: SidebarMenuProps) => {
    const closeIconRef = useRef<Button>(null); 

    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            content={({ closeIconRef: sidebarCloseIconRef, hide }) => (
                    <div
                        id="app-sidebar-2"
                        className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
                    >
                        <div>
                            <header className="header-style">
                                <Button
                                    className="button-menu"
                                    type="button"
                                    ref={closeIconRef as React.Ref<Button>}
                                    onClick={(e) => hide(e)}
                                />
                            </header>
                            <div>
                                <a href="/proctoring-results" className="menu-item">
                                    <div className="menu-item-text">Результаты</div>
                                </a>
                                <a href="/proctoring-types" className="menu-item">
                                    <div className="menu-item-text">Типы прокторинга</div>
                                </a>
                                <a href="/proctoring" className="menu-item">
                                    <div className="menu-item-text">Прокторинги</div>
                                </a>
                                {username === 'admin' && (
                                    <>
                                        <a href="/roles" className="menu-item">
                                            <div className="menu-item-text">Роли</div>
                                        </a>
                                        <a href="/users" className="menu-item">
                                            <div className="menu-item-text">Пользователи</div>
                                        </a>
                                    </>
                                )}
                                <a href="/subjects" className="menu-item">
                                    <div className="menu-item-text">Предметы</div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <footer className="footer-style" />
                        </div>
                    </div>
            )}
        />
    );
};

export default SidebarMenu;