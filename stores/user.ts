import { defineStore } from 'pinia'

type Notification = {
  message: string
}

type NotificationList = Notification[]

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    isAuth: false,
    notifications: [] as NotificationList,
    colorMode: '',
  }),
  getters: {
    getUser: (state) => state.user,
    // @ts-ignore
    getUserId: (state) => state.user.id,
    getNotifications: (state) => state.notifications,
    getColorMode: (state) => state.colorMode,
    getIsAuth: (state) => state.isAuth,
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setNotificationList(notifications: NotificationList) {
      this.notifications = notifications
    },
    addNotificationToList(notification: Notification) {
      this.notifications.push(notification)
    },
    setColorMode(colorMode: string) {
      this.colorMode = colorMode
    },
    setIsAuth(auth: boolean) {
      this.isAuth = auth
    },
  },
})
