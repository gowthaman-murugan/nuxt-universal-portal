import { http } from '../helpers'

export const create = async (data: any): Promise<any> => {
  const url = '/api/tasks'
  const res = await http.post<any>(url, data)
  return res.data
}

export const update = async (id: number, data: any): Promise<any> => {
  const url = `/api/tasks/update?id=${id}`
  const res = await http.put<any>(url, data)
  return res.data
}

export const list = async (): Promise<any> => {
  const url = `/api/tasks`
  const res = await http.get<any>(url)
  return res.data
}

export const getById = async (id: number): Promise<any> => {
  const url = `/api/tasks/one?id=${id}`
  const res = await http.get<any>(url)
  return res.data
}
