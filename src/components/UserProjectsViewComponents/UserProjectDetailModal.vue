<template>
  <n-drawer
    closable
    v-model:show="$store.state.showUserProjectDetailModal"
    :width="500"
    :placement="'right'"
  >
    <n-drawer-content>
      <h4>{{ $store.state.selectedDetailedProject.title }}</h4>
      <!-- <pre>{{ project }}</pre> -->
      <n-space vertical class="nSpaceContainer">
        <p v-if="$store.state.selectedDetailedProject.usedTools.length > 0">Used Tools</p>
        <section class="nTagContainer">
          <n-popover
            trigger="hover"
            v-for="tool of $store.state.selectedDetailedProject.usedTools"
            :key="tool"
          >
            <template #trigger>
              <n-button @click="openLink(tool.link)">{{ tool.name }}</n-button>
            </template>
            <span>Click to get to the tool</span>
          </n-popover>
        </section>

        <p v-if="$store.state.selectedDetailedProject.usedColors.length > 0">
          Used Colors
        </p>
        <section class="nTagContainer">
          <n-tag
            :style="applyColorIfColorProperty('Colors', color.usedColor)"
            class="mt-2"
            v-for="color of $store.state.selectedDetailedProject.usedColors"
            :key="color"
          >
            {{ color.usedColor ? color.usedColor : "Black" }}
          </n-tag>
        </section>

        <section
          class="mb-3"
          v-for="extraDt of processExtraDataPropertiesWithValues(
            $store.state.selectedDetailedProject
          )"
          :key="extraDt"
        >
          <!--Get property of extraDt -->
          <p>{{ Object.getOwnPropertyNames(extraDt)[0] }}</p>
          <div class="nTagContainer">
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
        </section>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import {
  NDrawerContent,
  NDrawer,
  NSelect,
  NDynamicTags,
  NSpace,
  NTag,
  NButton,
  NPopover,
} from "naive-ui";
export default {
  // props: {
  //   project: Object,
  // },
  components: {
    NDrawerContent,
    NDynamicTags,
    NDrawer,
    NSelect,
    NSpace,
    NTag,
    NButton,
    NPopover,
  },
  mounted() {},
  methods: {
    openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
    applyColorIfColorProperty(property, color) {
      if (property !== "Colors") return;
      //Get a good text color that contrasts backgroundcolor
      let textColor;
      try {
        if (color === undefined) {
          textColor = "white";
          color = "black";
        }

        //check if color is a hex color
        if (color.includes("#")) {
          textColor = this.getContrastYIQ(color);
        }

        if (color !== undefined && !color.includes("#")) {
          textColor = this.getContrastYIQ(this.colourNameToHex(color));
        }

        return {
          background: color,
          color: textColor,
        };
      } catch (e) {
        return {};
      }
    },
    colourNameToHex(color) {
      var colors = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        "indianred ": "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
      };
      if (typeof colors[color.toLowerCase()] != "undefined")
        return colors[color.toLowerCase()];

      return false;
    },
    getContrastYIQ(color) {
      //get RGB from color name

      color = color.replace("#", "");
      var r = parseInt(color.substr(0, 2), 16);
      var g = parseInt(color.substr(2, 2), 16);
      var b = parseInt(color.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "black" : "white";
    },
    // getOptionsFromObject(arr) {
    //   arr.forEach((item, index) => {
    //     arr[index] = { label: item, value: item };
    //   });
    //   return arr;
    // },
    processExtraDataPropertiesWithValues(project) {
      if (project.extraData.length === 0) {
        return ["No extra data"];
      }
      let extraDataPropertiesWithValues = [];
      for (const property of project.extraData) {
        let propertyName = property.propName;
        let propertyValues = property.propValue;
        if (propertyValues !== undefined) {
          extraDataPropertiesWithValues.push({
            [propertyName]: JSON.parse(JSON.stringify(propertyValues)),
          });
        }
      }
      return extraDataPropertiesWithValues;
    },
  },
};
</script>
<style lang="scss" scoped>
.nTagContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 30px;
  * {
    min-width: 100px;
  }
}
.nSpaceContainer {
  gap: 0px !important;

  p {
    margin-bottom: 10px;
  }
}
</style>
