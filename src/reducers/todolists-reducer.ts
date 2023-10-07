import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

export type DeleteTodoListAT = {
    type: 'DELETE-TODOLIST'
    idTodoList: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    idTodoList: string
    title: string
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

type ActionType = DeleteTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

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
            return [...state, {id: action.idTodoList, title: action.title, filter: 'all', addedDate: '', order: 0}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.idTodoList ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.idTodoList ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

export const DeleteTodoListAC = (id: string): DeleteTodoListAT => ({type: 'DELETE-TODOLIST', idTodoList: id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', idTodoList: v1(), title: title})
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

