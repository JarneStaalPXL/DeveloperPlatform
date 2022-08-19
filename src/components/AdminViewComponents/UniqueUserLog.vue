<template>
  <n-card class="w-100 m-auto">
    <n-space vertical>
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
        :data="$store.state.uniqueVisitors"
        :pagination="pagination"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
      />
    </n-space>
  </n-card>
  <n-card title="Unique Visitors Count">
    <h5>
      {{ $store.state.uniqueVisitors.length }}
    </h5>
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

const columns = [
  {
    title: "IP",
    key: "ip",
  },
  {
    title: "Username",
    key: "name",
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
  },
  mounted() {
    window.$loadingbar = useLoadingBar();
    this.$store.dispatch("GET_UNIQUE_VISITORS");
    setInterval(() => {
      this.$store.dispatch("GET_UNIQUE_VISITORS");
    }, 5000);
  },
  methods: {},
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
