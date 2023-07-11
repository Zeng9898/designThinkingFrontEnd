import axios from "axios";


const thinkingRoutineApi = axios.create({
    baseURL: "http://127.0.0.1:3000/api/thinkingRoutine/",
    headers:{
        "Content-Type":" application/json"
    },
})

//node
export const getThinkingRoutine = async (thinkingRoutineId) => {
    const response = await thinkingRoutineApi.get(`/${thinkingRoutineId}`)
    return response.data
}

// export const createNode = async (data) => {
//     const response = await nodeApi.post("/", data)
//     return response.data
// }

// export const getNodeRelation = async (ideaWallId) => {
//     const response = await nodeApi.get(`/node_relation/${ideaWallId}`)
//     return response.data
// }

// export const createNodeRelation = async (data) => {
//     const response = await nodeApi.post("/node_relation", data)
//     return response.data
// }