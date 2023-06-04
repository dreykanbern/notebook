<template>
  <button class="my-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style lang="scss" scoped>
@import "my-button";
</style>

