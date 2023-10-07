import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})
export const todolistAPI = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title: title})
    },
    updateTodolist: (todolistID: string, title: string) => {
        return instance.put<ResponseType>(`/todo-lists/${todolistID}`, {title: title})
    },
    deleteTodolist: (todolistID: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
    },
    getTasks: (todolistID: string) => {
        return instance.get<TaskType[]>(`/todo-lists/${todolistID}/tasks`)
    },
    createTask: (todolistID: string, title: string) => {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistID}/tasks`, {title: title})
    },
    updateTask: (todolistID: string, taskID: string, title: string) => {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistID}/tasks/${taskID}`, {title: title})
    },
    deleteTask: (todolistID: string, taskID: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D={}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}