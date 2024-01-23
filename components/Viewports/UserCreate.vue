<template>
  <div>
    <div class="container">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="light:card dark:card-dark">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src="/public/icons/avatar.svg"
                    alt="user"
                    class="rounded-circle"
                    width="150"
                    height="150"
                    style="background-color: #467f81"
                  />
                  <div class="mt-3 text-secondary">
                    <h4>{{ user.firstName }} {{ user.lastName }}</h4>
                    <p class="text-center">{{ user.position }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="light:card dark:card-dark mt-3">
              <ul class="list-group list-group-flush">
                <li
                  class="d-flex justify-content-between align-items-center flex-wrap"
                >
                  <div
                    v-if="user.telegram"
                    class="w-100 d-flex align-items-center justify-content-center"
                  >
                    <IconsTelegram
                      class="mr-1"
                      style="width: 32px; height: 32px"
                    />
                    <input v-model="user.telegram" type="text" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <div
              class="light:card dark:card-dark mb-3 light:text-dark dark:text-white"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Фамилия</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="LastName"
                      v-model="user.lastName"
                      type="text"
                      class="w-50 el-input-main-dark"
                      :class="{ 'is-invalid': v$.user.lastName.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.user.lastName.$touch"
                    />
                    <div v-if="v$.user.lastName.$error" class="is-invalid-text">
                      {{ v$.$errors[0].$message }}
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Имя</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="FirstName"
                      v-model="user.firstName"
                      type="text"
                      class="w-50"
                      :class="{ 'is-invalid': v$.user.firstName.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.user.firstName.$touch"
                    />
                    <div
                      v-if="v$.user.firstName.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Отчество</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Patronymic"
                      v-model="user.patronymic"
                      type="text"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Должность</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-autocomplete
                      id="Position"
                      v-model="user.position"
                      :fetch-suggestions="filteredPositions"
                      clearable
                      class="inline-input w-50"
                      placeholder=""
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Логин</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Login"
                      v-model="user.login"
                      type="text"
                      class="w-50"
                      :class="{ 'is-invalid': v$.user.login.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.user.login.$touch"
                    />
                    <div v-if="v$.user.login.$error" class="is-invalid-text">
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Пароль</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Password"
                      v-model="user.password"
                      type="password"
                      class="w-50"
                      :class="{ 'is-invalid': v$.user.password.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.user.password.$touch"
                    />
                    <div v-if="v$.user.password.$error" class="is-invalid-text">
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Email"
                      v-model="user.email"
                      type="text"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Телефон</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="NumberPhone"
                      v-model="user.numberPhone"
                      type="text"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Дата рождения</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-date-picker
                      id="Birthdate"
                      v-model="formattedBirthDate"
                      class="w-50"
                      format="DD.MM.YYYY"
                      type="date"
                      :class="{ 'is-invalid': v$.user.birthdate.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.user.birthdate.$touch"
                    />
                    <div
                      v-if="v$.user.birthdate.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-12 d-flex justify-content-end">
                    <el-button
                      :loading="isLoading"
                      color="#1d83ee"
                      class="btn-custom btn-main d-flex align-items-center"
                      @click.prevent="createUser(user)"
                    >
                      <IconsSaveIcon class="mr-1" />Создать пользователя
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row gutters-sm">
              <div class="col-sm-6 mb-3">
                <div class="light:card dark:card-dark h-100">
                  <div class="card-body user-select-none">
                    <h6 class="d-flex align-items-center mb-3">Статусы:</h6>
                    <span
                      class="mr-1 cursor-pointer"
                      title="Нажмите, чтобы изменить статус"
                      @click="user.enabled = !user.enabled"
                    >
                      <span v-if="user.enabled" class="badge bg-success"
                        >Активен</span
                      >
                      <span v-if="!user.enabled" class="badge bg-dark"
                        >Не активен</span
                      >
                    </span>
                    <span
                      class="mr-1 cursor-pointer"
                      title="Нажмите, чтобы изменить статус"
                      @click="user.blocked = !user.blocked"
                    >
                      <span v-if="user.blocked" class="badge bg-danger"
                        >Заблокирован</span
                      >
                      <span v-if="!user.blocked" class="badge bg-success"
                        >Не заблокирован</span
                      >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  alpha,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { inject } from 'vue'
import { postUser } from '~/composables/useFetchUser'
import IconsTelegram from '~/components/Icons/IconsTelegram.vue'
import {
  highlightElementByValidation,
  clearBackendErrorClass,
} from '~/utils/backendValidation'
import { showModal, toast } from '~/utils/alerts'

export default {
  name: 'UserCreate',
  components: { IconsTelegram },
  setup() {
    const alphaRu = helpers.regex(/^[a-zA-Zа-яА-Я]*$/)
    const dataPositions = inject('dataPositions')
    return { v$: useVuelidate(), alphaRu, dataPositions }
  },
  data() {
    return {
      isLoading: false,
      user: {
        firstName: '',
        lastName: '',
        patronymic: '',
        login: '',
        password: '',
        position: '',
        birthdate: new Date(),
        blocked: false,
        enabled: true,
      },
    }
  },
  validations() {
    return {
      user: {
        firstName: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          alphaRu: helpers.withMessage(
            'Поле должно содержать только буквы.',
            this.alphaRu
          ),
        },
        lastName: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          alphaRu: helpers.withMessage(
            'Поле должно содержать только буквы.',
            this.alphaRu
          ),
        },
        login: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
        },
        password: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
        },
        birthdate: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
        },
      },
    }
  },
  computed: {
    // * Отфильтрованные значения для autocomplete инпута
    filteredPositions() {
      const searchText = this.user.position
        ? this.user.position.toLowerCase()
        : ''
      if (this.dataPositions && Array.isArray(this.dataPositions)) {
        return this.dataPositions.filter((position) =>
          position.value.toLowerCase().includes(searchText)
        )
      }
      return []
    },
    formattedBirthDate: {
      get() {
        const dateString = dayjs(this.user.birthdate, 'YYYY-MM-DD').format(
          'YYYY-MM-DD'
        )
        return dateString
      },
      set(newValue) {
        // Преобразование нового значения в соответствии с ожидаемым форматом
        const formattedDate = dayjs(newValue).format('YYYY-MM-DD')
        // Обновление значения переменной user.birthdate
        this.user.birthdate = formattedDate
      },
    },
  },
  methods: {
    clearBackendErrorClass,
    // * Создание нового пользователя
    async createUser(user) {
      // Проверка валидации
      await this.v$.$validate()

      if (this.v$.$error) {
        console.log('Валидация не пройдена')
        return
      }
      // Продолжение
      this.isLoading = true
      try {
        const res = await postUser(user)
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', 'Ошибка валидации')
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          toast('Пользователь успешно создан', 'success')
          setTimeout(function () {
            navigateTo('/users/')
          }, 1000)
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/custom';
</style>

<style scoped>
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-dark {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #181f25;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*='col-'] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}

.is-invalid {
  border: 1px solid red;
}

.is-invalid-text {
  color: red;
}
</style>
