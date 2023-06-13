const { Post, Comment, Category, User } = require("../models/index");
const cloudinary = require("../helpers/cloudinary");
const { getToken, checkToken, getTrackData } = require("../helpers/spotify");

let token;

class Controller {
  static async readPosts(req, res, next) {
    try {
      let { page, category } = req.query;

      let where = {};
      if (category) {
        where = {
          CategoryId: +category,
        };
      }

      if (!page) {
        page = 1;
      }

      const posts = await Post.findAndCountAll({
        include: [Category],
        where,
        order: [["id", "ASC"]],
        offset: (page - 1) * 10,
        limit: 10,
      });

      const { count, rows } = posts;

      const totalPage = Math.ceil(count / 10);

      res.status(200).json({
        page: page || 1,
        totalPages: totalPage,
        count: count,
        data: rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailPost(req, res, next) {
    try {
      const id = req.params.id;

      const post = await Post.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Comment,
            include: [User],
          },
        ],
      });

      if (!post) {
        throw {
          name: "postNotFound",
        };
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async addPost(req, res, next) {
    try {
      const UserId = req.userData.id;
      const { CategoryId, title, content, spotifyTrackId } = req.body;

      const category = await Category.findByPk(CategoryId);

      if (!category) {
        throw {
          name: "categoryNotFound",
        };
      }

      let imgUrl = "";
      let imgId = "";

      if (req.file?.path) {
        console.log("MASUK SINI IINININ");
        if (imgId) {
          await cloudinary.uploader.destroy(imgId);
        }

        const cloudResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "forum-website",
        });

        imgUrl = cloudResult.secure_url;
        imgId = cloudResult.public_id;
      }

      const newPost = await Post.create({
        title,
        content,
        imgUrl,
        imgId,
        spotifyTrackId,
        CategoryId,
        UserId,
      });

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  static async editPost(req, res, next) {
    try {
      const PostId = req.params.id;
      const { title, content } = req.body;

      let post = await Post.findByPk(PostId);

      let imgId = post.imgId;

      let imgUrl;

      if (req.file?.path) {
        const cloudResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "forum-website",
        });

        imgUrl = cloudResult.secure_url;
        imgId = cloudResult.public_id;
      }

      await Post.update(
        {
          title,
          content,
          imgUrl,
        },
        {
          where: {
            id: PostId,
          },
        }
      );

      res.status(201).json({
        message: `Post with id ${PostId} has been updated`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const id = req.params.id;

      await Post.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Post with id ${id} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async readSpotifyData(req, res, next) {
    try {
      const id = req.query.id;

      const tokenValid = await checkToken(token);

      if (!tokenValid) {
        token = await getToken();
        console.log(token);
      }

      const data = await getTrackData(token, id);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
