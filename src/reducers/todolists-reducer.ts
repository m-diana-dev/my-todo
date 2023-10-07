import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type DeleteTodoListAT = {
    type: 'DELETE-TODOLIST'
    idTodoList: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    idTodoList: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    idTodoList: string,
    filter: FilterType
}

export type SetTodolistsAT = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

type ActionType = DeleteTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT | SetTodolistsAT

export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = []
export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "DELETE-TODOLIST":
            return state.filter(el => el.id !== action.idTodoList)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.idTodoList ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.idTodoList ? {...el, filter: action.filter} : el)
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: 'all'}))
        default:
            return state
    }
}

export const DeleteTodoListAC = (id: string): DeleteTodoListAT => ({type: 'DELETE-TODOLIST', idTodoList: id})
export const AddTodoListAC = (todolist: TodolistType): AddTodoListAT => ({type: 'ADD-TODOLIST', todolist})
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    idTodoList: id,
    title: title
})
export const ChangeTodoListFilterAC = (id: string, filter: FilterType): ChangeTodoListFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    idTodoList: id,
    filter: filter
})
export const SetTodolistsAC = (todolists: TodolistType[]): SetTodolistsAT => ({type: 'SET-TODOLISTS', todolists})
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

