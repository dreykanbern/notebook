<template>
  <button
    class="icon-button"
    :class="{ 'icon-button-delete': type === 'delete' }"
    @click="$emit('click')"
  >
    <i class="material-icons">{{ iconName }}</i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-icon-button",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "my-icon-button";
</style>
