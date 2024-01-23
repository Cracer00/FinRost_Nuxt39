import useFetchData from '~/composables/useFetchData'
// @ts-ignore
const { fetchData } = useFetchData()

export async function getAllRelisePlaces() {
  const res = await fetchData('common/relisePlaces', {
    method: 'GET',
  })
  return res
}

export async function getAllArchiUsers() {
  const res = await fetchData('users/archi', {
    method: 'GET',
  })
  return res
}

// ? Методы для групп
export async function getGroup(id: number) {
  const res = await fetchData('groups/' + id, {
    method: 'GET',
  })
  return res
}

export async function putGroup(group: object) {
  const res = await fetchData('groups', {
    method: 'PUT',
    body: group,
  })
  return res
}

export async function postGroup(group: object) {
  const res = await fetchData('groups', {
    method: 'POST',
    body: group,
  })
  return res
}

export async function deleteGroup(id: number) {
  const res = await fetchData('groups/' + id, {
    method: 'DELETE',
  })
  return res
}

export async function getAllGroups() {
  const res = await fetchData('groups', {
    method: 'GET',
  })
  return res
}

// ? Методы для IP адресов
export async function getAllIPs() {
  const res = await fetchData('ip', {
    method: 'GET',
  })
  return res
}

export async function postIP(IP: object) {
  const res = await fetchData('ip', {
    method: 'POST',
    body: IP,
  })
  return res
}

export async function deleteIP(id: number) {
  const res = await fetchData('ip/' + id, {
    method: 'DELETE',
  })
  return res
}

export async function putIP(IP: object) {
  const res = await fetchData('ip', {
    method: 'PUT',
    body: IP,
  })
  return res
}

// ? Методы для работы с фидбэками
export async function getAllFeedbacks() {
  const res = await fetchData('feedback', {
    method: 'GET',
  })
  return res
}

export async function postFeedback(feedback: object) {
  const res = await fetchData('feedback/send', {
    method: 'POST',
    body: feedback,
  })
  return res
}
// * Отмечаем фидбек выполненым
export async function postCheckedFeedback(id: number) {
  const res = await fetchData('feedback/checked/' + id, {
    method: 'POST',
  })
  return res
}
