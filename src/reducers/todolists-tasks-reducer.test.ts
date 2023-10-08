import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {TasksType} from "../App";
import {TodolistType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const newTodolist: TodolistType = {
        id: 'random-id',
        title: 'new todolist',
        addedDate: '',
        order: 0,
    }

    const action = AddTodoListAC(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})

