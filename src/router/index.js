import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import MovieDetail from "../views/MovieDetail.vue";
import FavoritesView from "../views/FavoritesView.vue";

const routes = [
    {
        path: "/",
        component: HomeView
    },
    {
  path: "/movie/:id",
  component: MovieDetail
    },
    {
        path: "/tv/:id",
        component: MovieDetail
    },
    {
        path: "/favorites",
        component: FavoritesView
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});