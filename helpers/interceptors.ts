import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  GatewayTimeout = 504,
}

export type RefreshTokenCallback = () => Promise<void>

let refreshCb: RefreshTokenCallback | undefined

export const setRefreshTokenCallback = (
  refreshTokenCb: RefreshTokenCallback
) => {
  refreshCb = refreshTokenCb
}
type GetAccesTokenCb = () => Promise<string>
let getAccessToken: undefined | GetAccesTokenCb

export const setAccessToken = (getToken: GetAccesTokenCb) => {
  getAccessToken = getToken
}

const clearLocalStorage = (): void => {
  getAccessToken = undefined
}

const handleError = (error: any) => {
  const { status } = error
  switch (status) {
    case StatusCode.Forbidden:
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      clearLocalStorage()
      console.error(status)
      break
    }
    case StatusCode.InternalServerError:
    case StatusCode.TooManyRequests:
    case StatusCode.GatewayTimeout: {
      console.error(status)
      break
    }
    default: {
      console.error('Default', error)
      break
    }
  }
  return Promise.reject(error)
}

const onRequest = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const token = await getAccessToken?.()
  config.headers!.Authorization = `Bearer ${token}`
  return config
}

const onRequestError = async (error: AxiosError): Promise<any> => {
  const status = error.response ? error.response.status : null
  if (error.config && status === 401) {
    await refreshCb?.()
    const token = await getAccessToken?.()
    if (!error.config.headers) {
      error.config.headers = { Authorization: `Bearer ${token}` }
    }
    error.config.headers.Authorization = `Bearer ${token}`
    error.config.baseURL = undefined
    return axios.request(error.config)
  }

  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log('..response', response)
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const { response } = error
  return handleError(response)
}

export const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // "Access-Control-Allow-Credentials": true,
  // "Cross-Origin-Embedder-Policy": "require-corp",
  // "Cross-Origin-Opener-Policy": "same-origin",
  // "Cross-Origin-Resource-Policy": "cross-origin",
}

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
