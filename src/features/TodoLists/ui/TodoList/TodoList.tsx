import React, { memo, useCallback } from "react"
import "app/App.css"
import s from "./TodoLIst.module.css"
import { FilterType } from "features/TodoLists/model/todolistsSlice"
import { RequestStatusType } from "app/appSlice"
import { AddItemForm } from "common/components"
import { TaskDomainType } from "features/TodoLists/api/tasks/tasksApi.types"
import { tasksThunks } from "features/TodoLists/model/tasksSlice"
import { useAppDispatch } from "app/store"
import { FilterTasksButtons } from "features/TodoLists/ui/TodoList/FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "features/TodoLists/ui/TodoList/Tasks/Tasks"
import { TodolistTitle } from "features/TodoLists/ui/TodoList/TodolistTitle/TodolistTitle"

type Props = {
  id: string
  title: string
  tasks: TaskDomainType[]
  filter: FilterType
  status: RequestStatusType
}

export const TodoList = memo(({ id, title, tasks, filter, status }: Props) => {
  const dispatch = useAppDispatch()

  const addTask = useCallback(
    (todolistID: string, title: string) => {
      dispatch(tasksThunks.createTask({ todolistID, title }))
    },
    [dispatch],
  )
  const addTaskCb = useCallback(
    (title: string) => {
      addTask(id, title)
    },
    [addTask, id],
  )

  return (
    <div className={s.todoListItem}>
      <TodolistTitle id={id} title={title} status={status} />
      <AddItemForm addTitle={addTaskCb} disabled={status === "loading"} />
      <Tasks id={id} tasks={tasks} filter={filter} />
      <FilterTasksButtons id={id} filter={filter} />
    </div>
  )
})
