<template>
  <div class="dp-box my-4">
    <div class="form-wrap">
      <div class="form-control">
        <div class="label">
          <label class="label-text" for="username">현재 비밀번호</label>
        </div>
        <input
          class="input input-bordered text-sm w-full"
          type="password"
          name="current-pwd"
          placeholder="******"
        />
      </div>
      <div class="form-control">
        <div class="label">
          <label class="label-text" for="username">비밀번호 변경</label>
        </div>
        <input
          class="input input-bordered text-sm w-full"
          type="password"
          name="new-pwd"
          placeholder="******"
        />
      </div>
      <div class="form-control">
        <div class="label">
          <label class="label-text" for="username">비밀번호 확인</label>
        </div>
        <input
          class="input input-bordered text-sm w-full"
          type="password"
          name="pwd-confirm"
          placeholder="******"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-wrap {
  padding: 1.2rem;
}
</style>
