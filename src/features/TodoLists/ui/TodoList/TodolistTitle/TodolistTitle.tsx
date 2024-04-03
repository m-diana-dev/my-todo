import s from "./TodolistTitle.module.css"
import { Button, EditableSpan } from "common/components"
import del from "assets/images/delete.svg"
import React, { useCallback } from "react"
import { todoListThunks } from "features/TodoLists/model/todolistsSlice"
import { useAppDispatch } from "app/store"
import { RequestStatusType } from "app/appSlice"

type Props = {
  id: string
  status: RequestStatusType
  title: string
}
export const TodolistTitle = ({ id, status, title }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTodolistHandler = useCallback(() => {
    dispatch(todoListThunks.deleteTodolist({ todolistID: id }))
  }, [dispatch, id])

  const changeTodoListTitleHandler = useCallback(
    (title: string) => {
      dispatch(todoListThunks.updateTodolist({ todolistID: id, title }))
    },
    [dispatch, id],
  )
  return (
    <h2 className={s.title}>
      <EditableSpan title={title} onChange={changeTodoListTitleHandler} disabled={status === "loading"} />
      <Button onClick={deleteTodolistHandler} round={true} disabled={status === "loading"}>
        <img src={del} alt="icon" />
      </Button>
    </h2>
  )
}
