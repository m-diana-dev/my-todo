import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";

export const RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer
})

export const AppStore = createStore(RootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof RootReducer>

export type ThunkType = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = useDispatch<ThunkType>