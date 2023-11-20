import {authReducer, setIsLoggedInAC} from "./auth-reducer";


let startState: {isLoggedIn: boolean}
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})
test('correct logged status should be set', () => {
    const endState: {isLoggedIn: boolean} = authReducer(startState, setIsLoggedInAC(true))

    expect(endState.isLoggedIn).toBe(true);
    expect(startState.isLoggedIn).toBe(false);
})

