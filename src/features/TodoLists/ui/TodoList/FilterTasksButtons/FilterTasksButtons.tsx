import s from "./FilterTasksButtons.module.css"
import { Button } from "common/components"
import React, { useCallback } from "react"
import { FilterType, todoListsActions } from "features/TodoLists/model/todolistsSlice"
import { useAppDispatch } from "app/store"

type Props = {
  id: string
  filter: FilterType
}
export const FilterTasksButtons = ({ id, filter }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodoListFilterHandler = useCallback(
    (filterValue: FilterType) => {
      dispatch(todoListsActions.changeTodoListFilter({ id, filter: filterValue }))
    },
    [id, dispatch],
  )

  return (
    <div className={s.todoListBtns}>
      <Button active={filter === "all"} onClick={useCallback(() => changeTodoListFilterHandler("all"), [])}>
        all
      </Button>
      <Button active={filter === "active"} onClick={useCallback(() => changeTodoListFilterHandler("active"), [])}>
        active
      </Button>
      <Button active={filter === "completed"} onClick={useCallback(() => changeTodoListFilterHandler("completed"), [])}>
        completed
      </Button>
    </div>
  )
}
