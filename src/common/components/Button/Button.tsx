import React, { ComponentProps, memo } from "react"
import s from "common/components/Button/Button.module.css"

export type Props = {
  round?: boolean
  active?: boolean
  children?: React.ReactNode
  transparent?: boolean
} & ComponentProps<"button">
export const Button = memo(({ round, active, children, transparent, ...restProps }: Props) => {
  const buttonStyle =
    s.button + " " + (round ? s.round : "") + (active ? s.activeFilter : "") + (transparent ? s.transparent : "")
  return (
    <button {...restProps} className={buttonStyle}>
      {children}
    </button>
  )
})
