<script setup lang="ts">
const props = defineProps<{
    show: { id: number, title: string, numSeasons: number, startYear: number },
}>();
</script>

<template>
    <div class="showCard">
        <div class="showId">
            [#{{ show.id }}]
        </div>
        <div class="showTitle">{{ show.title }}</div>
        <div class="showTitleSeparator">-</div>
        <div class="showSeasons">{{ show.numSeasons }} Seasons</div>
        <div class="showDates">({{ show.startYear }})</div>
    </div>
</template>

<style scoped>
.showCard {
    background-color: #b8a887;
    border-radius: 0.5rem;
    margin: 2rem;
    padding: 2rem;
    max-width: 140rem;
}
.showId {
    float: left;
    display: inline;
}
.showTitle {
    float: left;
    display: inline;
    font-size: x-large;
}
.showTitleSeparator {
    display: none;
}
.showSeasons {
    display: inline;
    float: right;
}
.showDates {
    /* display: inline; */
    float: right;
}
</style>
