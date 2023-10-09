import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []
export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "DELETE-TODOLIST":
            return state.filter(el => el.id !== action.idTodoList)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.idTodoList ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.idTodoList ? {...el, filter: action.payload.filter} : el)
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: 'all'}))
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

type ActionType = DeleteTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistsAT

export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterType
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

//TC
export const SetTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(SetTodolistsAC(res.data))
        })
}
export const CreateTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
}
export const DeleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(DeleteTodoListAC(todolistID))
        })
}
export const UpdateTodolistTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistID, title)
        .then(res => {
            dispatch(ChangeTodoListTitleAC(todolistID, title))
        })
}

