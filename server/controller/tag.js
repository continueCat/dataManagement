const tagsService = require('../service/tag');
const dataService = require('../service/data');

/**
 * 新增标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function addTag(ctx) {
  try {
    const { name } = ctx.request.body;

    if (!name) {
      throw { status: 400, message: 'name不能为空' };
    }

    if (name.length > 10) {
      throw { status: 400, message: 'name长度不能超过10个字符' };
    }

    await tagsService.addTag(name);

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
 * 标签查询接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function getTags(ctx) {
  try {
    const { data = [] } = await tagsService.getTags();

    const responseData = {
      code: 200,
      msg: '查询成功',
      data,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 修改标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function editTag(ctx) {
  try {
    const { id, name } = ctx.request.body;

    if (!id) {
      throw { status: 400, message: 'id不能为空' };
    }

    if (!name) {
      throw { status: 400, message: 'name不能为空' };
    }

    await tagsService.editTag(id, name);

    const responseData = {
      code: 201,
      msg: '修改成功',
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 删除标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function delTag(ctx) {
  try {
    const { id } = ctx.request.query;

    if (!id) {
      throw { status: 400, message: 'id不能为空' };
    }

    const { data } = await dataService.getData();
    const isThisIdWasUsed = data.some(item => item.tags.includes(id));

    if (isThisIdWasUsed) {
      throw { status: 400, message: '该标签已被使用，不能删除' };
    }

    const result = await tagsService.delTag(id);

    const responseData = {
      code: 204,
      msg: '删除成功',
      data: result,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

async function delTags(ctx) {
  try {
    const { ids } = ctx.request.body; // 从请求体中获取 IDs 列表
    console.log('Received ids:', ids);

    if (!Array.isArray(ids) || ids.length === 0) {
      throw { status: 400, message: 'ids不能为空' };
    }

    // 从 dataService 中获取数据
    const { data } = await dataService.getData();
    // 检查是否有标签在被使用
    const isAnyIdUsed = data.some(item =>
      item.tags.some(tag => ids.includes(tag))
    );

    if (isAnyIdUsed) {
      throw { status: 400, message: '部分标签已被使用，不能删除' };
    }

    // 删除标签
    await tagsService.delTags(ids);

    const responseData = {
      code: 204,
      msg: '删除成功',
    };

    ctx.body = responseData;
  } catch (error) {
    console.error('Error in delTags:', error); // 打印错误信息
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || '删除失败' };
  }
}

module.exports = {
  addTag,
  getTags,
  editTag,
  delTag,
  delTags,
};
