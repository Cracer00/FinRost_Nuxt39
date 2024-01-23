<script lang="ts" setup>
import NotificationGroups from "~/components/Viewports/NotificationGroups.vue";

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

<script lang="ts">
export default {
  name: 'Notifications',
}
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Группы уведомлений" class="h5 text-center" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <NotificationGroups />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
