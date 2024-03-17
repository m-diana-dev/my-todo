import React, { useCallback, useEffect } from "react"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { useSelector } from "react-redux"
import { AppStateType, useAppDispatch } from "reducers/store"
import {
  CreateTodolistTC,
  DeleteTodolistTC,
  FilterType,
  SetTodolistsTC,
  TodolistDomainType,
  todoListsActions,
  UpdateTodolistTC,
} from "reducers/todolists-reducer"
import { CreateTasksTC } from "reducers/tasks-reducer"
import { TodoList } from "../TodoList/TodoList"
import { TaskDomainType } from "api/todolist-api"
import { Navigate } from "react-router-dom"

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
    dispatch(SetTodolistsTC())
  }, [dispatch])

  const DeleteTodoList = useCallback(
    (idTodoList: string) => {
      dispatch(DeleteTodolistTC(idTodoList))
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
    (idTodoList: string, title: string) => {
      dispatch(UpdateTodolistTC(idTodoList, title))
    },
    [dispatch],
  )

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(CreateTodolistTC(title))
    },
    [dispatch],
  )

  const addTask = useCallback(
    (idTodoList: string, title: string) => {
      dispatch(CreateTasksTC(idTodoList, title))
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
