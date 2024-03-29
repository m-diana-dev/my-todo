import React, { memo } from "react"
import s from "features/Header/Header.module.css"
import { AppStateType, useAppDispatch } from "app/store"
import { useSelector } from "react-redux"
import { Button } from "common/components"
import { authThunks } from "features/Login/model/auth-reducer"
export const Header = memo(() => {
  console.log("Header rendered")
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

  const onClickHandler = () => {
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
            <Button onClick={onClickHandler} transparent={true}>
              LogOut
            </Button>
          )}
        </div>
      </div>
    </header>
  )
})
