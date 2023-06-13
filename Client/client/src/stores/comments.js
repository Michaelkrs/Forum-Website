import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

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

export const useCommentStore = defineStore("comment", {
  state: () => ({}),
  actions: {
    async addComment(PostId, comment) {
      try {
        const data = {
          PostId,
          comment,
        };

        await axios.post(`${baseUrl}/comments`, data, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        swalToast.fire({
          icon: "success",
          title: "Comment added",
        });
      } catch (error) {
        swalToast.fire({
          icon: "error",
          title: error.response.data.error,
        });
      }
    },
  },
});
