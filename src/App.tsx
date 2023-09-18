import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Header} from "./components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./reducers/store";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    DeleteTodoListAC
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

export type FilterType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [id: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todoLists = useSelector<AppStateType, TodoListsType[]>(state => state.todolists)

    const dispatch = useDispatch()

    const DeleteTodoList = (idTodoList: string) => {
        dispatch(DeleteTodoListAC(idTodoList))
    }
    const DeleteTask = (idTodoList: string, idTask: string) => {
        dispatch(removeTaskAC(idTask, idTodoList))
    }

    const ChangeFilter = (idTodoList: string, filter: FilterType) => {
        dispatch(ChangeTodoListFilterAC(idTodoList, filter))
    }

    const ChangeTaskTitle = (idTodoList: string, idTask: string, title: string) => {
        dispatch(changeTaskTitleAC(idTask, title, idTodoList))
    }

    const ChangeTodoListTitle = (idTodoList: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(idTodoList, title))
    }
    const addTask = (idTodoList: string, title: string) => {
        dispatch(addTaskAC(title, idTodoList))
    }

    const ChangeTaskStatus = (idTodoList: string, idTask: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(idTask, isDone, idTodoList))
    }

    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }


    const todoListComponent = todoLists.map(el => {
        const filteredTasks = () => {
            if (el.filter === 'active') return tasks[el.id].filter(el => !el.isDone)
            if (el.filter === 'completed') return tasks[el.id].filter(el => el.isDone)
            return tasks[el.id]
        }
        return (
            <TodoList key={el.id}
                      id={el.id}
                      title={el.title}
                      filter={el.filter}
                      tasks={filteredTasks()}
                      DeleteTodoList={DeleteTodoList}
                      DeleteTask={DeleteTask}
                      ChangeFilter={ChangeFilter}
                      addTask={addTask}
                      ChangeTaskStatus={ChangeTaskStatus}
                      ChangeTaskTitle={ChangeTaskTitle}
                      ChangeTodoListTitle={ChangeTodoListTitle}/>
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
