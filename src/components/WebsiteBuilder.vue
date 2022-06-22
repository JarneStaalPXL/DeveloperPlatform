<template>
  <div class="mt-5">
    <n-row>
      <n-col :span="12">
        <n-checkbox v-model:checked="avatar"> Avatar </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox v-model:checked="action"> Action </n-checkbox>
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="12">
        <n-checkbox v-model:checked="header"> Header </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox v-model:checked="headerExtra"> Header Extra </n-checkbox>
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="12">
        <n-checkbox v-model:checked="description"> Description </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox v-model:checked="footer"> Footer </n-checkbox>
      </n-col>
      <n-button @click="setDesignMode()">{{
        designMode === false ? "Edit Mode" : "View Mode"
      }}</n-button>
      <n-button v-if="oldDOM !== updatedDOM" @click="saveDOMChanges()"
        >Save Changes</n-button
      >
      <n-button v-if="updatedDOM !== null" @click="exportupdatedDOMCode()"
        >Export code</n-button
      >
    </n-row>
    <n-divider />

    <hr />

    <n-card title="Editor">
      <div class="previewContainer">
        <header v-if="header">
          <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Site Title</a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#"
                      >Home</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li>
                        <a class="dropdown-item" href="#">Another action</a>
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <a class="dropdown-item" href="#"
                          >Something else here</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                  </li>
                </ul>
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </header>
        <footer v-if="footer">
          <div class="card">
            <div class="card-header">Featured</div>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </footer>
      </div>
    </n-card>

    <hr />
    <h1>Result</h1>
    <div class="injectionContainer mt-3"></div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import {
  NCheckbox,
  NCol,
  NRow,
  NDivider,
  NIcon,
  NAvatar,
  NButton,
  NSpace,
  NThing,
  NCard,
} from "naive-ui";
import { defineComponent, ref } from "vue";
import { CashOutline as CashIcon } from "@vicons/ionicons5";

export default defineComponent({
  components: {
    CashIcon,
    NCheckbox,
    NCol,
    NRow,
    NDivider,
    NIcon,
    NAvatar,
    NButton,
    NSpace,
    NThing,
    NCard,
  },
  data() {
    return {
      designMode: false,
      oldDOM: null,
      updatedDOM: null,
    };
  },
  methods: {
    saveDOMChanges() {
      if (this.oldDOM !== this.updatedDOM) {
        document.querySelector(".injectionContainer").innerHTML =
          document.querySelector(".previewContainer").innerHTML;
      }
    },
    setDesignMode() {
      if (this.designMode === true) {
        document.querySelector(".previewContainer").contentEditable = false;
        this.designMode = false;
        //Store DOM
        this.oldDOM = document;
      } else if (this.designMode === false) {
        this.designMode = true;
        document.querySelector(".previewContainer").contentEditable = true;
        //Store updated DOM
        this.updatedDOM = document;
      }
    },
    exportupdatedDOMCode() {
      var blob = new Blob(
        [document.querySelector(".injectionContainer").innerHTML],
        { type: "text/plain;charset=utf-8" }
      );
      saveAs(blob, "exportedCode.html");
    },
  },
  setup() {
    return {
      avatar: ref(false),
      header: ref(false),
      headerExtra: ref(false),
      description: ref(false),
      footer: ref(false),
      action: ref(false),
    };
  },
});
</script>