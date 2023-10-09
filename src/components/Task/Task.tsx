import React, {ChangeEvent, memo, useCallback} from 'react';
import s from "./Task.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import del from "../../image/delete.svg";
import {DeleteTaskTC, UpdateTaskTC} from "../../reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {useAppDispatch} from "../../reducers/store";

type TaskPropsType = {
    id: string
    title: string
    status: TaskStatuses
    idTodoList: string
}
export const Task = memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const DeleteTask = useCallback(() => {
        dispatch(DeleteTaskTC(props.idTodoList, props.id))
    }, [dispatch])

    const ChangeTaskTitle = useCallback((title: string) => {
        dispatch(UpdateTaskTC(props.idTodoList, props.id,{title: title}))
    }, [dispatch])

    const ChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(UpdateTaskTC(props.idTodoList, props.id,
            {status: (e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}
        ))
    }, [dispatch])

    return (
        <li key={props.id} className={s.task + ' ' + (props.status === TaskStatuses.Completed ? s.isDone : undefined)}>
            <div className={s.taskWrapp}>
                <div className="checkbox">
                    <input className="checkboxInput"
                           type="checkbox"
                           checked={props.status === TaskStatuses.Completed}
                           onChange={ChangeTaskStatus}/>
                    <label className="checkboxLabel"></label>
                </div>
                <div className={s.taskText}>
                    <EditableSpan title={props.title} onChange={ChangeTaskTitle}/>
                </div>
            </div>
            <Button callback={DeleteTask} round={true}>
                <img src={del} alt="icon"/>
            </Button>
        </li>
    );
})
