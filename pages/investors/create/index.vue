<script lang="ts" setup>
definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "Добавить инвестора",
  meta: [
    {
      name: "",
      content: ""
    }
  ]
}));
</script>

<script lang="ts">
export default {};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Добавить инвестора" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <ViewportsInvestorCreate/>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
