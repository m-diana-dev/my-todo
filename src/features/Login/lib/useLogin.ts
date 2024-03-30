import { useAppDispatch } from "app/store"
import { authThunks } from "features/Login/model/authSlice"
import { useFormik } from "formik"
import { BaseResponseType } from "common/types"

export const useLogin = () => {
  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }

  const dispatch = useAppDispatch()

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
    onSubmit: (values, formikHelpers) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .catch((e: BaseResponseType) => {
          e.fieldsErrors?.forEach((el) => {
            formikHelpers.setFieldError(el.field, el.error)
          })
        })
      // formik.resetForm()
    },
  })

  return { formik }
}
