import React from "react"
import s from "features/Login/ui/Login.module.css"
import { AppStateType } from "app/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Button, Checkbox, Input } from "common/components"
import { selectIsLoggedIn } from "features/Login/model/authSlice"
import { useLogin } from "features/Login/lib/useLogin"
import { selectCaptcha } from "app/appSlice"

export const Login = () => {
  const isLoggedIn = useSelector<AppStateType, boolean>(selectIsLoggedIn)
  const captcha = useSelector<AppStateType, string>(selectCaptcha)

  const { formik } = useLogin()
  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }
  return (
    <div className={s.loginPage}>
      <div className="container">
        <h1 className={s.title}>Login</h1>
        <p>
          <span>To log in get registered </span>
          <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
            here
          </a>
        </p>
        <p>or use common test account credentials:</p>
        <p>Email: free@samuraijs.com</p>
        <p>Password: free</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <Input placeholder={"Email"} {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div className={s.formError}>{formik.errors.email}</div>
          ) : null}
          <Input placeholder={"Password"} type={"password"} {...formik.getFieldProps("password")} />
          {formik.touched.password && formik.errors.password ? (
            <div className={s.formError}>{formik.errors.password}</div>
          ) : null}
          <Checkbox label={"Remember me"} checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />
          {captcha && <img className={s.captcha} src={captcha} alt="captcha" />}
          {captcha && <Input placeholder={"Captcha"} {...formik.getFieldProps("captcha")} />}
          {formik.touched.captcha && formik.errors.captcha ? (
            <div className={s.formError}>{formik.errors.captcha}</div>
          ) : null}
          <Button type={"submit"} disabled={!formik.isValid}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
