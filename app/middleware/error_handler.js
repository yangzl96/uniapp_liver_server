module.exports = (option,app) => {
  return async function errorHandler (ctx, next) {
    try {
      await next()
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          msg: 'fail',
          data: '404错误'
        }
      }
    } catch (err) {
      // 日志记录
      ctx.app.emit('error', err, ctx)

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      let error = status === 500 && app.config.env === 'prod'
        ? '服务端错误'
        : err.message;
      // 处理参数错误的拦截
      if (status === 422 && err.message === "Validation Failed") {
        if (err.errors && Array.isArray(err.errors)) {
          error = err.errors[0].err[0] ? err.errors[0].err[0] : err.errors[0].err[1];
        }
      }
      ctx.status = status
      ctx.body = {
        msg: "fail",
        data: error
      }
    }
  }
}