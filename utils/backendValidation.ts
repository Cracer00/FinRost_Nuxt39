export async function highlightElementByValidation(errors: any) {
  for (const field in errors) {
    const element = document.getElementById(field)
    if (element) {
      // TODO: Привязать параметры валидатора на фронте
      element.classList.add('error-highlight');
    }
  }
}

// * Очищает класс ошибки пришедшей с инпута. Действует при вводе в инпут
export async function clearBackendErrorClass(inputElement: any) {
  if (
    inputElement &&
    inputElement.classList &&
    inputElement.classList.contains('error-highlight')
  ) {
    inputElement.classList.remove('error-highlight');
  }
}

export async function highlightValidationError(
  fieldName: string,
  duration: number
) {
  const fieldErrorElement = document.getElementById(fieldName + '-error');
  if (fieldErrorElement) {
    fieldErrorElement.classList.add('error-highlight');
    setTimeout(() => {
      fieldErrorElement.classList.remove('error-highlight');
    }, duration);
  }
}
