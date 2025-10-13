import { useRef } from "react";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Footer from "./Footer";

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
            className="w-[280px] md:w-[320px]"
            content={({ closeIconRef: sidebarCloseIconRef, hide }) => (
                <div
                    id="app-sidebar-2"
                    className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
                >
                    <div>
                        <header className="bg-[#1B4E9B] h-[71px] flex items-center">
                            <Button
                                className="w-[38px] h-[38px] ml-4"
                                style={{
                                    backgroundImage: `url('/images/Menu.svg')`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundColor: 'transparent',
                                    border: 'none'
                                }}
                                type="button"
                                ref={closeIconRef as React.Ref<Button>}
                                onClick={(e) => hide(e)}
                            />
                        </header>
                        <div className="flex-1 overflow-y-auto ">
                            <nav className="" >
                                <MenuItem href="/proctoring-results" text="Результаты" />
                                <MenuItem href="/proctoring-types" text="Типы прокторинга" />
                                <MenuItem href="/proctoring" text="Прокторинги" />
                                {username === 'admin' && (
                                    <>
                                        <MenuItem href="/roles" text="Роли" />
                                        <MenuItem href="/users" text="Пользователи" />
                                    </>
                                )}
                                <MenuItem href="/subjects" text="Предметы" />
                            </nav>
                        </div>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            )}
        />
    );
};

const MenuItem = ({ href, text }: { href: string; text: string }) => (
    <a 
        href={href} 
        className="block no-underline"
    >
        <div className="font-montserrat-semibold text-[20px] text-[#1B4E9B] p-[20px] hover:bg-gray-100 transition-colors">
            {text}
        </div>
    </a>
);


export default SidebarMenu;