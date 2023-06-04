<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "my-modal",
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header h3 {
  margin-top:0;
}

.modal-body {
  margin:20px auto;
}

.modal-default-button {
  float:right;
}

.modal-enter,
.modal-leave-active {
  opacity:0;
}

.modal-enter-active,
.modal-leave-active {
  transition:opacity .5s
}
</style>

