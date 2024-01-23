import { integer } from 'vscode-languageserver-types'
import useFetchData from '~/composables/useFetchData'
import nuxtStorage from "nuxt-storage/nuxt-storage";
// @ts-ignore
const { fetchData } = useFetchData()

export async function getLoggedUserInfo() {
  const res = await fetchData('api/profile', {
    method: 'GET',
  })
  return res
}

export async function getLoggedUserPhoto() {
  const res = await fetchData('profile/photo', {
    method: 'GET',
  })
  return res
}

export async function getLoggedUserNotifications() {
  const res = await fetchData('api/profileNotices', {
    method: 'GET',
  })
  return res
}

export async function checkAllLoggedUserNotifications() {
  const res = await fetchData('api/profileNotices/checkAll', {
    method: 'POST',
  })
  return res
}

export async function getAllUsers() {
  const res = await fetchData('api/users', {
    method: 'GET',
  })
  return res
}

export async function getUser(userId: number) {
  const res = await fetchData('api/users/' + userId, {
    method: 'GET',
  })
  return res
}

export async function getArchiUsers(userId: number) {
  const res = await fetchData('api/users/archi' + userId, {
    method: 'GET',
  })
  return res
}

export async function putUser(user: any) {
  const res = await fetchData('api/users/', {
    method: 'PUT',
    body: user,
  })
  return res
}

export async function postUser(user: any) {
  const res = await fetchData('api/users/', {
    method: 'POST',
    body: user,
  })
  return res
}

export async function deleteUser(userId: number) {
  const res = await fetchData('api/users/' + userId, {
    method: 'DELETE',
  })
  return res
}
