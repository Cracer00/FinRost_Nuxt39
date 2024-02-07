<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="container-wrapper">
      <div class="row left-main-menu pl-2">
        <div class="col-md-2 p-4 border-right">
          <!-- Место под боковое меню -->
          <div class="logo flex flex-row mb-9 justify-center align-items-center">
            <img src="/src/finrost-logo.png" alt="Финрост лого" style="min-width: 110px; max-width: 150px; max-height: 150px; min-height: 110px">
          </div>
          <ul class="nav nav-pills flex-column">
            <LayoutMainMenu />
          </ul>
        </div>
        <div class="col-md-10">
          <div class="row border-bottom">
            <div class="col-md-8 d-flex justify-content-start p-3">
              <!-- Поиск
              <el-input
                ref="searchInput"
                v-model="searchValue"
                type="search"
                id="searchInput"
                class="w-50"
              />
              <button type="button" class="btn-custom bg-main search-button" @click="handleSearch">
                <IconSearch />
              </button>-->
            </div>
            <div class="col-md-4 d-flex justify-content-end p-3">
              <!-- Кнопки профиля -->
              <div
                class="btn-group btn-group-sm justify-content-center align-items-center"
                role="group"
              >
                <!--<div class="mr-6">
                  <el-badge :value="100" :max="10" type="info">
                    <el-button circle><IconsEmail /></el-button>
                  </el-badge>
                </div>-->
                <!--<div class="mr-5"><ThemeSwitcher /></div>-->
                <div class="mr-5 pb-1">
                  <el-badge
                    :hidden="uncheckedNotificationsCount === 0"
                    :value="uncheckedNotificationsCount"
                    class="item"
                    type="primary"
                  >
                    <el-button
                      id="notifyButton"
                      type="text"
                      @click="notifyDrawer = true; checkAllNotifications(3000)"
                    ><IconsNotificationIcon style="width: 24px; height: 24px;" :class="{ 'connected-icon': signalrStatus === 'connected', 'disconnected-icon': signalrStatus === 'disconnected' }"
                    /></el-button>
                  </el-badge>
                  <el-drawer
                    v-model="notifyDrawer"
                    title="Уведомления"
                    :with-header="true"
                    size="440px"
                    append-to-body
                  >
                    <!-- Вывод уведомлений -->
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-md-12">
                          <div v-if="notifications.length > 0">
                            <div v-for="notify in notifications">
                              <div class="notify-item" :class="{ 'unchecked-notify': !notify.checked, 'checked-notify': notify.checked}">
                                <span>{{ formatDate(notify.creationDate) }}</span>
                                <h3>{{ notify.title }}</h3>
                                <h6>{{ notify.description }}</h6>
                              </div>
                              <hr/>
                            </div>
                          </div>
                          <div v-else class="text-center">
                            <h4>Нет уведомлений</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-drawer>
                </div>
                <div>
                  <Dropdown :user="user" />
                </div>
              </div>
            </div>
          </div>
          <div class="row dark:bg-[#10151a] h-full">
            <!-- Место под страницу -->
            <slot />
          </div>
        </div>
      </div>
      <!--      <PageFooter/>-->
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>

<script>
import IconSearch from '~/components/Icons/IconSearch.vue'
import 'dayjs/locale/ru'
import { getLoggedUserInfo, getLoggedUserNotifications, checkAllLoggedUserNotifications} from '~/composables/useFetchUser'
import nuxtStorage from 'nuxt-storage'
import dayjs from "dayjs";
import { useUserStore } from '~/stores/user'
import { useNotificationsStore } from '~/stores/notifications'
import signalr from '~/signalr.js'
import { inject, provide, ref } from 'vue'

const searchValue = ref('')
const dataPositions = ref([
  { value: 'Frontend Developer' },
  { value: 'Backend Developer' },
  { value: 'Инвестор' },
  { value: 'Администратор' },
])

provide('searchValue', searchValue)
provide('dataPositions', dataPositions)

const userStore = useUserStore()

