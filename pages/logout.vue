<script setup>
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
</script>

<script>
import nuxtStorage from "nuxt-storage/nuxt-storage";
export default {
  mounted() {
    nuxtStorage.localStorage.removeItem('token')
    navigateTo('/login')
  },
};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="" class="h5" />
    </PageHeader>
    <PageBody>
      <PageSection>

      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
