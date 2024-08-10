<template>
  <div class="dropdown">
    <!--NOTE: Slot comp must be a button with [role="button" tabindex="0"]-->
    <slot name="handle" />
    <ul
      tabindex="0"
      class="dropdown-content dropdown-custom dp-box menu w-52 shadow"
      ref="dropdownBox"
    >
      <slot name="menus" />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const dropdownBox = ref<HTMLElement>()
defineExpose({ close })

function close() {
  dropdownBox.value!.blur()
}
</script>
<style scoped>
.dropdown-custom {
  z-index: 1;
  min-width: 208px;
  padding: 0.8rem;
}

.dropdown-custom * {
  font-weight: bold !important;
}
</style>
