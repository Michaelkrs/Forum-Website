const Controller = require("../controllers/login-register-controller");
const router = require("express").Router();

router.post("/", Controller.login);
router.post("/google-login", Controller.googlefindOrCreate);

module.exports = router;
