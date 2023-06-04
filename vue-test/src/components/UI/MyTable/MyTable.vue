<template>
  <table>
    <thead>
    <tr>
      <th @click="$emit('sort', 'name')">Имя</th>
      <th @click="$emit('sort', 'phone')">Телефон</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="(user, index) in users"
      :key="index"
      :style="{ 'padding-left': user.level * 10 + 'px' }"
    >
      <td>{{ user.name }}</td>
      <td>{{ user.phone }}</td>
      <td>
        <my-icon-button
          type="delete"
          icon-name="delete"
          @click="$emit('delete', user.phone)"
        ></my-icon-button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import MyIconButton from "../MyIconButton/MyIconButton.vue";

export default {
  name: "MyTable",
  components: {
    MyIconButton,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "my-table";
</style>
