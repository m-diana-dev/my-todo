import { tasksReducer } from "./tasks-reducer"
import { TodolistDomainType, todoListsActions, todoListsReducer } from "./todolists-reducer"
import { TodolistType } from "api/todolist-api"
import { TasksType } from "components/TodoLists/TodoLists"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const newTodolist: TodolistType = {
    id: "random-id",
    title: "new todolist",
    addedDate: "",
    order: 0,
  }

  const action = todoListsActions.addTodoList({ todolist: newTodolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
