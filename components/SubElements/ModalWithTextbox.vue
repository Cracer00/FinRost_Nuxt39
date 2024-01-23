<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 border-none button-cursor"
                @click="closeModalSelf"
              >
                <CloseIcon />
              </div>
              <DialogTitle
                as="h3"
                class="text-lg-h3 font-medium leading-6 text-gray-900 mb-4"
              >
                {{ dialogTitle }}
              </DialogTitle>
              <div class="mt-2 mb-4">
                <p class="text-lg text-gray-900">
                  {{ dialogText }}
                </p>
              </div>
              <textarea class="form-control mb-3" id="feedbackInput" type="text" placeholder="Введите ваш комментарий" name="comment" rows="5" maxlength="200"
                        v-model="textboxText"></textarea><label class="label-clip" for="Feedbackfiles"><i class="bi bi-paperclip"></i></label>
              <div class=" flex justify-content-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-success px-4 py-2 text-sm font-medium text-white hover:bg-success-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="executeCloseModal"
                >
                  <IconsConfirm2Icon class="text-white mr-1 align-baseline" style="height: 22px; width: 22px" /> Отправить
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import Confirm2Icon from "~/components/Icons/Confirm2Icon.vue";
import CloseIcon from "~/components/Icons/CloseIcon.vue";
</script>

<script>
import { postFeedback } from "~/composables/useFetchOffices";
import { toast } from "vue3-toastify";
import { getLoggedUserInfo, getUser } from "~/composables/useFetchUser";

export default {
  props: {
    dialogTitle: {
      type: String,
      required: true,
    },
    dialogText: {
      type: String,
      required: true,
    },
    dialogTextboxText: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
    activateFunction: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      textboxText: '',
      userInfo: {}
    }
  },
  methods: {
    async sendFeedback() {
      // Отправляем фидбек на сервер
      this.isLoading = true
      await this.getProfileInfo()
      const feedbackBody = {
        id: 0,
        message: this.textboxText,
        userName: this.userInfo.data.fullName,
        checked: false,
        creationDate: new Date(),
        files: [],
      }
      const res = await postFeedback(feedbackBody)
      if (res.success) {
        toast.success('Фидбэк отправлен!')
      } else {
        toast.error('Ошибка при отправке фидбэка')
      }
      this.isLoading = false
    },
    closeModalSelf() {
      this.closeModal();
    },
    async getProfileInfo() {
      const user = await getLoggedUserInfo()
      this.userInfo = await getUser(user.data.value.id)
    },
    executeCloseModal() {
      this.sendFeedback()
      this.closeModal();
    },
  },
}
</script>

<style scoped>
.button-cursor:hover {
  cursor: pointer;
}
</style>
