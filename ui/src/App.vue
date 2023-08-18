<script lang="ts">
import LoadingOverlay from './components/LoadingOverlay.vue';
import Show from './components/Show.vue';
// import {ShowData} from '@/services/show-data'; // TODO: .vue anti-magic is keeping normal .ts files from working here??

interface ShowData {
  id: number;
  title: string;
  numSeasons: number;
  startYear: number;
}

export default {
  data() {
    return {
      loading: true,
      searchResults: [] as ShowData[],
    };
  },
  computed: {
    shows(): ShowData[] {
      if (this.loading) {
        return [];
      } else {
        //TODO(nice-to-have): filter/sort data
        return this.searchResults;
      }
    },
  },
  methods: {},
  mounted() {
    this.searchResults.push({ id: 1, title: "Foo", numSeasons: 3, startYear: 1994 });
    this.loading = false;
  },
}
</script>

<template>
  <h1>Anime</h1>
  <div v-if="loading">
    <LoadingOverlay :loading="loading"></LoadingOverlay>
  </div>
  <div v-else>
    <div class="showList">
      <div v-for="show in shows" :key="show.id">
        <Show v-bind:show="show"></Show>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
