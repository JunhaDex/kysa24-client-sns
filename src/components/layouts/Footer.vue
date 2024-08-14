<template>
  <footer class="app-footer bg-white rounded-t text-center text-xs">
    <ul class="app-footer-link-group mb-2 my-auto">
      <li>
        <a href="https://www.instagram.com/2024_kysa/" target="_blank" class="app-footer-link">
          <span class="icon brand-icon instagram-mask mr-1"></span>
          <span class="font-bold">Instagram</span>
        </a>
      </li>
      <li>
        <a href="https://docs.kysa.page/" target="_blank" class="app-footer-link">
          <span class="icon brand-icon notion-mask mr-1"></span>
          <span class="font-bold">Notion</span>
        </a>
      </li>
      <li>
        <a
          href="https://github.com/JunhaDex/kysa24-client-sns"
          target="_blank"
          class="app-footer-link"
        >
          <span class="icon brand-icon github-mask mr-1"></span>
          <span class="font-bold">Github</span>
        </a>
      </li>
    </ul>
    <div>© 2024 KYSA All Rights Reserved. <i class="font-cursive">designed with</i> ❤️</div>
  </footer>
</template>
<script setup lang="ts"></script>
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
  color: theme('colors.gray.600');
}

.brand-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: middle;
  background-color: theme('colors.gray.600');
}

.instagram-mask {
  mask-image: url(@/assets/icons/brands/insta-icon.svg);
  -webkit-mask-image: url(@/assets/icons/brands/insta-icon.svg);
}

.notion-mask {
  mask-image: url(@/assets/icons/brands/notion-icon.svg);
  -webkit-mask-image: url(@/assets/icons/brands/notion-icon.svg);
}

.github-mask {
  mask-image: url(@/assets/icons/brands/github-icon.svg);
  -webkit-mask-image: url(@/assets/icons/brands/github-icon.svg);
}
</style>
