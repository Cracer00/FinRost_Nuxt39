<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot />
      <slot name="footer">
        <PageFooter />
      </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },
  mounted() {},
  beforeUnmount() {},
  methods: {},
}
</script>
