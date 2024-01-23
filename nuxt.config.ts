import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: false,

  // // typescripts
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },

  // css
  css: [
    '~/assets/styles/main.scss',
    '~/assets/sass/vendor.scss',
    '~/assets/sass/app.scss',
    'vue3-toastify/dist/index.css',
  ],

  // plugins
  plugins: [
    '~/plugins/navbar.ts',
  ],

  // build
  build: {
    transpile: ['@headlessui/vue', 'vuetify'],
  },

  // modules
  modules: [
    'unplugin-icons/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-windicss',
    '@element-plus/nuxt',
    'dayjs-nuxt',
  ],

  dayjs: {
    locales: ['ru'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ru',
    defaultTimezone: 'Russia/Krasnoyarsk',
  },

  devServerHandlers: [],

  imports: {
    dirs: ['stores', 'composables', '@vueuse/components'],
  },

  // // experimental features
  // experimental: {
  //   reactivityTransform: false,
  // },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
    define: {
      'process.env.DEBUG': false,
    },
  },

  routeRules: {
    // '/inside': { proxy: 'http://192.168.71.142:82' },
   // '/api/**': { proxy: 'http://192.168.71.142:81/**' },
    '/login': { ssr: false },
    '/': { ssr: false, prerender: true },
    '/*': { ssr: false, cors: true },
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analyze: false,
    },
    scan: true,
  },

  devtools: {
    enabled: true,
  },
})
