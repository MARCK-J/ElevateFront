<script setup>
import { onMounted } from "vue";

// tooltip
import setTooltip from "@/assets/js/tooltip";

// store
import { useAppStore } from "@/stores";
const store = useAppStore();

defineProps({
  route: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  pro: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  setTooltip(store.bootstrap);
});
</script>
<script>
export default {
  inheritAttrs: false,
};
</script>
<template>
  <RouterLink :to="{ name: route }" @click.native="$emit('click')">
    <div
      class="card move-on-hover"
      v-bind="$attrs"
      :data-bs-toggle="pro ? 'tooltip' : null"
      :data-bs-placement="pro ? 'top' : null"
      :title="pro ? 'Pro Element' : null"
    >
      <!-- resto del contenido -->
    </div>
    <div class="mt-2 ms-2">
      <h6 class="mb-0">{{ title }}</h6>
      <p class="text-secondary text-sm font-weight-normal">
        {{ subtitle }}
      </p>
    </div>
  </RouterLink>
</template>
