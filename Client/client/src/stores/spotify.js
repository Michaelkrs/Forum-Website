import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

// const baseUrl = "https://bouncy-mine-production.up.railway.app";
const baseUrl = "http://localhost:3000";

export const useSpotifyStore = defineStore("spotify", {
  state: () => ({ track: {} }),
  actions: {
    async getSpotifyData(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/spotify?id=${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.track = data;
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
      }
    },
  },
});
