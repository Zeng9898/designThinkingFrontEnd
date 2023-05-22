import axios from "axios"

const designThinkingActivityApi = axios.create({
    baseURL: "http://localhost:3000"
})

export const getTodos = async (designThinkingActivityId) => {
    const response = await todosApi.get(`/api/designThinkingActivity/${designThinkingActivityId}`)
    return response.data
}

// export const addTodo = async (todo) => {
//     return await todosApi.post("/todos", todo)
// }

// export const updateTodo = async (todo) => {
//     return await todosApi.patch(`/todos/${todo.id}`, todo)
// }

// export const deleteTodo = async ({ id }) => {
//     return await todosApi.delete(`/todos/${id}`, id)
// }

export default designThinkingActivityApi 
