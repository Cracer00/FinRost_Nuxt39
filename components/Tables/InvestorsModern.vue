<template>
  <!-- Кастомное меню для управления пользователями -->
  <div
    v-if="investorsTableContextMenuShow"
    ref="investorsTableContextMenu"
    class="dark:custom-context-menu-dark custom-context-menu"
    :style="{ top: `${menu.Y}px`, left: `${menu.X}px` }"
  >
    <ul>
      <li
        class="d-flex align-items-center"
        @click="showInvestor(menu.selectedInvestors)"
      >
        <IconsShow class="mr-2" />Показать
      </li>
      <li
        class="d-flex align-items-center"
        @click="editInvestor(menu.selectedInvestors)"
      >
        <IconsEdit class="mr-2" />Редактировать
      </li>
      <li
        class="d-flex align-items-center"
        @click="deleteInvestorShowModal(menu.selectedInvestors)"
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
    clearable
    @clear="searchInvestors('')"
    @keyup.enter="searchInvestors(searchV)"
  >
    <template #prepend>
      <el-select
        v-model="searchFilterSelect"
        placeholder="Фильтр"
        style="width: 115px"
      >
        <el-option label="Все параметры" value="no" />
        <el-option label="Имя" value="firstName" />
        <el-option label="Фамилия" value="lastName" />
        <el-option label="Отчество" value="patronymic" />
        <el-option label="Телефон" value="phoneNumber" />
      </el-select>
    </template>
    <template #append>
      <el-button id="searchButton" @click="searchInvestors(searchV)" title="Нажмите, чтобы искать по всей базе данных"><IconsIconSearch /></el-button>
    </template>
  </el-input>
  <el-table
    :default-sort="{ prop: 'id', order: 'descending' }"
    :data="filteredData"
    class="mb-2 user-select-none"
    highlight-current-row
    @row-dblclick="showInvestor"
    @row-contextmenu="showContextMenu($event)"
    @contextmenu.prevent=""
  >
    <el-table-column prop="id" label="ID" sortable></el-table-column>
    <el-table-column prop="lastName" label="Фамилия" sortable></el-table-column>
    <el-table-column prop="firstName" label="Имя" sortable></el-table-column>
    <el-table-column
      prop="patronymic"
      label="Отчество"
      sortable
    ></el-table-column>
    <el-table-column
      prop="phoneNumber"
      label="Телефон"
      sortable
    ></el-table-column>
    <el-table-column label="Действия">
      <template #default="{ row }">
        <button
          class="btn-custom btn-main mr-1"
          @click.stop="showInvestor(row)"
        >
          <IconsUserIcon />
        </button>
        <button
          class="btn-custom btn-primary mr-1"
          @click.stop="editInvestor(row)"
        >
          <IconsEdit />
        </button>
        <button
          class="btn-custom btn-danger mr-1"
          @click.stop="deleteInvestorShowModal(row)"
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
      @click.stop="showCreateInvestor()"
    >
      <IconsUserAddIcon class="mr-1" /> Добавить инвестора
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
import {
  getAllInvestors,
  getInvestor,
  deleteInvestor,
  getAllChatUsers,
  getAllFilteredInvestors
} from '~/composables/useFetchInvestors'
import { highlightElementByValidation } from '~/utils/backendValidation'
import IconsEdit from '~/components/Icons/IconsEdit.vue'
import { showModalWithConfirm, toast } from '~/utils/alerts'

export default {
  name: 'InvestorsModern',
  components: { IconsEdit },
  setup() {
    // * Кастомное контекстное меню
    const investorsTableContextMenuShow = ref(false)
    const investorsTableContextMenu = ref(null)
    onClickOutside(investorsTableContextMenu, (event) => {
      investorsTableContextMenuShow.value = false
    })
    // * Поисковая переменная
    const searchValue = inject('searchValue')
    const searchV = ref('')
    return {
      searchValue,
      investorsTableContextMenu,
      investorsTableContextMenuShow,
      searchV,
    }
  },
  data() {
    return {
      menu: {
        X: 0,
        Y: 0,
        selectedInvestors: null,
      },
      investors: [],
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
      if (this.investors.length !== 0) {
        if (this.searchV.trim() === '') {
          return this.investors
        } else {
          const search = this.searchV.toLowerCase()
          if (this.searchFilterSelect === 'firstName') {
            return this.investors.filter((item) => {
              const firstName = item.firstName
                ? item.firstName.toLowerCase()
                : ''
              return firstName.includes(search)
            })
          } else if (this.searchFilterSelect === 'lastName') {
            return this.investors.filter((item) => {
              const lastName = item.lastName ? item.lastName.toLowerCase() : ''
              return lastName.includes(search)
            })
          } else if (this.searchFilterSelect === 'patronymic') {
            return this.investors.filter((item) => {
              const patronymic = item.patronymic
                ? item.patronymic.toLowerCase()
                : ''
              return patronymic.includes(search)
            })
          } else if (this.searchFilterSelect === 'phoneNumber') {
            return this.investors.filter((item) => {
              const mobilePhone = item.patronymic
                ? item.phoneNumber.toLowerCase()
                : ''
              return phoneNumber.includes(search)
            })
          } else {
            return this.investors.filter((item) => {
              const firstName = item.firstName
                ? item.firstName.toLowerCase()
                : ''
              const lastName = item.lastName ? item.lastName.toLowerCase() : ''
              const patronymic = item.patronymic
                ? item.patronymic.toLowerCase()
                : ''
              const phoneNumber = item.phoneNumber
                ? item.phoneNumber.toLowerCase()
                : ''
              return (
                firstName.includes(search) ||
                lastName.includes(search) ||
                patronymic.includes(search) ||
                phoneNumber.includes(search)
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
    this.getInvestors()
  },
  methods: {
    // * Обновляем массив из контекста поисковой строки
    async searchInvestors(search) {
      this.isLoading = true
      try {
        const res = await getAllFilteredInvestors(search)
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          this.investors = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Метод кастомного контекстного меню
    showContextMenu(row) {
      this.menu.selectedInvestors = row
      this.menu.X = event.clientX
      this.menu.Y = event.clientY
      this.investorsTableContextMenuShow = true
    },
    // * Удаляем выбранных пользователей
    deleteSelected() {
      this.isLoading = true
      this.filteredData.forEach((item) => {
        if (item.isSelected) {
          // Выполнение удаления для выбранного элемента
          this.deleteInvestor(item)
        }
      })
      this.isLoading = false
    },
    // * Переадресация на страницу создания пользователя
    showCreateInvestor() {
      navigateTo('/investors/create')
    },
    // * Получаем пользователей
    async getInvestors() {
      this.isLoading = true
      try {
        const res = await getAllInvestors()
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
          this.investors = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    deleteInvestorShowModal(investor) {
      this.investorsTableContextMenuShow = false
      showModalWithConfirm(
        this.deleteInvestor,
        investor,
        `Вы действительно хотите удалить пользователя ${investor.fullName}?`,
        'confirmation'
      )
    },
    async deleteInvestor(investor) {
      this.isLoading = true
      try {
        const res = await deleteInvestor(investor.id)
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
          toast('Инвестор успешно удален', 'success')
          await this.getInvestors()
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
      this.investorsTableContextMenuShow = false
    },
    async editInvestor(investor) {
      this.investorsTableContextMenuShow = false
      await navigateTo('/investors/' + investor.id + '/edit')
    },
    selectInvestor(investor) {
      investor.isSelected = !investor.isSelected
    },
    async showInvestor(investor) {
      this.investorsTableContextMenuShow = false
      await navigateTo('/investors/' + investor.id)
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
