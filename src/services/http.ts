import axios, { AxiosError } from 'axios'
import { useUiStore } from '@/stores/ui'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Skip the global "something went wrong" modal for this request (e.g. login forms show inline errors instead). */
    silent?: boolean
  }
}

export const http = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.config?.silent) {
      const ui = useUiStore()
      ui.showError()
    }
    return Promise.reject(error)
  },
)
