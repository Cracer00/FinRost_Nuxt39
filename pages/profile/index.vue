<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Мой профиль" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <transition mode="in-out">
          <div>
            <div v-if="!isLoading">
              <div v-if="user" class="container rounded dark:bg-modal-dark mb-5">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="d-flex flex-column align-items-center text-center p-3 py-5"
                    >
                      <img
                        class="rounded-circle mb-2"
                        style="width: 150px; height: 150px"
                        src="public/icons/avatar.svg"
                      />
                      <span class="font-weight-bold mb-1"
                        >{{ user.lastName }} {{ user.firstName }} {{ user.patronymic }}</span
                      >
                      <span class="font-weight-bold mb-1 text-gray-500"
                      >{{ user.position }}</span
                      >
                      <span class="dark:text-white">{{ user.email }}</span>
                      <span class="flex dark:text-white align-items-center">
                        <PhoneIcon />
                        <span>
                          {{ user.numberPhone }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script setup>
import PhoneIcon from "~/components/Icons/PhoneIcon.vue";
</script>

<script>
import { toast } from 'vue3-toastify'
import { getUser, getLoggedUserInfo } from '~/composables/useFetchUser'
import nuxtStorage from "nuxt-storage";

definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: 'Мой профиль',
  meta: [
    {
      name: 'description',
      content: 'Мой профиль',
    },
  ],
}))

export default {
  name: 'Index',
  data() {
    return {
      user: {},
      isLoading: true,
    }
  },
  async mounted() {
    await this.getProfileInfo()
  },
  methods: {
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
body {
  background: rgb(99, 39, 120);
}

.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none;
}

.profile-button:hover {
  background: #682773;
}

.profile-button:focus {
  background: #682773;
  box-shadow: none;
}

.profile-button:active {
  background: #682773;
  box-shadow: none;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 11px;
}

.add-experience:hover {
  background: #ba68c8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #ba68c8;
}
</style>
