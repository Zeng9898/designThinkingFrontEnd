import axios from 'axios';

axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: 'http://127.0.0.1:3000'
});

const userApi = axios.create({
    baseURL: "http://127.0.0.1:3000/api/users",
    headers:{
        "Content-Type":" application/json"
    },
})

export const getAllActivityFromAUser = async (userId) => {
    const response = await userApi.get(`/${userId}/designThinkingActivities`)
    return response.data
}