const Controller = require("../controllers/login-register-controller");
const router = require("express").Router();

router.post("/", Controller.register);

module.exports = router;
