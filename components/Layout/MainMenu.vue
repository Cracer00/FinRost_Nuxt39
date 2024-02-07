<template>
  <nav class="user-select-none">
    <el-menu
      :default-active="currentRoute"
      router
      class="el-menu-vertical-demo no-right-border"
      text-color="#1d83ee"
    >
      <el-menu-item index="/" class="text-menu">
        <NuxtLink class="d-flex align-items-center text-decoration-none"
          ><IconsHouseFilled class="mr-2 menu-icons" />Главная</NuxtLink
        >
      </el-menu-item>
      <el-menu-item index="/users" class="text-menu">
        <NuxtLink
          class="d-flex align-items-center text-decoration-none"
          ><IconsUsersIcon class="mr-2 menu-icons" /> Пользователи</NuxtLink
        >
      </el-menu-item>
      <el-menu-item index="/investors" class="text-menu">
        <NuxtLink
          class="d-flex align-items-center text-decoration-none"
          ><IconsRubleFill class="mr-2 menu-icons" />Инвесторы</NuxtLink
        >
      </el-menu-item>
      <el-menu-item index="/orders" class="text-menu">
        <NuxtLink
          class="d-flex align-items-center text-decoration-none"
          ><IconsContract class="mr-2 menu-icons" />Договоры</NuxtLink
        >
      </el-menu-item>
      <el-sub-menu v-if="isShownForIt" index="/admin" class="text-menu">
        <template #title>
          <IconsAdminBadge class="mr-2 menu-icons" />
          <span class="text-menu">Управление</span>
          <el-popover
            placement="top-start"
            title="Скрытый элемент"
            :width="225"
            trigger="hover"
            content="Элемент меню заблокирован для остальных пользователей, но доступен вам."
          >
            <template #reference>
              <IconsUnlocked class="ml-1 menu-icons"/>
            </template>
          </el-popover>
        </template>
        <el-menu-item-group title="Настройки">
          <el-menu-item index="/admin/notifications" class="text-menu-sub">
            <NuxtLink
              class="d-flex align-items-center text-decoration-none"
              ><IconsNotificationIcon class="mr-2 menu-icons" />Группы
              уведомлений</NuxtLink
            >
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Логирование" class="text-menu-sub">
          <el-menu-item index="/admin/logs">
            <NuxtLink
              class="d-flex align-items-center text-decoration-none"
              ><IconsErrorIcon class="mr-2 menu-icons" />Журнал ошибок</NuxtLink
            ></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
    <!-- Старое меню
    <li class="nav-item">
      <NuxtLink class="nav-link d-flex align-items-center" :class="{ active: $route.path === '/' }" to="/"
        ><IconsHouse class="mr-1"/> Главная</NuxtLink
      >
    </li>
    <li class="nav-item">
      <NuxtLink
        class="nav-link d-flex align-items-center"
        :class="{ active: $route.path === '/users' }"
        to="/users"
        ><IconsUsersIcon class="mr-1"/> Пользователи</NuxtLink
      >
    </li>
    <li class="nav-item">
      <NuxtLink
        class="nav-link d-flex align-items-center"
        :class="{ active: $route.path === '/investors' }"
        to="/investors"
        ><IconsRubleFill class="mr-1"/>Инвесторы</NuxtLink
      >
    </li>
    <li class="nav-item">
      <NuxtLink
        class="nav-link d-flex align-items-center"
        :class="{ active: $route.path === '/orders' }"
        to="/orders"
        ><IconsContract class="mr-1"/>Договора</NuxtLink
      >
    </li>
    <li v-if="isShownForIt" class="nav-item">
      <NuxtLink
        class="nav-link d-flex align-items-center"
        :class="{ active: $route.path === '/logs' }"
        to="/logs"
      ><IconsErrorIcon class="mr-1"/>Журнал ошибок</NuxtLink
      >
    </li>
    <li v-if="isShownForIt" class="nav-item">
      <NuxtLink
        class="nav-link d-flex align-items-center"
        :class="{ active: $route.path === '/notifications' }"
        to="/notifications"
      ><IconsNotificationIcon class="mr-1"/>Группы уведомлений</NuxtLink
      >
    </li>-->
  </nav>
</template>

<script>
import { inject } from 'vue'
import IconsContract from '~/components/Icons/IconsContract.vue'

export default {
  name: 'MainMenu',
  components: { IconsContract },
  inject: {
    loggedUser: {
      from: 'loggedUser',
    },
  },
  data() {
    return {
      isLoading: false,
      currentRoute: '/',
    }
  },
  computed: {
    isShownForIt() {
      if (this.loggedUser.id === 1 || this.loggedUser.id === 4) {
        return true
      } else return false
    },
  },
  mounted() {
    this.currentRoute = this.$route.path;
  },
  methods: {},
}
</script>

<style scoped>
.nav-link {
  color: #1d83ee;
}

.is-active a {
  color: #89bd23;
}
.is-active.el-menu-item-group__title {
  background-color: #1d83ee;
}
.text-menu {
  font-size: 18px !important;
}

.text-menu-sub {
  font-size: 16px !important;
}
.no-right-border {
  border-right: 0;
}
.menu-icons {
  width: 18px;
  height: 18px;
}
</style>
