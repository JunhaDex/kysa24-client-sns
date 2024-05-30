<template>
  <footer class="footer">
    <ul class="flex justify-center text-sm text-gray-500 mb-3.5">
      <li><a href="/">Instagram</a></li>
      <li><a href="/about">Discord</a></li>
      <li><a href="/contact">Github</a></li>
      <li><a href="/">terms</a></li>
      <li><a href="/">privacy</a></li>
    </ul>
    <div class="text-center text-sm text-gray-500">&copy; 2021 FooBar Inc.</div>
  </footer>
</template>
<script setup lang="ts"></script>
<style>
.footer {
  padding: 20px 0 20px 0;
  background-color: #f9f9f9;
  border-top: 1px solid #e5e7eb;
}

.footer ul li:not(:last-child)::after {
  content: '|';
  margin: 0 10px;
}
</style>
