import React, {ChangeEvent, memo, useCallback} from 'react';
import s from "./Task.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import del from "../../image/delete.svg";
import {DeleteTaskTC, UpdateTaskTC} from "../../reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {useAppDispatch} from "../../reducers/store";
import {RequestStatusType} from "../../reducers/app-reducer";

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

    const checkoxDisabled = props.entityStatus==='loading' ? 'disabled' : undefined
    return (
        <li key={props.id} className={s.task + ' ' + (props.status === TaskStatuses.Completed ? s.isDone : undefined)}>
            <div className={s.taskWrapp}>
                <div className={"checkbox" + ' ' + checkoxDisabled}>
                    <input className="checkboxInput"
                           type="checkbox"
                           checked={props.status === TaskStatuses.Completed}
                           onChange={ChangeTaskStatus} disabled={props.entityStatus==='loading'}/>
                    <label className="checkboxLabel"></label>
                </div>
                <div className={s.taskText}>
                    <EditableSpan title={props.title} onChange={ChangeTaskTitle} disabled={props.entityStatus==='loading'}/>
                </div>
            </div>
            <Button callback={DeleteTask} round={true} disabled={props.entityStatus==='loading'}>
                <img src={del} alt="icon"/>
            </Button>
        </li>
    );
})
