import React, { memo } from "react"
import s from "features/Header/Header.module.css"
import { AppStateType, useAppDispatch } from "app/store"
import { useSelector } from "react-redux"
import { Button } from "common/components"
import { authThunks, selectIsLoggedIn } from "features/Login/model/authSlice"
export const Header = memo(() => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppStateType, boolean>(selectIsLoggedIn)

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.headerWrapp}>
          <h1>
            <span>📄</span>TodoList
          </h1>
          {isLoggedIn && (
            <Button onClick={logoutHandler} transparent={true}>
              LogOut
            </Button>
          )}
        </div>
      </div>
    </header>
  )
})
