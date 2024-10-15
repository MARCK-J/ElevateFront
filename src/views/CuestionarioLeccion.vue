<template>
    <div class="cuestionario-container">
      <h1>Crear Cuestionario</h1>
      <div v-for="(pregunta, index) in preguntas" :key="index" class="pregunta-container">
        <div class="pregunta-header">
          <h3>Pregunta {{ index + 1 }}</h3>
          <button @click="eliminarPregunta(index)" class="btn-eliminar">Eliminar Pregunta</button>
        </div>
  
        <!-- Selección de tipo de contenido -->
        <div class="input-group">
          <label>Tipo de Contenido:</label>
          <select v-model="pregunta.tipoContenido" class="select-input">
            <option value="texto">Solo Texto</option>
            <option value="texto_imagen">Texto con Imagen</option>
          </select>
        </div>
  
        <!-- Input de la pregunta -->
        <div class="input-group">
          <label>Pregunta:</label>
          <input type="text" v-model="pregunta.texto" class="text-input" placeholder="Escribe tu pregunta..." required />
          <span v-if="!pregunta.texto" class="error-message">Este campo es obligatorio.</span>
        </div>
  
        <!-- Mostrar opción de cargar imagen si es texto con imagen -->
        <div class="input-group" v-if="pregunta.tipoContenido === 'texto_imagen'">
          <label>Cargar Imagen:</label>
          <input type="file" @change="cargarImagen($event, index)" class="file-input" />
        </div>
  
        <!-- Respuestas de opción múltiple -->
        <div v-for="(respuesta, rIndex) in pregunta.respuestas" :key="rIndex" class="respuesta-container">
          <input type="text" v-model="respuesta.texto" class="text-input" placeholder="Escribe una respuesta..." required />
          <span v-if="!respuesta.texto" class="error-message">Este campo es obligatorio.</span>
          <button @click="eliminarRespuesta(index, rIndex)" class="btn-eliminar-respuesta">Eliminar</button>
        </div>
        <button @click="agregarRespuesta(index)" class="btn-agregar-respuesta">+ Añadir Respuesta</button>
      </div>
  
      <!-- Botón para agregar nueva pregunta -->
      <button @click="agregarPregunta" class="btn-agregar-pregunta">+ Añadir Pregunta</button>
  
      <!-- Botón para enviar el cuestionario -->
      <button @click="enviarCuestionario" class="btn-enviar">Enviar Cuestionario</button>
  
      <!-- Ventana emergente para confirmación -->
      <div v-if="mensajeExito" class="popup">
        {{ mensajeExito }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        preguntas: [
          {
            tipoContenido: 'texto',
            texto: '',
            imagen: null,
            respuestas: [{ texto: '' }, { texto: '' }]
          }
        ],
        mensajeExito: ''
      };
    },
    methods: {
      agregarPregunta() {
        this.preguntas.push({
          tipoContenido: 'texto',
          texto: '',
          imagen: null,
          respuestas: [{ texto: '' }, { texto: '' }]
        });
      },
      eliminarPregunta(index) {
        this.preguntas.splice(index, 1);
      },
      agregarRespuesta(index) {
        this.preguntas[index].respuestas.push({ texto: '' });
      },
      eliminarRespuesta(pIndex, rIndex) {
        this.preguntas[pIndex].respuestas.splice(rIndex, 1);
      },
      cargarImagen(event, index) {
        const file = event.target.files[0];
        this.preguntas[index].imagen = file;
      },
      enviarCuestionario() {
        // Validar que todas las preguntas y respuestas están llenas
        let valido = true;
        for (const pregunta of this.preguntas) {
          if (!pregunta.texto || pregunta.respuestas.some((respuesta) => !respuesta.texto)) {
            valido = false;
            break;
          }
        }
        if (!valido) {
          this.mensajeExito = ''; // Resetea el mensaje de éxito
          return;
        }
  
        // Mostrar mensaje de éxito
        this.mensajeExito = 'Cuestionario creado exitosamente para la lección.';
  
        // Aquí puedes enviar el cuestionario al servidor
        console.log('Cuestionario enviado', this.preguntas);
      }
    }
  };
  </script>
  
  <style scoped>
  .cuestionario-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
    background-color: #f1e4cb;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .pregunta-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .pregunta-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .input-group {
    margin-top: 10px;
  }
  
  .label {
    font-weight: bold;
  }
  
  .text-input,
  .select-input,
  .file-input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
  
  .respuesta-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .text-input {
    flex-grow: 1;
    margin-right: 10px;
  }
  
  .error-message {
    color: red;
    font-size: 12px;
  }
  
  .btn-agregar-pregunta,
  .btn-agregar-respuesta,
  .btn-enviar,
  .btn-eliminar,
  .btn-eliminar-respuesta {
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .btn-agregar-pregunta,
  .btn-agregar-respuesta,
  .btn-enviar {
    background-color: #4caf50;
    color: white;
  }
  
  .btn-eliminar,
  .btn-eliminar-respuesta {
    background-color: #e74c3c;
    color: white;
  }
  
  .btn-eliminar:hover,
  .btn-eliminar-respuesta:hover {
    background-color: #c0392b;
  }
  
  .btn-agregar-respuesta:hover,
  .btn-agregar-pregunta:hover,
  .btn-enviar:hover {
    background-color: #388e3c;
  }
  
  .btn-agregar-pregunta {
    margin-top: 20px;
  }
  
  .btn-enviar {
    margin-top: 30px;
    width: 100%;
    background-color: #2196f3;
  }
  
  .btn-enviar:hover {
    background-color: #1976d2;
  }
  
  .popup {
    margin-top: 20px;
    padding: 10px;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 5px;
    text-align: center;
  }
  </style>
  