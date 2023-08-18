<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['cancel', 'save', 'error']);
const title = ref("");
const year = ref(2023); // TODO: this year
const numSeasons = ref(1);

function validateForm() {
    if (!title.value.length) {
        emit('error', 'Missing title');
    } else if (year.value <= 0) {
        emit('error', 'Invalid year');
    } else if (numSeasons.value <= 0) {
        emit('error', 'Invalid # seasons');
    } else {
        emit('error', '');
        emit('save', {
            title: title.value,
            startYear: year.value,
            numSeasons: numSeasons.value,
        });
    }
}
</script>

<template>
    <div class="modalContent">
        <div>
            <label>Title:
                <input type="text" v-model="title" placeholder="Show Title" />
            </label>
        </div>
        <div>
            <label>Year:
                <input type="text" v-model="year" placeholder="YYYY" />
            </label>
        </div>
        <div>
            <label># Seasons:
                <input type="text" v-model="numSeasons" placeholder="N" />
            </label>
        </div>
        <div>
            <button name="save" @click="validateForm">
                Save
            </button>
            <button name="cancel" @click="() => emit('cancel')">
                Cancel
            </button>
        </div>
    </div>
</template>

<style scoped>
.modalContent {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #f3f1f1;
    background-color: #2e2920;
    z-index: 3;
    padding: 2rem;
    border: .1rem black solid;
    border-radius: 0.5rem;
}
</style>
