<script setup>
import { GoogleGenAI , Type} from "@google/genai";
import StartScreen from "./components/StartScreen.vue";
import { ref } from "vue";
import Quiz from "./components/Quiz.vue";
import Loader from "./components/loader.vue";
import result from "./components/result.vue";

const questions = ref('');
const status = ref('start');
const userAnswers = ref([]);

const restartQuiz = () =>{
  questions.value = ('');
  status.value = ('start');
  userAnswers.value = ([]);

}

const storeAnswer = (answer)=>{
  userAnswers.value.push(answer);
};

const startQuiz = async (topic) => {
  status.value='loading';
  const ai = new GoogleGenAI({ apiKey: "AIzaSyDgm7XmBjtC8uvvfBcJJVend9HyU0jtPv0" });
  async function main() {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: 
        `
        Create 5 quiz quetions about ${topic}
        Difficulty: Easy to Medium
        Type: Multiple Choice 
        `,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    response_code: {
                        type: Type.INTEGER,
                        nullable: false
                    },
                    results: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                type: {
                                    type: Type.STRING,
                                    description: "Type of question (multiple or boolean)",
                                    nullable: false
                                },
                                difficulty: {
                                    type: Type.STRING,
                                    description: "Difficulty level of the question",
                                    nullable: false
                                },
                                category: {
                                    type: Type.STRING,
                                    description: "Category of the question",
                                    nullable: false
                                },
                                question: {
                                    type: Type.STRING,
                                    description: "The quiz question",
                                    nullable: false
                                },
                                correct_answer: {
                                    type: Type.STRING,
                                    description: "Correct answer to the question",
                                    nullable: false
                                },
                                incorrect_answers: {
                                    type: Type.ARRAY,
                                    description: "List of incorrect answers",
                                    items: {
                                        type: Type.STRING
                                    },
                                    nullable: false
                                }
                            },
                            required: [
                                "type", "difficulty", "category", "question", "correct_answer", "incorrect_answers"
                            ]
                        },
                        nullable: false
                    }
                },
                required: ["response_code", "results"]
            },
        },
    });
    questions.value = JSON.parse(response.text);
    status.value = 'quiz';
    console.log(questions);
}

main();

};
</script>

<template>
  <div id="app">
    <header>
      <div class="container">
        <img src="./assets/logo.png" alt="Vue logo" class="logo" />
        <h1>Quiz Generator</h1>
      </div>
    </header>
    <StartScreen v-if="status =='start'" @start-quiz="startQuiz" />
    <Loader v-if="status == 'loading'"/>
    <Quiz  v-if="status =='quiz'" @end-quiz="status='finished'" @store-answer="storeAnswer" :questions="questions.results"/>
    <result v-if="status =='finished'" @restart-quiz="restartQuiz" :userAnswers="userAnswers"/>
  </div>
</template>
