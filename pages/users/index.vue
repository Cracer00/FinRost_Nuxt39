<script lang="ts" setup>
import Users from "~/components/Tables/Users.vue";
import UsersModern from "~/components/Tables/UsersModern.vue";

definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "Пользователи",
  meta: [
    {
      name: 'Пользователи',
      content: ""
    }
  ]
}));
</script>

<script lang="ts">
export default {}
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Пользователи" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <UsersModern/>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
