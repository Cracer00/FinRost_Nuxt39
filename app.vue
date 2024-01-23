<script setup>
import { useState, useAppConfig, useHead } from 'nuxt/app'
import { AppSetup } from './utils/app'
import { provide } from "vue";
import signalr from '~/signalr.js'

AppSetup()
const theme = useState('theme.current')
const app = useAppConfig()

useHead({
  title: app.name,
  titleTemplate: 'Финрост',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: '',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>

<script>
import { ElConfigProvider } from 'element-plus'
import 'dayjs/locale/ru.js'
import { createPinia } from 'pinia'
import ruRU from 'element-plus/dist/locale/ru.mjs'
import { getLoggedUserNotifications } from '~/composables/useFetchUser'
import nuxtStorage from "nuxt-storage";

const pinia = createPinia()

export default {
  components: {
    ElConfigProvider,
  },
  setup() {
    pinia.use()
    const store = pinia.useStore()
    const notifications = computed(() => store.userNotifications)

    return {
      notifications,
    }
  },
  data() {
    return {
      locale: ruRU,
      notificationsList: [],
    }
  },
  computed: {

  },
  async mounted() {
    const token = nuxtStorage.localStorage.getData('token')
    if (token) {
      await this.getNotifications()
    } else {
      navigateTo('/login')
    }
  },
  methods: {
    // * Получаем все уведомления юзера
    async getNotifications() {
      this.isLoading = true
      try {
        const res = await getLoggedUserNotifications()
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          this.notifications = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
  },
}
</script>

<template>
  <el-config-provider :locale="locale">
  <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-100 dark:bg-[#181f25] overscroll-y-none"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" color="false" />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
  </el-config-provider>
</template>
