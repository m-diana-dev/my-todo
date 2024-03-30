import { AxiosResponse } from "axios"
import { instance } from "common/api"
import { BaseResponseType } from "common/types"
import {
  DeleteTodolistArgs,
  TodolistType,
  UpdateTodolistArgs,
} from "features/TodoLists/api/todolosts/todolistApi.types"

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
}
