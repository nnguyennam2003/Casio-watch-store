import axios from "axios";
import { toast } from "sonner";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'https://localhost:9000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
            duration: 3000,
            action: {
                label: "Đăng nhập lại",
                onClick: () => {
                    window.location.href = "/login"
                }
            }
        });
    }
    return Promise.reject(error);
});

export default instance