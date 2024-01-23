<script lang="ts" setup>
definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "",
  meta: [
    {
      name: "",
      content: ""
    }
  ]
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
      <PageTitle text="" class="h5" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <ViewportsUser :user-id="userId.toString()" />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
