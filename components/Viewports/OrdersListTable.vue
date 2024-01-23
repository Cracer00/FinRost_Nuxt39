<template>
  <div v-if="isLoading" class="justify-content-center text-center">
    <div class="spinner-grow light:text-dark dark:text-white" role="status">
      <span class="sr-only">Загрузка..</span>
    </div>
  </div>
  <div v-if="!isLoading && filteredData">
    <div class="mb-2 d-flex align-content-center w-50">
      <el-input
        ref="inPageSearchInput"
        v-model="searchV"
        placeholder="Поиск"
        class="input-with-select"
        clearable
        @clear="searchOrders('')"
        @keyup.enter="searchOrders(searchV)"
      >
        <template #prepend>
          <el-select
            v-model="searchFilterSelect"
            placeholder="Фильтр"
            style="width: 115px"
          >
            <el-option label="Все параметры" value="no" />
            <el-option label="Номер договора" value="number" />
            <el-option label="Дата создания" value="creationDate" />
            <el-option label="Место реализации" value="relisePlace" />
            <el-option label="Имя клиента" value="clientName" />
          </el-select>
        </template>
        <template #append>
          <el-button
            id="searchButton"
            title="Нажмите, чтобы искать по всей базе данных"
            @click="searchOrders(searchV)"
            ><IconsIconSearch
          /></el-button>
        </template>
      </el-input>
    </div>
    <el-table
      ref="tableRef"
      :default-sort="{ prop: 'creationDate', order: 'descending' }"
      :data="filteredData"
      stripe
      style="width: 100%"
      table-layout="auto"
      class="cursor-pointer"
      empty-text="Нет данных"
      @current-change="showOrder"
    >
      <el-table-column prop="number" label="№ договора" min-width="15" />
      <el-table-column
        sortable
        prop="creationDate"
        column-key="creationDate"
        label="Дата создания"
        min-width="17"
        :formatter="formatDate"
      />
      <el-table-column
        prop="relisePlace"
        label="Место реализации"
        min-width="35"
        sortable
      />
      <el-table-column
        prop="clientName"
        label="ФИО"
        min-width="auto"
        sortable
      />
      <el-table-column label="Лот" min-width="15" prop="isLot" sortable>
        <template #default="scope">
          <el-badge v-if="scope.row.isLot"
            ><IconsHouse style="color: #13ce66"
          /></el-badge>
          <el-badge v-else><IconsHouseNo style="color: #dc5d5d" /></el-badge>
        </template>
      </el-table-column>
      <el-table-column
        label="Отклики"
        min-width="15"
        prop="countFeedbacks"
        sortable
      >
        <template #default="scope">
          <el-badge
            v-if="scope.row.countFeedbacks > 0"
            class="pt-3"
            type="success"
            :value="scope.row.countFeedbacks"
          ></el-badge>
          <el-badge
            v-if="scope.row.countFeedbacks === 0"
            class="pt-3"
            type="info"
            :value="scope.row.countFeedbacks"
          ></el-badge>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import {
  getAllOrders,
  getAllFilteredOrders,
} from '~/composables/useFetchOrders'
import IconsHouse from '~/components/Icons/IconsHouse.vue'

interface OrdersRow {
  id: number
  number: string
  creationDate: string
  relisePlace: string
  clientId: number
  clientName: string
}
export default {
  name: 'OrdersListTable',
  components: { IconsHouse },
  setup() {
    const searchV = ref('')
    return { searchV }
  },
  data() {
    return {
      orders: [] as OrdersRow[],
      selectedOrder: {},
      searchFilterSelect: '',
      isLoading: false,
    }
  },
  computed: {
    filteredData() {
      if (this.orders.length !== 0) {
        if (this.searchV.trim() === '') {
          return this.orders
        } else {
          const search = this.searchV.toLowerCase()
          if (this.searchFilterSelect === 'relisePlace') {
            return this.orders.filter((item) => {
              const fullName = item.relisePlace.toLowerCase()
              return fullName.includes(search)
            })
          } else if (this.searchFilterSelect === 'clientName') {
            return this.orders.filter((item) => {
              const fullName = item.clientName.toLowerCase()
              return fullName.includes(search)
            })
          } else if (this.searchFilterSelect === 'number') {
            return this.orders.filter((item) => {
              const fullName = item.number.toLowerCase()
              return fullName.includes(search)
            })
          } else if (this.searchFilterSelect === 'creationDate') {
            return this.orders.filter((item) => {
              const fullName = item.creationDate.toLowerCase()
              return fullName.includes(search)
            })
          } else
            return this.orders.filter((item) => {
              const fullName = item.clientName.toLowerCase()
              const number = item.number.toLowerCase()
              const relisePlace = item.relisePlace.toLowerCase()
              const creationDate = item.creationDate.toLowerCase()
              return (
                fullName.includes(search) ||
                number.includes(search) ||
                relisePlace.includes(search) ||
                creationDate.includes(search)
              )
            })
        }
      } else {
        return []
      }
    },
  },
  async mounted() {
    await this.getAllOrders()
  },
  methods: {
    // * Обновляем массив из контекста поисковой строки
    async searchOrders(search: string) {
      this.isLoading = true
      try {
        const res = await getAllFilteredOrders(search)
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
          this.orders = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Проваливаемся в договор
    showOrder(val: OrdersRow | undefined) {
      navigateTo('/orders/' + val?.id)
    },
    // * Форматируем дату в ячейке таблицы
    formatDate(row: OrdersRow, column: any) {
      const date = row.creationDate
      return dayjs(date).format('DD.MM.YY HH:mm')
    },
    // * Получаем все договора
    async getAllOrders() {
      this.isLoading = true
      try {
        const res = await getAllOrders()
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
          this.orders = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
  },
}
</script>

<style scoped></style>
