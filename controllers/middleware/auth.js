require("dotenv").config();
const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
  // if (!req.headers.authorization) {
  //   return res.json({ status: 403, message: "Vui lòng đăng nhập lại" });
  // }
  var token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Token không tồn tại" });
  try {
    const decode = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    if(error.name == 'TokenExpiredError'){
    res.json({ success: false, message:'TokenExpiredError'  });
    } else if(error.name == 'JsonWebTokenError'){
      res.status(403).json({ success: false, message:'JsonWebTokenError'  });
    }
  }
};

module.exports = {
  verifyToken,
};
