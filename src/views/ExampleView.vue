<template>
  <div id="exampleView">
    <CodeEditor :value="codevalue" :handle-change="onCodeChange" />
    <MdEditor :value="mdvalue" :handle-change="onMdChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const mdvalue = ref();
const codevalue = ref();
const onMdChange = (v: string) => {
  mdvalue.value = v;
};

const onCodeChange = (v: string) => {
  codevalue.value = v;
};
</script>
