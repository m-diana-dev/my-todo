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
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title: title})
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
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks`, {title: title})
    },
    updateTask: (todolistID: string, taskID: string, model: UpdateTaskModelType) => {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
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
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Latter = 4,
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}