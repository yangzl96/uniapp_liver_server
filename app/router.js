'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/',(ctx) => {
    ctx.body = 'hi'
  });
  // 后台管理 路由
  require('./router/admin')(app)

  // app 路由
};
