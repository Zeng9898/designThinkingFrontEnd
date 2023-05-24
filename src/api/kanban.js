import axios from "axios";

axios.defaults.withCredentials = true; 
const kanbanApi = axios.create({
    baseURL: "http://localhost:3000/",
    headers:{
        "Content-Type":" application/json"
    },
})


export const getKanbanColumns = async (projectId) => {
    const response = await kanbanApi.get(`/api/designThinkingActivity/${projectId}`)
    return response.data
}

export const getKanbanTasks = async (columnId) => {
    const response = await kanbanApi.get(`/columns/${columnId}`)
    return response.data
}

export const addCardItem = async (cardItem) => {
    const response = await kanbanApi.post("/", cardItem)
}

export const updateCardItem = async (cardItem) => {
    const response = await kanbanApi.put("/", cardItem)
}

export const deleteCardItem = async (config) => {
    const response = await kanbanApi.delete("/",config)
}