<template>
  <n-card class="categoryCard">
    <!--TODO: File upload-->
    <n-upload
    multiple
    directory-dnd
    :max="1"
    @update:file-list="handleFileListChange"
    @change="handleUploadChange"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        Click or drag a file to this area to upload
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        Strictly prohibit from uploading sensitive information. For example,
        your bank card PIN or your credit card expiry date.
      </n-p>
    </n-upload-dragger>
  </n-upload>
    <!--TODO: Be able to choose the extension -->
    <n-select v-model:value="selectedConvertFile" :options="fileConvertTypes" />

    <!--TODO: Provide converter component-->

    {{fileList}}
  </n-card>
</template>

<script>
import { NCard, NBadge, NSelect, NUpload, NUploadDragger, NIcon, NP, NText, useMessage } from "naive-ui";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
export default {
  name: "FileConvertersView",
  components: {
    NCard,
    NBadge,
    NSelect,
    NUpload, NUploadDragger, NIcon, NP, NText,
    ArchiveIcon,
  },
  data() {
    return {
        fileList: [],
      selectedConvertFile: "docx",
      fileConvertTypes: [
        {
          label: "docx",
          value: "docx",
        },
      ],
    };
  },
  created() {},
  mounted() {
    window.$message = useMessage();
  },
  methods: {
    handleFileListChange(fileList) {
        console.log("Filelist", fileList);
      this.fileList = fileList;
    },
    handleUploadChange(fl) {
        window.$message.destroyAll();
        console.log(fl)
        window.$message.info(fl.file.status);
      
    },
  },
};
</script>

<style></style>
