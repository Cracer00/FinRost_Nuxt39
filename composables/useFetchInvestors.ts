import { integer } from 'vscode-languageserver-types'
import useFetchData from '~/composables/useFetchData'
import nuxtStorage from "nuxt-storage/nuxt-storage";
// @ts-ignore
const { fetchData } = useFetchData()

export async function getAllInvestors() {
  const res = await fetchData('api/investors', {
    method: 'GET',
  })
  return res
}

export async function getAllFilteredInvestors(search: string) {
  const res = await fetchData('api/investors?name=' + search, {
    method: 'GET',
  })
  return res
}

export async function getAllChatUsers(search: string) {
  const res = await fetchData('api/chatUsers?name=' + search, {
    method: 'GET',
  })
  return res
}

export async function getInvestor(investorId: number) {
  const res = await fetchData('api/investors/' + investorId, {
    method: 'GET',
  })
  return res
}

export async function putInvestor(investor: any) {
  const res = await fetchData('api/investors/', {
    method: 'PUT',
    body: investor,
  })
  return res
}

export async function postInvestor(investor: any) {
  const res = await fetchData('api/investors/', {
    method: 'POST',
    body: investor,
  })
  return res
}

export async function deleteInvestor(investorId: number) {
  const res = await fetchData('api/investors?Id=' + investorId, {
    method: 'DELETE',
  })
  return res
}
