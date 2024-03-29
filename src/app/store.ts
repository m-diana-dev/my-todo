import { tasksReducer } from "features/TodoLists/TodoList/Task/tasks-reducer"
import { todoListsReducer } from "features/TodoLists/TodoList/todolists-reducer"
import { useDispatch } from "react-redux"
import { appReducer } from "app/app-reducer"
import { authReducer } from "features/Login/model/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

export const AppStore = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppStateType = ReturnType<typeof AppStore.getState>

export type AppDispatch = typeof AppStore.dispatch
export const useAppDispatch = useDispatch<AppDispatch>
