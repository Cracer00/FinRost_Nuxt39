<template>
  <footer class="footer">
    <section class="max-w-8xl mx-auto flex-1 flex w-full">
      <div class="w-full py-4 text-center md:text-left">
        <div class="mb-1">

        </div>
      </div>
    </section>
  </footer>
</template>

<script setup lang="ts">
import { AppConfigInput } from '@nuxt/schema'
import p from './../../package.json'
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px;
  text-align: center;
}
</style>
