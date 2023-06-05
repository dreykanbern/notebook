<template>
  <div class="select-container" @click.self="toggleDropdown">
    <div class="selected-option" @click="toggleDropdown">{{ selectedOption.text }}</div>
    <div class="select-border"></div>
    <ul v-if="showDropdown" class="options-list">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="option"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "MySelect",
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: [String, Number],
  },
  data() {
    return {
      showDropdown: false,
      selectedValue: this.value,
    };
  },
  computed: {
    selectedOption() {
      return (
        this.options.find((option) => option.value === this.selectedValue) || {}
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      //console.log("selectOption called with option:", option);
      this.selectedValue = option.value;
      this.$emit("input", option.value);
      this.$set(this, "showDropdown", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "my-select";
</style>
