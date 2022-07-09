<template>
    <section class="colorGeneratorContainer">
        <a @click="$router.push($store.state.routings.colorPalletGenerator.path)">
            <div class="item">
                <p>Color Pallet Generator</p>
            </div>
        </a>
    </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.colorGeneratorContainer {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
    margin-top: 0 !important;
}

.item {
    width: 300px;
    margin: auto;
    height: 300px;
    border-radius: 15px;
    margin-bottom: 20px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;

    p {
        font-size: 18px;
    }

    &:hover {
        border: 2px solid white;
    }
}
</style>