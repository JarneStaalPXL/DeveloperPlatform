<template>
  <n-card title="Activity">
    <n-space vertical>
      <n-select
        placeholder="Choose Refresh interval"
        :on-update:value="getAllActivity"
        :options="[
          { label: 'Every second', value: 1 },
          { label: 'Every 5 seconds', value: 5 },
        ]"
      ></n-select>
      <section class="d-flex">
        <n-p class="w-50">Page Size</n-p>
        <n-input-number
          class="w-50"
          :min="0"
          :max="50"
          placeholder="Enter pagesize"
          v-model:value="pagination.pageSize"
        ></n-input-number>
      </section>

      <n-data-table
        ref="table"
        :columns="columns"
        :data="$store.state.allUserActivities"
        :pagination="pagination"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
      />
      <n-button
        v-if="checkedRowKeys.length > 0"
        @click="deleteSelectedRows(checkedRowKeys)"
        >Delete selected rows</n-button
      >
    </n-space>
  </n-card>
  <h1>STRAPI MAKE ANOTHER COLUMN FOR ADMIN AND ABILITY TO ADD ADMINS</h1>
</template>

<script>
import {
  NCard,
  NDataTable,
  NSelect,
  NProgress,
  NButton,
  NInputNumber,
  NSpace,
  NP,
} from "naive-ui";
import { ref } from "vue";

const columns = [
  {
    title: "User ID",
    key: "userid",
    type: "selection",
  },
  {
    title: "Key",
    key: "key",
  },
  {
    title: "Name",
    key: "username",
  },
  {
    title: "Route",
    key: "route",
  },
  {
    title: "Visited At",
    key: "createdat",
    // defaultSortOrder: "ascend",
    // sorter: "default",
    sorter: (row1, row2) => row1.createdat - row2.createdat,
  },
];

export default {
  components: {
    NCard,
    NDataTable,
    NSelect,
    NProgress,
    NButton,
    NInputNumber,
    NP,
    NSpace,
  },
  mounted() {
    this.getAllActivity(5);
  },
  methods: {
    getAllActivity(value) {
      if (value === undefined) {
        return;
      }
      this.$store.dispatch("GET_USER_ACTIVTIES");
      clearInterval(this.intervalID);
      this.intervalID = setInterval(() => {
        this.$store.dispatch("GET_USER_ACTIVTIES");
      }, value * 1000);
    },
    deleteSelectedRows(rows) {
      this.$store.dispatch("DELETE_USER_ACTIVITIES", rows);
    },
  },
  data() {
    return {
      pagination: {
        pageSize: 10,
      },
      checkedRows: [],
      intervalID: null,
      selectedRefreshTime: 1,
      columns,
      loaderPercentage: 0,
    };
  },
  setup() {
    const tableRef = ref(null);
    const checkedRowKeysRef = ref([]);

    return {
      checkedRowKeys: checkedRowKeysRef,
      table: tableRef,
      rowKey: (row) => row.key,
      handleCheck(rowKeys) {
        checkedRowKeysRef.value = rowKeys;
      },
    };
  },
};
</script>

<style></style>
