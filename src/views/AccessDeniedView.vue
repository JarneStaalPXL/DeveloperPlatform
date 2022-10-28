<template>
  {{ message }}
</template>

<script>
export default {
  name: "AccessDeniedView",
  props: {
    message: {
      type: String,
      default: "Access Denied",
    },
  },
};
</script>

<style></style>
