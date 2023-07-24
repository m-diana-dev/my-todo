import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Header} from "./components/Header/Header";

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
    const tidoListId1 = v1();
    const tidoListId2 = v1();
    const [todoLists, setTodoLists] = useState<TodoListsType[]>(
        [
            {id: tidoListId1, title: 'What to learn', filter: 'all'},
            {id: tidoListId2, title: 'What to buy', filter: 'all'},
        ]
    );
    const [tasks, setTasks] = useState<TasksType>({
            [tidoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "ReactJS2", isDone: false},
            ],
            [tidoListId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Water", isDone: true},
            ]
        }
    );

    const DeleteTodoList = (idTodoList: string) => {
        setTodoLists(todoLists.filter(el => el.id !== idTodoList));
        delete tasks[idTodoList];
    }
    const DeleteTask = (idTodoList: string, idTask: string) => {
        setTasks({...tasks, [idTodoList]: tasks[idTodoList].filter(el => el.id !== idTask)})
    }

    const ChangeFilter = (idTodoList: string, filter: FilterType) => {
        setTodoLists(todoLists.map(el => el.id === idTodoList ? {...el, filter} : el))
    }

    const ChangeTaskTitle = (idTodoList: string, idTask: string, title: string) => {
        setTasks({...tasks, [idTodoList]: tasks[idTodoList].map(el => el.id === idTask ? {...el, title} : el)})
    }

    const ChangeTodoListTitle = (idTodoList: string, title: string) => {
        setTodoLists(todoLists.map(el => el.id === idTodoList ? {...el, title} : el))
    }
    const addTask = (idTodoList: string, title: string) => {
        setTasks({...tasks, [idTodoList]: [{id: v1(), title, isDone: false}, ...tasks[idTodoList]]})
    }

    const ChangeTask = (idTodoList: string, idTask: string, isDone: boolean) => {
        setTasks({...tasks, [idTodoList]: tasks[idTodoList].map(el => el.id === idTask ? {...el, isDone} : el)})
    }

    const addTodoList = (title: string) => {
        const newId = v1();
        setTodoLists([...todoLists, {id: newId, title, filter: 'all'}])
        setTasks({...tasks, [newId]: []})
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
                      ChangeTask={ChangeTask}
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
