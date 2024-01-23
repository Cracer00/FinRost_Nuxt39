<template>
  <div>
    <div class="container">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-8">
            <div
              class="light:card dark:card-dark mb-3 light:text-dark dark:text-white"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Наименование</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Name"
                      v-model="lot.name"
                      type="text"
                      class="w-50 el-input-main-dark"
                      :class="{ 'is-invalid': v$.lot.name.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.lot.name.$touch"
                    />
                    <div v-if="v$.lot.name.$error" class="is-invalid-text">
                      {{ v$.$errors[0].$message }}
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Тип залога</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="PledgeType"
                      v-model="lot.pledgeType"
                      type="text"
                      class="w-50 el-input-main-dark"
                      :class="{ 'is-invalid': v$.lot.pledgeType.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.lot.pledgeType.$touch"
                    />
                    <div v-if="v$.lot.pledgeType.$error" class="is-invalid-text">
                      {{ v$.$errors[0].$message }}
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Площадь</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Square"
                      v-model="lot.square"
                      type="text"
                      class="w-50"
                      :class="{ 'is-invalid': v$.lot.square.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.lot.square.$touch"
                    />
                    <div
                      v-if="v$.lot.square.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Площадь участка</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="LandSquare"
                      v-model="lot.landSquare"
                      type="text"
                      class="w-50"
                      :class="{ 'is-invalid': v$.lot.square.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.lot.landSquare.$touch"
                    />
                    <div
                      v-if="v$.lot.landSquare.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Адрес</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Address"
                      v-model="lot.address"
                      type="text"
                      class="w-50"
                      @change="clearBackendErrorClass($event.target)"
                      :class="{ 'is-invalid': v$.lot.address.$error }"
                      @input="v$.lot.address.$touch"
                    />
                    <div
                      v-if="v$.lot.address.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Процентная ставка</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="MainPercent"
                      v-model="lot.mainPercent"
                      type="text"
                      maxlength="2"
                      class="w-50"
                      :class="{ 'is-invalid': v$.lot.mainPercent.$error }"
                      @change="clearBackendErrorClass($event.target)"
                      @input="v$.lot.mainPercent.$touch"
                    />
                    <div
                      v-if="v$.lot.mainPercent.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Цена</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <el-input
                      id="Price"
                      v-model="lot.price"
                      type="text"
                      class="w-50"
                      :parser="(value) => value.replace(/\$\s?|( *)/g, '')"
                      :formatter="
                        (value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                      "
                      @change="clearBackendErrorClass($event.target)"
                      :class="{ 'is-invalid': v$.lot.price.$error }"
                      @input="v$.lot.price.$touch"
                    />
                    <div
                      v-if="v$.lot.price.$error"
                      class="is-invalid-text"
                    >
                      {{ v$.$errors[0].$message }}.
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-12 d-flex justify-content-end">
                    <button
                      class="btn-custom btn-main d-flex align-items-center"
                      @click.prevent="createLot(lot)"
                    >
                      <IconsSaveIcon class="mr-1" />Добавить лот
                    </button>
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
          <div class="col-md-4 mb-3">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { helpers, numeric, required } from "@vuelidate/validators";
import { inject } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { postLot } from '~/composables/useFetchLots'
import {
  highlightElementByValidation,
  clearBackendErrorClass,
} from '~/utils/backendValidation'

export default {
  name: 'LotCreate',
  props: {
    orderId: 0,
  },
  setup() {
    const alphaRu = helpers.regex(/^[a-zA-Zа-яА-Я ]*$/)
    const numericDot = helpers.regex(/^[0-9,.]+$/)
    const dataPositions = inject('dataPositions')
    return { v$: useVuelidate(), alphaRu, dataPositions, numericDot}
  },
  data() {
    return {
      isLoading: false,
      lot: {
        orderId: this.orderId,
        name: '',
        investorId: 0,
        pledgeType: '',
        square: 0,
        landSquare: '',
        address: '',
        price: 0,
      },
    }
  },
  validations() {
    return {
      lot: {
        pledgeType: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          alphaRu: helpers.withMessage(
            'Поле должно содержать только буквы.',
            this.alphaRu
          ),
        },
        square: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          numericDot: helpers.withMessage(
            'Поле должно содержать только цифры.',
            this.numericDot
          ),
        },
        landSquare: {

        },
        mainPercent: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          numericDot: helpers.withMessage(
            'Поле должно содержать только цифры.',
            this.numericDot
          ),
        },
        name: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
        },
        address: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
        },
        price: {
          required: helpers.withMessage(
            'Поле должно быть заполнено.',
            required
          ),
          numericDot: helpers.withMessage(
            'Поле должно содержать только цифры.',
            this.numericDot
          ),
        },
      },
    }
  },
  methods: {
    clearBackendErrorClass,
    // * Создание лота
    async createLot(lot) {
      // Проверка валидации
      await this.v$.$validate()

      if (this.v$.$error) {
        console.log('Валидация не пройдена')
        return
      }
      // Продолжение
      this.isLoading = true
      try {
        const tempLot = {
          address: lot.address,
          mainPercent: lot.mainPercent,
          name: lot.name,
          investorId: lot.investorId,
          orderId: parseInt(lot.orderId),
          pledgeType: lot.pledgeType,
          price: parseInt(lot.price),
          square: lot.square.toString(),
          landSquare: lot.landSquare.toString(),
        }
        const res = await postLot(tempLot)
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
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
          toast('Лот успешно создан', 'success')
          setTimeout(function () {
            navigateTo('/orders/' + lot.orderId)
          }, 1000)
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

</style>
