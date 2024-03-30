import React, { useEffect } from "react"
import "app/App.css"
import { Header } from "features/Header/Header"
import { TodoLists } from "features/TodoLists/TodoLists"
import { useSelector } from "react-redux"
import { AppStateType, useAppDispatch } from "app/store"
import { RequestStatusType, selectAppStatus, selectIsInitialized } from "app/app-reducer"
import { Login } from "features/Login/ui/Login"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Error404 } from "features/Error404/Error404"
import { ErrorModal, Preloader, PreloaderCircle } from "common/components"
import { authThunks } from "features/Login/model/auth-reducer"

function App() {
  const appStatus = useSelector<AppStateType, RequestStatusType>(selectAppStatus)
  const isInitialized = useSelector<AppStateType, boolean>(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  if (!isInitialized) {
    return <PreloaderCircle />
  }

  return (
    <div className="App">
      {appStatus === "loading" && <Preloader />}
      <Header />
      <BrowserRouter basename={"/my-todo"}>
        <Routes>
          <Route path="/" element={<TodoLists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
      <ErrorModal />
    </div>
  )
}

export default App
