<template>
  <div>
    <div class="container mt-0">
      <ul class="list-group">
        <li v-for="quiz in quizzes" :key="quiz.quizId" class="list-group-item">
          <router-link >
            <h5>{{ quiz.title }}</h5>
            <p>{{ quiz.description }}</p>
            <p><strong>Fecha Límite:</strong> {{ formatDate(quiz.dueDate) }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    courseId: {
      type: Number,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quizzes: [],
    };
  },
  methods: {
    async fetchQuizzes() {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/quizzes/course/${this.courseId}`, {
          headers: {
            Accept: 'application/json',
          },
        });
        this.quizzes = response.data.result;
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  async mounted() {
    await this.fetchQuizzes();
  },
};
</script>

<style scoped>
.container {
  z-index: 2;
  position: relative;
}

.list-group-item {
  margin-bottom: 10px;
}

.list-group-item a {
  text-decoration: none;
  color: inherit;
}

.list-group-item a:hover {
  text-decoration: underline;
}
</style>