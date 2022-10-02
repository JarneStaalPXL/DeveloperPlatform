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

  <n-card title="Visits Overview">
    <PageVisitsChart :data="visitsOverViewArr" :dataKeys="dataKeys" />
  </n-card>

  <n-card title="Platform Feedback" v-if="allFeedback.length > 0">
    <n-card v-for="fb of allFeedback" :key="fb">
      <h5>{{ fb.title }}</h5>
      <h6>{{ fb.description }}</h6>
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
import { beforeMount } from "vue-writer";
import PageVisitsChart from "./PageVisitsChart.vue";

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
    PageVisitsChart,
  },
  // async beforeMount() {
  //   //get unique visitors
  //   this.$store.dispatch("GET_UNIQUE_VISITORS");

  //   //homepage visits
  //   const dt = await this.$store.dispatch("GET_ROUTE_VISITS", "Homepage");
  //   this.routeVisitsHomepage = dt.routeVisitorsCount;

  //   //hosting providers visits
  //   const dt3 = await this.$store.dispatch("GET_ROUTE_VISITS", "hostingproviders");
  //   this.routeVisitsHP = dt3.routeVisitorsCount;

  //   //global frontend tools visits
  //   const dt2 = await this.$store.dispatch("GET_ROUTE_VISITS", "globalfrontendtools");
  //   this.routeVisitsGft = dt2.routeVisitorsCount;

  //   //gradient generators visits
  //   const dt4 = await this.$store.dispatch("GET_ROUTE_VISITS", "gradientgenerators");
  //   this.routeGradientGenerators = dt4.routeVisitorsCount;

  //   //color generators visits
  //   const dt5 = await this.$store.dispatch("GET_ROUTE_VISITS", "colorgenerators");
  //   this.routeColorGenerators = dt5.routeVisitorsCount;

  //   //playform feedback
  //   const dt6 = await this.$store.dispatch("GET_VOTES_DESIGN_ROUTE", "Platform");
  //   this.positiveVotes = dt6.positiveVotes;
  //   this.negativeVotes = dt6.negativeVotes;

  //   //set all the visits of the objects to the new values
  //   this.visitsOverViewArr.forEach((obj) => {
  //       if (obj.route === "Homepage") {
  //         obj.visits = this.routeVisitsHomepage;
  //       } else if (obj.route === "Global Frontend Tools") {
  //         obj.visits = this.routeVisitsGft;
  //       } else if (obj.route === "Hosting Providers") {
  //         obj.visits = this.routeVisitsHP;
  //       } else if (obj.route === "Gradient Generators") {
  //         obj.visits = this.routeGradientGenerators;
  //       } else if (obj.route === "Color Generators") {
  //         obj.visits = this.routeColorGenerators;
  //       }
  //     });

  //   //rank visits overview
  //   this.visitsOverViewArr.sort((a, b) => b.visits - a.visits);

  //   //get all feedback
  //   this.allFeedback = await this.$store.dispatch("GET_ALL_FEEDBACK");
  // },
  async mounted() {
    window.$loadingbar = useLoadingBar();

    //homepage visits
    const dt = await this.$store.dispatch("GET_ROUTE_VISITS", "Homepage");
    this.routeVisitsHomepage = dt.routeVisitorsCount;

    //global frontend tools visits
    const dt2 = await this.$store.dispatch(
      "GET_ROUTE_VISITS",
      "globalfrontendtools"
    );
    this.routeVisitsGft = dt2.routeVisitorsCount;

    //hosting providers visits
    const dt3 = await this.$store.dispatch(
      "GET_ROUTE_VISITS",
      "hostingproviders"
    );
    this.routeVisitsHP = dt3.routeVisitorsCount;

    //gradient generators visits
    const dt4 = await this.$store.dispatch(
      "GET_ROUTE_VISITS",
      "gradientgenerators"
    );
    this.routeGradientGenerators = dt4.routeVisitorsCount;

    //color generators visits
    const dt5 = await this.$store.dispatch(
      "GET_ROUTE_VISITS",
      "colorgenerators"
    );
    this.routeColorGenerators = dt5.routeVisitorsCount;

    this.visitsOverViewArr.push(
      {
        route: "Homepage",
        visits: this.routeVisitsHomepage,
        path: "/",
      },
      {
        route: "Hosting Providers",
        visits: this.routeVisitsHP,
        path: "/hostingproviders",
      },
      {
        route: "Global Frontend Tools",
        visits: this.routeVisitsGft,
        path: "/globalfrontendtools",
      },
      {
        route: "Gradient Generators",
        visits: this.routeGradientGenerators,
        path: "/gradientgenerators",
      },
      {
        route: "Color Generators",
        visits: this.routeColorGenerators,
        path: "/colorgenerators",
      }
    );

    // console.log(this.visitsOverViewArr);
    // //set all the visits of the objects to the new values
    // this.visitsOverViewArr.forEach((obj) => {
    //   console.log(obj.route)
    //   if (obj.route === "Homepage") {
    //     obj.visits = this.routeVisitsHomepage;
    //   } else if (obj.route === "Global Frontend Tools") {
    //     obj.visits = this.routeVisitsGft;
    //   } else if (obj.route === "Hosting Providers") {
    //     obj.visits = this.routeVisitsHP;
    //   } else if (obj.route === "Gradient Generators") {
    //     obj.visits = this.routeGradientGenerators;
    //   } else if (obj.route === "Color Generators") {
    //     obj.visits = this.routeColorGenerators;
    //   }
    // });
    // rank visits overview
    this.visitsOverViewArr.sort((a, b) => b.visits - a.visits);

    this.$store.dispatch("GET_UNIQUE_VISITORS");

    //get all feedback
    this.allFeedback = await this.$store.dispatch("GET_ALL_FEEDBACK");

    setInterval(async () => {
      this.$store.dispatch("GET_UNIQUE_VISITORS");

      //get all feedback
      this.allFeedback = await this.$store.dispatch("GET_ALL_FEEDBACK");
    }, 5000);
  },
  methods: {},
  data() {
    return {
      dataKeys: ["route", "visits"],
      allFeedback: [],
      visitsOverViewArr: [],
      positiveVotes: 0,
      negativeVotes: 0,
      routeColorGenerators: 0,
      routeGradientGenerators: 0,
      routeVisitsHP: 0,
      routeVisitsGft: 0,
      routeVisitsHomepage: 0,
      pagination: {
        pageSize: 5,
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
