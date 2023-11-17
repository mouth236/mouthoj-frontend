<template>
  <div class="userLoginView">
    <h2 style="margin-bottom: 20px">用户登录</h2>
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
      <a-form-item class="buttonContainer">
        <a-button
          type="primary"
          html-type="submit"
          class="loginButton"
          @click="handleSubmit"
          >登录
        </a-button>
        <a-button type="primary" html-type="register" class="registerButton"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  //登录成功跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>
<style scoped>
.buttonContainer {
  display: flex;
  justify-content: center;
}

.loginButton {
}

.registerButton {
  margin-left: 120px;
}
</style>
