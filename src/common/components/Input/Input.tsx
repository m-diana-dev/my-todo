import React, { ComponentProps } from "react"
import s from "common/components/Input/Input.module.css"

export type Props = {
  error?: boolean
  style?: string
} & ComponentProps<"input">
export const Input = ({ error, style, ...restProps }: Props) => {
  const inputStyle = s.input + " " + (error ? s.errorInput : "") + " " + style
  return <input {...restProps} className={inputStyle} />
}
