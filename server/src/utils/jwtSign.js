const jwt = require("jsonwebtoken");

const jwtsign = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: String(process.env.EXPIRE_TIME),
  });

  return token;
};

module.exports = jwtsign;
