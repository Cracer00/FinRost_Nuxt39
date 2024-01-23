<template>
  <input
    :value="vmodel"
    :type="type"
    :class="{ invalid: hasError, [className]: true }"
    :autocomplete="autocomplete"
    :name="name"
    @input="updateInput"
  />
  <div v-if="hasError" className="error-message text-center">
    <div className="error-message-text">{{ errorMessages[0] }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    className: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    name: {
      type: String,
      default: '',
    },
    vmodel: {
      type: Object,
      required: true,
    },
    validationRules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      errorMessages: [],
      validationStates: [],
    };
  },
  computed: {
    hasError() {
      return this.errorMessages.length > 0;
    },
    hasNoErrors() {
      return this.errorMessages.length === 0;
    },
  },
  watch: {
    vmodel: {
      handler(value) {
        this.validateInput(value);
      },
      deep: true,
    },
  },
  methods: {
    updateInput(event) {
      const value = event.target.value;
      this.validateInput(value);
      this.$emit('update:vmodel', value);
    },
    validateInput(value) {
      this.errorMessages = [];
      this.validationStates = [];

      this.validationRules.forEach((rule) => {
        // ? Поле не может быть пустым
        if (rule === 'notNull') {
          if (value === '') {
            this.errorMessages.push('Поле не может быть пустым');
            this.validationStates.push(false);
          }
        }
        // ? Только числа
        if (rule === 'onlyNumbers') {
          if (!/^\d+$/.test(value)) {
            this.errorMessages.push('Поле должно содержать только цифры');
            this.validationStates.push(false);
          }
        }

        // ? Только буквы латинского алфавита и кириллицы
        if (rule === 'onlyLetters') {
          if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(value)) {
            this.errorMessages.push('Поле должно содержать только буквы');
            this.validationStates.push(false);
          }
        }

        // ? Формат email
        if (rule === 'email') {
          if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            this.errorMessages.push('Поле должно содержать email адрес');
            this.validationStates.push(false);
          }
        }
      });

      if (this.errorMessages.length === 0) {
        this.validationStates.push(true);
      }

      this.$emit('validation-error', this.errorMessages);
      this.$emit('validation-state', this.validationStates);
    },
  },
};
</script>

<style scoped>
.invalid {
  border: 1px solid red;
}

.error-message {
  position: absolute;
  padding: 5px;
  left: 100px;
  top: -60px;
  width: 400px;
  height: 40px;
  background-color: #ffffff;
  border: darkred solid 1px;
  border-radius: 10px;
  color: black;
  margin-top: 5px;
  z-index: 9999;
}
</style>
