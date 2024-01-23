<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="d-flex flex-wrap">
          <el-dropdown trigger="click" class="mr-3">
            <el-button type="primary">
              <IconsNotificationIcon class="mr-2" /> {{ mutatedButtonName }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu
                v-for="notificationGroupItem in allNotificationGroups"
              >
                <el-dropdown-item
                  @click="handleSelectNotificationGroup(notificationGroupItem)"
                >
                  {{ notificationGroupItem.groupName }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button @click="createNewNotificationGroup">
            <IconsAdd /> Добавить
          </el-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="Object.keys(selectedNotificationData).length > 0 && newNotificationGroup.createNew === false">
        <h2 class="mb-2" @click="editField('groupName')">
          <span v-if="!editingFields.groupName">{{
            selectedNotificationData.groupName
          }}</span>
          <input
            v-else
            v-model="selectedNotificationData.groupName"
            autofocus
          />
        </h2>
        <h5 class="mb-2" @click="editField('keyWord')">
          <span v-if="!editingFields.keyWord">{{
            selectedNotificationData.keyWord
          }}</span>
          <input v-else v-model="selectedNotificationData.keyWord" autofocus />
        </h5>
        <el-scrollbar class="mb-2">
          <div v-for="user in selectedNotificationData.users">
            <el-checkbox v-model="user.member">{{ user.fullName }}</el-checkbox>
          </div>
        </el-scrollbar>
        <el-button
          :disabled="disableSaveGroupButton"
          type="success"
          @click="saveGroup(selectedNotificationData)"
          ><IconsSaveIcon class="mr-2" />Сохранить</el-button
        >
        <el-button type="danger" @click="deleteGroup(selectedNotificationData)"
        ><IconsSaveIcon class="mr-2" />Удалить</el-button
        >
      </div>
      <div v-if="newNotificationGroup.createNew === true">
        <h2 class="mb-2" @click="editField('groupName')">
          <input
            ref="addGroupGroupName"
            v-model="newNotificationGroup.groupName"
            placeholder="Название группы"
            autofocus
          />
        </h2>
        <h5 class="mb-2" @click="editField('keyWord')">
          <input
            ref="addGroupKeyWord"
            v-model="newNotificationGroup.keyWord"
            placeholder="Ключевое слово"
            autofocus
          />
        </h5>
        <el-scrollbar class="mb-2">
          <div v-for="user in newNotificationGroup.users">
            <el-checkbox v-model="user.member">{{ user.fullName }}</el-checkbox>
          </div>
        </el-scrollbar>
        <el-button :disabled="disableAddGroupButton" type="success" @click="addGroup(newNotificationGroup)"
          ><IconsAdd class="mr-2" />Добавить</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllNotificationGroups,
  getNotificationGroupById,
  putNotificationGroup,
  postNotificationGroup,
  deleteNotificationGroup,
} from '~/composables/useFetchNotifications'
import { highlightElementByValidation } from '~/utils/backendValidation'
import { getAllUsers } from '~/composables/useFetchUser'
import IconsAdd from '~/components/Icons/IconsAdd.vue'

export default {
  name: 'NotificationGroups',
  components: { IconsAdd },
  data() {
    return {
      mutatedButtonName: 'Выберите группу уведомлений', // Изменяемое название кнопки выбора группы
      selectedNotificationGroup: {}, // Выбранная группа уведомлений
      newNotificationGroup: {
        id: 0,
        groupName: '',
        keyWord: '',
        users: [],
        createNew: false,
      },
      allNotificationGroups: [], // Все группы уведомлений
      selectedNotificationData: {}, // Данные выбранной группы уведомлений
      selectedUsersForSelectedGroup: [], // Выбранные пользователи для выбранной группы увдомлений (айдишники)
      editingFields: {
        // Поля с инлайн редактированием
        groupName: false,
        keyWord: false,
      },
      users: {}, // Список пользователей
    }
  },
  async mounted() {
    await this.getNotificationsGroup()
    await this.getUsers()
  },
  computed: {
    disableAddGroupButton() {
      return (
        this.newNotificationGroup.keyWord === '' ||
        this.newNotificationGroup.groupName === ''
      );
    },
    disableSaveGroupButton() {
      return (
        this.selectedNotificationData.keyWord === '' ||
        this.selectedNotificationData.groupName === ''
      );
    },
  },
  methods: {
    // * Сбрасываем обьект для создания новой группы
    resetNewNotificationGroupObject() {
      this.newNotificationGroup = {
        id: 0,
        groupName: '',
        keyWord: '',
        users: [],
        createNew: false,
      }
    },
    // * Добавляем новую группу
    async addGroup(group) {
      this.isLoading = true
      try {
        const members = this.getMemberIds(group)
        const newGroup = {
          id: group.id,
          groupName: group.groupName,
          keyWord: group.keyWord,
          users: members,
        }
        const res = await postNotificationGroup(newGroup)
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          toast('Группа успешно добавлена!', 'success')
          this.editingFields.groupName = false
          this.editingFields.keyWord = false
          this.resetNewNotificationGroupObject()
          await this.getNotificationsGroup()
          this.selectedNotificationData = {}
          this.mutatedButtonName = 'Выберите группу уведомлений'
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Изменяем массив пользователей для формата групп уведомлений
    changeUsersFormat(users) {
      return users.map((user) => {
        const { id, fullName, position, blocked } = user
        const member = false

        return { id, fullName, position, member }
      })
    },
    // * Получаем пользователей
    async getUsers() {
      this.isLoading = true
      try {
        const res = await getAllUsers()
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          this.users = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Создает пустой обьект группы уведомлений для заполнения
    createNewNotificationGroup() {
      this.newNotificationGroup.createNew = true // Переключаем триггер в режим показа создания новой группы
      const formattedUsers = this.changeUsersFormat(this.users) // Конвертируем список пользователей в формат для групп уведомлений
      this.newNotificationGroup.users = formattedUsers
    },
    // * Переключает режим редактирования поля
    editField(field) {
      this.editingFields[field] = true
    },
    // * Удалить группу
    async deleteGroup(group) {
      this.isLoading = true
      try {
        const res = await deleteNotificationGroup(group.id)
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          toast('Группа успешно удалена!', 'success')
          this.editingFields.groupName = false
          this.editingFields.keyWord = false
          await this.getNotificationsGroup()
          this.resetNewNotificationGroupObject()
          this.selectedNotificationData = {}
          this.mutatedButtonName = 'Выберите группу уведомлений'
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Сохранить группу
    async saveGroup(group) {
      this.isLoading = true
      const members = this.getMemberIds(group)
      const newGroup = {
        id: group.id,
        groupName: group.groupName,
        keyWord: group.keyWord,
        users: members,
      }
      try {
        const res = await putNotificationGroup(newGroup)
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          toast('Группа успешно изменена!', 'success')
          this.editingFields.groupName = false
          this.editingFields.keyWord = false
          this.mutatedButtonName = newGroup.groupName
          await this.getNotificationsGroup()
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Создаем массив из выбранных пользователей
    getMemberIds(obj) {
      const selectedMemberIds = obj.users
        .filter((user) => user.member)
        .map((user) => user.id)
      return selectedMemberIds
    },
    // * Обработчик выбора группы из списка
    async handleSelectNotificationGroup(selectedGroup) {
      this.newNotificationGroup.createNew = false
      this.editingFields.groupName = false
      this.editingFields.keyWord = false
      this.mutatedButtonName = selectedGroup.groupName
      await this.getNotification(selectedGroup.id)
    },
    // * Получаем доступные группы уведомлений
    async getNotificationsGroup() {
      this.isLoading = true
      try {
        const res = await getAllNotificationGroups()
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          this.allNotificationGroups = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
    // * Получаем группу уведомлений по Id
    async getNotification(groupId) {
      this.isLoading = true
      try {
        const res = await getNotificationGroupById(groupId)
        // ! Если ошибка
        if (res.type !== 'SUCCESS') {
          // ? Обычная ошибка
          if (res.type === 'SIMPLE_ERROR') {
            console.error('Ошибка:', res.message)
          }
          // ? Ошибка валидации. Подсвечиваем нужные поля по их именам в данных с бэка
          else if (res.type === 'VALIDATION_ERROR') {
            await highlightElementByValidation(res.errors)
            console.error('\x1B[36m%s\x1B[0m', res.errors)
          }
          // ? Неизвестная ошибка
          else if (res.type === 'UNKNOWN_ERROR') {
            console.log('\x1B[36m%s\x1B[0m', 'Неизвестная ошибка')
          }
        } // * Если запрос успешно выполнен
        else {
          this.selectedNotificationData = res.data
        }
      } catch (e) {
        console.error('Cth_Error: ', e)
      }
      this.isLoading = false
    },
  },
}
</script>

<style scoped></style>
