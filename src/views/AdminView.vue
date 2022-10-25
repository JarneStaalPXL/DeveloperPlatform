<template>
  <n-config-provider>
    <n-space vertical>
      <n-card>
        <n-space vertical>
          <h6>Current Status</h6>
          <section class="d-flex" style="gap: 10px">
            <n-input
              v-model:value="currentStatusInput"
              type="text"
              placeholder="Insert status"
            />
            <n-select
              placeholder="Select status"
              v-model:value="currentStatusType"
              :options="[
                { label: 'info', value: 'info' },
                { label: 'success', value: 'success' },
                { label: 'warning', value: 'warning' },
              ]"
            ></n-select>
          </section>
          <n-button
            class="w-100"
            @click="updateCurrentStatus(currentStatusInput, currentStatusType)"
            >Update Status</n-button
          >
        </n-space>
      </n-card>
      <section>
        <ActivityLog />
        <UniqueUserLog />
        <FeedbackLog />
      </section>
      <n-card>
        <n-radio-group
          name="radiobuttongroup1"
          v-model:value="selectedRadiobutton"
          @change="changeDataPeriod(selectedRadiobutton)"
        >
          <n-radio-button
            v-for="option of radioOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </n-radio-group>
        <VisitsChart :data="visitsData" :dataKeys="chartKeys" />
      </n-card>
      <section>
        <AdminManager />
      </section>
    </n-space>
  </n-config-provider>
</template>

<script>
import {
  darkTheme,
  NRadioButton,
  NRadioGroup,
  NConfigProvider,
  NSpace,
  NCard,
  useLoadingBar,
  NButton,
  NInput,
  NSelect,
  useMessage,
} from "naive-ui";
import ActivityLog from "@/components/AdminViewComponents/ActivityLog.vue";
import AdminManager from "@/components/AdminViewComponents/AdminManager.vue";
import UniqueUserLog from "@/components/AdminViewComponents/UniqueUserLog.vue";
import VisitsChart from "@/components/AdminViewComponents/VisitsChart.vue";
import FeedbackLog from "@/components/AdminViewComponents/FeedbackLog";
export default {
  components: {
    NRadioButton,
    NRadioGroup,
    ActivityLog,
    NConfigProvider,
    AdminManager,
    NSpace,
    NCard,
    UniqueUserLog,
    VisitsChart,
    NButton,
    NInput,
    NSelect,
    FeedbackLog,
  },
  data() {
    return {
      currentStatusInput: undefined,
      currentStatusType: undefined,
      selectedRadiobutton: "weekly",
      visitsData: [],
      chartKeys: ["name", "visits"],
    };
  },
  setup() {
    return {
      darkTheme,
      radioOptions: [
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" },
      ],
    };
  },
  async mounted() {
    window.$loadingbar = useLoadingBar();
    window.$message = useMessage();
    this.changeDataPeriod(this.selectedRadiobutton);

    let status = await this.$store.dispatch("GET_CURRENT_STATUS");
    this.currentStatusInput = status.data.attributes.currentStatus;
    this.currentStatusType = status.data.attributes.typeOfStatus;
  },
  methods: {
    async updateCurrentStatus(status, statusType) {
      window.$loadingbar.start();
      await this.$store.dispatch("UPDATE_CURRENT_STATUS", {
        currentStatus: status,
        Type: statusType,
      });
      window.$loadingbar.finish();
      window.$message.success("Status updated successfully");
    },
    async changeDataPeriod(value) {
      //built switch case and check if it's weekly monthly or yearly
      //if weekly then get the 4 week visit count
      //if monthly then get the 12 month visit count
      //if yearly then get the 5 year visit count
      //then set the data to the chart
      window.$loadingbar.start();
      let data = [];
      let today = new Date();
      switch (value) {
        case "weekly":
          this.$store.dispatch("GET_4_WEEK_VISIT_COUNT").then((res) => {
            this.visitsData = res;
            data.push(
              {
                name: "First Week",
                visits: this.visitsData.firstWeekOfMonth,
              },
              {
                name: "Second Week",
                visits: this.visitsData.secondWeekOfMonth,
              },
              {
                name: "Third Week",
                visits: this.visitsData.thirdWeekOfMonth,
              },
              {
                name: "Fourth Week",
                visits: this.visitsData.fourthWeekOfMonth,
              }
            );

            this.visitsData = data;
          });
          break;
        case "monthly":
          this.$store.dispatch("GET_12_MONTH_VISIT_COUNT").then((res) => {
            this.visitsData = res;
            for (let i = 0; i < 12; i++) {
              data.push({
                name: i.toString(),
                visits: this.visitsData[i - 1],
              });
            }

            this.visitsData = data;
          });
          break;
        case "yearly":
          this.$store.dispatch("GET_5_YEAR_VISIT_COUNT").then((res) => {
            this.visitsData = res;
            for (let i = 4; i >= 0; i--) {
              data.push({
                name: (today.getFullYear() - i).toString(),
                visits: this.visitsData[(today.getFullYear() - i).toString()],
              });
            }

            this.visitsData = data;
          });
          break;
      }
      setTimeout(() => {
        window.$loadingbar.finish();
      }, 200);
    },
  },
};
</script>

<style></style>
