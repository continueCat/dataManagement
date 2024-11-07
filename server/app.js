const Koa = require('koa');
const path = require('path');
const { koaBody } = require('koa-body');
const serve = require('koa-static');
const koajwt = require('koa-jwt');
const { JWT_SECRET } = require('./config/config.default');

const routes = require('./router');

const app = new Koa();

const UPLOADDIR = 'upload';

const cors = require('koa-cors'); // 引入 CORS 中间件

// 全局异常处理
process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// app.use(
//   cors({
//     origin: 'http://localhost:5173', // 允许来自这个地址的请求
//     credentials: true, // 如果你需要处理 Cookies 或 JWT 令牌，设置为 true
//   })
// );

// 静态资源目录，
app.use(serve('../client/build'));
app.use(require('koa-mount')(`/${UPLOADDIR}`, serve(UPLOADDIR)));

app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 10 * 1024 * 1024,
      uploadDir: path.resolve(__dirname, UPLOADDIR),
    },
  })
);

// 统一接口错误处理
app.use(async (ctx, next) => {
  try {
    await next();
    // 洋葱模型，成功 last
    if (ctx.response.status === 404 && !ctx.response.body) {
      ctx.throw(404);
    }
  } catch (error) {
    // #3
    // 洋葱模型，失败 last
    const { url = '' } = ctx.request;
    const { status = 500, message } = error;
    if (url.startsWith('/api')) {
      ctx.status = typeof status === 'number' ? status : 500;
      ctx.body = {
        msg: message,
      };
    }
  }
});

app.use(koajwt({ secret: JWT_SECRET }).unless({ path: [/\/user\//] }));

// 加载数据路由
app.use(routes.routes());

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
