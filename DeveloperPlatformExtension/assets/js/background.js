



















//when the extension is installed for the first time, set default values

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({
//         toggleSitesActive: false,
//         toggleSitesList: 'example.com'
//     }, () => {})
// })
//

//setup the initial chrome storage values

// let toggleSitesActive = false
// let toggleSitesList = "example.com"


//
// chrome.storage.sync.get([
//     'toggleSitesActive',
//     'toggleSitesList'
// ], (result) => {
//     toggleSitesActive = result.toggleSitesActive;
//     toggleSitesList = result.toggleSitesList;
// })

//

// chrome.webRequest.onBeforeRequest.addListener(
//     (details) => {
//         if(!toggleSitesActive){
//             return {cancel: false}
//         }

//         let cancel = toggleSitesList.split(/\n/)
//         .some(site => {
//             let url = new URL(details.url)

//             return Boolean(url.hostname.indexOf(site) !== -1)
//         });

//         return { cancel : cancel};

        
//     },
//     {
//         urls: ["<all_urls>"]

//     },
//     [
//         "blocking"
//     ]
    
// )


// chrome.storage.onChanged.addListener((changes, namespace) => {
//     if(namespace == 'sync') {
//         if(changes.toggleSitesActive) {
//             toggleSitesActive = changes.toggleSitesActive.newValue
//         }
//         if(changes.toggleSitesList){
//             toggleSitesList = changes.toggleSitesList.newValue
//         }
//     }
// })