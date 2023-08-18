<script lang="ts">
import AddModal from './components/AddModal.vue';
import ClickawayOverlay from './components/ClickawayOverlay.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import ShowCard from './components/ShowCard.vue';
import type {ShowCreateData, ShowResponseData} from '@/services/show-data';
import {ShowService} from '@/services/show-service';

// TODO(research): should this be lazy/per instance??
let showService = new ShowService();

// TODO: this might be a bit too much for one `.vue` file. Maybe separate this one??
export default {
  components: {
    ClickawayOverlay,
    AddShowModal: AddModal,
    LoadingOverlay,
    ShowCard,
  },
  data() {
    return {
      loading: true,
      errorMessage: "", // TODO: it would be cool to make this a "toast" (with really high Z-index)
      modelOpen: false,
      searchResults: [] as ShowResponseData[],
    };
  },
  computed: {
    clickawayVisible(): boolean {
      return this.loading || this.modelOpen;
    },
    shows(): ShowResponseData[] {
      if (this.loading) {
        return [];
      } else {
        //TODO(nice-to-have): filter/sort data
        return this.searchResults;
      }
    },
  },
  methods: {
    openShowModal() {
      this.modelOpen = true;
    },
    async createShow(createData: { title: string, numSeasons: number, startYear: number }) {
      this.loading = true;
      this.modelOpen = false;
      await showService.create(createData);
      this.reload();
    },
    async reload() {
      this.loading = true;
      // TODO: only reload once at a time ever
      try {
        const results = await showService.load(); // TODO(nice-to-have): allow/send search params
        this.searchResults = results;
        // TODO: if empty results, show a "none here"
      } catch (err) {
        console.log('Error loading shows:');
        console.log(err);
        // TODO: want an error row/display (also/instead)
      }
      this.loading = false;
    },
  },
  async mounted() {
    this.reload();
  },
}
</script>

<template>
  <h1>Anime</h1>
  <button class="navButton" @click="openShowModal">+</button>
  <button class="navButton" @click="reload">&#8635;</button>
  <ClickawayOverlay v-if="clickawayVisible" @cancel="() => modelOpen = false"></ClickawayOverlay>
  <AddShowModal 
      v-if="modelOpen"
      @cancel="() => modelOpen = false"
      @save="(data) => createShow(data)"
      @error="(msg) => errorMessage = msg">
  </AddShowModal>
  <div v-if="loading">
    <LoadingOverlay :loading="loading"></LoadingOverlay>
  </div>
  <div v-else>
    <div class="showList">
      <div v-for="show in shows" :key="show.id">
        <ShowCard v-bind:show="show"></ShowCard>
      </div>
    </div>
  </div>
  <div v-if="errorMessage">
    <!-- TODO: extract this to new component for more complicated error display -->
    <div class="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.errorMessage {
  font-weight: bolder;
  color: #471010;
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: 2rem;
  background-color: white;
  border-radius: 2rem;
}

.navButton {
  width: 2rem;
  height: 2rem;
}

/* TODO: an auto-flowing grid layout vs table vs scrolling list-thing (with floaty members)? */
.showList {}
</style>
