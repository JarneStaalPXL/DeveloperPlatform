<template>
  <div class="wrapper" id="app">
    <h1 class="title">Developer Platform</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: {
        active: "images/icon-48x48.png",
        inactive: "images/icon-48x48-off.png",
      },
    };
  },
  // created(){
  //     chrome.storage.sync.get('toggleSitesActive', 'toggleSitesList'), (result) => {
  //         this.active = result.toggleSitesActive;
  //         this.list = result.toggleSitesList
  //     }
  // },
  // methods: {
  //     setActive(active){
  //         this.active = active;
  //         chrome.storage.sync.set({
  //             toggleSitesActive: active
  //         }, ()=>{})

  //         chrome.browserAction.setIcon({
  //             path: this.icons[active ? 'active' : 'inactive']
  //         })
  //     },
  //     saveList(){
  //         chrome.storage.sync.set({
  //             toggleSitesList: this.list
  //         }, () => {})
  //     }
  // }
};
</script>
