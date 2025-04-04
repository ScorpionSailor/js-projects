<script setup>
const props = defineProps(['userAnswers']);
const emit = defineEmits(['restart-quiz'])
</script>

<template>
    <section class="result-screen container">
       <h1>Results</h1>
       <ul>
        <li
            v-for="(answer,index) in props.userAnswers"
            :key="index"
            :class="answer.question.correct_answer == answer.userAnswer ? 'correct':'incorrect'"
        >
            <p v-html="answer.question.correct_answer === answer.userAnswer ? '&#9989;' : '&#10060;'"></p>
            <b>{{ answer.question.question }}</b>
            <p> Your answer: {{ answer.useranswer }}</p>
            <p> Correct answer: {{ answer.question.correct_answer }}</p>
       </li>
    </ul>
    <button @click="$emit('restart-quiz')">Atempt again</button>
    </section>
</template>