import { AxiosResponse } from "axios"
import { instance } from "common/api"
import { ResponseType } from "common/types"

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<
        ResponseType<{
          userId: number
        }>
      >,
      LoginParamsType
    >("/auth/login", data)
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("/auth/me")
  },
  logout() {
    return instance.delete<ResponseType>(`/auth/login`)
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
