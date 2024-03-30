import React, { ComponentProps } from "react"
import { Input } from "common/components"
import s from "common/components/Checkbox/Checkbox.module.css"

export type Props = {
  label?: string
  style?: string
} & ComponentProps<"input">
export const Checkbox = ({ label, style, ...restProps }: Props) => {
  return (
    <div className={s.checkbox + " " + style}>
      <Input style={s.checkboxInput} type="checkbox" {...restProps} />
      <label className={s.checkboxLabel}>{label}</label>
    </div>
  )
}
