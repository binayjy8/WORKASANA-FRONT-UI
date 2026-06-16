import API from "../api/axios";

export const login = async (data) => {
        const response = await API.post("/auth/login", data);
        return response.data;
}

export const getCurrentUser = async () => {
    try {
        const response = await API.get("/auth/me");
        return response.data;
    } catch (error) {
        throw error;
    }
}