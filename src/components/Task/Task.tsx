import React, {ChangeEvent, memo, useCallback} from 'react';
import s from "./Task.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import del from "../../image/delete.svg";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../../api/todolist-api";

type TaskPropsType = {
    id: string
    title: string
    status: TaskStatuses
    idTodoList: string
}
export const Task = memo((props: TaskPropsType) => {
    console.log('Task rendered')
    const dispatch = useDispatch();

    const DeleteTask = useCallback(() => {
        dispatch(removeTaskAC(props.id, props.idTodoList))
    }, [dispatch])

    const ChangeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.id, title, props.idTodoList))
    }, [dispatch])

    const ChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.id, (e.currentTarget.checked ? TaskStatuses.Completed: TaskStatuses.New), props.idTodoList))
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
                <div className={s.taskText}><EditableSpan title={props.title} onChange={ChangeTaskTitle}/>
                </div>
            </div>
            <Button callback={DeleteTask} round={true}>
                <img src={del} alt="icon"/>
            </Button>
        </li>
    );
})
