import React, { memo, useEffect } from "react"
import s from "common/components/ErrorModal/ErrorModal.module.css"
import errorImg from "assets/image/error.png"
import { useSelector } from "react-redux"
import { AppStateType, useAppDispatch } from "app/store"
import { appActions, selectAppError } from "app/appSlice"
import { Button } from "common/components"

export const ErrorModal = memo(() => {
  const error = useSelector<AppStateType, string>(selectAppError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const timerId = setTimeout(() => {
      closeModalHandler()
    }, 6000)

    return () => {
      clearTimeout(timerId)
    }
  }, [error])

  const closeModalHandler = () => {
    dispatch(appActions.setAppError({ error: "" }))
  }

  const modalOpen = error ? "" : s.hide
  return (
    <div className={s.modal + " " + modalOpen}>
      <div className={s.modalTop}>
        <img src={errorImg} alt="errorIcon" />
        <span className={s.title}>Error!</span>
      </div>
      <p>{error}</p>
      <Button onClick={closeModalHandler}>Dismiss</Button>
    </div>
  )
})
