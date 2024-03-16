import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import { Button } from "../Button/Button"
import add from "../../image/add.svg"
import s from "./AddItemForm.module.css"
import { Input } from "../Input/Input"

type AddItemFormPropsType = {
  addTitle: (title: string) => void
  disabled?: boolean
}
export const AddItemForm = memo((props: AddItemFormPropsType) => {
  const [inputTitle, setInputTitle] = useState("")
  const [error, setError] = useState("")
  const OnChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
    setError("")
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      OnAddTitleHandler()
    }
  }
  const OnAddTitleHandler = () => {
    if (inputTitle.trim() !== "") {
      props.addTitle(inputTitle.trim())
      setInputTitle("")
    } else {
      setError("Error")
    }
  }

  const inputStyle = s.inputWidth
  const disabledForm = props.disabled ? s.disabled : undefined
  return (
    <div className={s.AddItemForm + " " + disabledForm}>
      <Input
        style={inputStyle}
        type="text"
        onChange={OnChangeInputHandler}
        onKeyDown={onKeyDownHandler}
        value={inputTitle}
        error={!!error}
      />
      <Button onClick={OnAddTitleHandler} round={true}>
        <img src={add} alt="icon" />
      </Button>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  )
})
