const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal server error";
  console.log(err, "ERROR <<<<<<<<<");
  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      msg = err.errors.map((el) => el.message);
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = err.errors.map((el) => el.message).join();
      break;
    case "noInput":
      code = 400;
      msg = "Email/password required";
      break;
    case "loginFailed":
      code = 401;
      msg = "Email/password invalid";
      break;
    case "forbidden":
      code = 403;
      msg = "Forbidden access";
      break;
    case "postNotFound":
      code = 404;
      msg = "Post not found";
      break;
    case "categoryNotFound":
      code = 404;
      msg = "Category not found";
      break;
    case "fileNotSupported":
      code = 400;
      msg = "File not supported";
      break;
    case "imageRequired":
      code = 400;
      msg = "Image is required";
      break;
  }

  res.status(code).json({
    error: msg,
  });
};

module.exports = errorHandler;
