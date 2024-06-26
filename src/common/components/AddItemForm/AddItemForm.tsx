import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import add from "assets/images/add.svg"
import s from "common/components/AddItemForm/AddItemForm.module.css"
import { Input, Button } from "common/components"
import { BaseResponseType } from "common/types"

type Props = {
  addTitle: (title: string) => Promise<unknown>
  disabled?: boolean
}
export const AddItemForm = memo(({ addTitle, disabled }: Props) => {
  const [inputTitle, setInputTitle] = useState("")
  const [error, setError] = useState("")
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
    setError("")
  }

  const addTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTitleHandler()
    }
  }
  const addTitleHandler = () => {
    if (inputTitle.trim() !== "") {
      addTitle(inputTitle.trim())
        .then(() => {
          setInputTitle("")
        })
        .catch((e: BaseResponseType) => {
          if (e?.resultCode) {
            setError(e.messages[0])
          }
        })
    } else {
      setError("Error")
    }
  }

  const inputStyle = s.inputWidth
  const disabledForm = disabled ? s.disabled : undefined
  return (
    <div className={s.AddItemForm + " " + disabledForm}>
      <Input
        style={inputStyle}
        type="text"
        onChange={changeInputHandler}
        onKeyDown={addTitleKeyDownHandler}
        value={inputTitle}
        error={!!error}
      />
      <Button onClick={addTitleHandler} round={true}>
        <img src={add} alt="icon" />
      </Button>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  )
})
