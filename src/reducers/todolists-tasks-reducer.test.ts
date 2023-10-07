import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {TasksType} from "../App";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.idTodoList)
    expect(idFromTodolists).toBe(action.idTodoList)
})

