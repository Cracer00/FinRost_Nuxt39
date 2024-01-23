<script lang="ts" setup>
import BackErrorsLog from "~/components/Tables/BackErrorsLog.vue";

definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "Журнал ошибок",
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
      <PageTitle text="Журнал ошибок" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <BackErrorsLog/>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
