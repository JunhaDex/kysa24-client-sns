<template>
  <footer
    class="app-footer bg-white rounded-t text-center text-xs">
    <ul class="app-footer-link-group mb-2 my-auto">
      <li>
        <a href="#" class="app-footer-link">
          <img src="@/assets/icons/brands/insta-icon.svg" alt="Instagram" class="brand-icon mr-1" />
          <span>Instagram</span>
        </a>
      </li>
      <li>
        <a href="#" class="app-footer-link">
          <img src="@/assets/icons/brands/notion-icon.svg" alt="Notion" class="brand-icon mr-1" />
          <span>Notion</span>
        </a>
      </li>
      <li>
        <a href="#" class="app-footer-link">
          <img src="@/assets/icons/brands/github-icon.svg" alt="Github" class="brand-icon mr-1" />
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

</script>
<style>
.app-footer {
  position: relative;
  z-index: 3;
  display: block;
  background-color: theme('colors.white');
  border-top: 1px solid theme('colors.gray.300');
  border-radius: 1rem;
  padding: 16px;
}

.app-footer ul li:not(:last-child)::after {
  content: '|';
  margin: 0 8px;
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
