<script lang="ts" setup>
import UserCreate from "~/components/Viewports/UserCreate.vue";

definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "Создание пользователя",
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
      <PageTitle text="Создание нового пользователя" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <UserCreate/>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
