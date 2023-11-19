<template>
  <div class="userRegisterView">
    <h2 style="margin-bottom: 20px">用户注册</h2>
    <a-form
      :model="form"
      auto-label-width
      style="max-width: 300px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item field="confirmPassword" label="确认密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item class="buttonContainer">
        <a-button
          type="primary"
          html-type="register"
          class="registerButton"
          @click="handleRegister"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
const handleRegister = async () => {
  if (form.userPassword !== form.checkPassword) {
    message.error("密码与确认密码不匹配");
    return;
  }

  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功");
    // 注册成功后的处理逻辑
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>

<style scoped>
.buttonContainer {
  display: flex;
  justify-content: center;
}

.registerButton {
}
</style>
