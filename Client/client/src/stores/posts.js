import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const swalToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// const baseUrl = "https://bouncy-mine-production.up.railway.app";
const baseUrl = "http://localhost:3000";

export const usePostStore = defineStore("post", {
  state: () => ({ posts: [], totalPages: 0 }),
  actions: {
    async readPosts(page = 1, category = "") {
      try {
        const { data } = await axios.get(
          `${baseUrl}/?page=${page}&category=${category}`
        );

        this.posts = data.data;
        this.totalPages = data.totalPages;
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
      }
    },

    async addPost(data) {
      try {
        let bodyFormData = new FormData();

        const spotifyTrackId = data.spotifyTrackLink.slice(31);

        bodyFormData.append("title", data.title);
        bodyFormData.append("content", data.content);
        bodyFormData.append("image", data.file);
        bodyFormData.append("spotifyTrackId", spotifyTrackId);
        bodyFormData.append("CategoryId", data.CategoryId);

        await axios.post(`${baseUrl}/post`, bodyFormData, {
          headers: {
            access_token: localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
        });

        swalToast.fire({
          icon: "success",
          title: "Post added",
        });
        router.push({ name: "home" });
      } catch (error) {
        if (typeof error.response.data.error === "string") {
          toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          error.response.data.error.forEach((err) => {
            toast.error(err, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        }
      }
    },

    async editPost(data, id) {
      try {
        let bodyFormData = new FormData();

        bodyFormData.append("title", data.title);
        bodyFormData.append("content", data.content);
        bodyFormData.append("image", data.file);
        bodyFormData.append("CategoryId", data.CategoryId);

        await axios.put(`${baseUrl}/post/${id}`, bodyFormData, {
          headers: {
            access_token: localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
        });

        swalToast.fire({
          icon: "success",
          title: "Post added",
        });
        router.push({ name: "home" });
      } catch (error) {
        if (typeof error.response.data.error === "string") {
          toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          error.response.data.error.forEach((err) => {
            toast.error(err, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        }
      }
    },

    async deletePost(id) {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "This action cannot be undone",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(`${baseUrl}/post/${id}`, {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            });

            swalToast.fire({
              icon: "success",
              title: "Post deleted",
            });
          }
        });
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
      }
    },
  },
});

export const useDetailStore = defineStore("postDetail", {
  state: () => ({
    post: {
      title: "",
      imgUrl: "",
      content: "",
      Category: {
        name: "",
      },
    },
  }),
  actions: {
    async postDetail(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/post/${id}`);
        this.post = data;
        // localStorage.setItem("currentPostId", data.data.id);
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
      }
    },
  },
});
