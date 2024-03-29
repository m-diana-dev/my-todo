import React from "react"
import s from "features/Login/ui/Login.module.css"
import { useFormik } from "formik"
import { AppStateType, useAppDispatch } from "app/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Button, Checkbox, Input } from "common/components"
import { authThunks } from "features/Login/model/auth-reducer"

export const Login = () => {
  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }

  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password) {
        errors.password = "Required"
      } else if (values.password.length < 4) {
        errors.password = "Invalid password"
      }
      return errors
    },
    onSubmit: (values) => {
      dispatch(authThunks.login(values))
      formik.resetForm()
    },
  })

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
          <Button type={"submit"}>Login</Button>
        </form>
      </div>
    </div>
  )
}
