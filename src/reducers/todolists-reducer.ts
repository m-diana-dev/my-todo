import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorAC, SetAppStatusAC} from "./app-reducer";
import {addTaskAC} from "./tasks-reducer";

const initialState: TodolistDomainType[] = []
export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "DELETE-TODOLIST":
            return state.filter(el => el.id !== action.idTodoList)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', status: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.idTodoList ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.idTodoList ? {...el, filter: action.payload.filter} : el)
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: 'all', status: "idle"}))
        case "CHANGE-TODOLIST-STATUS":
            return state.map(el => el.id === action.payload.idTodoList ? {...el, status: action.payload.status} : el)
        default:
            return state
    }
}

//TYPES
export type DeleteTodoListAT = ReturnType<typeof DeleteTodoListAC>
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>
export type ChangeTodoListTitleAT = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeTodoListFilterAT = ReturnType<typeof ChangeTodoListFilterAC>
export type SetTodolistsAT = ReturnType<typeof SetTodolistsAC>
export type ChangeTodoListStatusAT = ReturnType<typeof ChangeTodoListStatusAC>

type ActionType = DeleteTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistsAT
    | ChangeTodoListStatusAT

export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    status: RequestStatusType
}

//AC
export const DeleteTodoListAC = (idTodoList: string) => ({type: 'DELETE-TODOLIST', idTodoList} as const)
export const AddTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangeTodoListTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        idTodoList: id,
        title: title
    }
} as const)
export const ChangeTodoListFilterAC = (id: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        idTodoList: id,
        filter: filter
    }
} as const)
export const SetTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)

export const ChangeTodoListStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-STATUS',
    payload: {
        idTodoList: id,
        status
    }
} as const)

//TC
export const SetTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(SetTodolistsAC(res.data))
            dispatch(SetAppStatusAC('succeeded'))
        })
}
export const CreateTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodoListAC(res.data.data.item))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                dispatch(SetAppStatusAC('failed'))
                if (res.data.messages.length) {
                    dispatch(SetAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(SetAppErrorAC('Some Error'))
                }
            }
        })
}
export const DeleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    dispatch(ChangeTodoListStatusAC(todolistID,'loading'))
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(DeleteTodoListAC(todolistID))
            dispatch(SetAppStatusAC('succeeded'))
            dispatch(ChangeTodoListStatusAC(todolistID,'succeeded'))
        })
}
export const UpdateTodolistTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodoListTitleAC(todolistID, title))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                dispatch(SetAppStatusAC('failed'))
                if (res.data.messages.length) {
                    dispatch(SetAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(SetAppErrorAC('Some Error'))
                }
            }
        })
}

