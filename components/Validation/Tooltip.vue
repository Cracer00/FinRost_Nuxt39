<template>
  <slot></slot>
  <div v-if="showTooltip" class="tooltip">
    {{ tooltipText }}
  </div>
</template>

<script>
export default {
  props: {
    tooltipText: {
      type: String,
      required: true,
    },
    showTooltip: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  width: 400px;
  height: 60px;
  top: -20px;
  left: 0;
  background-color: #ffffff;
  color: #000000;
  padding: 5px;
  border-radius: 3px;
  z-index: 9999;
}
</style>
