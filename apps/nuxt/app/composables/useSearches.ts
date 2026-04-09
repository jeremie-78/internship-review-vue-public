import axios from 'axios'


export interface Search {
  id: number,
  text: string,
  date: string
}


export async function saveSearch(search: any) {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string
  return axios.post(`${base.replace(/\/$/, '')}/searches`, search)
}

export async function getSearches() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string
  return axios.get<Search[]>(`${base.replace(/\/$/, '')}/searches`)
}

export async function deleteSearch(id: number) {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string
  return axios.delete(`${base.replace(/\/$/, '')}/searches/${id}`)
}
