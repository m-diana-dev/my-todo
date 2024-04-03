import React from "react"
import preloader from "assets/images/loading.svg"
import s from "common/components/Preloader/PreloaderCircle.module.css"

export const PreloaderCircle = () => {
  return (
    <div className={s.PreloaderCircle}>
      <img src={preloader} alt="loading" />
    </div>
  )
}
