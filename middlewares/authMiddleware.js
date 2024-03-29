const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
   
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "authorization failed", success: false });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "authentication failed", success: false });
  }
};
