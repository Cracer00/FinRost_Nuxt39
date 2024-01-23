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
const investorId = route.params.id;
</script>

<script lang="ts">
export default {};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Редактирование инвестора" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <ViewportsInvestorEdit :investor-id="investorId.toString()" />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
