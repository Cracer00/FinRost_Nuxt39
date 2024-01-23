<template>
  <!-- Кастомное меню для управления пользователями -->
  <div v-if="usersTableContextMenuShow" ref="usersTableContextMenu" class="dark:custom-context-menu-dark custom-context-menu" :style="{ top: `${menu.Y}px`, left: `${menu.X}px` }">
    <ul>
      <li class="d-flex align-items-center" @click="showUser(menu.selectedUser.id)"><IconsShow class="mr-2"/>Показать</li>
      <li class="d-flex align-items-center" @click="editUser(menu.selectedUser.id)"><IconsEdit class="mr-2"/>Редактировать</li>
      <li class="d-flex align-items-center" @click="deleteUserShowModal(menu.selectedUser)"><IconsTrashIcon class="mr-2"/>Удалить</li>
    </ul>
  </div>
  <div v-if="isLoading" class="justify-content-center text-center">
    <div class="spinner-grow light:text-dark dark:text-white" role="status">
      <span class="sr-only">Загрузка..</span>
    </div>
  </div>
  <div v-if="filteredData.length > 0">
    <table class="table dark:text-white light:text-dark user-select-none">
      <thead>
        <tr class="border-gray">
          <th>ID</th>
          <th></th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody class="border-gray">
        <tr
          v-for="user in filteredData"
          :key="user.id"
          :class="{ 'table-selectedItem-light': user.isSelected }"
          @click="selectUser(user)"
          @dblclick="showUser(user.id)"
          @contextmenu.prevent="showContextMenu($event, user)"
        >
          <td>{{ user.id }}</td>
          <td class="text-center align-middle">
            <span v-if="user.blocked">
              <IconsLocked />
            </span>
          </td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.patronymic }}</td>
          <td>{{ user.position }}</td>
          <td>
            <button
              class="btn-custom btn-main mr-1"
              @click.stop="showUser(user.id)"
            >
              <IconsUserIcon />
            </button>
            <button
              class="btn-custom btn-primary mr-1"
              @click.stop="editUser(user.id)"
            >
              <IconsEdit />
            </button>
            <button
              class="btn-custom btn-danger mr-1"
              @click.stop="deleteUserShowModal(user)"
            >
              <IconsTrashIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Кнопки управления -->
    <div class="d-flex">
      <button
        class="btn-custom btn-main d-flex align-items-center mr-2"
        @click.stop="showCreateUser()"
      >
        <IconsUserAddIcon class="mr-1" /> Добавить пользователя
      </button>
      <button
        v-if="hasSelected"
        class="btn-custom btn-danger d-flex align-items-center"
        @click.stop="deleteSelected()"
      >
        <IconsTrashIcon class="mr-1" /> Удалить выбранных
      </button>
    </div>
  </div>
  <div v-else-if="!isLoading">
    <h3 class="text-center">Нет совпадений.</h3>
    <h3 class="text-center">Очистите строку поиска для возврата.</h3>
  </div>
</template>

<script>
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import { inject, ref } from 'vue'
import { getAllUsers, deleteUser } from '~/composables/useFetchUser'
import { highlightElementByValidation } from '~/utils/backendValidation'
import IconsEdit from '~/components/Icons/IconsEdit.vue'
import { showModalWithConfirm, toast } from '~/utils/alerts'
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'Users',
  components: { IconsEdit },
  setup() {
    // * Кастомное контекстное меню
    let usersTableContextMenuShow = ref(false)
    const usersTableContextMenu = ref(null)
    onClickOutside(usersTableContextMenu, (event) => {
      usersTableContextMenuShow.value = false
    })
    // * Поисковая переменная
    const searchValue = inject('searchValue')
    return { searchValue, usersTableContextMenu, usersTableContextMenuShow }
  },
  data() {
    return {
      menu: {
        X: 0,
        Y: 0,
        selectedUser: null,
      },
      users: {},
      isLoading: false,
    }
  },
  computed: {
    hasSelected() {
      // * Если хотя бы одна строка в таблице выбрана
      return this.filteredData.some((item) => item.isSelected)
    },
    filteredData() {
      // * Обьект users с массивом отфильтрованным по поисковой строке
      if (Object.keys(this.users).length !== 0) { // ? Если users содержит собственные ключи (не пустой)
        if (this.searchValue.trim() === '') {
          return this.users
        } else {
          const search = this.searchValue.toLowerCase()
          return this.users.filter((item) => {
            const fullName = item.fullName.toLowerCase()
            return fullName.includes(search)
          })
        }
      } else { // ? Если users пустой возвращаем пустой обьект
        return {};
      }
    },
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    // ? Метод кастомного контекстного меню
    showContextMenu(event, user) {
      event.preventDefault()
      this.menu.selectedUser = user
      this.menu.X = event.clientX
      this.menu.Y = event.clientY
      this.usersTableContextMenuShow = true
    },
    // ? Удаляем выбранных пользователей
    deleteSelected() {
      this.isLoading = true
      this.filteredData.forEach((item) => {
        if (item.isSelected) {
          // Выполнение удаления для выбранного элемента
          this.deleteUser(item)
        }
      })
      this.isLoading = false
    },
    // ? Переадресация на страницу создания пользователя
    showCreateUser() {
      navigateTo('/users/create')
    },
    // ? Получаем пользователей
    async getUsers() {
      this.isLoading = true
      try {
        const res = await getAllUsers()
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
          this.users = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    deleteUserShowModal(user) {
      this.usersTableContextMenuShow = false
      showModalWithConfirm(
        this.deleteUser,
        user,
        `Вы действительно хотите удалить пользователя ${user.fullName}?`,
        'confirmation'
      )
    },
    async deleteUser(user) {
      this.isLoading = true
      try {
        const res = await deleteUser(user.id)
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
          toast('Пользователь успешно удален', 'success')
          await this.getUsers()
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
      this.usersTableContextMenuShow = false
    },
    async editUser(userId) {
      this.usersTableContextMenuShow = false
      await navigateTo('/users/' + userId + '/edit')
    },
    selectUser(user) {
      user.isSelected = !user.isSelected
    },
    async showUser(userId) {
      this.usersTableContextMenuShow = false
      await navigateTo('/users/' + userId)
    },
  },
}
</script>

<style scoped>
.custom-context-menu {
  color: #343a40;
  position: fixed;
  z-index: 9999;
  background-color: white;
  border: 1px solid #ccc;
  padding: 0;
}

.custom-context-menu-dark {
  background-color: #181f25;
  border: 1px solid #181f25;
}

.custom-context-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.custom-context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.custom-context-menu li:hover {
  background-color: #f0f0f0;
}

.custom-context-menu-dark li:hover {
  background-color: #3d3d3d;
}
</style>
