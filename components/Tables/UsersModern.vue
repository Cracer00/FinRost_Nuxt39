<template>
  <!-- Кастомное меню для управления пользователями -->
  <div
    v-if="usersTableContextMenuShow"
    ref="usersTableContextMenu"
    class="dark:custom-context-menu-dark custom-context-menu"
    :style="{ top: `${menu.Y}px`, left: `${menu.X}px` }"
  >
    <ul>
      <li
        class="d-flex align-items-center"
        @click="showUser(menu.selectedUser)"
      >
        <IconsShow class="mr-2" />Показать
      </li>
      <li
        class="d-flex align-items-center"
        @click="editUser(menu.selectedUser)"
      >
        <IconsEdit class="mr-2" />Редактировать
      </li>
      <li
        class="d-flex align-items-center"
        @click="deleteUserShowModal(menu.selectedUser)"
      >
        <IconsTrashIcon class="mr-2" />Удалить
      </li>
    </ul>
  </div>
  <div v-if="isLoading" class="justify-content-center text-center">
    <div class="spinner-grow light:text-dark dark:text-white" role="status">
      <span class="sr-only">Загрузка..</span>
    </div>
  </div>
  <el-input
    ref="inPageSearchInput"
    v-model="searchV"
    placeholder="Поиск"
    class="w-50"
  >
    <template #prepend>
      <el-select
        v-model="searchFilterSelect"
        placeholder="Фильтр"
        style="width: 115px"
      >
        <el-option label="Все параметры" value="no" />
        <el-option label="Имя пользователя" value="firstName" />
        <el-option label="Фамилия пользователя" value="lastName" />
        <el-option label="Отчество пользователя" value="patronymic" />
      </el-select>
    </template>
    <template #append>
      <el-button><IconsIconSearch /></el-button>
    </template>
  </el-input>
  <el-table
    :data="filteredData"
    class="mb-2 user-select-none"
    highlight-current-row
    :default-sort="{ prop: 'id', order: 'descending' }"
    table-layout="auto"
    @row-dblclick="showUser"
    @row-contextmenu="showContextMenu($event)"
    @contextmenu.prevent=""
  >
    <el-table-column label="ID" prop="id" sortable></el-table-column>
    <el-table-column>
      <template #default="{ row }">
        <span v-if="row.blocked">
          <IconsLocked />
        </span>
      </template>
    </el-table-column>
    <el-table-column label="Фамилия" prop="lastName" sortable></el-table-column>
    <el-table-column label="Имя" prop="firstName" sortable></el-table-column>
    <el-table-column
      label="Отчество"
      prop="patronymic"
      sortable
    ></el-table-column>
    <el-table-column label="Статус" prop="position" sortable></el-table-column>
    <el-table-column label="Действия">
      <template #default="{ row }">
        <button class="btn-custom btn-main mr-1" @click.stop="showUser(row)">
          <IconsUserIcon />
        </button>
        <button class="btn-custom btn-primary mr-1" @click.stop="editUser(row)">
          <IconsEdit />
        </button>
        <button
          class="btn-custom btn-danger mr-1"
          @click.stop="deleteUserShowModal(row)"
        >
          <IconsTrashIcon />
        </button>
      </template>
    </el-table-column>
  </el-table>
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
</template>

<script>
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import { inject, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getAllUsers, deleteUser } from '~/composables/useFetchUser'
import { highlightElementByValidation } from '~/utils/backendValidation'
import IconsEdit from '~/components/Icons/IconsEdit.vue'
import { showModalWithConfirm, toast } from '~/utils/alerts'

export default {
  name: 'UsersModern',
  components: { IconsEdit },
  setup() {
    // * Кастомное контекстное меню
    const usersTableContextMenuShow = ref(false)
    const usersTableContextMenu = ref(null)
    onClickOutside(usersTableContextMenu, (event) => {
      usersTableContextMenuShow.value = false
    })
    // * Поисковая переменная
    const searchValue = inject('searchValue')
    const searchV = ref('')
    return {
      searchValue,
      usersTableContextMenu,
      usersTableContextMenuShow,
      searchV,
    }
  },
  data() {
    return {
      menu: {
        X: 0,
        Y: 0,
        selectedUser: null,
      },
      users: [],
      isLoading: false,
      searchFilterSelect: '',
    }
  },
  computed: {
    hasSelected() {
      // * Если хотя бы одна строка в таблице выбрана
      return this.filteredData.some((item) => item.isSelected)
    },
    filteredData() {
      if (this.users.length !== 0) {
        if (this.searchV.trim() === '') {
          return this.users
        } else {
          const search = this.searchV.toLowerCase()
          if (this.searchFilterSelect === 'firstName') {
            return this.users.filter((item) => {
              const firstName = item.firstName
                ? item.firstName.toLowerCase()
                : ''
              return firstName.includes(search)
            })
          } else if (this.searchFilterSelect === 'lastName') {
            return this.users.filter((item) => {
              const lastName = item.lastName ? item.lastName.toLowerCase() : ''
              return lastName.includes(search)
            })
          } else if (this.searchFilterSelect === 'patronymic') {
            return this.users.filter((item) => {
              const patronymic = item.patronymic
                ? item.patronymic.toLowerCase()
                : ''
              return patronymic.includes(search)
            })
          } else {
            return this.users.filter((item) => {
              const firstName = item.firstName
                ? item.firstName.toLowerCase()
                : ''
              const lastName = item.lastName ? item.lastName.toLowerCase() : ''
              const patronymic = item.patronymic
                ? item.patronymic.toLowerCase()
                : ''
              return (
                firstName.includes(search) ||
                lastName.includes(search) ||
                patronymic.includes(search)
              )
            })
          }
        }
      } else {
        return []
      }
    },
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    // ? Метод кастомного контекстного меню
    showContextMenu(row) {
      this.menu.selectedUser = row
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
    async editUser(user) {
      this.usersTableContextMenuShow = false
      await navigateTo('/users/' + user.id + '/edit')
    },
    selectUser(user) {
      user.isSelected = !user.isSelected
    },
    async showUser(user) {
      this.usersTableContextMenuShow = false
      await navigateTo('/users/' + user.id)
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
