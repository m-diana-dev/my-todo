import React, {ChangeEvent} from 'react';
import '../../App.css';
import {FilterType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import '../../App.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import del from '../../image/delete.svg'
import s from './TodoLIst.module.css'

type todoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    DeleteTask: (idTodoList: string, idTask: string) => void
    DeleteTodoList: (idTodoList: string) => void
    ChangeFilter: (idTodoList: string, filter: FilterType) => void
    addTask: (idTodoList: string, title: string) => void
    ChangeTaskStatus: (idTodoList: string, idTask: string, isDone: boolean) => void
    ChangeTaskTitle: (idTodoList: string, idTask: string, title: string) => void
    ChangeTodoListTitle: (idTodoList: string, title: string) => void
}

export function TodoList(props: todoListPropsType) {
    const OnTaskDelHandler = (idTask: string) => {
        props.DeleteTask(props.id, idTask);
    }
    const OnTodoListDelHandler = () => {
        props.DeleteTodoList(props.id);
    }
    const OnChangeFilterHandler = (filterValue: FilterType) => {
        props.ChangeFilter(props.id, filterValue);
    }

    const OnChangeTaskHandler = (idTask: string, isDone: boolean) => {
        props.ChangeTaskStatus(props.id, idTask, isDone);
        console.log(isDone)
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const ChangeTodoListTitle = (title: string) => {
        props.ChangeTodoListTitle(props.id, title)
    }


    return (
        <div className={s.todoListItem}>
            <h2 className={s.title}>
                <EditableSpan title={props.title} onChange={ChangeTodoListTitle}/>
                <Button callback={OnTodoListDelHandler} round={true}>
                    <img src={del} alt="icon"/>
                </Button>
            </h2>
            <AddItemForm addTitle={addTask}/>
            <ul className={s.todoListList}>
                {props.tasks.map(el => {
                    const ChangeTaskTitle = (title: string) => {
                        props.ChangeTaskTitle(props.id, el.id, title)
                    }
                    return (
                        <li key={el.id} className={s.task + ' ' + (el.isDone ? s.isDone : undefined)}>
                            <div className={s.taskWrapp}>
                                <div className="checkbox">
                                    <input className="checkboxInput"
                                           type="checkbox"
                                           checked={el.isDone}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => OnChangeTaskHandler(el.id, e.currentTarget.checked)}/>
                                    <label className="checkboxLabel"></label>
                                </div>
                                <div className={s.taskText}><EditableSpan title={el.title} onChange={ChangeTaskTitle}/>
                                </div>
                            </div>
                            <Button callback={() => OnTaskDelHandler(el.id)} round={true}>
                                <img src={del} alt="icon"/>
                            </Button>
                        </li>
                    )
                })}
            </ul>
            <div className={s.todoListBtns}>
                <Button active={props.filter === 'all'} name={'all'}
                        callback={() => OnChangeFilterHandler('all')}/>
                <Button active={props.filter === 'active'} name={'active'}
                        callback={() => OnChangeFilterHandler('active')}/>
                <Button active={props.filter === 'completed'} name={'completed'}
                        callback={() => OnChangeFilterHandler('completed')}/>
            </div>
        </div>
    );
}