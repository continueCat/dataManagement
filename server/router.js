const Router = require('koa-router');
const path = require('path');
const { read } = require('./lib/util');
const { addData, getData, editData, delData } = require('./controller/data');
const {
  addTag,
  getTags,
  editTag,
  delTag,
  delTags,
} = require('./controller/tag');
const { register, login } = require('./controller/user');
const { setLang, getLang } = require('./controller/lang');
// const { auth } = require('./middleware/auth');

const router = new Router({ prefix: '/api' });

// 用户注册
router.post('/user/register', register);
router.post('/user/login', login);

// 定义数据路由
router.post('/data', addData);
router.get('/data', getData);
router.put('/data', editData);
router.delete('/data', delData);

// 定义切换语言接口
router.post('/lang', setLang);
router.get('/lang', getLang);

// 定义标签路由
router.post('/tags', addTag);
router.get('/tags', getTags);
router.put('/tags', editTag);
router.delete('/tags', delTag);
router.post('/tags/batch-delete', delTags); // 批量删除

// 上传图片
router.post('/upload', ctx => {
  const basename = path.basename(ctx.request.files.avatar.filepath);
  ctx.body = {
    code: 201,
    msg: '上传成功',
    path: `${ctx.origin}/upload/${basename}`,
  };
});

// 下载数据
router.get('/down', async ctx => {
  const filePath = `charts/${ctx.query.frame}`;
  // console.log('File path:', filePath);
  const data = await read(filePath);
  // console.log('Data read from file:', data);
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data,
  };
});

// 确保路由中有 PUT /data 的处理函数
router.put('/data/:id', async ctx => {
  const { id } = ctx.params;
  const { name, description, tags } = ctx.request.body;

  try {
    // 调用 editData 函数处理数据更新
    await editData(id, name, description, tags);

    ctx.body = {
      code: 200,
      msg: '更新成功',
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      code: error.status || 500,
      msg: error.message || '服务器错误',
    };
  }
});

module.exports = router;
