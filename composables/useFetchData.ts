import { showModal, toast } from "~/utils/alerts";
// @ts-ignore
import nuxtStorage from 'nuxt-storage'
import { baseUrl } from '~/utils/config';

// @ts-ignore
export default defineNuxtPlugin(() => {
  //const baseUrl = 'http://localhost:4444/'
  const responseTypeList = [
    'SUCCESS', // Запрос успешно выполнен
    'SIMPLE_ERROR', // Обычная ошибка
    'VALIDATION_ERROR', // Ошибка валидации
    'UNKNOWN_ERROR', // Ошибка с неизвестным форматом
    'NO_KEYS_ERROR', // Ошибка без ключей
  ];

  const fetchData = async (url: string, options = {}, dataType = 'application/json') => {
    const requestOptions: any = {
      headers: {
        token: nuxtStorage.localStorage.getData('token') || '',
        'Content-Type': dataType.toString(),
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Headers": '*',
        "Access-Control-Expose-Headers": '*',
      },
      ...options,
    }
    if (requestOptions.body) {
      requestOptions.body = JSON.stringify(requestOptions.body)
    }
    try {
      // @ts-ignore
      const response = await useFetch(baseUrl + url, requestOptions)
      const { data, error } = response
      let returnDataObject = {}
      let responseType = ''
      if (error.value !== null) {
        // ! Если ошибка есть
        // TODO: Получить статус код, выявить протухший токен, удалить токен из локалсторадж
        const errorStatusCode = error.value.statusCode
        if (errorStatusCode === 401) {
          nuxtStorage.localStorage.removeItem('token')
          navigateTo('/login')
        }
        if (
          typeof error.value.data.errors === 'object' &&
          error.value.data.errors !== null
        ) {
          // Получаем все ключи из объекта "errors"
          const errorKeys = Object.keys(error.value.data.errors);
          if (errorKeys.length > 0) {
            // ? Формат с ключами (Ошибки валидации)
            // Выводим все ошибки
            responseType = responseTypeList[2]; // VALIDATION_ERROR
            errorKeys.forEach((key) => {
              // @ts-ignore
              const errorMessages = error.value.data.errors[key];
              errorMessages.forEach((errorMessage: any) => {
                toast(errorMessage, 'warn')
              });
              // Формируем обьект для возврата
              returnDataObject = {
                type: responseType,
                data: [],
                errors: error.value?.data.errors,
                message: errorMessages,
              };
            });
          }
        }
        else if (error.value?.data?.message) {
          // ? Пустой объект (Простая ошибка)
          console.log('Простая ошибка');
          responseType = responseTypeList[1]; // SIMPLE_ERROR
          const errorMessage = error.value.data.message;
          returnDataObject = {
            type: responseType,
            data: [],
            errors: [],
            message: error.value.data.message,
          };
          toast(errorMessage, 'error')
          showModal(errorMessage, 'error')
        }
        return returnDataObject;
      } else {
        // * Если запрос успешен
        responseType = responseTypeList[0]; // SUCCESS
        // @ts-ignore
        const statusCode = response.status;
        return {
          type: responseType,
          data,
          errors: [],
          message: '',
        }
      }
    } catch (e) {
      // TODO: Костыль
      //if (
        // @ts-ignore
      //  e.name === 'TypeError' &&
        // @ts-ignore
      //  e.message === "Cannot read properties of undefined (reading 'errors')"
      // ) {
      //  nuxtStorage.localStorage.removeItem('token')
      // }
      // ! Ошибка выполнения
      toast('Ошибка сервера\nобратитесь\nк администратору', 'error')
      return {
        data: [],
        errors: [],
        message: 'Ошибка!',
        success: false,
      }
    }
  }
  return {
    fetchData,
  }
})
