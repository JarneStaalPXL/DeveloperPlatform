<template>
  <n-drawer
    v-model:show="$store.state.showUserProjectDetailModal"
    :width="800"
    :placement="'right'"
  >
    <n-drawer-content>
      <h4>{{ project.title }}</h4>
      <!-- <pre>{{ project }}</pre> -->
      <n-space vertical>
        <div
          class="mb-3"
          v-for="extraDt of processExtraDataPropertiesWithValues(project)"
          :key="extraDt"
        >
          <!--Get property of extraDt -->
          {{ Object.getOwnPropertyNames(extraDt)[0] }}

          <!-- <n-select
          filterable
          tag
          multiple
          :options="
            getOptionsFromObject(JSON.parse(JSON.stringify(Object.values(extraDt)[0])))
          "
        /> -->
          <div class="d-flex" style="gap: 5px">
            <n-tag
              :style="
                applyColorIfColorProperty(Object.getOwnPropertyNames(extraDt)[0], value)
              "
              class="mt-2"
              v-for="value of Object.values(extraDt)[0]"
              :key="value"
            >
              {{ value }}
            </n-tag>
          </div>
        </div>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { NDrawerContent, NDrawer, NSelect, NDynamicTags, NSpace, NTag } from "naive-ui";
export default {
  props: {
    project: Object,
  },
  components: {
    NDrawerContent,
    NDynamicTags,
    NDrawer,
    NSelect,
    NSpace,
    NTag,
  },
  mounted() {},
  methods: {
    applyColorIfColorProperty(property, color) {
      if (property !== "Colors") return;
      return {
        background: color,
        color: "white",
      };
    },
    getOptionsFromObject(arr) {
      arr.forEach((item, index) => {
        arr[index] = { label: item, value: item };
      });
      return arr;
    },
    processExtraDataPropertiesWithValues(project) {
      //   console.log(project.extraData);
      if (project.extraData.length === 0) {
        return ["No extra data"];
      }

      let extraDataPropertiesWithValues = [];
      for (const property of project.extraData) {
        let propertyName = property.propName;
        let propertyValues = property.propValue;
        extraDataPropertiesWithValues.push({
          [propertyName]: JSON.parse(JSON.stringify(propertyValues)),
        });
      }

      console.log(extraDataPropertiesWithValues);
      //   console.log(extraDataPropertiesWithValues);

      //   console.log(project.extraData[0].propName);
      //   if (project.extraData[0].propName !== undefined) {
      //     let extraData = JSON.parse(JSON.stringify(this.project.extraData));
      //     let extraDataPropertiesWithValues = [];
      //     for (const property of extraData) {
      //       extraDataPropertiesWithValues.push({ [property.propName]: property.propValue });
      //     }
      //     // console.log(extraDataPropertiesWithValues);
      //     return extraDataPropertiesWithValues;
      //   }
      return extraDataPropertiesWithValues;
    },
  },
};
</script>
