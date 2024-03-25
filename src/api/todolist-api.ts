import axios, { AxiosResponse } from "axios"
import { RequestStatusType } from "../reducers/app-reducer"
import { UpdateDomainTaskModelType } from "reducers/tasks-reducer"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<
        ResponseType<{
          userId: number
        }>
      >,
      LoginParamsType
    >("/auth/login", data)
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("/auth/me")
  },
  logout() {
    return instance.delete<ResponseType>(`/auth/login`)
  },
}
export const todolistAPI = {
  getTodolists: () => {
    return instance.get<TodolistType[]>("/todo-lists")
  },
  createTodolist: (title: string) => {
    return instance.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >("/todo-lists", { title: title })
  },
  updateTodolist: (todolistID: string, title: string) => {
    return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`/todo-lists/${todolistID}`, {
      title: title,
    })
  },
  deleteTodolist: (todolistID: string) => {
    return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
  },
  getTasks: (todolistID: string) => {
    return instance.get<GetTaskType>(`/todo-lists/${todolistID}/tasks`)
  },
  createTask: (arg: CreateTaskArgs) => {
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${arg.todolistID}/tasks`, { title: arg.title })
  },
  updateTask: (todolistID: string, taskID: string, model: UpdateTaskModelType) => {
    return instance.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
  },
  deleteTask: (arg: DeleteTaskArgs) => {
    return instance.delete<ResponseType>(`/todo-lists/${arg.todolistID}/tasks/${arg.taskID}`)
  },
}

export type DeleteTaskArgs = {
  todolistID: string
  taskID: string
}

export type UpdateTaskArgs = {
  todolistID: string
  taskID: string
  domainModel: UpdateDomainTaskModelType
}

export type CreateTaskArgs = {
  todolistID: string
  title: string
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
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

export enum RESULT_CODE {
  SUCCEEDED = 0,
  ERROR = 1,
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

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}

export type GetTaskType = {
  items: TaskType[]
  totalCount: number
  error: string
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
