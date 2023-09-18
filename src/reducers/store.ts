import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";

export const RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

export const AppStore = createStore(RootReducer)

export type AppStateType = ReturnType<typeof RootReducer>