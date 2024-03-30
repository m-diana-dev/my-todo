import { tasksSlice } from "features/TodoLists/model/tasksSlice"
import { todolistsSlice } from "features/TodoLists/model/todolistsSlice"
import { useDispatch } from "react-redux"
import { appSlice } from "app/appSlice"
import { authSlice } from "features/Login/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export const AppStore = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
})

export type AppStateType = ReturnType<typeof AppStore.getState>

export type AppDispatch = typeof AppStore.dispatch
export const useAppDispatch = useDispatch<AppDispatch>
