const verifyToken = (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Token đã hết hạn" });
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    // console.log(error.decode);
    res.status(403).json({ success: false, message: "Vui lòng đăng nhập lại" });
  }
};

module.exports = {
  verifyToken,
};
