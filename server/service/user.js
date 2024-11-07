const { read, save } = require('../lib/util');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')

const FILE_NAME = 'users';
const saveTag = data => save(data, FILE_NAME);

/**
 * 添加新用户
 * @param {string} username - 用户名称
 * @param {string} password - 密码
 */
async function addUser(username, password) {
  try {
    const userList = await read(FILE_NAME);
    const isNameExists = userList.some(user => user.username === username);

    if (isNameExists) {
      throw { status: 400, message: '用户名已存在' };
    }
    const newUser = {
      id: uuidv4(),
      username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    };

    saveTag([...userList, newUser]);
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function findUser(username) {
  try {
    const userList = await read(FILE_NAME);
    const user = userList.find(user => user.username === username);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addUser,
  findUser
};
