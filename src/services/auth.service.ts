import { http } from './http'
import type { LoginCredentials, LoginResponse } from '@/types'

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>('/auth/login', credentials, { silent: true })
  return data
}
