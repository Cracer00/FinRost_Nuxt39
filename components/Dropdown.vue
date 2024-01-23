<template>
  <div class="relative inline-block text-left text-gray-800">
    <div>
      <div
        id="options-menu"
        class="flex items-center justify-center cursor-pointer pr-5"
        style="max-width: 250px;"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img @click="smartCloseMenu" class="w-9 h-9 rounded-full" src="/public/icons/avatar.svg" alt="" />
        <span @click="smartCloseMenu" class="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >{{ user.firstName }} {{ user.lastName }}</span
        >
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <OnClickOutside
        v-if="isMenuOpen"
        @trigger="closeMenu"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg text-sm overflow-hidden z-20"
      >
        <div
          class="rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div>
            <div
              class="bg-[#484f56] p-4 justify-content-center align-items-center"
            >
              <div class="w-full flex flex-col items-center">
                <img
                  class="h-16 w-16 rounded-full mb-2"
                  src="/public/icons/avatar.svg"
                  alt="avatar"
                />
                <NuxtLink
                  to="/profile"
                  class="text-decoration-none"
                  @click="closeMenu"
                >
                  <button
                    class="flex items-center justify-between w-full focus:outline-none"
                  >
                    <p class="font-semibold text-base text-white">
                      {{ user.firstName }} {{ user.lastName }}
                    </p>
                  </button>
                </NuxtLink>
                <hr class="hr text-white" />
<!--                <p-->
<!--                  class="flex cursor-pointer text-white items-center"-->
<!--                  @click="openFeedbackModal()"-->
<!--                >-->
<!--                  <TalkIcon class="text-white mr-2" />-->
<!--                  <span>Обратная связь</span>-->
<!--                </p>-->
                <p
                  class="flex cursor-pointer text-white items-center"
                  @click="profileLogout()"
                >
                  <LogoutIcon class="text-white mr-2" />
                  <span>Выход</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </OnClickOutside>
    </transition>
    <SubElementsModalWithTextbox
      :is-open="feedbackModal.isOpen"
      :dialog-title="feedbackModal.title"
      :dialog-text="feedbackModal.text"
      :dialog-textbox-text="feedbackModal.textboxText"
      :close-modal="closeDeleteModal"
    />
  </div>
</template>

<script>
import nuxtStorage from 'nuxt-storage'
import { postFeedback } from "~/composables/useFetchOffices";
import { toast } from "vue3-toastify";
import FeedbackIcon from "~/components/Icons/FeedbackIcon.vue";
import LogoutIcon from "~/components/Icons/LogoutIcon.vue";
import TalkIcon from "~/components/Icons/TalkIcon.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import CloseIcon from "~/components/Icons/CloseIcon.vue";
import DownIcon from "~/components/Icons/DownIcon.vue";
import { OnClickOutside } from '@vueuse/components'

export default {
  name: 'Dropdown',
  components: { DownIcon, MenuItem, CloseIcon, MenuItems, Menu, MenuButton, TalkIcon, LogoutIcon, FeedbackIcon, OnClickOutside },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      label: '',
      feedbackModal: {
        isOpen: false,
        title: '',
        text: '',
        textboxText: '',
      },
    }
  },
  mounted() {

  },
  methods: {
    profileLogout() {
      this.closeMenu()
      nuxtStorage.localStorage.removeItem('token')
      navigateTo('/login')
    },
    closeDeleteModal() {
      this.feedbackModal.isOpen = false
    },
    openFeedbackModal() {
      this.closeMenu()
      this.feedbackModal.text =
        'Введите текст замечания или предложения.\n' +
        'Допускается вложение файлов и вставка скриншотов с буфера обмена'
      this.feedbackModal.title = 'Замечания и предложения'
      this.feedbackModal.isOpen = true
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    smartCloseMenu() {
      if (this.isMenuOpen) {
        this.closeMenu();
      } else {
        this.isMenuOpen = true;
      }
    },
  },
}
</script>

<style scoped>
.cursor-pointer:hover {
  cursor: pointer;
}
</style>
