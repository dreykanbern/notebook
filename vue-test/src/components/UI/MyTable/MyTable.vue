<template>
  <table>
    <thead>
    <tr>
      <th @click="$emit('sort', 'name')">Имя</th>
      <th>Телефон</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="(user, index) in users"
      :key="index"
      :style="{ 'padding-left': user.level * 10 + 'px' }"
    >
      <td :style="{ paddingLeft: user.level * 20 + 10 + 'px' }">{{ user.name }}</td>
      <td>{{ user.phone }}</td>
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
