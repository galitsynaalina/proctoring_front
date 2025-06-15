import { useState } from "react";
import "../css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginStr, setLogin] = useState("");
    const [passwordStr, setPassword] = useState("");
    const navigate = useNavigate();

    async function auth(){
        const response = await axios.post("http://localhost:3010/api/v1/authorization/", {login: loginStr, password: passwordStr});

        const token = response.data.token
        localStorage.setItem("token", token)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth();
            navigate("/users")
            // Перенаправление, если нужно
        } catch (error) {
            console.error("Ошибка авторизации", error);
        }
    };

    return (
        <div>
            <div className="div-center">
                <img className="img-logo" src="../images/logo.svg" alt="logo" />
            </div>
            <div className="div-center">
                <h3 className="title"> СЕРВИС ПРОКТОРИНГА ASUProctor</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="div-center">
                    <input className="login" type="text" name="login" placeholder="Логин" value={loginStr} onChange={(e) => setLogin(e.target.value)}/>
                </div>
                <div className="div-center">
                    <input className="password" type="password" name="password" placeholder="Пароль" value={passwordStr} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {/* <div className="div-conteiner"> */}
                <div className="div-part1">
                    <button className="button-submit" type="submit">Войти</button>
                </div>
            </form>
            <div className="div-part2">
                <img className="ellipse7" src="../images/Ellipse7.svg" alt="Ellipse7" />
                <img className="ellipse4" src="../images/Ellipse4.svg" alt="Ellipse4" />
                <img className="ellipse5" src="../images/Ellipse5.svg" alt="Ellipse5" />
                <img className="ellipse6" src="../images/Ellipse6.svg" alt="Ellipse6" />
                <img className="ellipse3" src="../images/Ellipse3.svg" alt="Ellipse3" />
                <img className="ellipse8" src="../images/Ellipse8.svg" alt="Ellipse8" />
                <img className="ellipse1" src="../images/Ellipse1.svg" alt="Ellipse1" />
                <img className="ellipse2" src="../images/Ellipse2.svg" alt="Ellipse2" />
                <img className="ellipse10" src="../images/Ellipse10.svg" alt="Ellipse10" />
            </div>
            {/* </div> */}
        </div>
    );
};

export default Login;
