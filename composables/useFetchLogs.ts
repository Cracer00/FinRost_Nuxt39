import { integer } from 'vscode-languageserver-types'
import useFetchData from '~/composables/useFetchData'
import nuxtStorage from "nuxt-storage/nuxt-storage";
// @ts-ignore
const { fetchData } = useFetchData()


export async function getBackendLogs(page: number) {
  const res = await fetchData('api/logs/back?page=' + page, {
    method: 'GET',
  })
  return res
}

export async function getFrontendLogs() {
  const res = await fetchData('api/logs/front', {
    method: 'GET',
  })
  return res
}

export async function postFrontError(error: any) {
  const res = await fetchData('api/logs/front', {
    method: 'POST',
    body: error,
  })
  return res
}
