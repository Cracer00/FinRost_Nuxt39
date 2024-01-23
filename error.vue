<script lang="ts" setup>
// compiler macro
definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "Нет такой страницы",
  meta: [
    {
      name: "description",
      content: "Не могу найти запрошенную страницу."
    }
  ]
}));
</script>

<template>
  <PageWrapper>
    <PageHeader>
    </PageHeader>
    <PageBody>
      <PageSection>
        <section class="container mx-auto px-5 py-24 text-gray-400">
          <div class="justify-content-center text-center align-items-center">
<!--            <div class="logo-wrapper w-50 m-auto mb-20">-->
<!--              <img src="/login-logo.png" alt="Финрост лого" />-->
<!--            </div>-->
            <div>
              <h1 class="text-center mb-4">Нет такой страницы</h1>
            </div>
            <h3 class="text-center mb-4">По вашему запросу не найдено ни одной страницы. Возможно, страницы будет доступна позднее. Нажмите на кнопку ниже, чтобы вернуться на главную.</h3>
            <Button
              class="m-auto w-25 rounded border-0 bg-green-500 py-2 px-8 font-bold text-white transition-colors duration-500 hover:bg-green-600 focus:outline-none">
              <NuxtLink to="/" class="text-center text-white text-decoration-none">Вернуться на главную</NuxtLink>
            </Button>
          </div>
        </section>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
