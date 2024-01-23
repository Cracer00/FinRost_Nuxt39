<script setup>
import { useRouter } from 'vue-router'
</script>

<script>
import { useUserStore } from '~/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import useFetchData from '~/composables/useFetchData'
import {
  getLoggedUserInfo,
  getLoggedUserPhoto,
} from '~/composables/useFetchUser'
import { highlightElementByValidation, highlightValidationError } from "~/utils/backendValidation";
import App from "~/app.vue";

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const userStore = useUserStore()
const router = useRouter()

definePageMeta({
  layout: 'login',
})
useHead(() => ({
  title: 'Вход на сайт',
  meta: [
    {
      name: 'Авторизация',
    },
  ],
}))

const { fetchData } = useFetchData()

const formData = reactive({
  login: '',
  password: '',
})

const rules = computed(() => {
  return {
    login: {
      required: helpers.withMessage(
        'Поле "Логин" должно быть заполнено.',
        required
      ),
      minLength: helpers.withMessage(
        'Минимальная длина логина: 3 символа',
        minLength(3)
      ),
    },
    password: {
      required: helpers.withMessage(
        'Поле "Пароль" должно быть заполнено.',
        required
      ),
      minLength: helpers.withMessage(
        'Минимальная длина пароля: 1 символ',
        minLength(1)
      ),
    },
  }
})

const v$ = useVuelidate(rules, formData)

export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      // Форма авторизациии
      authError: {
        show: false,
        title: 'Ошибка входа',
        message: '',
      },
      isLoading: false,
      authStatus: 'idle', // idle - ожидание действий пользователя, fetch - запрос на сервер, progress - обработка запроса
    }
  },
  computed: {
    isFormValid() {
      return !v$.value.$error
    },
  },
  methods: {
    async login() {
      this.isLoading = true
      v$.value.$touch()
      if (!v$.value.$error) { // Если валидация пройдена
        try {
          this.authStatus = 'fetch'
          const res = await fetchData('api/login', {
            method: 'POST',
            body: formData,
          })
          this.authStatus = 'progress'
          // ! Если ошибка
          if (res.type !== 'SUCCESS') {
            // Сбрасываем поля
            formData.login = ''
            formData.password = ''
            this.authStatus = 'idle'
          } // * Если запрос успешно выполнен
          else {
            const token = res.data.value.token
            nuxtStorage.localStorage.setData('token', token, 365, 'd')
            userStore.setIsAuth(true)
            // ? Токен найден, пользователь авторизован - получаем данные профиля
            const userRes = await getLoggedUserInfo()
            userStore.setUser(userRes.data.value)
            navigateTo('/')
            formData.login = ''
            formData.password = ''
            this.authStatus = 'complete'
          }
        } catch (e) {
          console.error('Cth_Error: ', e)
        }
      }
      this.isLoading = false
    },
  },
}
</script>

<template>
  <PageWrapper>
    <PageHeader></PageHeader>
    <PageBody>
      <PageSection>
        <!-- * Форма авторизации -->
        <section class="container mx-auto px-5 py-24 text-gray-400">
          <form
            class="bg-opacity-50 mx-auto mt-10 flex w-full flex-col rounded-lg p-8 shadow-lg md:mt-0 md:w-1/2 lg:w-2/6"
          >
            <div v-if="authStatus === 'fetch' && authStatus !== 'idle'" class="justify-content-center text-center">
              <h2>
                Авторизация, пожалуйста подождите
              </h2>
              <SubElementsLoadingSpinner
                :is-loading="isLoading"
                :is-full-screen="false"
              />
            </div>
            <div v-if="authStatus === 'idle'">
              <h1 class="text-center">Финрост</h1>
              <!-- Логин -->
              <div class="relative mb-4">
                <label for="email" class="text-sm leading-7 light:text-dark"
                  >Логин</label
                >
                <div class="relative">
                  <input
                    id="email"
                    v-model.trim="formData.login"
                    type="text"
                    name="email"
                    placeholder=""
                    :class="{
                      'border-red-500 focus:border-red-500': v$.login.$error,
                      'border-[#42d392] ': !v$.login.$invalid,
                    }"
                    class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 dark:text-white light:text-dark leading-8 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
                    @change="v$.login.$touch"
                  />
                </div>
                <div id="loginError" v-if="v$.login.$error" class="text-red-500 text-xs mt-1">
                  {{ v$.login.$errors[0].$message }}
                </div>
              </div>
              <!-- Пароль -->
              <div class="relative mb-4">
                <label for="password" class="text-sm leading-7 light:text-dark"
                  >Пароль</label
                >
                <div class="relative">
                  <input
                    id="password"
                    v-model.trim="formData.password"
                    type="password"
                    name="password"
                    :class="{
                      'border-red-500 focus:border-red-500': v$.password.$error,
                      'border-[#42d392] ': !v$.password.$invalid,
                    }"
                    class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 dark:text-white light:text-dark outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
                    @change="v$.password.$touch"
                  />
                </div>
                <div id="passwordError" v-if="v$.password.$error" class="text-red-500 text-xs mt-1">
                  {{ v$.password.$errors[0].$message }}
                </div>
              </div>
              <div class="flex justify-content-center">
                <button
                  type="submit"
                  class="rounded border-0 bg-green-500 py-2 px-8 font-bold text-white transition-colors duration-500 hover:bg-green-600 focus:outline-none"
                  @click.prevent="login()"
                >
                  Войти
                </button>
              </div>
            </div>
          </form>
        </section>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
