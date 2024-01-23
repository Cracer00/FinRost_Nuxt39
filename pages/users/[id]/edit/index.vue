<script lang="ts" setup>
definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: 'Редактирование профиля',
  meta: [
    {
      name: "",
      content: ""
    },
  ],
}));

const route = useRoute();
const userId = route.params.id;
</script>

<script lang="ts">
export default {};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Редактирование пользователя" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <ViewportsUserEdit :user-id="userId.toString()"/>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
