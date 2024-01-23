<script lang="ts" setup>
import Investors from "~/components/Tables/Investors.vue";

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
      <PageTitle text="" class="h5" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <ViewportsInvestor :investor-id="investorId.toString()"/>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
