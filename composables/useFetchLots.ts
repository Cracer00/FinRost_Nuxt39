import { integer } from 'vscode-languageserver-types'
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import useFetchData from '~/composables/useFetchData'
import useFetchFiles from '~/composables/useFetchFiles'
// @ts-ignore
const { fetchData } = useFetchData()
// @ts-ignore
const { fetchFiles } = useFetchFiles()

export async function getLot(orderId: number) {
  const res = await fetchData('api/lots/' + orderId, {
    method: 'GET',
  })
  return res
}

export async function postLot(lot: any) {
  const res = await fetchData('api/lots/', {
    method: 'POST',
    body: lot,
  })
  return res
}

export async function postImages(files: any, lotId: number) {
  const res = await fetchFiles('api/lots/' + lotId + '/files', {
    method: 'POST',
    body: files,
  })
  return res
}

export async function getImages(lotId: number) {
  const res = await fetchData('api/lots/' + lotId + '/files/links', {
    method: 'GET',
  })
  return res
}

export async function deleteImage(lotId: number, imageName: string) {
  const res = await fetchData('files/lotImages/' + lotId + '/' + imageName, {
    method: 'DELETE',
  })
  return res
}

export async function deleteLot(lotId: number) {
  const res = await fetchData('api/lots?Id=' + lotId, {
    method: 'DELETE',
  })
  return res
}

export async function putLot(lot: any) {
  const res = await fetchData('api/lots', {
    method: 'PUT',
    body: lot,
  })
  return res
}

export async function postLotToTelegram(lotId: any) {
  const res = await fetchData('api/bot/sendLot?lotId=' + lotId, {
    method: 'POST',
  })
  return res
}

export async function getLotFeedbacks(lotId: number) {
  const res = await fetchData('api/lots/' + lotId + '/feedbacks', {
    method: 'GET',
  })
  return res
}

export async function assignInvestorTolot(lotId: any, investorId: any) {
  const res = await fetchData('api/lots/' + lotId + '/investor/' + investorId, {
    method: 'POST',
  })
  return res
}
