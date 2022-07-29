<template>
    <section class="providersContainer">
        <a v-for="provider of providers" :key="provider" @click="openLink(provider.link)" :style="{
            backgroundImage: 'url(' +
                (provider.websitePreviewImage
                    ? provider.websitePreviewImage
                    : websitePreviewImagePlaceholder) +
                ')',
            backgroundPosition: provider.websitePreviewImage ? '' : 'center',
        }">
            <div class="item">
                <p v-if="provider.description" style="{ color: provider.textColor ? provider.textColor : 'white' }">{{
                        provider.description
                }}</p>
            </div>
        </a>
    </section>
</template>

<script>
export default {
    data() {
        return {
            providers: [
                {
                    name: "Vercel",
                    link: "https://vercel.com/",
                    description: "Vercel is an amazing service. They allow you to " +
                        "easily develop applications, previewing them before setting it to production.",
                    websitePreviewImage: "https://yt3.ggpht.com/ytc/AKedOLQXY9C5hZmkiir52pex2P38IdWxH_zZvYEdPE5Utw=s900-c-k-c0x00ffffff-no-rj"
                },
                {
                    name: "Netlify",
                    link: "https://www.netlify.com/",
                    description: "Netlify is the go-to platform for deploying" +
                        " modern web projects. It comes with an integrated system to let you" +
                        " quickly deploy projects from GitHub and GitLab.",

                },
                {
                    name: "Heroku",
                    link: "https://www.heroku.com/",
                    description: "Heroku is a hosting service for full stack applications" +
                        " in the cloud. They support Nodejs, Pyton, Ruby, Java apps and many more."
                }, {
                    name: "Qovery",
                    link: "https://www.qovery.com/",
                    description: "Qovery is another hosting service which provides hosting for full-stack" +
                        " web apps and built-in databases. They provide unlimited apps and databases."
                },
                {
                    name: "Layer0",
                    link: "https://www.layer0.co/",
                    description: "Layer0 allows you to deploy JAMStack websites very easily using technologies " +
                        "like Next.js, Nuxt.js, React and more."
                }, {
                    name: "Replit",
                    link: "https://repl.it/",
                }, {
                    name: "Render",
                    link: "https://render.com/",
                }, {
                    name: "Fly.io",
                    link: "https://fly.io/",
                },
                {
                    name: "Github Pages",
                    link: "https://pages.github.com/",
                }, {
                    name: "Stormkit",
                    link: "https://stormkit.io/",
                }, {
                    name: "Koyeb",
                    link: "https://koyeb.com/",
                }, {
                    name: "Glitch",
                    link: "https://glitch.com/",
                }, {
                    name: "Fleek",
                    link: "https://fleek.co/",
                }, {
                    name: "W3Schools Spaces",
                    link: "https://www.w3schools.com/spaces/",
                }, {
                    name: "Surge",
                    link: "https://surge.sh/",
                }, {
                    name: "Deta",
                    link: "https://www.deta.sh/",
                }, {
                    name: "Hostman",
                    link: "https://hostman.com/",
                }, {
                    name: "Railway",
                    link: "https://railway.app/",
                }, {
                    name: "Flatlogic",
                    link: "https://flatlogic.com/",
                }, {
                    name: "begin",
                    link: "https://begin.com/",
                }, {
                    name: "Firebase",
                    link: "https://firebase.com/",
                }, {
                    name: "GitLab Pages",
                    link: "https://gitlab.com/pages/",
                }, {
                    name: "Cloudflare Pages",
                    link: "https://pages.cloudflare.com/",
                },
            ]
        }
    },
    methods: {
        openLink(url) {
            if (url === "" || url === undefined) {
                return;
            }
            window.open(url, "_blank");
        },
    },
};
</script>

<style lang="scss" scoped>
.providersContainer {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 0 !important;
}

.item {
    width: 300px;
    height: 300px;
    border-radius: 15px;

    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;

    p {
        font-size: 18px;
        color: white;
    }

    &:hover {
        border: 2px solid white;
    }
}
</style>