export default {
  components: { IconSearch },
  filters: {

  },
  provide() {
    return {
      userStore: useUserStore(),
      notificationStore: useNotificationsStore(),
      loggedUser: computed(() => this.user),
    }
  },
  setup() {
    const test = inject('testObj')
    return { test }
  },
  data() {
    return {
      user: {},
      notifyDrawer: false,
      notifications: [],
      signalrMessage: "",
      signalrStatus: 'disconnected',
      srtest: '',
      isHubConnectionStarted: false,
    }
  },
  computed: {
    uncheckedNotificationsCount() {
      return this.notifications.filter((obj) => !obj.checked).length
    },
  },
  created() {

  },
  async mounted() {
    await this.getNotifications()

    // Запуск SignalR
    const startHubConnection = () => {
      signalr.start({ reconnect: true }).then(() => {
        this.signalrStatus = 'connected';
        this.isHubConnectionStarted = true;
      }).catch(() => {
        this.signalrStatus = 'disconnected';
        this.isHubConnectionStarted = false;
        // Переподключение через некоторое время
          setTimeout(() => {
            if (!this.isHubConnectionStarted) {
              startHubConnection()
            }
          }, 10000) // Измените задержку на значение, которое вам нужно
      });
    };

    signalr.on('Notify', async (message) => {
      this.message = message
      const userId = userStore.getUserId;
      if (message === userId) {
        await this.getNotifications()
        toast('Получено новое уведомление!', 'info')
      }
    })

    signalr.onreconnecting(() => {
      this.signalrStatus = 'disconnected';
    })

    signalr.onreconnected(() => {
      this.signalrStatus = 'connected';
    })

    startHubConnection();

    // Обработка события onclose
    signalr.onclose(() => {
      this.signalrStatus = 'close';
      this.isHubConnectionStarted = false;
      // Переподключение через некоторое время
      setTimeout(() => {
        if (!this.isHubConnectionStarted) {
          startHubConnection();
        }
      }, 5000); // Задержка реконнекта
    });

    await this.getProfileInfo()
  },
  beforeUnmount() {
    signalr.stop();
  },
  methods: {
    // * Отправить сообщение хабу
    sendMessageToHub() {
      signalr.invoke('SendMessage', this.message)
    },
    // * Устанавливаем формат даты в уведомлениях
    formatDate(value) {
      return dayjs(value).format('DD.MM.YYYY в HH:mm')
    },
    // * Метод для проигрывания звукового уведомления
    playNotificationSound() {
      const pathToNotifyFile = '~/public/audio/notify1.mp3';
      const audio = new Audio(pathToNotifyFile);
      audio.play();
    },
    // * Получаем информацию о профиле
    async getProfileInfo() {
      this.isLoading = true
      try {
        const res = await getLoggedUserInfo()
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
          this.user = res.data
          userStore.setIsAuth(true)
          userStore.setUser(this.user)
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Отмечаем все уведомления прочитанными
    async checkAllNotifications(interval) {
      await this.getNotifications();
      setTimeout(async () => {
        try {
          const res = await checkAllLoggedUserNotifications();
          // ! Если ошибка
          if (res.type !== 'SUCCESS') {
            // ? Обычная ошибка
            if (res.type === 'SIMPLE_ERROR') {
              console.error('Ошибка:', res.message);
            }
            // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
            else if (res.type === 'VALIDATION_ERROR') {
              await highlightElementByValidation(res.errors);
              console.error('\x1B[36m%s\x1B[0m', res.errors);
            }
            // ? Неизвестная ошибка
            else if (res.type === 'UNKNOWN_ERROR') {
              console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка');
            }
          } // * Если запрос успешно выполнен
          else {
            this.notifications = this.notifications.map((obj) => {
              if (obj.checked === false) {
                obj.checked = true;
              }
              return obj;
            });
          }
        } catch (e) {
          console.error('Cth_Error: ', e);
        }
      }, interval);
    },
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

<style scoped>
.border-right {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  height: auto;
}

.search-button {
}

html,
body {
  height: 100%;
  margin: 0;
}

.messages-badge {
  margin-top: 10px;
  margin-right: 40px;
  border: none;
}

.container-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.row {
  margin-bottom: 0;
}

.PageFooter {
  margin-top: auto;
}

.unchecked-notify {
  background-color: #e0f0ff;
}

.checked-notify {
  background-color: #ffffff;
}

.notify-item {
  width: 100%;
  padding: 10px;
  transition: background-color 1s ease;
}

.connected-icon {
  color: #1d83ee;
}

.disconnected-icon {
  color: #dc5d5d;
}
</style>
