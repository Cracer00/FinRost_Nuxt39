<script lang="ts" setup>
import LotCreate from "~/components/Viewports/LotCreate.vue";

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
const routeFP = route.fullPath;
const orderId = routeFP.split('/')[2];
</script>

<script lang="ts">
export default {

};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Добавить лот" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <LotCreate :order-id="orderId" />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
