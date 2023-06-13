import { createRouter, createWebHistory } from "vue-router";
import LayoutView from "../views/LayoutView.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import HomePage from "../views/HomePage.vue";
import DetailPage from "../views/DetailPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import AddEditPage from "../views/AddEditPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: LayoutView,
      children: [
        {
          path: "",
          name: "home",
          component: HomePage,
        },
        {
          path: "/login",
          name: "login",
          component: LoginPage,
        },
        {
          path: "/register",
          name: "register",
          component: RegisterPage,
        },
        {
          path: "/post/:id",
          name: "detail",
          component: DetailPage,
        },
        {
          path: "/post/:id/edit",
          name: "edit-post",
          component: AddEditPage,
        },
        {
          path: "/post/add",
          name: "add-post",
          component: AddEditPage,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

router.beforeEach((to, from, next) => {
  if (
    (to.name === "login" && localStorage.getItem("access_token")) ||
    (to.name === "register" && localStorage.getItem("access_token"))
  ) {
    next({ name: "home" });
  } else if (
    (to.name === "edit-post" && !localStorage.getItem("access_token")) ||
    (to.name === "add-post" && !localStorage.getItem("access_token"))
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
