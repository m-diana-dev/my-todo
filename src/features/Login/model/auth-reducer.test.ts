import { authActions, authReducer } from "features/Login/model/auth-reducer"

let startState: { isLoggedIn: boolean }
beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})
test("correct logged status should be set", () => {
  const endState: { isLoggedIn: boolean } = authReducer(startState, authActions.setIsLoggedIn({ isLoggedIn: true }))

  expect(endState.isLoggedIn).toBe(true)
  expect(startState.isLoggedIn).toBe(false)
})
