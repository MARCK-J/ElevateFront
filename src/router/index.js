import { createRouter, createWebHistory } from "vue-router";
import PerfilUsuario from "../examples/navbars/PerfilUsuario.vue";
import PresentationView from "../views/PresentationView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import LoginView from "../views/LoginView.vue";
import VerificationView from "../views/VerificationView.vue";
import RegisterView from "../views/RegisterView.vue";
import AuthorView from "../views/AuthorView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/perfil-usuario", // Define la ruta que desees
      name: "perfil-usuario",
      component: PerfilUsuario,
    },
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/pages/login",
      name: "login-view",
      component: LoginView,
    },
    {
      path: "/pages/login/verification",
      name: "verification-view",
      component: VerificationView,
    },
    {
      path: "/pages/register",
      name: "register-view",
      component: RegisterView,
    },
  ],
});

export default router;
