<template>
  <div v-if="isLoading" class="">
    <el-skeleton :rows="25" animated />
  </div>
  <div v-if="!isLoading && logs">
    <div class="example-pagination-block">
      <el-pagination
        :total="logs.totalPages"
        :current-page="currentPage"
        :page-size="1"
        @current-change="handlePageChange"
        layout="total, prev, pager, next"
      />
    </div>
    <el-table
      ref="tableRef"
      :default-sort="{ prop: 'creationDate', order: 'descending' }"
      :data="logs.logs"
      stripe
      style="width: 100%"
      table-layout="fixed"
    >
      <el-table-column prop="id" label="ID" min-width="8" />
      <!--    <el-table-column prop="entityId" label="Ent" min-width="10" />-->
      <el-table-column
        sortable
        prop="creationDate"
        column-key="creationDate"
        label="Дата"
        min-width="16"
        :formatter="formatDate"
      />
      <el-table-column
        :filters="[
        { text: 'Error', value: 'Error' },
        { text: 'Back', value: 'Back' },
        { text: 'Exception', value: 'Exception' },
      ]"
        filter-placement="bottom-end"
        :filter-method="filterErrorType"
        prop="title"
        label="Тип"
        min-width="10"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.title === 'Error' ? 'danger' : 'warning'"
            disable-transitions
          >{{ scope.row.title }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="logMessage" label="Сообщение" min-width="auto" />
    </el-table>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { getBackendLogs } from '~/composables/useFetchLogs'
import type { TableColumnCtx, TableInstance } from 'element-plus'

interface Error {
  id: number
  entityId: number
  creationDate: string
  title: string
  logMessage: string
}

interface Logs {
  totalPages: number;
  logs: Error[];
}

const tableRef = ref<TableInstance>()

export default {
  name: 'BackErrorsLog',
  data() {
    return {
      logs: {} as Logs,
      currentPage: 1,
      isLoading: false,
    }
  },
  mounted() {
    this.getBackendLogs(1)
  },
  methods: {
    handlePageChange(page: any) {
      this.currentPage = page
      this.getBackendLogs(page)
    },
    resetDateFilter() {
      tableRef.value!.clearFilter(['date'])
    },
    clearFilter() {
      tableRef.value!.clearFilter()
    },
    filterErrorType(value: string, row: Error) {
      return row.title === value
    },
    formatDate(row: Error, column: any) {
      const date = row.creationDate
      return dayjs(date).format('DD.MM.YYYY в HH:mm')
    },
    async getBackendLogs(page: number) {
      this.isLoading = true
      try {
        const res = await getBackendLogs(page)
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
          this.logs = res.data
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
.example-pagination-block {
  margin-bottom: 16px;
}

.el-table-wrapper {
  height: 500px; /* Здесь вы можете задать нужную высоту таблицы */
  overflow-y: auto;
}
</style>
