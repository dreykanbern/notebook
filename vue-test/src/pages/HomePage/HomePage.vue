<template>
  <div class="container">
    <my-button @click="showModal = true">Добавить пользователя</my-button>
    <my-modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Добавить пользователя</h3>
      <div slot="body">
        <form @submit.prevent="addUser">
          <label>Имя: <input v-model="newUser.name" /></label><br />
          <label>Родитель:
            <select v-model="newUser.parent">
              <option value="">Нет</option>
              <option v-for="user in users" :value="user.id">{{ user.name }}</option>
            </select>
          </label><br />
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </my-modal>
    <table>
      <thead>
      <tr>
        <th @click="sort('name')">Имя</th>
        <th @click="sort('id')">ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in sortedUsers" :key="index" :style="{ 'padding-left': user.level * 10 + 'px' }">
        <td>{{ user.name }}</td>
        <td>{{ user.id }}</td>
        <td>
          <my-icon-button  type="delete" icon-name="delete" @click="handleDelete(user.id)"></my-icon-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MyModal from "../../components/UI/MyModal/MyModal.vue";
import MyIconButton from "../../components/UI/MyIconButton/MyIconButton.vue";
import MyButton from "../../components/UI/MyButton/MyButton.vue";
export default {
  name: 'HomePage',
  components: {
    MyButton,
    MyModal, MyIconButton
  },
  data() {
    return {
      showModal: false,
      users: JSON.parse(localStorage.getItem('users')) || [],
      newUser: {
        name: '',
        parent: ''
      },
      sortKey: '',
      sortDirection: 'asc'
    }
  },
  computed: {
    sortedUsers() {
      let users = this.users.slice()
      if (this.sortKey) {
        users.sort((a, b) => {
          let valueA = a[this.sortKey]
          let valueB = b[this.sortKey]
          if (this.sortDirection === 'asc') {
            return valueA > valueB ? 1 : -1
          } else {
            return valueA > valueB ? -1 : 1
          }
        })
      }
      let result = []
      let level = 0
      let addChildren = (parentId) => {
        users.forEach(user => {
          if (user.parent === parentId) {
            user.level = level
            result.push(user)
            level++
            addChildren(user.id)
            level--
          }
        })
      }
      addChildren('')
      return result
    }
  },
  methods: {
    addUser() {
      let newUser = Object.assign({}, this.newUser)
      newUser.id = Date.now().toString()
      this.users.push(newUser)
      localStorage.setItem('users', JSON.stringify(this.users))
      this.newUser.name = ''
      this.newUser.parent = ''
      this.showModal = false
    },
    handleDelete(id) {
      this.users = this.users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(this.users));
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortDirection = 'asc'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "home-page";
</style>


