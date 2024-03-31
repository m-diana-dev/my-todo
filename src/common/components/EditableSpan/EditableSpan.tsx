import React, { ChangeEvent, memo, useState } from "react"
import s from "common/components/EditableSpan/EditableSpan.module.css"
import { Input } from "common/components"

type Props = {
  title: string
  disabled?: boolean
  onChange: (title: string) => void
}
export const EditableSpan = memo(({ title, disabled, onChange }: Props) => {
  const [modeInput, setModeInput] = useState(false)
  const [inputTitle, setInputTitle] = useState(title)
  const doubleClickHandler = () => {
    if (!disabled) {
      setModeInput(true)
    }
  }
  const blurHandler = () => {
    setModeInput(false)
    onChange(inputTitle)
  }
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
  }

  const inputStyle = s.inputWidth

  return modeInput ? (
    <Input style={inputStyle} autoFocus onBlur={blurHandler} value={inputTitle} onChange={changeHandler} />
  ) : (
    <span className={s.inputWidth} onDoubleClick={doubleClickHandler}>
      {title}
    </span>
  )
})
