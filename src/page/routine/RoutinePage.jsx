import { useQuery, useMutation, useQueryClient } from "react-query"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../api/todosApi"

import { useState, useEffect } from 'react'
import { DragDropContext, Draggable } from "react-beautiful-dnd"
import { StrictModeDroppable as Droppable } from "../../utils/StrictModeDroppable"

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery('todos', getTodos, {
        select: data => data.sort((a, b) => b.id - a.id)
    })

    const [todos, updateTodos] = useState(data || [])

    useEffect(() => {
        const arrayIdsOrder = JSON.parse(localStorage.getItem('taskOrder'))

        if (!arrayIdsOrder && data?.length) {
            const idsOrderArray = data.map(task => task.id)
            localStorage.setItem('taskOrder', JSON.stringify(idsOrderArray))
        }

        let myArray
        if (arrayIdsOrder?.length && data?.length) {
            myArray = arrayIdsOrder.map(pos => {
                return data.find(el => el.id === pos)
            })

            const newItems = data.filter(el => {
                return !arrayIdsOrder.includes(el.id)
            })

            if (newItems?.length) myArray = [...newItems, ...myArray]
        }

        updateTodos(myArray || data)
    }, [data])

    const addTodoMutation = useMutation(addTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const updateTodoMutation = useMutation(updateTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const deleteTodoMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')
    }

    const handleOnDragEnd = (result) => {
        if (!result?.destination) return

        const tasks = [...todos]

        const [reorderedItem] = tasks.splice(result.source.index, 1)

        tasks.splice(result.destination.index, 0, reorderedItem)

        const idsOrderArray = tasks.map(task => task.id)
        localStorage.setItem('taskOrder', JSON.stringify(idsOrderArray))

        updateTodos(tasks)
    }

    const handleDelete = (id) => {
        const arrayIdsOrder = JSON.parse(localStorage.getItem('taskOrder'))

        if (arrayIdsOrder?.length) {
            const newIdsOrderArray = arrayIdsOrder.filter(num => num !== id)
            localStorage.setItem('taskOrder', JSON.stringify(newIdsOrderArray))
        }

        deleteTodoMutation.mutate({ id })
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                upload
            </button>
        </form>
    )

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {isLoading ? <p>Loading...</p> :
                isError ? <p>{error.message}</p> :
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="todos">
                            {(provided) => (
                                <section {...provided.droppableProps} ref={provided.innerRef} style={{display:"inline-block"}}>
                                    {todos.map((todo, index) => {
                                        return (
                                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                                {(provided) => (
                                                    <article  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <div style={{ border: '2px solid blue', width: "150px" }}>
                                                            <div className="todo">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={todo.completed}
                                                                    id={todo.id}
                                                                    onChange={() =>
                                                                        updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
                                                                    }
                                                                />
                                                                <label htmlFor={todo.id}>{todo.title}</label>
                                                            </div>
                                                            <button className="trash" onClick={() => handleDelete(todo.id)}>
                                                                trash
                                                            </button>
                                                        </div>
                                                    </article>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </section>
                            )}
                        </Droppable>
                        <Droppable droppableId="todos2">
                            {(provided) => (
                                <section {...provided.droppableProps} ref={provided.innerRef} style={{display:"inline-block"}}>
                                    {todos.map((todo, index) => {
                                        return (
                                            <Draggable key={todo.id + 1} draggableId={todo.id.toString() + "1"} index={index}>
                                                {(provided) => (
                                                    <article  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <div style={{ border: '2px solid blue', width: "150px" }}>
                                                            <div className="todo">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={todo.completed}
                                                                    id={todo.id}
                                                                    onChange={() =>
                                                                        updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
                                                                    }
                                                                />
                                                                <label htmlFor={todo.id}>{todo.title}</label>
                                                            </div>
                                                            <button className="trash" onClick={() => handleDelete(todo.id)}>
                                                                trash
                                                            </button>
                                                        </div>
                                                    </article>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </section>
                            )}
                        </Droppable>
                    </DragDropContext>}
        </main>
    )
}
export default TodoList