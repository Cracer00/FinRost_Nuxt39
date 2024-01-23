<script lang="ts" setup>
// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: "Нет такой страницы",
  meta: [
    {
      name: 'description',
      content: "Не могу найти запрошенную страницу.",
    },
  ],
}))
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Нет такой страницы" />
    </PageHeader>
    <PageBody>
      <PageSection>

      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
