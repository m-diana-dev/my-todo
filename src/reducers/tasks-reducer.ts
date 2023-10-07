import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, DeleteTodoListAT, SetTodolistsAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type SetTasksAT = {
    type: 'SET-TASKS'
    todolistID: string
    tasks: TaskType[]
}


type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | changeTaskTitleAT
    | AddTodoListAT
    | DeleteTodoListAT
    | SetTodolistsAT
    | SetTasksAT

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
                    status: TaskStatuses.New,
                    todoListId: action.payload.todoListID,
                    deadline: '',
                    description: '',
                    addedDate: '',
                    startDate: '',
                    order: 0,
                    priority: TaskPriorities.Low
                }, ...state[action.payload.todoListID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                    ? {...el, status: action.payload.status}
                    : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                    ? {...el, title: action.payload.title}
                    : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "DELETE-TODOLIST":
            const {[action.idTodoList]: [], ...rest} = state
            return rest
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(el => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state
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
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskID,
            status,
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

// export const SetTasksAC = (todolistID: string, tasks: TaskType[]): SetTasksAT => ({type: 'SET-TASKS', todolistID, tasks})
//
// export const SetTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
//     todolistAPI.getTasks(todolistID)
//         .then(res => {
//             dispatch(SetTasksAC(todolistID, res.data.items))
//         })
// }

