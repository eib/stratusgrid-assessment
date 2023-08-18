<script setup lang="ts">
// TODO: event to parent(s) to indicate "close me"?
const emit = defineEmits(['cancel']);
</script>

<template>
    <div class="clickaway" @click="() => emit('cancel')"></div>
</template>

<style scoped>
/* https://www.w3schools.com/howto/howto_css_overlay.asp */
.clickaway {
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
}
</style>
