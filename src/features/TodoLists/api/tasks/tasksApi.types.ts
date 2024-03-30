import { UpdateDomainTaskModelType } from "features/TodoLists/model/tasksSlice"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { RequestStatusType } from "app/appSlice"

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
