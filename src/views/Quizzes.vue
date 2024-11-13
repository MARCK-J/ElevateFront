<script setup>
// Importar `useRoute` de Vue Router para acceder a los parámetros de la query
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue';
import axios from "axios";

// Acceder a la ruta actual
const route = useRoute();

// Extraer `courseId` y `courseTitle` de la query
const courseId = ref(route.query.courseId || 0);
const courseTitle = ref(route.query.courseTitle || "");

// Verificar los valores de los parámetros
console.log('Este es mi titulo ' + courseTitle.value);
console.log('Este es mi courseId ' + courseId.value);

// Importar componentes
import BaseLayout from "../layouts/sections/components/BaseLayout.vue";
import View from "../layouts/sections/components/View.vue";

// Variables y estados para el cuestionario
const questions = ref([]); // Lista de preguntas
const selectedAnswers = ref({}); // Respuestas seleccionadas por el usuario
const showResults = ref(false); // Estado para mostrar los resultados
const score = ref(0); // Puntuación del usuario

// Función para cargar las preguntas del cuestionario
const loadQuizQuestions = async () => {
  try {
    const response = await axios.get(`http://localhost:9999/api/v1/courses/${courseId.value}/quiz`);
    questions.value = response.data.questions;
  } catch (error) {
    console.error("Error al cargar el cuestionario:", error);
  }
};

// Función para calcular el puntaje y mostrar los resultados
const submitQuiz = () => {
  score.value = questions.value.reduce((acc, question) => {
    const selectedAnswer = selectedAnswers.value[question.id];
    if (selectedAnswer === question.correctAnswer) {
      return acc + 1; // Sumar punto si la respuesta es correcta
    }
    return acc;
  }, 0);
  showResults.value = true; // Mostrar los resultados
};

// Cargar preguntas al montar el componente
onMounted(() => {
  loadQuizQuestions();
});
</script>

<template>
  <BaseLayout
    :title="courseTitle"
    :breadcrumb="[ 
      { label: 'Cursos', route: '/' },
      { label: courseTitle },
      { label: 'Cuestionarios' },
    ]"
  >
    <View title="Cuestionarios del curso" id="header-1">
      <template v-if="!showResults">
        <div v-for="(question, index) in questions" :key="question.id" class="question-block">
          <h4>{{ index + 1 }}. {{ question.text }}</h4>
          <div class="options">
            <label
              v-for="option in question.options"
              :key="option"
              class="option"
            >
              <input
                type="radio"
                :name="'question-' + question.id"
                :value="option"
                v-model="selectedAnswers[question.id]"
              />
              {{ option }}
            </label>
          </div>
        </div>
        <button @click="submitQuiz" class="submit-button">Enviar Quiz</button>
      </template>

      <template v-else>
        <div class="results">
          <h2>Resultados del Cuestionario</h2>
          <p>Tu puntaje es: {{ score }} de {{ questions.length }}</p>
        </div>
      </template>
    </View>
  </BaseLayout>
</template>

<style scoped>
.question-block {
  margin-bottom: 20px;
}
.options {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.option {
  margin-bottom: 5px;
}
.submit-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.submit-button:hover {
  background-color: #45a049;
}
.results {
  text-align: center;
  margin-top: 20px;
}
</style>
