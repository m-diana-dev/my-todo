import React from "react"
import s from "common/components/Preloader/Preloader.module.css"

export const Preloader = () => {
  return (
    <div className={s.preloader}>
      <div className={s.preloaderLine}></div>
    </div>
  )
}
