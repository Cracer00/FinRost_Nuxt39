<template>
  <!-- Кастомное меню для управления пользователями -->
  <div v-if="investorsTableContextMenuShow" ref="investorsTableContextMenu" class="dark:custom-context-menu-dark custom-context-menu" :style="{ top: `${menu.Y}px`, left: `${menu.X}px` }">
    <ul>
      <li class="d-flex align-items-center" @click="showInvestor(menu.selectedInvestors.id)"><IconsShow class="mr-2"/>Показать</li>
      <li class="d-flex align-items-center" @click="editInvestor(menu.selectedInvestors.id)"><IconsEdit class="mr-2"/>Редактировать</li>
      <li class="d-flex align-items-center" @click="deleteInvestorShowModal(menu.selectedInvestors)"><IconsTrashIcon class="mr-2"/>Удалить</li>
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
        <tr class="border-gray-light">
          <th>ID</th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Телефон</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody class="border-gray-light">
        <tr
          v-for="investor in filteredData"
          :key="investor.id"
          :class="{ 'table-selectedItem-light': investor.isSelected }"
          @click="selectInvestor(investor)"
          @dblclick="showInvestor(investor.id)"
          @contextmenu.prevent="showContextMenu($event, investor)"
        >
          <td>{{ investor.id }}</td>
          <td>{{ investor.lastName }}</td>
          <td>{{ investor.firstName }}</td>
          <td>{{ investor.patronymic }}</td>
          <td>{{ investor.phoneNumber }}</td>
          <td>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Нажмите, чтобы просмотреть профиль"
              placement="top-start"
            >
            <button
              class="btn-custom btn-primary mr-1"
              @click.stop="showInvestor(investor.id)"
            >
              <IconsUserIcon />
            </button>
              <el-tooltip/>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="Нажмите, чтобы отредактировать профиль"
                placement="top-start"
              >
            <button
              class="btn-custom btn-primary mr-1"
              @click.stop="editInvestor(investor.id)"
            >
              <IconsEdit />
            </button>
                <el-tooltip/>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Нажмите, чтобы удалить профиль"
                  placement="top-start"
                >
            <button
              class="btn-custom btn-danger mr-1"
              @click.stop="deleteInvestorShowModal(investor)"
            >
              <IconsTrashIcon />
            </button>
                  <el-tooltip/>
          </td>
        </tr>
      </tbody>
    </table>
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
  </div>
  <div v-else-if="!isLoading">
    <h3 class="text-center">Нет совпадений.</h3>
    <h3 class="text-center">Очистите строку поиска для возврата.</h3>
  </div>
</template>

<script>
import nuxtStorage from 'nuxt-storage/nuxt-storage'
import { inject, ref } from 'vue'
import { getAllInvestors, getInvestor, deleteInvestor } from '~/composables/useFetchInvestors'
import { highlightElementByValidation } from '~/utils/backendValidation'
import IconsEdit from '~/components/Icons/IconsEdit.vue'
import { showModalWithConfirm, toast } from '~/utils/alerts'
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'Investors',
  components: { IconsEdit },
  setup() {
    // * Кастомное контекстное меню
    let investorsTableContextMenuShow = ref(false)
    const investorsTableContextMenu = ref(null)
    onClickOutside(investorsTableContextMenu, (event) => {
      investorsTableContextMenuShow.value = false
    })
    // * Поисковая переменная
    const searchValue = inject('searchValue')
    return { searchValue, investorsTableContextMenu, investorsTableContextMenuShow }
  },
  data() {
    return {
      menu: {
        X: 0,
        Y: 0,
        selectedInvestors: null,
      },
      investors: {},
      isLoading: false,
    }
  },
  computed: {
    hasSelected() {
      // * Если хотя бы одна строка в таблице выбрана
      return this.filteredData.some((item) => item.isSelected)
    },
    filteredData() {
      // * Обьект investors с массивом отфильтрованным по поисковой строке
      if (Object.keys(this.investors).length !== 0) { // ? Если investors содержит собственные ключи (не пустой)
        if (this.searchValue.trim() === '') {
          return this.investors
        } else {
          const search = this.searchValue.toLowerCase()
          return this.investors.filter((item) => {
            const fullName = item.fullName.toLowerCase()
            return fullName.includes(search)
          })
        }
      } else { // ? Если investors пустой возвращаем пустой обьект
        return {};
      }
    },
  },
  mounted() {
    this.getInvestors()
  },
  methods: {
    // ? Метод кастомного контекстного меню
    showContextMenu(event, investor) {
      event.preventDefault()
      this.menu.selectedInvestors = investor
      this.menu.X = event.clientX
      this.menu.Y = event.clientY
      this.investorsTableContextMenuShow = true
    },
    // ? Удаляем выбранных пользователей
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
    // ? Переадресация на страницу создания пользователя
    showCreateInvestor() {
      navigateTo('/investors/create')
    },
    // ? Получаем пользователей
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
    async editInvestor(investorId) {
      this.investorsTableContextMenuShow = false
      await navigateTo('/investors/' + investorId + '/edit')
    },
    selectInvestor(investor) {
      investor.isSelected = !investor.isSelected
    },
    async showInvestor(investorId) {
      this.investorsTableContextMenuShow = false
      await navigateTo('/investors/' + investorId)
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
