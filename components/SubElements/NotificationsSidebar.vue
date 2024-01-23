<template>
  <div class="offcanvas offcanvas-end w-10" tabindex="-1" id="offcanvasNotif" data-bs-keyboard="false"
       data-bs-backdrop="true">
    <div class="offcanvas-header">
      <h6 class="offcanvas-title d-none d-sm-block" id="offcanvas">Уведомления</h6>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
    </div>
    <div class="offcanvas-body  px-0">
      <div class="list-group">
        <div class="list-group-item cursor-pointer notification-item" v-for="notification in listNotifications"
             v-on:click="NotifId=notification.Id;"
             v-bind:class="{'bg-warning': !notification.Checked}">
          <div class="d-flex w-100 justify-content-between">
            <a :href="getLink(notification.Title)"
               class="mb-1 col-8 flex-wrap text-break text-black text-decoration-none"
               style="white-space: break-spaces;">{{ notification.Description }}</a>
            <small class="text-muted">{{ notification.CreationDate }}</small>
          </div>
        </div>
        <button class="btn btn-primary align-self-center mt-2 rounded-pill focusOff border-0"
                v-on:click="getMoreNotifications(notifPageCount)" v-if="listNotifications.length>5">Показать еще
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { getAllNotifications } from "~/composables/useFetchNotifications";

export default {
  name: "NotificationsSidebar",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listNotifications: [],
      notificationId: '',
      isLoading: false,
    }
  },
  mounted() {
    //this.getAllNotifications()
  },
  methods: {
    async getAllNotifications() {
      try {
        this.isLoading = true
        const res = await getAllNotifications()
        this.listNotifications = res.data.value
        this.isLoading = false
      } catch (e) {
        toast.error(e)
        this.isLoading = false
      }
    },
  },
};
</script>

<style scoped>

</style>
