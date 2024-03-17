import { RESULT_CODE, TaskType, todolistAPI, UpdateTaskModelType } from "api/todolist-api"
import { Dispatch } from "redux"
import { AppStateType } from "./store"
import { TasksType } from "components/TodoLists/TodoLists"
import { appActions, RequestStatusType } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todoListsActions } from "reducers/todolists-reducer"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskID: string; todoListID: string }>) => {
      const index = state[action.payload.todoListID].findIndex((el) => el.id === action.payload.taskID)
      if (index !== -1) state[action.payload.todoListID].splice(index, 1)
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: "idle" })
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskID: string; model: UpdateDomainTaskModelType; todoListID: string }>,
    ) => {
      const index = state[action.payload.todoListID].findIndex((el) => el.id === action.payload.taskID)
      if (index !== -1)
        state[action.payload.todoListID][index] = {
          ...state[action.payload.todoListID][index],
          ...action.payload.model,
        }
    },
    setTasks: (state, action: PayloadAction<{ todolistID: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistID] = action.payload.tasks.map((el: any) => ({ ...el, entityStatus: "idle" }))
    },
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ todolistID: string; taskID: string; status: RequestStatusType }>,
    ) => {
      const index = state[action.payload.todolistID].findIndex((el) => el.id === action.payload.taskID)
      if (index !== -1)
        state[action.payload.todolistID][index] = {
          ...state[action.payload.todolistID][index],
          entityStatus: action.payload.status,
        }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todoListsActions.addTodoList, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todoListsActions.deleteTodoList, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todoListsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((el) => {
          state[el.id] = []
        })
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

//TC
export const SetTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistAPI
    .getTasks(todolistID)
    .then((res) => {
      dispatch(tasksActions.setTasks({ todolistID, tasks: res.data.items }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}
export const CreateTasksTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistAPI
    .createTask(todolistID, title)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksActions.addTask({ task: res.data.data.item }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}
export const DeleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  dispatch(tasksActions.changeTaskEntityStatus({ todolistID, taskID, status: "loading" }))
  todolistAPI
    .deleteTask(todolistID, taskID)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksActions.removeTask({ taskID, todoListID: todolistID }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(tasksActions.changeTaskEntityStatus({ todolistID, taskID, status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
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
export const UpdateTaskTC =
  (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(tasksActions.changeTaskEntityStatus({ todolistID, taskID, status: "loading" }))
    const task = getState().tasks[todolistID].find((el) => el.id === taskID)
    if (task) {
      const modelAPI: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      }
      todolistAPI
        .updateTask(todolistID, taskID, modelAPI)
        .then((res) => {
          if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(
              tasksActions.updateTask({
                taskID,
                model: domainModel,
                todoListID: todolistID,
              }),
            )
            dispatch(appActions.setAppStatus({ status: "succeeded" }))
            dispatch(tasksActions.changeTaskEntityStatus({ todolistID, taskID, status: "succeeded" }))
          } else {
            handleServerAppError(res.data, dispatch)
            dispatch(appActions.setAppStatus({ status: "succeeded" }))
          }
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch)
        })
    }
  }
