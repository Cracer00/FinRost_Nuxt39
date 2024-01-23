<template>
  <!-- Спиннер загрузки -->
  <transition name="slide-fade">
    <div id="loadingSpinner">
      <div v-if="isLoading && isFullScreen" class="fullScreenSpinner">
        <div class="spinner-border m-0 me-1 border-1" role="status"></div>
      </div>
      <div v-if="isLoading && !isFullScreen" style="width: 5rem; height: 5rem;" class="spinner-grow text-success" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.fullScreenSpinner {
  position: fixed;
  top: 0;
  display: flex;
  left: 0;
  z-index: 1055;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffffe0;
}

.fullScreenSpinner .spinner-border {
  width: 14rem;
  height: 14rem;
}
</style>
