import { integer } from 'vscode-languageserver-types'
import useFetchData from '~/composables/useFetchData'
import nuxtStorage from "nuxt-storage/nuxt-storage";
// @ts-ignore
const { fetchData } = useFetchData()

export async function getAllOrders() {
  const res = await fetchData('api/orders', {
    method: 'GET',
  })
  return res
}

export async function getAllFilteredOrders(search: string) {
  const res = await fetchData('api/orders?numberOrName=' + search, {
    method: 'GET',
  })
  return res
}

export async function getOrder(orderId: number) {
  const res = await fetchData('api/orders/' + orderId, {
    method: 'GET',
  })
  return res
}
