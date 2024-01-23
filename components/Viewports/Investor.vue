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
                    <!--                    <span class="mr-1 investor-select-none">-->
                    <!--                      <span v-if="investor.enabled" class="badge bg-success">Активен</span>-->
                    <!--                      <span v-if="!investor.enabled" class="badge bg-dark">Не активен</span>-->
                    <!--                    </span>-->
<!--                    <span class="investor-select-none">-->
<!--                      <span v-if="investor.blocked" class="badge bg-danger" title="Нажмите, чтобы разблокировать пользователя"><IconsLocked/></span>-->
<!--                      <span v-if="!investor.blocked" class="badge bg-success" title="Нажмите, чтобы заблокировать пользователя"><IconsUnlocked/></span>-->
<!--                    </span>-->
                    <h4>{{ investor.firstName }} {{ investor.lastName }}</h4>
                    <div class="mb-3"></div>
                    <button v-if="false" class="btn-custom btn-main align-items-center justify-content-center">Сообщение</button>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
          <div class="col-md-8">
            <div class="light:card dark:card-dark mb-3 light:text-dark dark:text-white">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Полное имя</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.fullName }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Телефон</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.phoneNumber }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Телеграм</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.chatId }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Адрес</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.address }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Дата рождения</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ formattedBirthDate }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Место рождения</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.birthPlace }}
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
                    {{ investor.passport }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Дата выдачи</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ formattedIssueDate }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Кем выдан паспорт</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.issueName }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Код подразделения</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.issueCode }}
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
                    {{ formatPrice(investor.minLoanSum) }} ₽
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Расчетный счет</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.currentAccount }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Корреспондентский счет</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.corespondeAccount }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Наименование банка</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.bankName }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">ИНН</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.inn }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">БИК</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ investor.bik }}
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-12 d-flex justify-content-end">
                    <button class="btn-custom btn-main" @click.prevent="editInvestor(investor.id)">Редактировать</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row gutters-sm">
              <div class="col-sm-6 mb-3">
                <div class="light:card dark:card-dark h-100">

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
import { getAllInvestors, getInvestor } from '~/composables/useFetchInvestors'
import IconsTelegram from "~/components/Icons/IconsTelegram.vue";
import dayjs from "dayjs";

export default {
  name: "Investor",
  components: { IconsTelegram },
  props: {
    investorId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      investor: {},
    }
  },
  computed: {
    formattedBirthDate: {
      get() {
        if (!this.investor.birthDate) {
          return ''; // Возвращаем пустую строку, если investor.issueDate пустой
        }

        const dateString = dayjs(this.investor.birthDate, 'YYYY-MM-DD').format(
          'DD.MM.YYYY'
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
        if (!this.investor.issueDate) {
          return ''; // Возвращаем пустую строку, если investor.issueDate пустой
        }

        const dateString = dayjs(this.investor.issueDate, 'YYYY-MM-DD').format(
          'DD.MM.YYYY'
        )
        return dateString
      },
      set(newValue) {
        // Преобразование нового значения в соответствии с ожидаемым форматом
        const formattedDate = dayjs(newValue).format('YYYY-MM-DD')
        // Обновление значения переменной user.birthdate
        this.investor.issueDate = formattedDate
      },
    },
  },
  async mounted() {
    await this.getInvestorById(this.investorId)
  },
  methods: {
    formatPrice(price) {
      return this.formatNumberWithSpaces(price.toLocaleString('ru-RU')) // Используйте свою локаль, если требуется
    },
    formatNumberWithSpaces(inputString) {
      if (inputString !== null) {
        return inputString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      } else {
        return '0'
      }
    },
    async editInvestor(investorId) {
      await navigateTo('/investors/' + investorId + '/edit')
    },
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
  }
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
