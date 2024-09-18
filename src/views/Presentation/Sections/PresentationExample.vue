<script setup> 
import ExampleCard from "../Components/ExampleCard.vue";
import MaterialBadge from "../../../components/MaterialBadge.vue";

defineProps({
  data: {
    type: Array,
    required: true,
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
    },
  },
  col1: {
    type: String,
    default: "col-lg-4",
  },
  col2: {
    type: String,
    default: "col-lg-8",
  },
});
</script>

<template>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <MaterialBadge color="primary" class="mb-3">
            Explora nuestras colecciones de cursos
          </MaterialBadge>
          <h2 class="text-primary mb-3">Aquí empieza tu preparación para el futuro</h2>
          <p class="lead text-muted">
            Estamos comprometidos con tu educación, ofreciéndote los mejores cursos en un solo lugar.
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div
        v-for="({ heading, description, items }, index) in data"
        :key="heading"
        :class="`row ${index > 0 ? 'pt-lg-5' : ''}`"
      >
        <div :class="`${col1}`">
          <div
            class="sticky-top pb-lg-5 pb-3 mt-lg-0 mt-5 px-3"
            style="top: 100px"
          >
            <h3 class="text-dark font-weight-bold mb-3">{{ heading }}</h3>
            <h6 class="text-secondary font-weight-light pe-3">
              {{ description }}
            </h6>
          </div>
        </div>
        <div :class="`${col2}`">
          <div :class="`row ${index > 0 ? 'mt-4' : ''}`">
            <div
              class="col-md-6 col-lg-4 mt-4"
              v-for="{ image, title, subtitle, route, pro } in items"
              :key="title"
            >
              <ExampleCard
                class="min-height-200 shadow-lg rounded-3 p-3"
                :image="image"
                :title="title"
                :subtitle="subtitle"
                :route="route"
                :pro="pro"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilo general para la sección */
section {
  background-color: #c3dbe4; /* Fondo suave para destacar el contenido */
}

/* Estilo para el título principal */
h2 {
  font-family: 'Montserrat', sans-serif; /* Fuente moderna */
  font-size: 2.5rem; /* Tamaño del texto */
  font-weight: 700; /* Peso del texto */
  color: #007bff; /* Color primario */
}

/* Estilo para el texto de párrafo */
p.lead {
  font-family: 'Open Sans', sans-serif; /* Fuente legible */
  font-size: 1.125rem; /* Tamaño del texto */
  color: #2f3235; /* Color de texto suave */
}

/* Estilo para las tarjetas */
.ExampleCard {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave para efectos */
}

.ExampleCard:hover {
  transform: translateY(-10px); /* Efecto de elevación al pasar el ratón */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Sombra más prominente */
}
.text-primary {
    color: #5c7561 !important;
}
.bg-primary {
    background-color: #68a854 !important;
}
</style>
