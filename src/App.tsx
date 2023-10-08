import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Header} from "./components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./reducers/store";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, CreateTodolistTC,
    DeleteTodoListAC, DeleteTodolistTC, FilterType, SetTodolistsTC, TodolistDomainType, UpdateTodolistTC
} from "./reducers/todolists-reducer";
import {addTaskAC, CreateTasksTC} from "./reducers/tasks-reducer";
import {TaskType} from "./api/todolist-api";


export type TasksType = {
    [id: string]: TaskType[]
}

function App() {
    console.log('App rendered')

    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todoLists = useSelector<AppStateType, TodolistDomainType[]>(state => state.todolists)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(SetTodolistsTC())
    },[])

    const DeleteTodoList = useCallback((idTodoList: string) => {
        dispatch(DeleteTodolistTC(idTodoList))
    },[dispatch])

    const ChangeFilter = useCallback((idTodoList: string, filter: FilterType) => {
        dispatch(ChangeTodoListFilterAC(idTodoList, filter))
    },[dispatch])

    const ChangeTodoListTitle = useCallback((idTodoList: string, title: string) => {
        dispatch(UpdateTodolistTC(idTodoList, title))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(CreateTodolistTC(title))
    }, [dispatch])


    const addTask = useCallback((idTodoList: string, title: string) => {
        dispatch(CreateTasksTC(idTodoList, title))
    },[dispatch])

    const todoListComponent = todoLists.map(el => {

        return (
            <TodoList key={el.id}
                      id={el.id}
                      title={el.title}
                      filter={el.filter}
                      tasks={tasks[el.id]}
                      DeleteTodoList={DeleteTodoList}
                      ChangeFilter={ChangeFilter}
                      ChangeTodoListTitle={ChangeTodoListTitle}
                      addTask={addTask}/>
        )
    })

    return (
        <div className="App">
            <Header/>
            <main className="main">
                <div className="container">
                    <div className="mainTop">
                        <h2>Add a new task block!</h2>
                        <AddItemForm addTitle={addTodoList}/>
                    </div>
                    <div className="mainItems">
                        {todoListComponent}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
