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
.showCard {}
.showId {}
.showTitle {}
.showSeasons {}
.showDates {}
</style>
