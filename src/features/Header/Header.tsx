import React, { memo } from "react"
import s from "features/Header/Header.module.css"
import { AppStateType, useAppDispatch } from "app/store"
import { logoutTC } from "features/Login/model/auth-reducer"
import { useSelector } from "react-redux"
import { Button } from "common/components"
export const Header = memo(() => {
  console.log("Header rendered")
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

  const onClickHandler = () => {
    dispatch(logoutTC())
  }
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.headerWrapp}>
          <h1>
            <span>📄</span>TodoList
          </h1>
          {isLoggedIn && (
            <Button onClick={onClickHandler} transparent={true}>
              LogOut
            </Button>
          )}
        </div>
      </div>
    </header>
  )
})
