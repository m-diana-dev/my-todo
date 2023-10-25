import {AddTodoListAT, DeleteTodoListAT, SetTodolistsAT} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppStateType} from "./store";
import {TasksType} from "../components/TodoLists/TodoLists";
import {SetAppStatusAC} from "./app-reducer";

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
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                    ? {...el, ...action.payload.model}
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
            return {...state, [action.payload.todolistID]: action.payload.tasks}
        default:
            return state
    }
}

//TYPES
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type UpdateTaskAT = ReturnType<typeof updateTaskAC>
type SetTasksAT = ReturnType<typeof SetTasksAC>

type ActionType = RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | AddTodoListAT
    | DeleteTodoListAT
    | SetTodolistsAT
    | SetTasksAT

//AC
export const removeTaskAC = (taskID: string, todoListID: string) => ({
    type: 'REMOVE-TASK',
    payload: {taskID, todoListID}
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    payload: {task}
} as const)
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todoListID: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            taskID,
            model,
            todoListID
        }
    } as const
}
export const SetTasksAC = (todolistID: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    payload: {
        todolistID,
        tasks
    }
} as const)

//TC
export const SetTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    todolistAPI.getTasks(todolistID)
        .then(res => {
            dispatch(SetTasksAC(todolistID, res.data.items))
            dispatch(SetAppStatusAC('succeeded'))
        })
}
export const CreateTasksTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    todolistAPI.createTask(todolistID, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(SetAppStatusAC('succeeded'))
        })
}
export const DeleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    todolistAPI.deleteTask(todolistID, taskID)
        .then(res => {
            dispatch(removeTaskAC(taskID, todolistID))
            dispatch(SetAppStatusAC('succeeded'))
        })
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const UpdateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(SetAppStatusAC('loading'))
    const task = getState().tasks[todolistID].find(el => el.id === taskID)
    if (task) {
        const modelAPI: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }
        todolistAPI.updateTask(todolistID, taskID, modelAPI)
            .then(res => {
                dispatch(updateTaskAC(taskID, domainModel, todolistID))
                dispatch(SetAppStatusAC('succeeded'))
            })

    }
}

