import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import LoginView from "../views/LandingPages/Login/LoginView.vue";
import RegisterView from "../views/LandingPages/Register/RegisterView.vue";
import ContactView from "../views/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import VerificationView from "../views/LandingPages/Login/VerificationView.vue";
import PerfilUsuario from "../examples/navbars/PerfilUsuario.vue";
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
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/pages/landing-pages/login",
      name: "login-view",
      component: LoginView,
    },
    {
      path: "/pages/landing-pages/login/verification",
      name: "verification-view",
      component: VerificationView,
    },
    {
      path: "/pages/landing-pages/register",
      name: "register-view",
      component: RegisterView,
    },
  ],
});

export default router;
