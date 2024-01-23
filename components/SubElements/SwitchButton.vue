<template>
  <button class="switchButton" @click="toggleButton">
    <span v-if="buttonEnabled" title="Показать заблокированных пользователей">
      <IconsUserBordered />
    </span>
    <span v-else title="Скрыть заблокированных пользователей">
      <IconsUserBorderedBanned />
    </span>
  </button>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    buttonEnabled: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    toggleButton() {
      this.$emit('update:button-enabled', !this.buttonEnabled)
    }
  },
}
</script>

<style>
.switchButton {
  width: 25px;
  height: 25px;
}
</style>
