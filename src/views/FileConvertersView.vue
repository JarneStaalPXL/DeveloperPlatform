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

    {{ fileList }}
  </n-card>
</template>

<script>
import {
  NCard,
  NBadge,
  NSelect,
  NUpload,
  NUploadDragger,
  NIcon,
  NP,
  NText,
  useMessage,
} from "naive-ui";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
export default {
  name: "FileConvertersView",
  components: {
    NCard,
    NBadge,
    NSelect,
    NUpload,
    NUploadDragger,
    NIcon,
    NP,
    NText,
    ArchiveIcon,
  },
  data() {
    return {
      fileList: [],
      selectedConvertFile: "html",
      fileConvertTypes: [
        {
          label: "html",
          value: "html",
        },
        {
          label: "pdf",
          value: "pdf",
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
      this.fileList = fileList;
    },
    handleUploadChange(fl) {
      window.$message.destroyAll();
      window.$message.info(fl.file.status);

      switch(this.selectedConvertFile){
        case "html":
          this.convertToHtml(fl.file);
          break;
        case "pdf":
          this.convertDocToPdf(fl.file);
          break;
      }
    },
    convertToHtml(file){
      let fileName =
      this.getConvertedFileName(file);
      let uploadedFile = this.getUploadedFileAsFileObject(file,fileName);
      
      let formData = new FormData();
      formData.append(fileName, uploadedFile);
      formData.append("type", uploadedFile.type);

      this.downloadFile(fileName,uploadedFile);
    },
    convertDocToPdf(file){
      let fileName =
      this.getConvertedFileName(file);
      let uploadedFile = this.getUploadedFileAsFileObject(file,fileName);
      
      let formData = new FormData();
      formData.append(fileName, uploadedFile);
      formData.append("type", uploadedFile.type);

      //send file to pdf converter
      //TODO: Create node.js api that converts file to pdf with pdfkit
      // console.log(formData.get(fileName));
      fetch("http://localhost:3000/convertDocToPdf",
      {
        method: "POST",
        body: JSON.stringify({
          data: {
            form: formData,
          }
        }),
       })
      .then((response) => response.blob())
      .then((blob) => {
        // console.log(blob);
        let pdfFile = new File([blob], "converted.pdf", {
          type: "application/pdf",
        });
        // this.downloadFile(fileName,pdfFile);
      });
      

    },
    downloadFile(fileName,uploadedFile){
      let objectURL = URL.createObjectURL(uploadedFile);
      let link = document.createElement('a');
      link.download = fileName; // this name is used when the user downloads the file
      link.href = objectURL;
      link.click();
    },
    getConvertedFileName(file){
      return file.name.split(".")[0] + "." + this.selectedConvertFile;
    },
    getUploadedFileAsFileObject(file, fileName){
      return new File([file.file], fileName, {
        type: file.type,
      });
    }
  },
};
</script>

<style></style>
