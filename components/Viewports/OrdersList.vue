<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="isLoading" class="justify-content-center text-center">
        <div class="spinner-grow light:text-dark dark:text-white" role="status">
          <span class="sr-only">Загрузка..</span>
        </div>
      </div>
      <div v-if="filteredData" class="col-md-3 orders-list-block">
        <!-- Поиск и список ордеров -->
        <div class="mb-2 d-flex align-content-center">
          <el-input
            ref="inPageSearchInput"
            v-model="searchV"
            placeholder="Поиск"
            class="input-with-select"
          >
            <template #prepend>
              <el-select
                v-model="searchFilterSelect"
                placeholder="Фильтр"
                style="width: 115px"
              >
                <el-option label="Все параметры" value="no" />
                <el-option label="Место реализации" value="relisePlace" />
                <el-option label="Имя клиента" value="clientName" />
                <el-option label="Номер договора" value="number" />
              </el-select>
            </template>
            <template #append>
              <el-button><IconsIconSearch /></el-button>
            </template>
          </el-input>
        </div>
        <el-scrollbar height="600px">
          <div
            v-for="item in filteredData"
            :key="item"
            class="scrollbar-item cursor-pointer"
          >
            <div class="container-fluid">
              <div class="row pl-2 scrollbar-item-title">
                {{ item.clientName }}
              </div>
              <div class="h-100 d-flex flex-row justify-content-between align-items-end">
                <span class="scrollbar-item-relisePlace">{{ item.relisePlace }}</span>
                <span class="scrollbar-item-orderNumber">{{ item.number }}</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!-- Компонент вывода данных -->
      <div class="col-md-9"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAllOrders } from '~/composables/useFetchOrders'
export default {
  name: 'OrdersList',
  setup() {
    const searchV = ref('')
    return { searchV }
  },
  data() {
    return {
      orders: [],
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
          } else
            return this.orders.filter((item) => {
              const fullName = item.clientName.toLowerCase()
              const number = item.number.toLowerCase()
              const relisePlace = item.relisePlace.toLowerCase()
              return (
                fullName.includes(search) ||
                number.includes(search) ||
                relisePlace.includes(search)
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

<style scoped>
.scrollbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  background: #1183ee;
  color: white;
}

.search-button {
  height: 30px;
  width: 30px;
}

.orders-list-block {
  border-right: 1px solid #e5e7eb;
}

.search-input {
  padding-left: 10px;
  width: 320px;
}

.scrollbar-item-title {
  font-size: 18px;
}

.scrollbar-item-relisePlace {
  font-size: 10px;
}

.scrollbar-item-orderNumber {
  font-size: 10px;
}
</style>
