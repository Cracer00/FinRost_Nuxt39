<script lang="ts" setup>
import OrdersList from "~/components/Viewports/OrdersList.vue";
import OrdersListTable from "~/components/Viewports/OrdersListTable.vue";

definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: "Договоры",
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
      <PageTitle text="Договоры" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <OrdersListTable />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
