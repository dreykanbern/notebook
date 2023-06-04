<template>
  <div>
    <form @submit.prevent="addUser">
      <label>Имя: <my-input v-model="newUser.name" /></label><br />
      <label>Телефон: <my-input v-model="newUser.phone" /></label><br />
      <label>Начальник:
        <select v-model="newUser.parent">
          <option value="">Нет</option>
          <option v-for="user in users" :value="user.phone">{{ user.name }}</option>
        </select>
      </label><br />
    </form>
  </div>
</template>

<script>
import MyInput from "../UI/MyInput/MyInput.vue";

export default {
  name: 'AddUserForm',
  components: {
    MyInput
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newUser: {
        name: '',
        phone: '',
        parent: ''
      }
    }
  },
  methods: {
    addUser() {
      let newUser = Object.assign({}, this.newUser);
      this.$emit("add-user", newUser);
      this.newUser.name = "";
      this.newUser.phone = "";
      this.newUser.parent = "";
    }
  }
}
</script>
