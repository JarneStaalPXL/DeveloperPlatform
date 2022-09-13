<template>
  <n-card>
    <n-space vertical>
      <n-card :title="userName" class="w-100">
        <template #cover>
          <img
            :src="profilePicture"
            style="max-width: 350px; margin: auto; margin-top: 50px"
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
      <n-card title="Todays History">
        <!--Get todays history of this user-->
        <!--Use component https://www.naiveui.com/en-US/os-theme/components/timeline-->
        <div style="overflow: auto">
          <n-timeline horizontal>
            <n-timeline-item
              v-for="item in routeVisitsToday"
              :key="item"
              type="success"
              :title="item.route"
              content="Visited Route"
              :time="item.timeStamp"
            />
            <!-- <n-timeline-item content="Oops" />
            <n-timeline-item
              type="success"
              title="Success"
              content="Success content"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="error"
              content="Error content"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="warning"
              title="Warning"
              content="Warning content"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="info"
              title="Info"
              content="Info content"
              time="2018-04-03 20:46"
            /> -->
          </n-timeline>
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
} from "naive-ui";
export default {
  components: { NCard, NSpace, NRow, NCol, NStatistic, NIcon, NTimeline, NTimelineItem },
  data() {
    return {
      totalVisits: 0,
      routeVisitsToday: [],
    };
  },
  async beforeMount() {
    let data = await this.$store.dispatch("GET_USER_VISIT_COUNT");
    data = data.data.attributes;
    this.totalVisits = data.totalVisits;
    this.routeVisitsToday = data.entriesFromToday;
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

<style lang="scss">
.n-timeline-item-content__content {
  text-align: left !important;
}
</style>
