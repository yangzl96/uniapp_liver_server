module.exports = app => {
  const { router, controller, io } = app
  // 删除接口设计成get的原因：模板中是通过href跳转的，所以必须得是get

  // 上传文件
  router.post('/admin/upload', controller.admin.common.upload)

  // page: 后台首页
  router.get('/admin', controller.admin.home.index)
  // page: 管理员登录页面
  router.get('/admin/login', controller.admin.home.login);
  // 登录
  router.post('/admin/loginevent', controller.admin.home.loginevent);
  // 退出登录
  router.get('/admin/logout', controller.admin.home.logout);

  // page: 管理员列表
  router.get('/admin/manager', controller.admin.manager.index)
  // page: 新增管理员
  router.get('/admin/manager/create', controller.admin.manager.create)
  // page: 编辑页面
  router.get('/admin/manager/edit/:id', controller.admin.manager.edit)
  // 新增管理员
  router.post('/admin/manager', controller.admin.manager.save)
  // 编辑管理员
  router.post('/admin/manager/:id', controller.admin.manager.update)
  // 删除管理员
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete);

  // page: 用户页面
  router.get('/admin/user/create', controller.admin.user.create);
  // page: 用户编辑页面
  router.get('/admin/user/edit/:id', controller.admin.user.edit);
  // page: 用户列表
  router.get('/admin/user', controller.admin.user.index);
  // 编辑用户
  router.post('/admin/user/edit/:id', controller.admin.user.update);
  // 创建用户
  router.post('/admin/user', controller.admin.user.save);
  // 删除用户
  router.get('/admin/user/delete/:id', controller.admin.user.delete);

  // page: 创建礼物
  router.get('/admin/gift/create', controller.admin.gift.create);
  // page: 礼物列表
  router.get('/admin/gift', controller.admin.gift.index);
  // page: 礼物编辑页面
  router.get('/admin/gift/edit/:id', controller.admin.gift.edit);
  // 创建礼物
  router.post('/admin/gift', controller.admin.gift.save);
  // 编辑礼物
  router.post('/admin/gift/edit/:id', controller.admin.gift.update);
  // 删除礼物
  router.get('/admin/gift/delete/:id', controller.admin.gift.delete);

  // 订单删除
  router.get('/admin/order/delete/:id', controller.admin.order.delete);
  // page: 订单列表页面
  router.get('/admin/order', controller.admin.order.index);

  // page: 直播列表
  router.get('/admin/live', controller.admin.live.index);
  // 观看记录
  router.get('/admin/live/look/:id', controller.admin.live.look);
  // 礼物记录
  router.get('/admin/live/gift/:id', controller.admin.live.gift);
  // 评论记录
  router.get('/admin/live/comment/:id', controller.admin.live.comment);
  // 关闭直播间
  router.get('/admin/live/close/:id', controller.admin.live.close);
  // 删除直播间
  router.get('/admin/live/delete/:id', controller.admin.live.delete);

  //   app
  // 用户注册
  router.post('/api/reg', controller.api.user.reg);
  // 用户登录
  router.post('/api/login', controller.api.user.login);
  // 退出登录
  router.post('/api/logout', controller.api.user.logout);
  // 获取当前用户信息
  router.get('/api/user/info', controller.api.user.info);

  // 创建直播间
  router.post('/api/live/create', controller.api.live.save);
  // 修改直播间状态
  router.post('/api/live/changestatus', controller.api.live.changeStatus);
  // 直播间列表
  router.get('/api/live/list/:page', controller.api.live.list)
  // 查看直播间
  router.get('/api/live/read/:id', controller.api.live.read);

  // 微信支付
  router.post('/api/gift/wxpay', controller.api.gift.wxpay);
  // 微信支付回调
  // router.post('/api/gift/notify', app.middleware.tenpay('pay', app), controller.api.gift.notify);

  // 礼物列表
  router.get('/api/gift/list', controller.api.gift.list)
  // 上传图片
  router.post('/api/upload', controller.api.common.upload);

  // socket
  // test
  // io.of('/').route('test', io.controlle
  // 加入直播
  io.of('/').route('joinLive', io.controller.nsp.joinLive)
  // 离开直播
  io.of('/').route('leaveLive', io.controller.nsp.leaveLive)
  // 发弹幕
  io.of('/').route('comment', io.controller.nsp.comment)
  // 送礼物
  io.of('/').route('gift', io.controller.nsp.gift)
}