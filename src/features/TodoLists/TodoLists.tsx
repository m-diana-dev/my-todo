import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { AppStateType, useAppDispatch } from "app/store"
import {
  FilterType,
  TodolistDomainType,
  todoListsActions,
  todoListThunks,
} from "features/TodoLists/TodoList/todolists-reducer"
import { TodoList } from "features/TodoLists/TodoList/TodoList"
import { TaskDomainType } from "features/TodoLists/api/todolistApi"
import { Navigate } from "react-router-dom"
import { tasksThunks } from "features/TodoLists/TodoList/Task/tasks-reducer"
import { AddItemForm } from "common/components"

export type TasksType = {
  [id: string]: TaskDomainType[]
}
export const TodoLists = () => {
  const tasks = useSelector<AppStateType, TasksType>((state) => state.tasks)
  const todoLists = useSelector<AppStateType, TodolistDomainType[]>((state) => state.todolists)
  const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todoListThunks.setTodolists())
  }, [dispatch])

  const DeleteTodoList = useCallback(
    (todolistID: string) => {
      dispatch(todoListThunks.deleteTodolist({ todolistID }))
    },
    [dispatch],
  )

  const ChangeFilter = useCallback(
    (idTodoList: string, filter: FilterType) => {
      dispatch(todoListsActions.changeTodoListFilter({ id: idTodoList, filter }))
    },
    [dispatch],
  )

  const ChangeTodoListTitle = useCallback(
    (todolistID: string, title: string) => {
      dispatch(todoListThunks.updateTodolist({ todolistID, title }))
    },
    [dispatch],
  )

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(todoListThunks.createTodolist({ title }))
    },
    [dispatch],
  )

  const addTask = useCallback(
    (todolistID: string, title: string) => {
      dispatch(tasksThunks.createTask({ todolistID, title }))
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  const todoListComponent = todoLists.map((el) => {
    return (
      <TodoList
        key={el.id}
        id={el.id}
        title={el.title}
        filter={el.filter}
        status={el.status}
        tasks={tasks[el.id]}
        DeleteTodoList={DeleteTodoList}
        ChangeFilter={ChangeFilter}
        ChangeTodoListTitle={ChangeTodoListTitle}
        addTask={addTask}
      />
    )
  })
  return (
    <main className="main">
      <div className="container">
        <div className="mainTop">
          <h2>Add a new tasks block!</h2>
          <AddItemForm addTitle={addTodoList} disabled={todoLists.length === 10} />
        </div>
        <div className="mainItems">{todoListComponent}</div>
      </div>
    </main>
  )
}
