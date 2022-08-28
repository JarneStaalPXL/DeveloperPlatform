<template>
  <n-card title="Admin Manager">
    <section class="adminManagerContainer">
      <n-space vertical class="w-50">
        <n-card class="w-100">
          <n-input placeholder="Enter email" v-model:value="addAdminEmail"></n-input>
          <n-button class="w-100" @click="makeAdmin(addAdminEmail)"
            >CREATE ADMIN</n-button
          >
        </n-card>
      </n-space>
      <n-space vertical class="w-50">
        <n-card class="w-100">
          <n-input placeholder="Enter email" v-model:value="removeAdminEmail"></n-input>
          <n-button class="w-100" @click="removeAdmin(removeAdminEmail)"
            >REMOVE ADMIN</n-button
          >
        </n-card>
      </n-space>
    </section>
  </n-card>
</template>

<script>
import { NInput, NButton, useNotification, useMessage, NCard, NSpace } from "naive-ui";
export default {
  components: {
    NInput,
    NButton,
    NCard,
    NSpace,
  },
  data() {
    return {
      addAdminEmail: "",
      removeAdminEmail: "",
    };
  },
  mounted() {
    window.$notification = useNotification();
    window.$message = useMessage();
  },
  methods: {
    async makeAdmin(email) {
      if (email.length === 0) {
        window.$message.error("Email is empty");
        return;
      }
      await this.$store
        .dispatch("CREATE_ADMIN", email)
        .then(() => {
          window.$message.success("Admin created");
          this.addAdminEmail = "";
        })
        .catch((err) => {
          window.$message.error(err);
        });
    },
    async removeAdmin(email) {
      if (email.length === 0) {
        window.$message.error("Email is empty");
        return;
      }
      await this.$store
        .dispatch("REMOVE_ADMIN", email)
        .then((msg) => {
          window.$message.success(msg);
          this.removeAdminEmail = "";
        })
        .catch((err) => {
          window.$message.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.adminManagerContainer {
  display: flex;
  width: 100%;
}
</style>
