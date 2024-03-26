import { v1 } from "uuid"
import { FilterType, TodolistDomainType, todoListsActions, todoListsReducer, todoListThunks } from "./todolists-reducer"
import { TodolistType } from "api/todolist-api"

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>
beforeEach(() => {
  //данные
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", status: "idle", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", status: "idle", addedDate: "", order: 0 },
  ]
})
test("correct todolist should be removed", () => {
  //выполнения тестируемого кода
  // const endState = todoListsReducer(startState, {type: "DELETE-TODOLIST", idTodoList: todolistId1})
  // const endState = todoListsReducer(startState, todoListsActions.deleteTodoList({ id: todolistId1 }))
  const endState = todoListsReducer(
    startState,
    todoListThunks.deleteTodolist.fulfilled({ todolistID: todolistId1 }, "requestId", { todolistID: todolistId1 }),
  )

  //проверка результата на соответствие желаемому результату
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const newTodolist: TodolistType = {
    id: "random-id",
    title: "New Todolist",
    addedDate: "",
    order: 0,
  }

  const endState = todoListsReducer(
    startState,
    todoListThunks.createTodolist.fulfilled({ todolist: newTodolist }, "requestId", newTodolist),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolist.title)
})

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist"

  // const action = todoListsActions.changeTodoListTitle({ id: todolistId2, title: newTodolistTitle })
  const action = todoListThunks.updateTodolist.fulfilled(
    { todolistID: todolistId2, title: newTodolistTitle },
    "requestId",
    { todolistID: todolistId2, title: newTodolistTitle },
  )
  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterType = "completed"

  const action = todoListsActions.changeTodoListFilter({ id: todolistId2, filter: newFilter })

  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})

test("entity status of todolist should be changed", () => {
  const endState = todoListsReducer(
    startState,
    todoListsActions.changeTodoListStatus({ id: todolistId1, status: "loading" }),
  )

  expect(endState[0].status).toBe("loading")
  expect(startState[0].status).toBe("idle")
})
