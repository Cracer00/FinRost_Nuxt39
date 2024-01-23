declare module 'nuxt-storage/nuxt-storage' {
  import { NuxtAxiosInstance } from '@nuxtjs/axios';

  interface Context {
    $storage: {
      setUniversal(key: string, value: any): void;
      getUniversal(key: string, defaultValue?: any): any;
      setLocalStorage(key: string, value: any): void;
      getLocalStorage(key: string, defaultValue?: any): any;
      setSessionStorage(key: string, value: any): void;
      getSessionStorage(key: string, defaultValue?: any): any;
      syncUniversal(key: string, defaultValue: any): any;
      syncLocalStorage(key: string, defaultValue: any): any;
      syncSessionStorage(key: string, defaultValue: any): any;
    };
  }

  interface PluginOptions {
    defaultLocalStorage: any;
    defaultSessionStorage: any;
  }

  export function storage(ctx: Context, inject: any): void;
  export default storage;
}
