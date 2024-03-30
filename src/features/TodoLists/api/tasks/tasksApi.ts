import { AxiosResponse } from "axios"
import { instance } from "common/api"
import { BaseResponseType } from "common/types"
import {
  CreateTaskArgs,
  DeleteTaskArgs,
  GetTaskType,
  TaskType,
  UpdateTaskModelType,
} from "features/TodoLists/api/tasks/tasksApi.types"

export const tasksApi = {
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
