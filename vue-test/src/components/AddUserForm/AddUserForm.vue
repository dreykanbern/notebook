<template>
  <div>
    <form @submit.prevent="validate" class="add-user-form">
      <label>*Имя:
        <my-input v-model="newUser.name" placeholder="Заполните имя" @input="newUser.name = $event" />
      </label><br />
      <label>*Телефон:
        <my-input v-model="newUser.phone" v-mask="'+7 (###) ### ## ##'" placeholder="Введите номер +7 (XXX) XXX XX XX" @input="newUser.phone = $event"/>
      </label><br />
      <label>Начальник:
        <my-select v-model="newUser.parent" :options="userOptions"></my-select>
      </label><br />
    </form>
  </div>
</template>

<script>
import MyInput from "../UI/MyInput/MyInput.vue";
import MySelect from "../UI/MySelect/MySelect.vue";
import VueTheMask from "vue-the-mask";

export default {
  name: 'AddUserForm',
  components: {
    MyInput,
    MySelect,
    VueTheMask
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
  computed:{
    userOptions(){
      let options = this.users.map(user => ({value:user.phone,text:user.name}));
      options.unshift({value:'',text:'Нет'});
      return options;
    }
  },
  methods: {
    validate() {
      let isValid = true;

      // Проверка на пустые поля
      if (!this.newUser.name && !this.newUser.phone) {
        console.log("All fields are empty");
        alert("Пожалуйста, заполните все обязательные поля");
        isValid = false;
      } else {
        // Проверка на имя
        if (!this.newUser.name) {
          console.log("Name field is empty");
          alert("Заполните поле Имя, оно может содержать только буквы и цифры");
          isValid = false;
        } else if (!/^[a-zA-Zа-яА-ЯёЁ0-9 ]+$/.test(this.newUser.name)) {
          console.log("Name field is invalid");
          alert("Имя может содержать только буквы и цифры");
          isValid = false;
        }

        // Проверка на телефон
        if (!this.newUser.phone) {
          console.log("Phone field is empty");
          alert("Заполните поле Телефон, оно должно быть в формате +7 (XXX) XXX XX XX");
          isValid = false;
        } else if (!/^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(this.newUser.phone)) {
          console.log("Phone field is invalid");
          alert("Телефон должен быть в формате +7 (XXX) XXX XX XX");
          isValid = false;
        }
      }

      return isValid;
    }
  },
  watch: {
  //   'newUser.name'(newValue, oldValue) {
  //     console.log(`newUser.name changed from ${oldValue} to ${newValue}`);
  //   },
  //   'newUser.phone'(newValue, oldValue) {
  //     console.log(`newUser.phone changed from ${oldValue} to ${newValue}`);
  //   }
  },
}
</script>

<style lang="scss" scoped>
@import "add-user-form.scss";
</style>
