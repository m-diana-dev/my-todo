import React from "react"
import s from "features/Error404/Error404.module.css"

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
