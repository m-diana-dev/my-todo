import React from "react"
import s from "./Error404.module.css"
import { Button } from "../Button/Button"

export const Error404 = () => {
  return (
    <div className={s.error404}>
      <div className="container">
        <h1 className={s.title}>404</h1>
        <p>Page not found 🕳️</p>
      </div>
    </div>
  )
}
