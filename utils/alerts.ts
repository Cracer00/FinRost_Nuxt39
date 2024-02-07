import { toast as toastify } from 'vue3-toastify'
import { createApp } from 'vue';
import SubElementsModal from '~/components/SubElements/Modal.vue';
import SubElementsModalWithConfirm from '~/components/SubElements/ModalWithConfirm.vue';

type toastTypes = 'error' | 'warn' | 'info' | 'success'
type toastSpecialTypes = 'error' | 'warn' | 'info' | 'success' | 'confirmation' | 'changePassword'

export function showModal(message: string, type: toastTypes) {
  // @ts-ignore
  let title;
  switch (type) {
    case 'info': {
      title = 'Информация'
      break
    }
    case 'warn': {
      title = 'Предупреждение'
      break
    }
    case 'error': {
      title = 'Ошибка'
      break
    }
    case 'success': {
      title = 'Выполнено'
      break
    }
  }
  const app = createApp(SubElementsModal, {
    isOpen: true, // Установите необходимые значения для свойств модального окна
    dialogTitle: title,
    dialogText: message,
    dialogType: type,
    closeModal: () => {
      // Логика закрытия модального окна
      app.unmount();
    },
    activateFunction: () => {
      // Логика выполнения действия при подтверждении
    }
  });
  app.mount(document.createElement('div'));
}

export function showModalWithConfirm(
  functionOnConfirm: Function,
  options: object,
  message: string,
  type: toastSpecialTypes
) {
  // @ts-ignore
  let title;
  switch (type) {
    case 'info': {
      title = 'Информация'
      break
    }
    case 'warn': {
      title = 'Предупреждение'
      break
    }
    case 'error': {
      title = 'Ошибка'
      break
    }
    case 'success': {
      title = 'Выполнено'
      break
    }
    case 'confirmation': {
      title = 'Подтверждение'
      break
    }
    case 'changePassword': {
      title = 'Изменение пароля'
      break
    }
  }
  const app = createApp(SubElementsModalWithConfirm, {
    isOpen: true, // Установите необходимые значения для свойств модального окна
    dialogTitle: title,
    dialogText: message,
    dialogType: type,
    closeModal: () => {
      // Логика закрытия модального окна
      app.unmount();
    },
    activateFunction: () => {
      functionOnConfirm(options)
    },
  });
  app.mount(document.createElement('div'));
}

export function toast(message: string, type: toastTypes) {
  if (message === null) return
  switch (type) {
    case 'success':
      toastify.success(message)
      break
    case 'error':
      toastify.error(message)
      break
    case 'info':
      toastify.info(message)
      break
    case 'warn':
      toastify.warn(message)
      break
  }
}
