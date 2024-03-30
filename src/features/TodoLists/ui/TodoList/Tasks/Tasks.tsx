import s from "./Tasks.module.css"
import { Task } from "features/TodoLists/ui/TodoList/Tasks/Task/Task"
import React, { useCallback } from "react"
import { FilterType } from "features/TodoLists/model/todolistsSlice"
import { TaskStatuses } from "common/enums"
import { TaskDomainType } from "features/TodoLists/api/tasks/tasksApi.types"

type Props = {
  id: string
  filter: FilterType
  tasks: TaskDomainType[]
}
export const Tasks = ({ id, filter, tasks }: Props) => {
  const filteredTasks = useCallback(() => {
    if (filter === "active") return tasks.filter((el) => el.status === TaskStatuses.New)
    if (filter === "completed") return tasks.filter((el) => el.status === TaskStatuses.Completed)
    return tasks
  }, [tasks, filter])
  return (
    <ul className={s.todoListList}>
      {filteredTasks()?.map((el) => {
        return (
          <Task
            key={el.id}
            id={el.id}
            title={el.title}
            status={el.status}
            entityStatus={el.entityStatus}
            idTodoList={id}
          />
        )
      })}
    </ul>
  )
}
