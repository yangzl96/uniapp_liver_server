'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 跨域插件
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 参数验证
  valparams: {
    enable: true,
    package: 'egg-valparams'
  },

  // 模板引擎
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  // jwt
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  // reids
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  // app微信支付
  tenpay: {
    enable: true,
    package: 'egg-tenpay'
  },
  // scoket.io
  io: {
    enable: true,
    package: 'egg-socket.io'
  }
};
