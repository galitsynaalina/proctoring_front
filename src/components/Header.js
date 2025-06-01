import "../css/header.css";

const Header = () => {

    return (
        <header className="header-style">
                <span className="username">Пользователь</span>
                <button className="button-exit" name="button-exit"></button>
        </header>
    );
};

export default Header;