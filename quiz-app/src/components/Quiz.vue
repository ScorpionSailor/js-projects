<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['questions']);
const emit = defineEmits(['store-answer','end-quiz']);

const currentQuestion = ref(0);
const selectedOption = ref(null);
const shuffledQuestions = computed(() => {
    const options = [...props.questions[currentQuestion.value].incorrect_answers];
    options.splice(Math.round(Math.random() * options.length), 0, props.questions[currentQuestion.value].correct_answer);
    return options;
});
const submitAnswer = () => {
    emit('store-answer', {
        question: props.questions[currentQuestion.value],
        userAnswer: selectedOption.value
    });
    selectedOption.value = null;
    if(currentQuestion.value === props.questions.length-1){
        emit('end-quiz'); 
        currentQuestion.value=0;
    }
    else currentQuestion.value += 1;
};  

</script>
<template>
    <section class="quiz container">
        <div class="header">
            <h2>Quiz</h2>
            <p>Question {{ currentQuestion + 1 }} of {{ props.questions.length }}</p>
        </div>
        <progress 
            max="100"
            :value="(currentQuestion + 1) / props.questions.length * 100">
        </progress>

        <div class="questions">
            <h3>
                {{ props.questions[currentQuestion].question }}
            </h3>
            <div class="answers">
                <button class="answer"
                :class="{active: answer === selectedOption}"
                v-for="answer in shuffledQuestions"
                @click="selectedOption = answer"
                :key="answer">
                {{ answer }}
                </button>
            </div>
            <button v-if="selectedOption" @click="submitAnswer()">Send</button>
        </div>
    </section>
</template>