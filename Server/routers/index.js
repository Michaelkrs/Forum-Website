const errorHandler = require("../handlers/error-handlers");
const registerRouter = require("./register-router");
const loginRouter = require("./login-router");
const dataRouter = require("./post-router");
const commentsRouter = require("./comment-router");

const router = require("express").Router();

router.use("/", dataRouter);
router.use("/comments", commentsRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);

router.use(errorHandler);

module.exports = router;
