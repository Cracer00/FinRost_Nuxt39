// @ts-ignore
import nuxtStorage from 'nuxt-storage'
// @ts-ignore
import { getLoggedUserInfo, getLoggedUserNotifications } from '~/composables/useFetchUser'

export default defineNuxtRouteMiddleware(async(to, from) => {
  const token = nuxtStorage.localStorage.getData('token')
  let user = {}
  let notifications = {}
  try {
    //notifications = await getAllUserNotifications();
  } catch (error) {
    console.error(error);
  }
  nuxtStorage.localStorage.setData('userNotifications', notifications, 365, 'd'); // TODO: Заменить на provide

  const securedPaths = [
    '/logs',
  ]

  // // * Функция получения уведомлений для юзера
  // async function getAllUserNotifications(): Promise<any> {
  //   try {
  //     const res = await getLoggedUserNotifications();
  //   } catch (error) {
  //     // ! Если ошибка
  //     if (res.type !== 'SUCCESS') {
  //       // ? Обычная ошибка
  //       if (res.type === 'SIMPLE_ERROR') {
  //         console.error('Ошибка:', res.message)
  //       }
  //       // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
  //       else if (res.type === 'VALIDATION_ERROR') {
  //         console.error('\x1B[36m%s\x1B[0m', res.errors)
  //       }
  //       // ? Неизвестная ошибка
  //       else if (res.type === 'UNKNOWN_ERROR') {
  //         console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
  //       }
  //     } // * Если запрос успешно выполнен
  //     else {
  //       this.logs = res.data
  //     }
  //     return {};
  //   }
  // }

  // @ts-ignore
  function pathIsAvailableForUser(): Promise<boolean> {
    return getLoggedUserInfo()
      .then((response) => {
        const user = response.data.value;
        if (user.id === 1 || user.id === 4) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        if (error.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (error.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', error.message);
            return false;
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (error.type === 'VALIDATION_ERROR') {
            console.error('\x1B[36m%s\x1B[0m', error.errors);
            return false;
          }
          // ? Неизвестная ошибка
          else if (error.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка');
            return false;
          }
        }
        return false;
      });
  }

  if (token) {
    if (to.fullPath === '/login') {
      return navigateTo('/', { redirectCode: 403 })
    } else if (securedPaths.includes(to.fullPath)) {
      pathIsAvailableForUser()
        .then((isAvailable) => {
          if (!isAvailable) {
            navigateTo('/error', { redirectCode: 401 })
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } else if (to.fullPath !== '/login') {
    return navigateTo('/login', { redirectCode: 401 })
  }
})
