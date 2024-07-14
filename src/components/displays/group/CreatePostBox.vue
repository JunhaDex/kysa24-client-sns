<template>
  <Box>
    <div class="create-post">
      <div class="profile-pic"></div>
      <form class="post-form">
        <div class="post-content">
          <textarea name="post-text" placeholder="무슨 생각을 하고 있나요?"></textarea>
          <div class="post-actions">
            <label for="file-upload" class="file-upload-btn">
              <span class="file-icon">📎</span>
            </label>
            <input id="file-upload" name="file-upload" type="file" accept="image/*" style="display: none;">
            <button type="submit" class="submit-btn">올리기</button>
          </div>
        </div>
      </form>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
</script>
<style>
.create-post {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  flex-shrink: 0;
}

.post-form {
  flex-grow: 1;
}

.post-content {
  width: 100%;
}

.create-post textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  margin-bottom: 10px;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-upload-btn {
  cursor: pointer;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
}

.file-icon {
  font-size: 20px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
