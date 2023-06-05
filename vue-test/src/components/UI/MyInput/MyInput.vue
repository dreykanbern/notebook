<template>
  <div class="input-container">
    <input type="text" :placeholder="placeholder" @input="onInput" v-model="value" @focus="handleFocus" @blur="handleBlur" />
    <div class="input-border"></div>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '',
      isFocused: false
    }
  },
  methods: {
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
    },
    onInput(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "my-input";
</style>
