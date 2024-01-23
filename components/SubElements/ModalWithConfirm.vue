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
        <div class="fixed inset-0 bg-opacity-25"/>
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
              class="bg-global w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-lg transition-all opacity-100"
            >
              <DialogTitle
                as="h3"
                class="text-lg-h3 font-medium leading-6 mb-4"
              >
                <span v-if="dialogType === 'warn'" class="d-flex align-items-center text-warning dark:text-warning-dark"><WarningIcon class="mr-1" style="height: 22px; width: 22px;"/>{{ dialogTitle }}</span>
                <span v-else-if="dialogType === 'info' || dialogType === 'confirmation'" class="d-flex align-items-center text-white"><InfoIcon class="mr-1" style="height: 22px; width: 22px"/>{{ dialogTitle }}</span>
                <span v-else-if="dialogType === 'error'" class="d-flex align-items-center text-error"><ErrorIcon class="mr-1" style="height: 22px; width: 22px"/>{{ dialogTitle }}</span>
                <span v-else-if="dialogType === 'success'" class="d-flex align-items-center text-green"><InfoIcon class="mr-1" style="height: 22px; width: 22px"/>{{ dialogTitle }}</span>
              </DialogTitle>
              <div class="mt-2">
                <p class="text-lg text-white dark:text-white">
                  {{ dialogText }}
                </p>
              </div>

              <div class="mt-4 flex justify-content-end">
                <button
                  v-if="
                    dialogType === 'success' ||
                    dialogType === 'info' ||
                    dialogType === 'confirmation'
                  "
                  type="button"
                  class="mr-1 inline-flex justify-center rounded-md border-transparent btn-custom btn-main px-4 py-2 text-sm font-medium text-white hover:bg-success-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="executeActivateFunction"
                >
                  Подтвердить
                </button>
                <button
                  v-if="
                    dialogType === 'success' ||
                    dialogType === 'info' ||
                    dialogType === 'confirmation'
                  "
                  type="button"
                  class="inline-flex justify-center rounded-md border-transparent btn-custom btn-danger px-4 py-2 text-sm font-medium text-white hover:bg-success-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="executeCloseModal"
                >
                  Отмена
                </button>
                <button
                  v-else-if="dialogType === 'warn' || dialogType === 'error'"
                  type="button"
                  class="mr-1 inline-flex justify-center rounded-md border-transparent btn-custom btn-main px-4 py-2 text-sm font-medium text-white hover:bg-success-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="executeActivateFunction"
                >
                  Подтвердить
                </button>
                <button
                  v-if="dialogType === 'warn' || dialogType === 'error'"
                  type="button"
                  class="inline-flex justify-center rounded-md border-transparent btn-custom btn-danger px-4 py-2 text-sm font-medium text-white hover:bg-success-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="executeCloseModal"
                >
                  Отмена
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
import WarningIcon from "~/components/Icons/WarningIcon.vue";
import InfoIcon from "~/components/Icons/InfoIcon.vue";
import SadFaceIcon from "~/components/Icons/SadFaceIcon.vue";
import ErrorIcon from "~/components/Icons/ErrorIcon.vue";
</script>

<script>
import { availableThemes } from '~/utils/theme'
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
    dialogType: {
      type: String,
      required: false,
      default: 'info',
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
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    executeActivateFunction() {
      this.activateFunction()
      this.closeModal()
    },
    executeCloseModal() {
      this.closeModal()
    },
  },
  computed: {
    isDarkTheme() {
      availableThemes.forEach((theme) => {
        return theme.key === 'dark'
      })
    }
  }
}
</script>
