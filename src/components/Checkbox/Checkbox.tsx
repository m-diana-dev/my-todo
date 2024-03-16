import React, { ComponentProps } from "react"
import { Input } from "../Input/Input"
import s from "./Checkbox.module.css"

export type CheckboxPropsType = {
  label?: string
  style?: string
} & ComponentProps<"input">
export const Checkbox: React.FC<CheckboxPropsType> = (props) => {
  const { label, style, ...restProps } = props
  return (
    <div className={s.checkbox + " " + style}>
      <Input style={s.checkboxInput} type="checkbox" {...restProps} />
      <label className={s.checkboxLabel}>{label}</label>
    </div>
  )
}
