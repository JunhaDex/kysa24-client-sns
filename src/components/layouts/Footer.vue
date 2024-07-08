<template>
  <footer
    class="footer bg-white rounded-t text-center text-sm">
    <ul class="flex space-x-2 mb-1">
      <li>
        <a href="#" class="text-gray-600 hover:text-gray-800">Instagram</a>
      </li>
      <li>
        <a href="#" class="text-gray-600 hover:text-gray-800">Notion</a>
      </li>
      <li>
        <a href="#" class="text-gray-600 hover:text-gray-800">Github</a>
      </li>
    </ul>
    <div class="text-xs text-gray-500">
      © 2024 KYSA All Rights Reserved. <span class="italic">designed with</span> ❤️
    </div>
  </footer>
</template>
<script setup lang="ts">
</script>
<style>
.footer {
  display: block;
  background-color: theme('colors.white');
  border-top: 1px solid #e5e7eb;
}

.footer ul li:not(:last-child)::after {
  content: '|';
  margin: 0 10px;
}
</style>
