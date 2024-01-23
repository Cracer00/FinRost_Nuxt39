<template>
  <!-- Навигационое меню для десктоп -->
  <nav class="desktop-menu">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink to="/">
          <div class="site-logo">
            <img src="@/public/krk-logo.png" alt="Финрост" />
          </div>
        </NuxtLink>
        <Menu as="div" class="relative inline-block text-left z-max mr-4">
          <div>
            <MenuButton class="inline-flex w-full justify-center text-white flex">Админка
              <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/users">
                        <UserIcon class="text-white" />
                        <span>Пользователи</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/groups">
                        <UserGroupsIcon class="text-white" />
                        <span>Группы</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/rights">
                        <UserPermissionIcon class="text-white" />
                        <span>Права</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/IPs">
                        <WWWIcon class="text-white" />
                        <span>IP адреса</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/feedback">
                        <FeedbackIcon class="text-white" />
                        <span>Feedback</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </div>
        </Menu>
        <Menu as="div" class="relative inline-block text-left z-max mr-4">
          <div>
            <MenuButton class="inline-flex w-full justify-center text-white flex">Архив
              <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                        <SearchBorderedIcon class="text-white" />
                        <span>Поиск</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </div>
        </Menu>
        <Menu as="div" class="relative inline-block text-left z-max mr-4">
          <div>
            <MenuButton class="inline-flex w-full justify-center text-white flex">Займы
              <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                        <CloseIcon class="text-white" />
                        <span>Рассмотрение заявок</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </div>
        </Menu>
        <Menu as="div" class="relative inline-block text-left z-max mr-4">
          <div>
            <MenuButton class="inline-flex w-full justify-center text-white flex">Взыскание
              <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                        <CloseIcon class="text-white" />
                        <span>Должники</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </div>
        </Menu>
        <Menu as="div" class="relative inline-block text-left z-max mr-4">
          <div>
            <MenuButton class="inline-flex w-full justify-center text-white flex">Обучение
              <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ close, active }">
                    <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                      <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                        <CloseIcon class="text-white" />
                        <span>Конструктор</span>
                      </NuxtLink>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </div>
        </Menu>
      </div>
      <div class="dropdown-me mr-5">
        <Dropdown :profile-photo="profilePhoto" :first-name="user.firstName" :last-name="user.lastName" />
      </div>
      <div>
        <button @click="notificationSidebarStatusChange" class="mr-5">
          <NotificationIcon class="text-white" />
        </button>
      </div>
      <NotificationsSidebar :is-open="notificationSidebarOpen" />
    </div>
  </nav>
  <!-- Меню для мобильных устройств -->
  <nav class="mobile-menu">
    <div class="mobile-menu-toggle" @click="toggleMobileMenu">
      <MenuIcon />
    </div>
    <ul v-show="isMobileMenuOpen">
      <Menu as="div" class="relative inline-block text-left mr-4">
        <div>
          <MenuButton class="ml-2 inline-flex w-30 text-white bg-dark flex">Админка
            <ArrowRightIcon style="width: 12px; height: 12px" class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="z-max absolute top-2 left-35 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/users">
                      <UserIcon class="text-white" />
                      <span>Пользователи</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/groups">
                      <UserGroupsIcon class="text-white" />
                      <span>Группы</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/rights">
                      <UserPermissionIcon class="text-white" />
                      <span>Права</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/IPs">
                      <WWWIcon class="text-white" />
                      <span>IP адреса</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left  px-2 py-2" to="/admin/feedback">
                      <FeedbackIcon class="text-white" />
                      <span>Feedback</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </div>
      </Menu>
      <Menu as="div" class="relative inline-block text-left z-max mr-4">
        <div>
          <MenuButton class="ml-2 inline-flex w-30 text-white bg-dark flex">Архив
            <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                      <SearchBorderedIcon class="text-white" />
                      <span>Поиск</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </div>
      </Menu>
      <Menu as="div" class="relative inline-block text-left z-max mr-4">
        <div>
          <MenuButton class="ml-2 inline-flex w-30 text-white flex bg-dark">Займы
            <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                      <CloseIcon class="text-white" />
                      <span>Рассмотрение заявок</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </div>
      </Menu>
      <Menu as="div" class="relative inline-block text-left z-max mr-4">
        <div>
          <MenuButton class="ml-2 inline-flex w-30 text-white flex bg-dark">Взыскание
            <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                      <CloseIcon class="text-white" />
                      <span>Должники</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </div>
      </Menu>
      <Menu as="div" class="relative inline-block text-left z-max mr-4">
        <div>
          <MenuButton class="ml-2 inline-flex w-30 text-white flex bg-dark">Обучение
            <DownIcon class="ml-2 -mr-1 h-5 w-5 text-green-200 hover:text-green-100" />
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-[#484f56] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ close, active }">
                  <button :class="[active ? 'bg-green-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md text-sm']">
                    <NuxtLink @click="close" class="flex items-center space-x-1 w-full text-left px-2 py-2" to="/archive/search">
                      <CloseIcon class="text-white" />
                      <span>Конструктор</span>
                    </NuxtLink>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </div>
      </Menu>

      <!-- Добавьте здесь ваш список элементов меню -->
    </ul>
  </nav>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import DownIcon from "~/components/Icons/DownIcon.vue";
import UserGroupsIcon from "~/components/Icons/UserGroupsIcon.vue";
import UserPermissionIcon from "~/components/Icons/UserPermission.vue";
import UserIcon from "~/components/Icons/UserIcon.vue";
import WWWIcon from "~/components/Icons/WWWIcon.vue";
import {
  getLoggedUserInfo,
  getLoggedUserPhoto
} from "~/composables/useFetchUser";
import SearchBorderedIcon from "~/components/Icons/SearchBorderedIcon.vue";
import FeedbackIcon from "~/components/Icons/FeedbackIcon.vue";
import NotificationsSidebar from "~/components/SubElements/NotificationsSidebar.vue";
import NotificationIcon from "~/components/Icons/NotificationIcon.vue";
import CloseIcon from "~/components/Icons/CloseIcon.vue";
import MenuIcon from "~/components/Icons/MenuIcon.vue";
import ArrowRightIcon from "~/components/Icons/ArrowRightIcon.vue";
</script>

<script>
import { getLoggedUserInfo } from "~/composables/useFetchUser";

export default {
  name: "NewNavbar",
  props: {
    profilePhoto: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: {},
      isMobileMenuOpen: false,
      notificationSidebarOpen: false,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    notificationSidebarStatusChange() {
      this.notificationSidebarOpen = !this.notificationSidebarOpen
    },
    async fetchUserData() {
      const userInfo = await getLoggedUserInfo();
      this.user = userInfo.data.value;
    },
  }
};
</script>

<style scoped>
.desktop-menu {
  display: block; /* По умолчанию показывается на десктопе */
}

/* Стили для мобильного меню */
.mobile-menu {
  display: none; /* По умолчанию скрывается на десктопе */
}

.mobile-menu-toggle {
  cursor: pointer;
}

/* Медиа-запрос для показа мобильного меню на маленьких экранах */
@media (max-width: 768px) {
  .desktop-menu {
    display: none; /* Скрываем десктопное меню на маленьких экранах */
  }

  .mobile-menu {
    display: block; /* Показываем мобильное меню на маленьких экранах */
  }
}

.z-max {
  z-index: 99999;
}

nav {
  max-height: 70px;
  background-color: #343a40;
  padding: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

li {
  margin-right: 10px;
  position: relative;
}

a {
  text-decoration: none;
  color: white;
  padding: 5px;
}

ul ul {
  position: absolute;
  top: 25px;
  left: 22px;
  background-color: #484f56;
  padding: 10px;
  display: none;
}

.dropdown-me {
  margin-left: auto;
}

li:hover ul {
  display: block;
}

.site-logo img {
  width: 150px;
}

.site-logo {
  margin-right: 100px;
}

.has-submenu > a:after {
  content: ' ▼';
}

ul ul li {
  margin-right: 0;
}

ul ul ul {
  top: 0;
  left: 100%;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }

  ul {
    flex-direction: column;
  }

  li {
    margin-bottom: 10px;
  }

  li:hover ul {
    position: static;
    display: block;
    margin-top: 5px;
  }

  ul ul {
    position: static;
    display: none;
    margin-left: 10px;
  }

  .has-submenu > a:after {
    content: ' ►';
  }
}
</style>

