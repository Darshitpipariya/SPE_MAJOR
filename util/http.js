import axios from "axios";
import { BASE_URL } from "./config";

const api_Endpoint = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
});

export const login = async (username, password) => {
    const response = await api_Endpoint
        .post("/login",
            {
                username: username,
                password: password
            }
        )
}

export const verifyCode = async (code) => {
    const response = await api_Endpoint
        .post("/verifyCode",
            {
                code: code
            }
        )
}
export const submitFrom = async (data) => {
    const response = await api_Endpoint
        .post("/submitForm",
            {
                data: data
            }
        )
}