import { FetchError, FetchOptions, ofetch } from 'ofetch'

interface IRequestOptions {
  method?: string
  body?: { [key: string]: any }
  headers?: { [key: string]: string }
  params?: { [key: string]: string }
}

interface IError {
  status: number
  message: string
  raw: any
}

export const api = async (url: string, rest: IRequestOptions) => {
  try {
    const data = await ofetch(url, rest)

    console.log(`👌 fetch ${url}`, data)

    return { data, error: null }
  } catch (err: any) {
    let errMessage = err?.data?.message || ''

    if (!errMessage) {
      switch (err?.status) {
        case 500:
          errMessage = 'Ошибка сервера'
          break
        case 403:
          errMessage = 'Ошибка авторизации'
          break
      }
    }

    const error: IError = { status: err?.status || 500, message: errMessage, raw: err }

    console.log('❌ Request Error', error)

    return { data: null, error }
  }
}
