import React, { ChangeEvent, memo, useCallback } from "react"
import s from "features/TodoLists/ui/TodoList/Tasks/Task/Task.module.css"
import del from "assets/image/delete.svg"
import { tasksThunks } from "features/TodoLists/model/tasksSlice"
import { useAppDispatch } from "app/store"
import { RequestStatusType } from "app/appSlice"
import { Button, Checkbox, EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"

type Props = {
  id: string
  title: string
  status: TaskStatuses
  entityStatus: RequestStatusType
  idTodoList: string
}
export const Task = memo(({ id, title, status, entityStatus, idTodoList }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = useCallback(() => {
    dispatch(tasksThunks.deleteTask({ todolistID: idTodoList, taskID: id }))
  }, [dispatch])

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      dispatch(tasksThunks.updateTask({ todolistID: idTodoList, taskID: id, domainModel: { title } }))
    },
    [dispatch],
  )

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(
        tasksThunks.updateTask({
          todolistID: idTodoList,
          taskID: id,
          domainModel: {
            status,
          },
        }),
      )
    },
    [dispatch],
  )

  const checkboxDisabled = entityStatus === "loading" ? "disabled" : undefined
  return (
    <li key={id} className={s.task + " " + (status === TaskStatuses.Completed ? s.isDone : undefined)}>
      <div className={s.taskWrapp}>
        <Checkbox
          disabled={entityStatus === "loading"}
          checked={status === TaskStatuses.Completed}
          style={checkboxDisabled}
          onChange={changeTaskStatusHandler}
        />
        <div className={s.taskText}>
          <EditableSpan title={title} onChange={changeTaskTitleHandler} disabled={entityStatus === "loading"} />
        </div>
      </div>
      <Button onClick={deleteTaskHandler} round={true} disabled={entityStatus === "loading"}>
        <img src={del} alt="icon" />
      </Button>
    </li>
  )
})
