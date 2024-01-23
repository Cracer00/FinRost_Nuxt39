import { defineStore } from 'pinia';
import { getLoggedUserNotifications } from '~/composables/useFetchUser';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    userNotifications: null,
  }),
  actions: {
    async getAllUserNotifications(): Promise<void> {
      try {
        const res = await getLoggedUserNotifications();
        this.userNotifications = res.data.value;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
