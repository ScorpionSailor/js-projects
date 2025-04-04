<script setup>
import {ref} from 'vue';
const emit = defineEmits(['start-quiz']);
const topic = ref('');

</script>

<template>
    <section class="start-screen container">
        <h2>Choose a topic to start testing your knowledge</h2>
        <input v-model="topic" type="text" placeholder="Enter your topic...">
        <button @click="emit('start-quiz', topic)" :disabled ="!topic">Start Quiz</button>
    </section>
</template>