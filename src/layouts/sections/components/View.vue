<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Importa useRouter
import Swal from "sweetalert2"; // Importa SweetAlert2

// import Prism Editor
import { PrismEditor } from "vue-prism-editor"; //
import "prismjs/themes/prism.css"; // import the styles somewhere
import "vue-prism-editor/dist/prismeditor.min.css";

// import highlighting library (you can use any library you want just return html string)
import prism from "prismjs";

// clipboard
import useClipboard from "vue-clipboard3";

// prop
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: "",
  },
});

// variables
const { toClipboard } = useClipboard();
const editorCode = ref(props.code);

// functions
const copy = async (event) => {
  try {
    await toClipboard(editorCode.value);
    const el = event.target.parentElement;
    var alert = document.createElement("div");
    alert.classList.add(
      "alert",
      "alert-success",
      "position-absolute",
      "top-5",
      "border-0",
      "text-white",
      "w-25",
      "end-0",
      "start-0",
      "mt-2",
      "mx-auto",
      "py-2"
    );
    alert.style.transform = "translate3d(0px, 0px, 0px)";
    alert.style.opacity = "0";
    alert.style.transition = ".35s ease";
    setTimeout(function () {
      alert.style.transform = "translate3d(0px, 20px, 0px)";
      alert.style.setProperty("opacity", "1", "important");
    }, 100);
    alert.innerHTML = "Code successfully copied!";
    el.parentElement.appendChild(alert);
    setTimeout(function () {
      alert.style.transform = "translate3d(0px, 0px, 0px)";
      alert.style.setProperty("opacity", "0", "important");
    }, 2000);
    setTimeout(function () {
      el.parentElement.querySelector(".alert").remove();
    }, 2500);
  } catch (e) {
    console.error(e);
  }
};


const highlighter = (code) => {
  return prism.highlight(code, prism.languages.html);
};

// Redirige a la ruta 'info-curso' cuando se hace clic en la pestaña 'lecciones'
const router = useRouter();
const goToLecciones = () => {
  router.push({ name: "info-curso" });
};
</script>

<template>
  <div class="position-relative border-radius-xl overflow-hidden shadow-lg mb-7">
    <div class="container border-bottom">
      <div class="row justify-space-between py-2">
        <div class="col-lg-3 me-auto">
          <p class="lead text-dark pt-1 mb-0">{{ title }}</p>
        </div>
        <div class="col-lg-3">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill flex-row p-1" role="tablist"></ul>
          </div>
        </div>
        <div>
        </div>

        <div class="rating">
          <input value="5" name="rate" id="star5" type="radio" />
          <label title="text" for="star5"></label>
          <input value="4" name="rate" id="star4" type="radio" />
          <label title="text" for="star4"></label>
          <input value="3" name="rate" id="star3" type="radio" checked="" />
          <label title="text" for="star3"></label>
          <input value="2" name="rate" id="star2" type="radio" />
          <label title="text" for="star2"></label>
          <input value="1" name="rate" id="star1" type="radio" />
          <label title="text" for="star1"></label>
          <h4 class="tituloEstrella">Calificación del curso:</h4>
        </div>
      </div>
    </div>
    <div class="tab-content tab-space">
      <div class="tab-pane active p-2" :id="`preview-${id}`">
        <div class="overflow-auto" :class="`${height && `height-${height}`}`">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>



<style>
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  color: black;
  /* you must provide font-family font-size line-height. Example: */
  font-family: Consolas, Fira Mono, Menlo, Courier, monospace;
  font-size: 1em;
  line-height: 1.5;
  padding: 5px;
  tab-size: 4;
}
/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
.favorite-button {
  background-color: #4aa4d8;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s ease;
}

.favorite-button:hover {
  background-color: #ff9900;
}

/* From Uiverse.io by andrew-demchenk0 */ 
.rating:not(:checked) > input {
  position: absolute;
  appearance: none;
}

.rating:not(:checked) > label {
  float:right;
  cursor: pointer;
  font-size: 30px;
  color: #666;
}

.tituloEstrella{
  float:right;
  
}


.rating:not(:checked) > label:before {
  content: '★';
}

.rating > input:checked + label:hover,
.rating > input:checked + label:hover ~ label,
.rating > input:checked ~ label:hover,
.rating > input:checked ~ label:hover ~ label,
.rating > label:hover ~ input:checked ~ label {
  color: #e58e09;
}

.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  color: #ff9e0b;
}

.rating > input:checked ~ label {
  color: #ffa723;
}




</style>