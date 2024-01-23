<template>
  <div v-if="isLoading" class="justify-content-center text-center">
    <div class="spinner-grow light:text-dark dark:text-white" role="status">
      <span class="sr-only">Загрузка..</span>
    </div>
  </div>
  <div v-else>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 border-r">
          <div v-if="order">
            <h2>{{ order.fullName }}</h2>
            <p class="font-weight-bold">
              Договор № {{ order.number }} от {{ formattedDate }}
            </p>
            <div class="d-flex">
              <div class="mr-15">
                <p class="mb-0"><b>Срок займа:</b> {{ order.daysquant }}</p>
                <p v-if="order.loanCostall" class="mb-0">
                  <b>Сумма займа: </b>{{ formatPrice(order.loanCostall) }} ₽
                </p>
                <p class="mb-3">
                  <b>Основной процент: </b>{{ order.mainPercent }}%
                </p>
              </div>
              <div class=""></div>
            </div>
          </div>
          <div v-if="!lot || Object.keys(lot).length === 0">
            <button
              class="btn btn-main d-flex justify-content-center align-items-center"
              @click="showCreateLot()"
            >
              <IconsPlus class="mr-1" /> Добавить лот
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <!-- Вывод инвестора тест 2 -->
          <el-result
            v-if="lot && lot.investorId === 0"
            class="pt-0 mb-0"
            icon="error"
            title="Инвестор не назначен"
            sub-title="Выберите инвестора из списка откликов"
          >
            <template #extra>
              <el-autocomplete
                v-model="investorSelectSearchValue"
                class="mb-2"
                :trigger-on-focus="true"
                clearable
                :fetch-suggestions="fetchSuggestions"
                placeholder="Поиск по инвесторам"
                @select="investorOnSelect"
                @change="selectedInvestor = {}"
              >
                <template #default="{ item }">
                  <span>{{ item.fullName }}</span>
                </template>
              </el-autocomplete>
              <el-button
                v-if="investorSelectSearchValue"
                type="primary"
                @click="setInvestorToLot(lot, selectedInvestor)"
                >Назначить инвестора</el-button
              >
            </template>
          </el-result>
          <el-result
            v-else-if="lot && lot.investorId > 0"
            class="pt-0"
            icon="success"
          >
            <template #extra>
              <h3>{{ assignedInvestor.fullName }}</h3>
              <div
                class="d-flex align-items-center justify-content-center mb-2"
              >
                <IconsPhoneIcon class="mr-1" />{{
                  assignedInvestor.phoneNumber &&
                  assignedInvestor.phoneNumber.toString().startsWith('7')
                    ? '+' + assignedInvestor.phoneNumber
                    : assignedInvestor.phoneNumber
                }}
              </div>
              <el-button type="default" @click="unsetInvestorToLot(lot)"
                >Снять инвестора</el-button
              >
            </template>
          </el-result>
        </div>
      </div>
    </div>
    <hr />
    <el-tabs
      v-model="activeTab"
      type="border-card"
      class="nav-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="Лот" name="lot">
        <template #label>
          <span class="custom-tabs-label d-flex align-items-center">
            <IconsHouseAdd class="mr-1" />
            <span>Лот</span>
          </span>
        </template>
        <div v-if="lot && Object.keys(lot).length !== 0">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3">
                <h4 class="d-flex align-items-center">
                  <el-dropdown class="mr-2" trigger="click">
                    <span
                      ><IconsMenuIcon
                        style="width: 25px; height: 25px; color: darkgray"
                    /></span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="editLot()"
                          ><IconsEdit class="mr-1" />Изменить</el-dropdown-item
                        >
                        <el-dropdown-item @click="deleteLot(lot.id)"
                          ><IconsTrashIcon
                            class="mr-1"
                          />Удалить</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  {{ lot.pledgeType }}
                </h4>
                <p class="mb-0 flex-wrap d-flex align-items-center">
                  <a
                    :href="'https://yandex.ru/maps/?text=' + lot.address"
                    class="mr-1"
                    ><IconsMap style="color: #1d83ee" /></a
                  ><b class="mr-1">Адрес:</b> {{ lot.address }}
                </p>
                <p v-if="lot.mainPercent && lot.mainPercent !== 0" class="mb-0">
                  <b>Процентная ставка:</b> {{ lot.mainPercent }}%
                </p>
                <p class="mb-0"><b>Площадь:</b> {{ lot.square }}</p>
                <p v-if="lot.landSquare" class="mb-0">
                  <b>Площадь участка:</b> {{ lot.landSquare }}
                </p>
                <p class="mb-3"><b>Цена:</b> {{ formatPrice(lot.price) }} ₽</p>
                <el-button
                  class="btn btn-main d-flex justify-content-center align-items-center"
                  :loading="isSendingToTelegram"
                  @click="sendToTelegram(lot)"
                >
                  <IconsTelegram class="mr-1" />Отправить в Telegram
                </el-button>
              </div>
              <div class="col-lg-9">
                <!-- Загрузка изображений -->
                <div
                  v-if="uploadStatus === 'idle'"
                  class="d-flex flex-wrap align-content-start"
                >
                  <div
                    v-for="(image, index) in lotImages"
                    :key="image.fileName"
                  >
                    <div
                      v-if="!isLoading"
                      class="picture-card-image mr-2 mb-2"
                      @mouseover="showDeleteButton = index"
                      @mouseleave="showDeleteButton = null"
                    >
                      <button
                        v-show="showDeleteButton === index"
                        class="delete-button"
                        @click="deleteFileInLot(image.fileName)"
                      >
                        <IconsTrashIcon />
                      </button>
                      <el-image
                        :src="baseUrl + image.link.slice(1)"
                        :zoom-rate="1.0"
                        fit="cover"
                        hide-on-click-modal
                        close-on-press-escape
                        :initial-index="index"
                        :preview-src-list="lotSrcList"
                      />
                    </div>
                  </div>
                  <div
                    class="picture-card justify-content-center align-items-center d-flex cursor-pointer"
                    @click="activateUploadInput"
                  >
                    <IconsPlus
                      style="width: 30px; height: 30px; color: lightgray"
                    />
                  </div>
                </div>
                <div
                  v-else-if="uploadStatus === 'progress'"
                  class="justify-content-center text-center"
                >
                  <div
                    class="spinner-grow light:text-dark dark:text-white"
                    role="status"
                  >
                    <span class="sr-only">Загрузка..</span>
                  </div>
                </div>
                <input
                  ref="uploadInput"
                  class="invisible"
                  type="file"
                  multiple
                  accept=".jpg, .jpeg, .png"
                  @change="handleFileSelect"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h6>Нет привязанного лота</h6>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Отклики" name="feedbacks">
        <template #label>
          <span class="custom-tabs-label d-flex align-items-center">
            <IconsTalkIcon class="mr-1" />
            <el-badge
              v-if="feedbacksCount > 0"
              :max="99"
              :value="feedbacksCount"
              class="feedback-badge"
              type="warning"
            >
            </el-badge>
            <span>Отклики</span>
          </span>
        </template>
        <div v-if="feedbacksCount > 0">
          <h6>Выберите инвестора из откликов:</h6>
          <el-scrollbar
            v-if="lot && lot.investorId === 0"
            height="290px"
            style="min-width: 270px; max-width: 600px"
          >
            <p
              v-for="item in feedbacks"
              :key="item"
              class="scrollbar-feedbacks d-flex justify-content-between"
              @mouseenter="showAssignButton(item)"
              @mouseleave="hideAssignButton(item)"
            >
              <span class="mr-3">{{ item.fullName }}</span>
              <el-button
                v-if="item.showAssignButton"
                type="primary"
                class="mr-2"
                @click="setInvestorToLotFromResponse(lot, item)"
                ><IconsConfirm2Icon class="mr-1" />Назначить</el-button
              >
            </p>
          </el-scrollbar>
          <el-scrollbar
            v-if="lot && lot.investorId > 0"
            height="290px"
            style="min-width: 270px; max-width: 600px"
          >
            <p
              v-for="item in feedbacks"
              :key="item"
              class="scrollbar-feedbacks d-flex justify-content-between bg-main"
              @mouseenter="showAssignButton(item)"
              @mouseleave="hideAssignButton(item)"
            >
              <span class="mr-3">{{ item.fullName }}</span>
              <el-button
                v-if="item.investorId === lot.investorId"
                class="mr-2"
                type="danger"
                @click="unsetInvestorToLot(lot)"
                ><IconsCloseIcon class="mr-1" />Снять</el-button
              >
            </p>
          </el-scrollbar>
        </div>
        <div v-if="feedbacksCount === 0">
          <h6>Нет откликов на лот</h6>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- Вывод лотов -->
  </div>
