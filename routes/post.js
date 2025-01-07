const express = require("express");
const route = express.Router();
const postController = require("../controllers/postController");
const middlewares = require("../middlewares");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/img/user_postingan");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 2MB limit
});

route.get("/post", postController.getPost);
route.get("/post/mine", middlewares.verifyToken, postController.getYourPost);

route.get("/post/category/:post_category", postController.getPostByCategory);
route.get("/post/tags/:post_tags", postController.getPostByTags);
route.get("/post/terbaru", postController.getPostByTerbaru);
route.get("/post/terlama", postController.getPostByTerlama);
route.get("/post/all/:unique_id", postController.getPostByUniqueId);
route.get("/post/:slug", postController.getPostBySlug);
route.post("/post/create", middlewares.verifyToken, upload.single("file"), (req, res, next) => {
  const fileName = req.file.filename;
  postController.createPostingan(req, res, next, fileName); // mengirim nama file yg sama ke userController.updateProfile
});
route.put("/post/update/:slug", middlewares.verifyToken, upload.single("file"), (req, res, next) => {
  const fileName = req.file.filename;
  postController.updatePostingan(req, res, next, fileName); // mengirim nama file yg sama ke userController.updateProfile
});
route.delete("/post/delete/:id", middlewares.verifyToken, postController.deletePostingan);

module.exports = route;
