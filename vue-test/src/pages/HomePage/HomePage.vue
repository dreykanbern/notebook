<template>
  <div class="container">

    <div class="header">
      <h1>Записная книжка</h1>

      <div class="actions">
        <my-icon-button
          type="delete"
          icon-name="delete"
          @click="deleteAllUsers"
        > Удалить пользователей </my-icon-button>
        <my-button @click="showModal = true">Добавить пользователя</my-button>
      </div>

    </div>

    <my-modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Добавить пользователя</h3>
        <div slot="body">
          <add-user-form ref="addUserForm" :users="users" @add-user="addUser"></add-user-form>
        </div>
        <my-button slot="footer" @click="addUser">Сохранить</my-button>
    </my-modal>

    <my-table :users="sortedUsers" @sort="sort" @delete="handleDelete"></my-table>

  </div>
</template>

<script>
import MyModal from "../../components/UI/MyModal/MyModal.vue";
import MyIconButton from "../../components/UI/MyIconButton/MyIconButton.vue";
import MyButton from "../../components/UI/MyButton/MyButton.vue";
import AddUserForm from "../../components/AddUserForm/AddUserForm.vue";
import MyTable from "../../components/UI/MyTable/MyTable.vue";
export default {
  name: 'HomePage',
  components: {
    MyButton,
    MyModal, MyIconButton, AddUserForm, MyTable
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
            addChildren(user.phone)
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
      console.log('addUser вызывается')
      // Получение ссылки на компонент AddUserForm
      let addUserForm = this.$refs.addUserForm;

      // Выполнение валидации формы
      if (!addUserForm.validate()) {
        return;
      }

      // Проверка на уникальность номера телефона
      if (this.users.some((user) => user.phone === addUserForm.newUser.phone)) {
        alert("Пользователь с таким номером телефона уже существует");
        return;
      }

      // Проверка значений newUser
      console.log(addUserForm.newUser.name);
      console.log(addUserForm.newUser.phone);
      console.log(addUserForm.newUser.parent);

      let newUser = Object.assign({}, addUserForm.newUser);
      this.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
      addUserForm.newUser.name = "";
      addUserForm.newUser.phone = "";
      addUserForm.newUser.parent = "";
      this.showModal = false;
    },


    deleteAllUsers() {
      this.users = [];
      localStorage.removeItem('users');
    },

    handleDelete(phone) {
      this.users = this.users.filter(user => user.phone !== phone);
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



