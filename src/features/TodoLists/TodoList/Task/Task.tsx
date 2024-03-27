import React, { ChangeEvent, memo, useCallback } from "react"
import s from "features/TodoLists/TodoList/Task/Task.module.css"
import del from "assets/image/delete.svg"
import { tasksThunks } from "features/TodoLists/TodoList/Task/tasks-reducer"
import { useAppDispatch } from "app/store"
import { RequestStatusType } from "app/app-reducer"
import { Button, Checkbox, EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"

type TaskPropsType = {
  id: string
  title: string
  status: TaskStatuses
  entityStatus: RequestStatusType
  idTodoList: string
}
export const Task = memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const DeleteTask = useCallback(() => {
    dispatch(tasksThunks.deleteTask({ todolistID: props.idTodoList, taskID: props.id }))
  }, [dispatch])

  const ChangeTaskTitle = useCallback(
    (title: string) => {
      dispatch(tasksThunks.updateTask({ todolistID: props.idTodoList, taskID: props.id, domainModel: { title } }))
    },
    [dispatch],
  )

  const ChangeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksThunks.updateTask({
          todolistID: props.idTodoList,
          taskID: props.id,
          domainModel: {
            status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
          },
        }),
      )
    },
    [dispatch],
  )

  const checkoxDisabled = props.entityStatus === "loading" ? "disabled" : undefined
  return (
    <li key={props.id} className={s.task + " " + (props.status === TaskStatuses.Completed ? s.isDone : undefined)}>
      <div className={s.taskWrapp}>
        <Checkbox
          disabled={props.entityStatus === "loading"}
          checked={props.status === TaskStatuses.Completed}
          style={checkoxDisabled}
          onChange={ChangeTaskStatus}
        />
        <div className={s.taskText}>
          <EditableSpan title={props.title} onChange={ChangeTaskTitle} disabled={props.entityStatus === "loading"} />
        </div>
      </div>
      <Button onClick={DeleteTask} round={true} disabled={props.entityStatus === "loading"}>
        <img src={del} alt="icon" />
      </Button>
    </li>
  )
})
