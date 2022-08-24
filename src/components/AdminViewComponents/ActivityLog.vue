<template>
  <n-card class="w-100 m-auto">
    <n-card title="Activity">
      <n-space vertical>
        <section class="d-flex">
          <n-p class="w-50">Page Size</n-p>
          <n-input-number class="w-50" :min="0" :max="50" placeholder="Enter pagesize"
            v-model:value="pagination.pageSize"></n-input-number>
        </section>
        <n-button v-if="checkedRowKeys.length > 0 && $store.state.allUserActivities.length > 0"
          @click="deleteSelectedRows(checkedRowKeys)">Delete selected rows</n-button>
        <n-data-table ref="table" :columns="columns" :data="$store.state.allUserActivities" :pagination="pagination"
          :row-key="rowKey" @update:checked-row-keys="handleCheck" />
      </n-space>
    </n-card>
  </n-card>
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
  NTag,
  useLoadingBar,
} from "naive-ui";
import { h, ref } from "vue";
import UniqueUserLog from "./UniqueUserLog.vue";

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
    title: "IP Adress",
    key: "ip",
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
    renderSorter: () => null,
  },
  {
    title: "Role",
    key: "isadmin",
    render(row) {
      const tags = row.isadmin.map((tagKey) => {
        if (tagKey === "Admin") {
          return h(
            NTag,
            {
              style: {
                marginRight: "6px",
              },
              type: "success",
              bordered: false,
            },
            {
              default: () => tagKey,
            }
          );
        }
      });
      return tags;
    },
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
    NTag,
    UniqueUserLog,
  },
  mounted() {
    this.getAllActivity(5);
    window.$loadingbar = useLoadingBar();
  },
  methods: {
    remove() {
      this.$store.dispatch("REMOVE_ADMIN_FROM_VISIT_LOGS");
    },
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
      window.$loadingbar.start();
      //wait till dispatch is finished
      this.$store.dispatch("DELETE_USER_ACTIVITIES", rows).then(() => {
        setTimeout(() => {
          window.$loadingbar.finish();
        }, 2500);
      });
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

<style scoped lang="scss">
td {
  word-break: keep-all;
}
</style>
