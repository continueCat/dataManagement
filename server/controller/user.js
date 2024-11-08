const jwt = require('jsonwebtoken');
const usersService = require('../service/user');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/config.default');
/**
 * 注册用户
 * @param {object} ctx - Koa 上下文对象
 */
async function register(ctx) {
  try {
    const { username, password } = ctx.request.body;

    if (!username) {
      throw { status: 400, message: 'username不能为空' };
    }
    if (username.length > 10) {
      throw { status: 400, message: 'username长度不能超过10个字符' };
    }
    if (!password) {
      throw { status: 400, message: 'password不能为空' };
    }
    if (password.length > 10) {
      throw { status: 400, message: 'password长度不能超过10个字符' };
    }

    await usersService.addUser(username, password);

    const responseData = {
      code: 201,
      msg: '添加成功',
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 登录功能
 * @param {object} ctx - Koa 上下文对象
 */
async function login(ctx) {
  const { username, password } = ctx.request.body;
  // 合法性
  if (!username || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    throw { status: 400, message: '用户名或密码为空' };
  }
  // 合理性
  const res = await usersService.findUser(username);
  if (!res) {
    throw { status: 400, message: '用户名不存在' };
  }
  if (!bcrypt.compareSync(password, res.password)) {
    throw { status: 400, message: '密码错误' };
  }

  ctx.body = {
    code: 0,
    message: '用户登录成功',
    result: {
      code: 200,
      msg: '登录成功',
      data: {
        token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
      },
    },
  };
}

module.exports = {
  register,
  login,
};
