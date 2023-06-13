import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

// const baseUrl = "https://bouncy-mine-production.up.railway.app";
const baseUrl = "http://localhost:3000";

export const useCategoryStore = defineStore("category", {
  state: () => ({ categories: [] }),
  actions: {
    async readCategories() {
      try {
        const { data } = await axios.get(`${baseUrl}/categories`);

        this.categories = data;
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
      }
    },
  },
});
