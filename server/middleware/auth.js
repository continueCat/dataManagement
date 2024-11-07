const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
    console.log(ctx.state.user)
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        throw { status: 400, message: 'Token 已过期' };
      case 'JsonWebTokenError':
        throw { status: 400, message: '无效的 Token' };
    }
  }
  await next();
};

module.exports = {
  auth,
};
