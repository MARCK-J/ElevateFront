<template>
<div class="courses-section">
    <h2>Cursos inscritos</h2>
    <div class="courses-container">
      <div class="course">
          <h3>CURSO: JavaScript desde cero</h3>
          <p>TUTOR: Carlos Palenque</p>
          <button class="go-to-course-button">Ir al curso</button>
          <button class="unsubscribe-button">Desinscribirme</button>

      </div>
      <div class="course">
          <h3>CURSO: Python avanzado</h3>
          <p>TUTOR: Laura Salas</p>
          <button class="go-to-course-button">Ir al curso</button>
          <button class="unsubscribe-button">Desinscribirme</button>

      </div>
      <div class="course">
          <h3>CURSO: Machine Learning básico</h3>
          <p>TUTOR: Luis Torres</p>
          <button class="go-to-course-button">Ir al curso</button>
          <button class="unsubscribe-button">Desinscribirme</button>

      </div>
      <div class="course">
          <h3>CURSO: Diseño UX/UI</h3>
          <p>TUTOR: Andrea Pérez</p>
          <button class="go-to-course-button">Ir al curso</button>
          <button class="unsubscribe-button">Desinscribirme</button>

      </div>
      <div class="course">
          <h3>CURSO: Desarrollo Web Full-Stack</h3>
          <p>TUTOR: Ricardo López</p>
          <button class="go-to-course-button">Ir al curso</button>
          <button class="unsubscribe-button">Desinscribirme</button>

      </div>
      <div class="course">
          <h3>CURSO: Data Science</h3>
          <p>TUTOR: Ana Ruiz</p>
          <button class="go-to-course-button">Ir al curso</button>
          <button class="unsubscribe-button">Desinscribirme</button>
      </div>
      <div class="course">
          <h3>CURSO: React para principiantes</h3>
          <p>TUTOR: José Morales</p>
          <button class="go-to-course-button">Ir al curso</button>
          <button class="unsubscribe-button">Desinscribirme</button>

      </div>
  </div>
  
  </div>
</template>
<style scoped>

.course {
    background-color: #87CEFA;
    width: 30%;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
}

.courses-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #f0d7b3; /* Color de fondo suave */
  border-radius: 8px;
}

.courses-section h2 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
}

.courses-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.course-card {
  background-color: #8ab5e1;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.course-card h3, .course-card p {
  font-family: 'Arial', sans-serif;
  color: #000;
}

.unsubscribe-button {
    background-color: #FF6347;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
   
}

.unsubscribe-btn:hover {
  background-color: #c0392b;
}

.go-to-course-button{
  background-color: #3e8e41;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

}

.go-to-course-button:hover{
  background-color: #3e8e41;
}

</style>