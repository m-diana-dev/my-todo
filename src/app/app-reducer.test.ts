import { appActions, appReducer, AppState } from "app/app-reducer"

let startState: AppState
beforeEach(() => {
  startState = {
    error: "",
    status: "idle",
    isInitialized: true,
  }
})
test("correct error message should be set", () => {
  const endState: AppState = appReducer(startState, appActions.setAppError({ error: "some message" }))

  expect(endState.error).toBe("some message")
  expect(startState.error).toBe("")
})

test("correct status message should be set", () => {
  const endState: AppState = appReducer(startState, appActions.setAppStatus({ status: "loading" }))

  expect(endState.status).toBe("loading")
  expect(startState.status).toBe("idle")
})

test("correct initialization status should be set", () => {
  const endState: AppState = appReducer(startState, appActions.setAppInitialized({ initialized: false }))

  expect(endState.isInitialized).toBe(false)
  expect(startState.isInitialized).toBe(true)
})
