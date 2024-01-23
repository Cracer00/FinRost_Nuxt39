<script setup>
import Order from "~/components/Viewports/Order.vue";

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
export default {
  data() {
    return {
      orderId: null,
    }
  },
  created() {
    const route = useRoute()
    this.orderId = route.params.id
  }
};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <Order :order-id="orderId" />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
