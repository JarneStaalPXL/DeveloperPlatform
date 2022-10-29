<template>
  <n-card class="h-100">
    <n-space vertical>
      <n-card :title="userName" class="w-100">
        <template #cover>
          <img
            :src="profilePicture"
            id="profilePicture"
            v-if="isProfilePictureLoaded()"
          />
        </template>

        <!--Card content-->
        <n-space vertical>
          <n-statistic label="User ID" :value="userid">
            <template #prefix>
              <n-icon> </n-icon>
            </template>
            <!-- <template #suffix> / 100 </template> -->
          </n-statistic>
          <n-statistic label="Email"> {{ email }}</n-statistic>
          <n-statistic label="Visits">{{ totalVisits }}</n-statistic>
        </n-space>
      </n-card>
      <n-card title="History" v-if="routeVisitsToday.length > 0">
        <!--Get todays history of this user-->
        <!--Use component https://www.naiveui.com/en-US/os-theme/components/timeline-->
        <n-scrollbar x-scrollable>
          <n-timeline horizontal class="pb-4">
            <n-timeline-item
              v-for="item in routeVisitsToday"
              :key="item"
              type="success"
              :title="item.route"
              content="Visited Route"
              :time="item.createdAt"
            />
          </n-timeline>
        </n-scrollbar>
      </n-card>
      <n-card title="Settings">
        <div class="d-flex justify-content-center">
          <div class="d-flex justify-content-between" style="width: 300px">
            <span class="m-2">Toggle Home Notification</span>
            <n-switch
              class="m-2"
              :round="false"
              v-model:value="homescreenNotificationSwitch"
              @update:value="toggleHomeNotification"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="d-flex justify-content-between" style="width: 300px">
            <span class="m-2">Toggle QA Dashboard visiblity</span>
            <n-switch
              class="m-2"
              :round="false"
              v-model:value="QADashboardSwitch"
              @update:value="toggleQADashboardVisibility"
            />
          </div>
        </div>
      </n-card>
    </n-space>
  </n-card>
</template>

<script>
import {
  NCard,
  NSpace,
  NRow,
  NCol,
  NStatistic,
  NIcon,
  NTimeline,
  NTimelineItem,
  NScrollbar,
  NSwitch,
} from "naive-ui";
export default {
  components: {
    NCard,
    NSpace,
    NRow,
    NCol,
    NStatistic,
    NIcon,
    NTimeline,
    NTimelineItem,
    NScrollbar,
    NSwitch,
  },
  data() {
    return {
      totalVisits: 0,
      routeVisitsToday: [],
      homescreenNotificationSwitch: undefined,
      QADashboardSwitch: undefined,
    };
  },
  async beforeMount() {
    this.$store.commit("setShowLoadingAnimation", true);
    this.$store.dispatch("GET_USER_HOME_NOTIFICATION").then((result) => {
      if (result.homeNotification !== null) {
        this.homescreenNotificationSwitch = result;
      }
    });
    this.$store.dispatch("GET_QA_DASHBOARD_VISIBILITY").then((result) => {
      if (result.showQADashboard !== null) {
        this.QADashboardSwitch = result;
      }
    });
    let data = await this.$store.dispatch("GET_USER_VISIT_COUNT");
    data = data.data.attributes;
    this.totalVisits = data.totalVisits;
    this.routeVisitsToday = data.entriesFromToday;
    this.$store.commit("setShowLoadingAnimation", false);
  },
  methods: {
    isProfilePictureLoaded() {
      setTimeout(() => {
        let image = document.querySelector("img");
        if (image === null) {
          return false;
        }
        let isLoaded = image.complete && image.naturalHeight !== 0;
        return isLoaded;
      }, 2000);
    },
    toggleHomeNotification(isChecked) {
      this.$store.dispatch("SET_USER_HOME_NOTIFICATION", isChecked);
    },
    toggleQADashboardVisibility(isChecked) {
      this.$store.dispatch("SET_USER_QA_DASHBOARD_VISIBILITY", isChecked);
    },
  },
  computed: {
    userName() {
      return localStorage.getItem("userName");
    },
    profilePicture() {
      return localStorage.getItem("profilePic");
    },
    email() {
      return localStorage.getItem("email");
    },
    userid() {
      return localStorage.getItem("uid");
    },
  },
};
</script>

<style lang="scss" scoped>
#profilePicture {
  max-width: 150px;
  margin: auto;
  margin-top: 50px;
}
</style>
<style lang="scss">
.n-timeline-item-content__content,
.n-timeline .n-timeline-item .n-timeline-item-content .n-timeline-item-content__title {
  text-align: left !important;
}
.n-card-header__main {
}
</style>