</template>

<script>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { getOrder } from '~/composables/useFetchOrders'
import { getAllInvestors, getInvestor } from '~/composables/useFetchInvestors'
import {
  getLot,
  postImages,
  getImages,
  deleteImage,
  deleteLot,
  postLotToTelegram,
  getLotFeedbacks,
  assignInvestorTolot,
  putLot,
} from '~/composables/useFetchLots'
import IconsHouseAdd from '~/components/Icons/IconsHouseAdd.vue'
import { showModal } from '~/utils/alerts'
import IconsPlus from '~/components/Icons/IconsPlus.vue'
import FeedbackIcon from '~/components/Icons/FeedbackIcon.vue'
import { baseUrl } from '~/utils/config'

export default {
  name: 'Order',
  components: { FeedbackIcon, IconsPlus, IconsHouseAdd },
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    orderId: 0,
  },
  setup() {},
  data() {
    return {
      baseUrl,
      order: {},
      lot: {},
      investors: [],
      isLoading: false,
      files: [],
      maxFileSize: 20000 * 1024,
      uploadedImages: [],
      lotImages: {},
      lotSrcList: [],
      uploadStatus: 'idle',
      showDeleteButton: null,
      investorSelectSearchValue: '',
      selectedInvestor: {},
      isSendingToTelegram: false,
      activeTab: 'lot',
      feedbacks: [],
      assignedInvestor: {},
    }
  },
  computed: {
    formattedDate() {
      return dayjs(this.order.creationDateTime).format('DD.MM.YYYY HH:mm')
    },
    feedbacksCount() {
      return this.feedbacks.length
    },
  },
  async mounted() {
    await this.getOrder()
    await this.getLot()
    await this.getInvestors()
    if (this.lot && Object.keys(this.lot).length !== 0) {
      await this.getLotImages()
      await this.getLotFeedbacks()
      if (this.lot.investorId !== 0) {
        await this.getInvestorById(this.lot.investorId)
      }
    }
  },
  methods: {
    formatNumberWithSpaces(inputString) {
      if (inputString !== null) {
        return inputString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      } else {
        return '0'
      }
    },
    showAssignButton(item) {
      item.showAssignButton = true
    },
    hideAssignButton(item) {
      item.showAssignButton = false
    },
    //
    formatPrice(price) {
      return this.formatNumberWithSpaces(price.toLocaleString('ru-RU')) // Используйте свою локаль, если требуется
    },
    // * Метод позволяет назначить инвестора на лот
    assignInvestor(lot) {
      // TODO: Сделать изменение инвестора в лоте когда будут эндпоинты
      // TODO: Указать имя инвестора в разметке после выбора
      // TODO: Возможно, следует реализовать поиск обьекта по введенным данным прямо тут если инвестор не выбран
      if (Object.keys(this.selectedInvestor).length !== 0) {
        // * Инвестор выбран
        // lot.investorId = selectedInvestor.id <-------------------------------------------------------------------
      } else if (this.investorSelectSearchValue.length > 0) {
        // ! Инвестор не выбран
        showModal('Инвестор с такими данными не найден.', 'error')
      }
    },
    // * Функция выполняется после выбора инвестора в инпуте. Item - это обьект инвестора.
    investorOnSelect(item) {
      this.investorSelectSearchValue = item.fullName
      this.selectedInvestor = item
    },
    fetchSuggestions(queryString, cb) {
      const results = this.investors.filter((investor) =>
        investor.fullName.toLowerCase().includes(queryString.toLowerCase())
      )
      cb(results)
    },
    // * Имитация клика по инпуту
    activateUploadInput() {
      this.$refs.uploadInput.click()
    },
    async sendToTelegram(lot) {
      this.isSendingToTelegram = true
      try {
        setTimeout(async () => {
          try {
            const res = await postLotToTelegram(lot.id)
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
              toast('Лот отправлен в Telegram', 'success')
            }
          } catch (e) {
            console.error('Cth_Error: ', e)
          } finally {
            this.isSendingToTelegram = false
          }
        }, 0)
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isSendingToTelegram = false
    },
    // * Получаем инвесторов
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
    // * Получаем инвестора по Id
    async getInvestorById(investorId) {
      this.isLoading = true
      try {
        const res = await getInvestor(investorId)
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
          this.assignedInvestor = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Удаляем файл в лоте
    async deleteFileInLot(imageName) {
      this.isLoading = false
      try {
        const res = await deleteImage(this.lot.id, imageName)
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
          toast('Файл удален.', 'success')
          await this.updateLotImages()
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Выбираем файлы для загрузки
    async handleFileSelect(event) {
      this.files = Array.from(event.target.files)

      if (this.files.length > 10) {
        this.$refs.uploadInput.value = null
        this.files = [] // Очистить выбранные файлы
        toast(`Количество файлов не может превышать 10 штук`, 'warn')
        return
      }

      for (const file of this.files) {
        if (file.size > this.maxFileSize) {
          this.$refs.uploadInput.value = null
          this.files = [] // Очистить выбранные файлы
          toast(
            `Размер файла "${file.name}" превышает допустимый размер 20 мб.`,
            'warn'
          )
          return
        }
      }
      await this.handleUpload()
    },
    // * Загрузка файлов
    async handleUpload() {
      try {
        this.uploadStatus = 'progress'
        this.uploadedImages = []
        const formData = new FormData()
        if (!this.files.length > 0) return toast(`Не выбраны файлы!`, 'warn')

        this.files.forEach((file) => {
          formData.append('files', file)
        })

        const res = await postImages(formData, this.lot.id)

        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          this.uploadStatus = 'error'
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', 'Ошибка валидации')
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          this.uploadStatus = 'idle'
          toast('Файлы загружены.', 'success')
          await this.getLotImages()
        }
      } catch (e) {
        this.uploadStatus = 'error'
        console.error('Cth_Error: ', e)
      }
    },
    // ? Переадресация на страницу создания лота
    showCreateLot() {
      navigateTo('/orders/' + this.orderId + '/lots/create')
    },
    // * Получаем лот
    // ? Если возвращает 200 и null - лот не найден
    async getLot() {
      this.isLoading = true
      try {
        const res = await getLot(this.orderId)
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
          this.lot = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Переадресация на страницу редактирования лота
    editLot() {
      navigateTo('/orders/' + this.orderId + '/lots/edit')
    },
    // * Удаляем лот
    async deleteLot(lotId) {
      this.isLoading = true
      try {
        const res = await deleteLot(lotId)
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
          toast('Лот удален.', 'success')
          this.lot = {}
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Получаем изображения лота
    async getLotImages() {
      this.isLoading = true
      try {
        const res = await getImages(this.lot.id)
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
          this.lotImages = res.data
          this.lotSrcList = this.lotImages.map(
            (item) => this.baseUrl + item.link.slice(1)
          )
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Обновляем изображения лота
    async updateLotImages() {
      try {
        const res = await getImages(this.lot.id)
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
          this.lotImages = res.data
          this.lotSrcList = this.lotImages.map(
            (item) => this.baseUrl + item.link
          )
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
    },
    // * Получаем договор
    async getOrder() {
      this.isLoading = true
      try {
        const res = await getOrder(this.orderId)
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
          this.order = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Получаем отклики по лоту
    async getLotFeedbacks() {
      this.isLoading = true
      try {
        const res = await getLotFeedbacks(this.lot.id)
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
          this.feedbacks = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Назначаем инвестора в лот
    async setInvestorToLot(lot, investor) {
      this.isLoading = true
      try {
        const res = await assignInvestorTolot(lot.id, investor.id)
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
          toast('Инвестор успешно назначен на лот', 'success')
          await this.getLot()
          await this.getInvestorById(investor.id)
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Назначаем инвестора в лот
    async setInvestorToLotFromResponse(lot, investor) {
      this.isLoading = true
      try {
        const res = await assignInvestorTolot(lot.id, investor.investorId)
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
          toast('Инвестор успешно назначен на лот', 'success')
          await this.getLot()
          await this.getInvestorById(investor.investorId)
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Снять инвестора с лота
    async unsetInvestorToLot(lot) {
      this.isLoading = true
      try {
        const tempLot = lot
        tempLot.investorId = 0
        tempLot.price = parseInt(lot.price)
        tempLot.square = lot.square.toString()
        const res = await putLot(tempLot)
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
          toast('Инвестор успешно снят с лота', 'success')
          await this.getLot()
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
.picture-card {
  border: darkgrey dashed 1px;
  min-width: 148px;
  min-height: 148px;
  max-width: 148px;
  max-height: 148px;
  display: block;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  z-index: 999;
}

.picture-card-image {
  border: transparent solid 1px;
  min-width: 150px;
  min-height: 150px;
  max-width: 150px;
  max-height: 150px;
  position: relative;
  display: flex;
}

.picture-card:hover {
  border: black dashed 1px;
  color: black;
}

.nav-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.feedback-badge {
  position: absolute;
  margin-top: -15px;
  margin-left: 75px;
}

.scrollbar-feedbacks {
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 15px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-info);
}
</style>
