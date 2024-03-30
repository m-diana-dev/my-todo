import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { AppStateType, useAppDispatch } from "app/store"
import { selectTodolists, TodolistDomainType, todoListThunks } from "features/TodoLists/model/todolistsSlice"
import { TodoList } from "features/TodoLists/ui/TodoList/TodoList"
import { Navigate } from "react-router-dom"
import { selectTasks } from "features/TodoLists/model/tasksSlice"
import { AddItemForm } from "common/components"
import { selectIsLoggedIn } from "features/Login/model/authSlice"
import { TaskDomainType } from "features/TodoLists/api/tasks/tasksApi.types"

const MAX_COUNT_TODOLISTS = 10

export type TasksType = Record<string, TaskDomainType[]>

export const TodoLists = () => {
  const tasks = useSelector<AppStateType, TasksType>(selectTasks)
  const todoLists = useSelector<AppStateType, TodolistDomainType[]>(selectTodolists)
  const isLoggedIn = useSelector<AppStateType, boolean>(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todoListThunks.setTodolists())
  }, [dispatch])

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(todoListThunks.createTodolist({ title }))
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  const todoListComponent = todoLists.map((el) => {
    return (
      <TodoList key={el.id} id={el.id} title={el.title} filter={el.filter} status={el.status} tasks={tasks[el.id]} />
    )
  })
  return (
    <main className="main">
      <div className="container">
        <div className="mainTop">
          <h2>Add a new tasks block!</h2>
          <AddItemForm addTitle={addTodoList} disabled={todoLists.length === MAX_COUNT_TODOLISTS} />
        </div>
        <div className="mainItems">{todoListComponent}</div>
      </div>
    </main>
  )
}
