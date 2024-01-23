<script lang="ts" setup>
import Investors from "~/components/Tables/Investors.vue";
import InvestorsModern from "~/components/Tables/InvestorsModern.vue";

definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "Инвесторы",
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
      <PageTitle text="Инвесторы" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <InvestorsModern />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
