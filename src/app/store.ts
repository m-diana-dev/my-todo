import { AnyAction, combineReducers } from "redux"
import { tasksReducer } from "features/TodoLists/TodoList/Task/tasks-reducer"
import { todoListsReducer } from "features/TodoLists/TodoList/todolists-reducer"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { appReducer } from "app/app-reducer"
import { authReducer } from "features/Login/model/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

export const RootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer,
  app: appReducer,
  auth: authReducer,
})

export const AppStore = configureStore({
  reducer: RootReducer,
})

export type AppStateType = ReturnType<typeof RootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>

export type ThunkType = ThunkDispatch<AppStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<ThunkType>

// @ts-ignore
window.store = AppStore
