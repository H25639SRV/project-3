import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Token is not valid" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not provided" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res
    .status(403)
    .send({ message: "Access denied! You are not an admin" });
};

export { getToken, isAuth, isAdmin };
