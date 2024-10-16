import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/PresentationView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import LoginView from "../views/LoginView.vue";
import VerificationView from "../views/VerificationView.vue";
import RegisterView from "../views/RegisterView.vue";
import AuthorView from "../views/AuthorView.vue";
import ProfileView from "../views/ProfileView.vue";
import CourseView from "../views/CourseView.vue";
import DashboardView from "../views/DashboardView.vue";
import LessonsView from "../views/LessonsView.vue";
import CreateLesson from "../views/CreateLesson.vue";
import CuestionarioLeccion from "../views/CuestionarioLeccion.vue";
import CourseListView from "../views/CourseListView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/pages/cuestionario/:lessonId", // Ruta dinámica que captura el lessonId
      name: "cuestionario-leccion",
      component: CuestionarioLeccion,
    },
    {
      path: "/profile", // Define la ruta que desees
      name: "profile",
      component: ProfileView,
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
    {
      path: "/pages/course",
      name: "course",
      component: CourseView,
    },
    {
      path: "/pages/",
      name: "lessons",
      component: LessonsView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/courses",
      name: "coursesList",
      component: CourseListView,
    },

  ],
});

export default router;
