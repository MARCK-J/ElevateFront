<template>
  <div class="courses-section">
    <h2>Cursos inscritos</h2>
    <div class="courses-container">
      <div class="course" v-for="(course, index) in courses" :key="index">
        <h3>CURSO: {{ course.title }}</h3>
        <p>TUTOR: {{ course.tutor }}</p>
        <button class="go-to-course-button">Ir al curso</button>
        <button class="unsubscribe-button" @click="confirmUnsubscribe(course.title)">Desinscribirme</button>
      </div>
    </div>

    <!-- Custom Modal for Unsubscribe Confirmation -->
    <div v-if="isModalVisible" class="custom-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="!modalMessage">Confirmar Desinscripción</h5>
          <h5 v-else>{{ modalMessage }}</h5>
          <button class="close-button" @click="closeModal">×</button>
        </div>
        <div class="modal-body" v-if="!modalMessage">
          ¿Estás seguro que deseas desinscribirte del curso <strong>{{ selectedCourse }}</strong>?
        </div>
        <div class="modal-footer" v-if="!modalMessage">
          <button class="cancel-button" @click="cancelUnsubscribe">Cancelar</button>
          <button class="confirm-button" @click="unsubscribe">Desinscribirme</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        { title: 'JavaScript desde cero', tutor: 'Carlos Palenque' },
        { title: 'Python avanzado', tutor: 'Laura Salas' },
        { title: 'Machine Learning básico', tutor: 'Luis Torres' },
        { title: 'Diseño UX/UI', tutor: 'Andrea Pérez' },
        { title: 'Desarrollo Web Full-Stack', tutor: 'Ricardo López' },
        { title: 'Data Science', tutor: 'Ana Ruiz' },
        { title: 'React para principiantes', tutor: 'José Morales' }
      ],
      selectedCourse: '',
      successMessage: '',
      isModalVisible: false,
      modalMessage: ''
    };
  },
  methods: {
    confirmUnsubscribe(courseTitle) {
      this.selectedCourse = courseTitle;
      this.isModalVisible = true;
      this.modalMessage = '';
    },
    unsubscribe() {
      this.modalMessage = `Te desinscribiste con éxito del curso "${this.selectedCourse}".`;
      setTimeout(this.closeModal, 2000);
    },
    cancelUnsubscribe() {
      this.modalMessage = 'Operación Cancelada.';
      setTimeout(this.closeModal, 2000);
    },
    closeModal() {
      this.isModalVisible = false;
      this.modalMessage = '';
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  background-color: #f0d7b3;
}

.courses-section {
  margin-top: 30px;
  padding: 20px;
}

.courses-section h2 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #4b3832;
  margin-bottom: 20px;
}

.courses-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.course {
  background-color: #87CEFA;
  width: 30%;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.course:hover {
  transform: scale(1.05);
}

.unsubscribe-button {
  background-color: #FF6347;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.unsubscribe-button:hover {
  background-color: #c0392b;
}

.go-to-course-button {
  background-color: #3e8e41;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}

.go-to-course-button:hover {
  background-color: #09640c;
}

.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.cancel-button {
  background-color: #cccccc;
  color: white;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button {
  background-color: #FF6347;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #999999;
}

.confirm-button:hover {
  background-color: #c0392b;
}
</style>