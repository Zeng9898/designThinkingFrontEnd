import axios from "axios";

axios.defaults.withCredentials = true;

const kanbanApi = axios.create({
    baseURL: "http://10.242.104.221:3000/api/designThinkingActivity",
    headers:{
        "Content-Type":" application/json"
    },
})


export const getKanban = async (designThinkingActivityId) => {
    const response = await kanbanApi.get(`/${designThinkingActivityId}`)
    return response.data
}

// export const getKanbanTasks = async (columnId) => {
//     const response = await kanbanApi.get(`/columns/${columnId}`)
//     return response.data
// }

// export const addCardItem = async (cardItem) => {
//     const response = await kanbanApi.post("/", cardItem)
// }

// export const updateCardItem = async (cardItem) => {
//     const response = await kanbanApi.put("/", cardItem)
// }

// export const deleteCardItem = async (config) => {
//     const response = await kanbanApi.delete("/",config)
// }