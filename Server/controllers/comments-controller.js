const { Post, Comment, Category } = require("../models/index");

class Controller {
  static async addComment(req, res, next) {
    try {
      const { PostId, comment } = req.body;
      const UserId = req.userData.id;

      const post = await Post.findByPk(PostId);

      if (!post) {
        throw {
          name: "postNotFound",
        };
      }

      await Comment.create({
        UserId,
        PostId,
        comment,
      });

      res.status(201).json({
        message: `Comment posted on post id: ${PostId}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editComment(req, res, next) {
    try {
      const { comment } = req.body;
      const id = req.params.id;

      await Comment.update(
        {
          comment,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(201).json({
        message: "Comment updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const id = req.params.id;

      await Comment.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Comment deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
