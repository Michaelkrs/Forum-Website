import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// const baseUrl = "https://bouncy-mine-production.up.railway.app";
const baseUrl = "http://localhost:3000";

export const useLoginStore = defineStore("login", {
  state: () => ({ isLoggedIn: false }),
  actions: {
    async login(data) {
      try {
        const loginData = {
          email: data.email,
          password: data.password,
        };

        const res = await axios.post(`${baseUrl}/login`, loginData);

        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("UserId", res.data.id);
        this.isLoggedIn = true;

        Swal.fire("Login Successful", "", "success");
        router.push({ name: "home" });
      } catch (error) {
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },

    async register(data) {
      try {
        await axios.post(`${baseUrl}/register`, data);

        Swal.fire(
          "Register Successful",
          "Please continue to log in",
          "success"
        );
        router.push({ name: "login" });
      } catch (error) {
        error.response.data.error.forEach((err) => {
          toast.error(err, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
    },

    loginStatus() {
      if (localStorage.getItem("access_token")) {
        this.isLoggedIn = true;
      }
    },

    logout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be signed out",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          this.isLoggedIn = false;
          router.push({ name: "home" });
        }
      });
    },

    async googleHandleCredential(credential) {
      try {
        const res = await axios.post(`${baseUrl}/login/google-login`, null, {
          headers: {
            google_token: credential,
          },
        });

        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("email", res.data.email);
        this.isLoggedIn = true;

        router.push({ name: "home" });
        Swal.fire("Login Successful", "", "success");
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
      }
    },
  },
});
