import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Posts from "@/views/Post.vue";
import Categories from "@/views/Categories.vue";
import PageCategories from "@/views/PageCategories.vue";
import PageSearch from "@/views/PageSearch.vue";
import PageView from "@/views/PageView.vue";
import Setting from "@/views/Setting.vue";
import NewPost from "@/views/newPost.vue";
import Signin from "@/views/Signin.vue";
import CreateCate from "@/components/cCate.vue";
import UpdateDeleteCate from "@/components/udCate.vue";
import { auth } from "@/firebase/config";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
