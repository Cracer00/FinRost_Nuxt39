<script lang="ts" setup>
import LotEdit from "~/components/Viewports/LotEdit.vue";

definePageMeta({
  layout: "page"
});
useHead(() => ({
  title: 'Редактирование лота',
  meta: [
    {
      name: "",
      content: ""
    },
  ],
}));

const route = useRoute();
const orderId = route.params.id;
</script>

<script lang="ts">
export default {};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Редактирование лота" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <LotEdit :order-id="orderId.toString()"/>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
