import { appReducer, SetAppErrorAC, SetAppInitializedAC, SetAppStatusAC, settingsAppStateType } from "./app-reducer"

let startState: settingsAppStateType
beforeEach(() => {
  startState = {
    error: "",
    status: "idle",
    isInitialized: true,
  }
})
test("correct error message should be set", () => {
  const endState: settingsAppStateType = appReducer(startState, SetAppErrorAC("some message"))

  expect(endState.error).toBe("some message")
  expect(startState.error).toBe("")
})

test("correct status message should be set", () => {
  const endState: settingsAppStateType = appReducer(startState, SetAppStatusAC("loading"))

  expect(endState.status).toBe("loading")
  expect(startState.status).toBe("idle")
})

test("correct initialization status should be set", () => {
  const endState: settingsAppStateType = appReducer(startState, SetAppInitializedAC(false))

  expect(endState.isInitialized).toBe(false)
  expect(startState.isInitialized).toBe(true)
})
