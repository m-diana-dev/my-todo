import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, DeleteTodoListAT} from "./todolists-reducer";

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | DeleteTodoListAT

const initialState: TasksType = {}
export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todoListID]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todoListID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                    ? {...el, isDone: action.payload.isDone}
                    : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                    ? {...el, title: action.payload.title}
                    : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.idTodoList]: []}
        case "DELETE-TODOLIST":
            const {[action.idTodoList]: [], ...rest} = state
            return rest
            default: return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string) => ({
    type: 'REMOVE-TASK',
    payload: {taskID, todoListID}
} as const)
export const addTaskAC = (title: string, todoListID: string) => ({
    type: 'ADD-TASK',
    payload: {title, todoListID}
} as const)
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskID,
            isDone,
            todoListID
        }
    } as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskID,
            title,
            todoListID
        }
    } as const
}

