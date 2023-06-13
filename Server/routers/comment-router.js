const Controller = require("../controllers/comments-controller");
const { authN, commentAuthZ } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", authN, Controller.addComment);
router.put("/:id", authN, commentAuthZ, Controller.editComment);
router.delete("/:id", authN, commentAuthZ, Controller.deleteComment);

module.exports = router;
