import React, {memo, useCallback, useEffect} from 'react';
import '../../App.css';
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import del from '../../image/delete.svg'
import s from './TodoLIst.module.css'
import {Task} from "../Task/Task";
import {TaskDomainType, TaskStatuses, TaskType} from "../../api/todolist-api";
import {FilterType} from "../../reducers/todolists-reducer";
import {useAppDispatch} from "../../reducers/store";
import {SetTasksTC} from "../../reducers/tasks-reducer";
import {RequestStatusType} from "../../reducers/app-reducer";

type todoListPropsType = {
    id: string
    title: string
    tasks: TaskDomainType[]
    filter: FilterType
    status: RequestStatusType
    DeleteTodoList: (idTodoList: string) => void
    ChangeFilter: (idTodoList: string, filter: FilterType) => void
    ChangeTodoListTitle: (idTodoList: string, title: string) => void
    addTask: (idTodoList: string, title: string) => void
}

export const TodoList = memo((props: todoListPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(SetTasksTC(props.id))
    }, [])

    const OnTodoListDelHandler = useCallback(() => {
        props.DeleteTodoList(props.id);
    }, [props.DeleteTodoList, props.id])

    const OnChangeFilterHandler = useCallback((filterValue: FilterType) => {
        props.ChangeFilter(props.id, filterValue);
    }, [props.id, props.ChangeFilter])

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const ChangeTodoListTitle = useCallback((title: string) => {
        props.ChangeTodoListTitle(props.id, title)
    }, [props.ChangeTodoListTitle, props.id])

    const filteredTasks = useCallback(() => {
        if (props.filter === 'active') return props.tasks.filter(el => el.status === TaskStatuses.New)
        if (props.filter === 'completed') return props.tasks.filter(el => el.status === TaskStatuses.Completed)
        return props.tasks
    }, [props.tasks, props.filter])

    return (
        <div className={s.todoListItem}>
            <h2 className={s.title}>
                <EditableSpan title={props.title} onChange={ChangeTodoListTitle} disabled={props.status==='loading'}/>
                <Button callback={OnTodoListDelHandler} round={true} disabled={props.status==='loading'}>
                    <img src={del} alt="icon"/>
                </Button>
            </h2>
            <AddItemForm addTitle={addTask} disabled={props.status==='loading'}/>
            <ul className={s.todoListList}>
                {filteredTasks().map(el => {
                    return (
                        <Task key={el.id}
                              id={el.id}
                              title={el.title}
                              status={el.status}
                              entityStatus={el.entityStatus}
                              idTodoList={props.id}/>
                    )
                })}
            </ul>
            <div className={s.todoListBtns}>
                <Button active={props.filter === 'all'} name={'all'}
                        callback={useCallback(() => OnChangeFilterHandler('all'), [])}/>
                <Button active={props.filter === 'active'} name={'active'}
                        callback={useCallback(() => OnChangeFilterHandler('active'), [])}/>
                <Button active={props.filter === 'completed'} name={'completed'}
                        callback={useCallback(() => OnChangeFilterHandler('completed'), [])}/>
            </div>
        </div>
    );
})