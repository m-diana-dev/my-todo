import { AxiosResponse } from "axios"
import { RequestStatusType } from "app/app-reducer"
import { UpdateDomainTaskModelType } from "features/TodoLists/TodoList/Task/tasks-reducer"
import { instance } from "common/api"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { BaseResponseType } from "common/types"

export const todolistApi = {
  getTodolists: () => {
    return instance.get<TodolistType[]>("/todo-lists")
  },
  createTodolist: (title: string) => {
    return instance.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      { title: string }
    >("/todo-lists", { title: title })
  },
  updateTodolist: (arg: UpdateTodolistArgs) => {
    return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(
      `/todo-lists/${arg.todolistID}`,
      {
        title: arg.title,
      },
    )
  },
  deleteTodolist: (arg: DeleteTodolistArgs) => {
    return instance.delete<BaseResponseType>(`/todo-lists/${arg.todolistID}`)
  },
  getTasks: (todolistID: string) => {
    return instance.get<GetTaskType>(`/todo-lists/${todolistID}/tasks`)
  },
  createTask: (arg: CreateTaskArgs) => {
    return instance.post<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${arg.todolistID}/tasks`, { title: arg.title })
  },
  updateTask: (todolistID: string, taskID: string, model: UpdateTaskModelType) => {
    return instance.put<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
  },
  deleteTask: (arg: DeleteTaskArgs) => {
    return instance.delete<BaseResponseType>(`/todo-lists/${arg.todolistID}/tasks/${arg.taskID}`)
  },
}

export type UpdateTodolistArgs = {
  todolistID: string
  title: string
}

export type DeleteTodolistArgs = {
  todolistID: string
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

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
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
