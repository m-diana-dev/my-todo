import { AxiosResponse } from "axios"
import { instance } from "common/api"
import { BaseResponseType } from "common/types"

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<
        BaseResponseType<{
          userId: number
        }>
      >,
      LoginParamsType
    >("/auth/login", data)
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("/auth/me")
  },
  logout() {
    return instance.delete<BaseResponseType>(`/auth/login`)
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
