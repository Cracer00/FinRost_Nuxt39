<script setup>
// composable
import nuxtStorage from "nuxt-storage/dist/nuxt-storage.min";
import useFetchData from '~/composables/useFetchData'
import { showModal, toast } from '~/utils/alerts'
import { highlightElementByValidation } from '~/utils/backendValidation'
const { fetchData } = useFetchData()

const selectedOption = ref(0);

// meta
definePageMeta({
  layout: "page"
});

async function testFetchValidation() {
  try {
    const res = await fetchData('test/validation/', {
      // 0 - Ошибка валидации, 1 - Простая ошибка, 2 - Успешный запрос (200)
      method: 'POST',
      body: {
        resType: parseInt(selectedOption.value),
      }
    });
    console.log(res);
    if (res.type !== 'SUCCESS') {
      // Если ошибка
      // Далее проверки по типам ошибок
      // ? Обычная ошибка
      if (res.type === 'SIMPLE_ERROR') {
        console.log('testFetch: Обычная ошибка');
      }
      // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
      else if (res.type === 'VALIDATION_ERROR') {
        await highlightElementByValidation(res.errors)
        console.log('\x1b[36m%s\x1b[0m', 'testFetch: Ошибка валидации');
      }
      // ? Неизвестная ошибка
      else if (res.type === 'UNKNOWN_ERROR') {
        console.log('\x1b[36m%s\x1b[0m', 'testFetch: Неизвестная ошибка');
      }
    } else { // Если запрос успешно выполнен
      console.log('Выполнено');
    }
  } catch (e) {
    console.error('Ошибка catch: ', e)
  }
}
</script>

<template>
  <PageWrapper class="h-full">
    <PageHeader>
      <PageTitle text="Главная страница" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      {{ selectedOption }}
      <div>
        <input type="radio" id="validation-error" value="0" v-model="selectedOption" name="errorType">
        <label for="validation-error">Ошибка валидации</label>

        <input type="radio" id="simple-error" v-model="selectedOption" value="1" name="errorType">
        <label for="simple-error">Простая ошибка</label>

        <input type="radio" id="successful-request" value="2" v-model="selectedOption" name="errorType">
        <label for="successful-request">Успешный запрос</label>
      </div>
      <div>
        <button @click="testFetchValidation">Отправить запрос</button><br/>
        <button @click="showModal('Ошибка', 'error')">Модальное с ошибкой</button><br/>
        <button @click="showModal('Предупреждение', 'warn')">Модальное с предупреждением</button><br/>
        <button @click="showModal('Информация', 'info')">Модальное с информацией</button><br/>
        <button @click="showModal('Выполнено', 'success')">Модальное с успехом</button>
      </div>
      <input class="input-main mr-1" id="Login" ref="Login" type="text">
      <input class="input-main" id="Password" ref="Password" type="text">
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random
        text. It has roots in a piece of classical Latin literature from 45 BC,
        making it over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random
        text. It has roots in a piece of classical Latin literature from 45 BC,
        making it over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
      <!-- -->
    </PageBody>
  </PageWrapper>
</template>

<style lang="scss">
@import '../assets/sass/variables';

@keyframes anim-fg-1 {
  0%,
  16.667%,
  100% {
    opacity: 1;
  }

  33.333%,
  83.333% {
    opacity: 0;
  }
}

@keyframes anim-fg-2 {
  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }

  33.333%,
  50% {
    opacity: 1;
  }
}

@keyframes anim-fg-3 {
  0%,
  50%,
  100% {
    opacity: 0;
  }

  66.667%,
  83.333% {
    opacity: 1;
  }
}

.animated-text-bg {
  position: relative;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  content: var(--content);
  display: block;
  width: 100%;
  color: theme('colors.slate.800');
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-left: $padding;
  padding-right: $padding;

  &:before {
    content: var(--content);
    position: absolute;
    display: block;
    width: 100%;
    color: theme('colors.slate.800');
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: $padding;
    padding-right: $padding;
  }
}

.animated-text-fg {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: $padding;
  padding-right: $padding;
  background-image: linear-gradient(
      90deg,
      var(--start-color),
      var(--end-color)
  );
  position: relative;
  opacity: 0;
  z-index: 1;
  animation: var(--animation-name) 8s infinite;
}

html.dark {
  .animated-text-bg {
    color: theme('colors.gray.100');

    &:before {
      color: theme('colors.gray.100');
    }
  }
}

.triangle-shape {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 40px solid theme('colors.green.600');
  transform: translate(-15rem, -6rem) rotate(45deg);
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
