const Controller = require("../controllers/posts-controller");
const { authN, authZ } = require("../middleware/auth");
const getToken = require("../helpers/spotify");
const multer = require("../middleware/multer");

const router = require("express").Router();

router.get("/", Controller.readPosts);
router.post("/post", authN, multer.single("image"), Controller.addPost);
router.get("/post/:id", Controller.detailPost);
router.put(
  "/post/:id",
  authN,
  authZ,
  multer.single("image"),
  Controller.editPost
);
router.delete("/post/:id", authN, authZ, Controller.deletePost);
router.get("/spotify", Controller.readSpotifyData);
router.get("/categories", Controller.readCategories);

module.exports = router;
