import useFetchData from "~/composables/useFetchData";
// @ts-ignore
const { fetchData } = useFetchData();

export async function getAllNotificationGroups() {
  const res = await fetchData('api/notifyGroups', {
    method: 'GET',
  });
  return res;
}

export async function getNotificationGroupById(groupId: any) {
  const res = await fetchData('api/notifyGroups/' + groupId, {
    method: 'GET',
  });
  return res;
}

export async function putNotificationGroup(group: any) {
  const res = await fetchData('api/notifyGroups/', {
    method: 'PUT',
    body: group,
  });
  return res;
}

export async function postNotificationGroup(group: any) {
  const res = await fetchData('api/notifyGroups/', {
    method: 'POST',
    body: group,
  });
  return res;
}

export async function deleteNotificationGroup(groupId: any) {
  const res = await fetchData('api/notifyGroups?id=' + groupId, {
    method: 'DELETE',
  });
  return res;
}
