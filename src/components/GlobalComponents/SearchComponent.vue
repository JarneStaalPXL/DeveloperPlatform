<template>
  <n-auto-complete
    :get-show="getShow"
    clearable
    class="autoCompleteInput"
    :on-update:value="showResultsTools"
    :input-props="{
      autocomplete: 'disabled',
    }"
    :options="toolResults"
    placeholder="Search"
    :on-select="openLink"
  />
</template>

<script>
import { NAutoComplete } from "naive-ui";
export default {
  components: {
    NAutoComplete,
  },
  data() {
    return {
      toolResults: [],
    };
  },
  methods: {
    getShow: (value) => {
      if (value === "" || value === undefined || value === null) {
        return true;
      }
      if (value.length > 0) {
        return true;
      }
      return false;
    },
    async showResultsTools(value) {
      var tools = await this.$store.dispatch("SEARCH_TOOLS", value);
      //rank tools by string size
      tools.sort((a, b) => {
        return a.name.length - b.name.length;
      });

      let optionsArr = [];
      for (let tool of tools) {
        optionsArr.push({
          label: tool.name,
          value: tool.link,
        });
      }

      this.toolResults = optionsArr;
      if (this.showAll === false) {
        this.showAll = true;
      } else {
        this.showAll = false;
      }
    },
    openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
  },
};
</script>

<style></style>
