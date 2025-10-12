import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3010/api/",
});

// Добавляем токен к каждому запросу
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, // если всё ок — пропускаем
    (error) => {
        if (error.response && error.response.status === 401) {
            // Удаляем токен
            localStorage.removeItem("token");

            // Перенаправляем на страницу логина
            window.location.href = "/";  
        }
        // return Promise.reject(error); // пробрасываем ошибку дальше
    }
);

export default api;