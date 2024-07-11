<template>
  <footer
    class="app-footer bg-white rounded-t text-center text-xs">
    <ul class="app-footer-link-group mb-2 my-auto">
      <li>
        <a href="#" class="app-footer-link">
          <img :src="insta" alt="Instagram" class="brand-icon mr-1" />
          <span>Instagram</span>
        </a>
      </li>
      <li>
        <a href="#" class="app-footer-link">
          <img :src="notion" alt="Notion" class="brand-icon mr-1" />
          <span>Notion</span>
        </a>
      </li>
      <li>
        <a href="#" class="app-footer-link">
          <img :src="github" alt="Github" class="brand-icon mr-1" />
          <span>Github</span>
        </a>
      </li>
    </ul>
    <div>
      © 2024 KYSA All Rights Reserved. <span class="italic">designed with</span> ❤️
    </div>
  </footer>
</template>
<script setup lang="ts">
import insta from '@/assets/icons/brands/insta-icon.svg'
import notion from '@/assets/icons/brands/notion-icon.svg'
import github from '@/assets/icons/brands/github-icon.svg'
</script>
<style>
.app-footer {
  display: block;
  background-color: theme('colors.white');
  border-top: 1px solid theme('colors.gray.300');
  border-radius: 1rem;
  padding: 16px;
}

.app-footer ul li:not(:last-child)::after {
  content: '|';
  margin: 0 10px;
}

.app-footer-link-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.brand-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
</style>
