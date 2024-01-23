<template>
  <div v-if="investor.id">
    <div class="container">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="light:card dark:card-dark">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img src="/public/icons/avatar.svg" alt="" class="rounded-circle" width="150" height="150" style="background-color: #467f81">
                  <div class="mt-3 text-secondary">
<!--                    <span class="mr-1 cursor-pointer" @click="investor.enabled = !investor.enabled" title="Нажмите, чтобы изменить статус">-->
<!--                      <span v-if="investor.enabled" class="badge bg-success">Активен</span>-->
<!--                      <span v-if="!investor.enabled" class="badge bg-dark">Не активен</span>-->
<!--                    </span>-->
<!--                    <span class="cursor-pointer" @click="investor.blocked = !investor.blocked">-->
<!--                      <span v-if="investor.blocked" class="badge bg-danger" title="Нажмите, чтобы разблокировать пользователя"><IconsLocked/></span>-->
<!--                      <span v-if="!investor.blocked" class="badge bg-success" title="Нажмите, чтобы заблокировать пользователя"><IconsUnlocked/></span>-->
<!--                    </span>-->
                    <h4>{{ investor.firstName }} {{ investor.lastName }}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="light:card dark:card-dark mt-3">
              <ul class="list-group list-group-flush">
                <li class="d-flex justify-content-between align-items-center flex-wrap">
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <div class="light:card dark:card-dark mb-3 light:text-dark dark:text-white">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Фамилия</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="LastName"
                      type="text"
                      v-model="investor.lastName"
                      class="w-50"
                      :class="{ 'is-invalid': v$.investor.lastName.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.investor.lastName.$touch"
                    />
                    <div
                      v-if="v$.investor.lastName.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Имя</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="FirstName"
                      type="text"
                      v-model="investor.firstName"
                      class="w-50"
                      :class="{ 'is-invalid': v$.investor.firstName.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.investor.firstName.$touch"
                    />
                    <div
                      v-if="v$.investor.firstName.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Отчество</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Patronymic"
                      type="text"
                      v-model="investor.patronymic"
                      class="w-50"
                      :class="{ 'is-invalid': v$.investor.patronymic.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.investor.patronymic.$touch"
                    />
                    <div
                      v-if="v$.investor.patronymic.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Телефон</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="PhoneNumber"
                      type="text"
                      v-model="investor.phoneNumber"
                      class="w-50"
                      :class="{ 'is-invalid': v$.investor.phoneNumber.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.investor.phoneNumber.$touch"
                    />
                    <div
                      v-if="v$.investor.phoneNumber.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Телеграм</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-autocomplete
                      id="Telegram"
                      class="w-50"
                      v-model="investor.chatId"
                      :fetch-suggestions="handleChatUsers"
                      placeholder="Поиск по пользователям бота..."
                      :popper-append-to-body="false"
                      :trigger-on-focus="true"
                      debounce="300"
                      @input="handleChatUsersSearch"
                      @select="handleChatUsersSelect"
                      fit-input-width
                    >
                      <template #default="{ item }">
                        <div>{{ item.firstName }} {{ item.lastName }} {{ item.phoneNumber }}</div>
                      </template>
                    </el-autocomplete>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Адрес</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Address"
                      type="text"
                      v-model="investor.address"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Дата рождения</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-date-picker
                      id="Birthdate"
                      v-model="formattedBirthDate"
                      type="date"
                      placeholder="Выберите дату"
                      format="DD.MM.YYYY"
                      class="w-50"
                      size="default"
                      @keydown.enter="formatDataIfCanBirthday"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Место рождения</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="BirthPlace"
                      type="text"
                      v-model="investor.birthPlace"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr class="mb-10">
                <h3>Паспортные данные</h3>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Серия номер паспорта</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Passport"
                      type="text"
                      v-model="formattedPassportNum"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                      maxlength="11"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Дата выдачи</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-date-picker
                      id="IssueDate"
                      v-model="formattedIssueDate"
                      type="date"
                      placeholder="Выберите дату"
                      format="DD.MM.YYYY"
                      class="w-50"
                      size="default"
                      @keydown.enter="formatDataIfCanIssued"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Кем выдан паспорт</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="IssueName"
                      type="text"
                      v-model="investor.issueName"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Код подразделения</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="IssueCode"
                      type="text"
                      v-model="formattedPassportIssueCode"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                      maxlength="7"
                    />
                  </div>
                </div>
                <hr class="mb-10">
                <h3>Реквизиты счета</h3>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Минимальная сумма займа</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="MinLoanSum"
                      type="text"
                      v-model="investor.minLoanSum"
                      class="w-50"
                      :class="{ 'is-invalid': v$.investor.minLoanSum.$error }"
                      :parser="(value) => value.replace(/\$\s?|( *)/g, '')"
                      :formatter="
                        (value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                      "
                      maxlength="12"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.investor.minLoanSum.$touch"
                    />
                    <div
                      v-if="v$.investor.minLoanSum.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Расчетный счет</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="CurrentAccount"
                      type="text"
                      v-model="investor.currentAccount"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Корреспондентский счет</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="CorespondeAccount"
                      type="text"
                      v-model="investor.corespondeAccount"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Наименование банка</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="BankName"
                      type="text"
                      v-model="investor.bankName"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">ИНН</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Inn"
                      type="text"
                      v-model="investor.inn"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">БИК</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Bik"
                      type="text"
                      v-model="investor.bik"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                    />
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-12 d-flex justify-content-end">
                    <button class="btn-custom btn-main d-flex align-items-center" @click.prevent="putInvestor(investor)">
                      <IconsSaveIcon class="mr-1" />Сохранить</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row gutters-sm">
              <div class="col-sm-6 mb-3">
                <div class="light:card dark:card-dark h-100">
                  <div class="card-body investor-select-none">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isLoading" class="justify-content-center text-center">
    <div class="spinner-grow light:text-dark dark:text-white" role="status">
      <span class="sr-only">Загрузка..</span>
    </div>
  </div>
  <div v-else>
    <h3 class="text-center">Инвестор с таким id не найден.</h3>
  </div>
</template>

<script>
import { getInvestor, putInvestor, getAllChatUsers } from '~/composables/useFetchInvestors'
import IconsTelegram from '~/components/Icons/IconsTelegram.vue'
import dayjs from 'dayjs'
import { highlightElementByValidation, clearBackendErrorClass } from '~/utils/backendValidation'
import { showModal, toast } from "~/utils/alerts";
import { inject } from 'vue'
import { helpers, numeric, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { convertToDate } from '~/composables/formating/formatData.ts'

export default {
  name: "UserEdit",
  components: { IconsTelegram },
  props: {
    investorId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const alphaRu = helpers.regex(/^[a-zA-Zа-яА-Я]*$/)
    const phoneNumber = helpers.regex(/^[0-9+]+$/)
    const dataPositions = inject('dataPositions')
    return { v$: useVuelidate(), alphaRu, dataPositions, phoneNumber }
  },
  data() {
    return {
      isLoading: false,
      investor: {},
      chatUsers: [], // Подписавшиеся люди в боте, для соотношения
      debounceTimer: null,
    }
  },
  validations() {
    return {
      investor: {
        firstName: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          alphaRu: helpers.withMessage(
            'Поле должно содержать только буквы.',
            this.alphaRu
          ),
        },
        lastName: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          alphaRu: helpers.withMessage(
            'Поле должно содержать только буквы.',
            this.alphaRu
          ),
        },
        patronymic: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          alphaRu: helpers.withMessage(
            'Поле должно содержать только буквы.',
            this.alphaRu
          ),
        },
        address: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
        },
        phoneNumber: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          phoneNumber: helpers.withMessage(
            'Поле должно содержать номер телефона.',
            this.phoneNumber
          ),
        },
        minLoanSum: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          numeric: helpers.withMessage(
            'Поле может содержать только цифры.',
            numeric
          ),
        },
      },
    }
  },
  computed: {
    formattedPassportIssueCode: {
      get() {
        return this.investor.issueCode;
      },
      set(value) {
        let formatted = value.replace(/-/g, '');
        if (formatted.length > 3) {
          formatted = `${formatted.slice(0, 3)}-${formatted.slice(3, 6)}`;
        }
        this.investor.issueCode = formatted
      }
    },
    formattedPassportNum: {
      get() {
        return this.investor.passport;
      },
      set(value) {
        let formatted = value.replace(/\s/g, '');
        if (formatted.length > 4) {
          formatted = `${formatted.slice(0, 4)} ${formatted.slice(4, 10)}`;
        }
        this.investor.passport = formatted
      }
    },
    formattedBirthDate: {
      get() {
        const dateString = dayjs(this.investor.birthDate, 'YYYY-MM-DD').format(
          'YYYY-MM-DD'
        )
        return dateString
      },
      set(newValue) {
        // Преобразование нового значения в соответствии с ожидаемым форматом
        const formattedDate = dayjs(newValue).format('YYYY-MM-DD')
        // Обновление значения переменной user.birthdate
        this.investor.birthDate = formattedDate
      },
    },
    formattedIssueDate: {
      get() {
        const dateString = dayjs(this.investor.issueDate, 'YYYY-MM-DD').format(
          'YYYY-MM-DD'
        )
        return dateString
      },
      set(newValue) {
        // Преобразование нового значения в соответствии с ожидаемым форматом
        const formattedDate = dayjs(newValue).format('YYYY-MM-DD')
        // Обновление значения переменной user.issueDate
        this.investor.issueDate = formattedDate
      },
    },
  },
  async mounted() {
    await this.getInvestorById(this.investorId)
  },
  methods: {
    convertToDate,
    formatDataIfCanBirthday(value) {
      if (value.target.value.length === 8) {
        const newValue = convertToDate(value.target.value.toString())
        value.target.value = newValue
        this.investor.birthDate = newValue
      }
    },
    formatDataIfCanIssued(value) {
      if (value.target.value.length === 8) {
        const newValue = convertToDate(value.target.value.toString())
        value.target.value = newValue
        this.investor.issueDate = newValue
      }
    },
    async handleChatUsers(search, cb) {
      await this.getInvestorsInTelegram(search)
      cb(this.chatUsers)
    },
    handleChatUsersSelect(user) {
      this.investor.phoneNumber = user.phoneNumber;
      this.investor.chatId = user.chatId;
    },
    // * Обработчик ввода в поле поиска пользователей
    handleChatUsersSearch(search) {

    },
    // * Получаем пользователей которые подписались на бот
    async getInvestorsInTelegram(search) {
      this.isLoading = true
      try {
        const res = await getAllChatUsers(search)
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
          this.chatUsers = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Получение пользователя по его Id
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
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          this.investor = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Метод меняет "" на null в обьекте
    async replaceEmptyWithNull(investor) {
      for (let prop in investor) {
        if (typeof investor[prop] === 'object' && investor[prop] !== null) {
          await this.replaceEmptyWithNull(investor[prop])
        } else if (investor[prop] === '' && prop !== 'minLoadSum') {
          investor[prop] = null
        }
      }
    },
    // * Изменение пользователя
    async putInvestor(investor) {
      await this.v$.$validate()

      if (this.v$.$error) {
        console.log('Валидация не пройдена')
        console.log(this.v$.$errors)
        return
      }

      if (investor.birthDate === 'Invalid Date') {
        investor.birthDate = null
      }

      if (investor.issueDate === 'Invalid Date') {
        investor.issueDate = null
      }

      await this.replaceEmptyWithNull(investor)
      this.isLoading = true
      try {
        const res = await putInvestor(investor)
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
          toast('Инвестор успешно изменен', 'success')
          setTimeout(function () {
            navigateTo('/investors/' + investor.id)
          }, 1500)
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0,0,0,.125);
  border-radius: .25rem;
}

.card-dark {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #181f25;
  background-clip: border-box;
  border: 0 solid rgba(0,0,0,.125);
  border-radius: .25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3, .my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}
</style>
