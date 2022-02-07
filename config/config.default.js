/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630996049163_6287';

  // add your middleware config here
  // 中间件
  config.middleware = ['errorHandler', 'adminAuth', 'adminSidebar', 'auth'];

  // 中间件配置
  config.errorHandler = {
    enable: true, //是否开启中间件 默认true
    //match: ['/user/read'], //设置符合规则的请求才会经过这个中间件（匹配路由）
    // ignore: '', //设置忽略规则
    /**
     *  match 和 ignore 不允许一同配置
     *  支持 字符串 、正则 、函数、数组
     *   match (ctx) {
        // 只有ios设备才开启
          const reg = /iphone|ipad|ipod/i
          return reg.test(ctx.get('user-agent'))
        }
     */
  }

  config.adminAuth = {
    // 忽略
    ignore: [
      '/api',
      '/admin/login',
      '/admin/loginevent'
    ]
  }

  config.adminSidebar = {
    // 忽略
    ignore: [
      '/api',
      '/admin/login',
      '/admin/loginevent',
      '/public'
    ]
  }

  config.auth = {
    // 匹配
    match: [
      '/api/logout',
      '/api/live/create',
      '/api/live/changestatus',
      '/api/gift/wxpay',
      '/api/user/info',
      '/api/upload'
    ]
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 跨域
  config.security = {
    // csrf
    csrf: {
      enable: false
    }
    // csrf: {
    //   headerName: 'x-csrf-token',
    //   ignore: ctx => {
    //     return ctx.request.url.startsWith('/api')
    //   },
    // },
    // 跨域白名单
    // domainWhiteList: ['http://localhost:3000'],
  };

  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  };

  //参数验证
  config.valparams = {
    locale: 'zh-cn',
    throwError: true
  }

  // 加密
  config.crypto = {
    secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_672'
  };

  // 文件上传
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['.jpg', '.JPG', '.png', '.PNG', '.gif', '.GIF', '.jpeg', '.JPEG'], // 扩展几种上传的文件格式
  };

  // 模板引擎
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  }

  // jwt
  config.jwt = {
    secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_672'
  }

  // redis
  config.redis = {
    client: {
      port: 6379, //一般都是这个端口
      host: '127.0.0.1',
      password: '123456',
      db: 0 //里面有从0开始排列到20的库
    }
  }

  // 流媒体配置
  config.mediaServer = {
    rtmp: {
      port: 23480,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60
    },
    http: {
      port: 23481,
      allow_origin: '*'
    },
    auth: {
      play: true,
      publish: true,
      secret: 'nodemedia2017privatekey',
    },
  };

  // 微信支付地址
  config.webUrl = 'http://127.0.0.1:7001'
  // 微信支付配置
  config.tenpay = {
    client: {
      appid: 'wxc559eade7d0a3bde',
      mchid: '1554108981',
      partnerKey: '8b07811ec793049f1c97793464c7049f',
      notify_url: config.webUrl + '/api/gift/notify',
      // sandbox: true
    }
  };

  // socket.io
  config.io = {
    init: {
      wsEngine: 'ws',
    },
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      }
    },
    // 这里的redis 要和上面用的区分开来
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 1,
    },
  };

  // session配置
  config.session = {
    // 在有些场景下，我们希望用户如果长时间都在访问我们的站点，则延长他们的 Session 有效期，不让用户退出登录态
    renew: true,
    // key 代表了存储 Session 的 Cookie 键值对的 key 是什么
    key: 'EGG_SESS',
    // 最长保存时间（毫秒）
    maxAge: 24 * 3600 * 1000 * 30, // 30 天
    // 设置键值对是否可以被 js 访问，默认为 true，不允许被 js 访问。
    httpOnly: true,
    // 加密
    encrypt: true,
  };

  // 数据库
  config.sequelize = {
    dialect: 'mysql',
    host: '47.108.190.5', //127.0.0.1
    port: 3306,
    username: 'yangzl_study_com', //root
    password: 'LkHxRc2YzJ8wdX6T', //123456
    database: 'yangzl_study_com', //egg-sequelize-uniappLive
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消表名重复
      freezeTableName: true,
      // 自动写入时间戳
      timestamps: true,
      // 软删除 时间戳 delete_at
      paranoid: true,
      createdAt: 'created_time',
      updatedAt: 'updated_time',
      deletedAt: 'deleted_time',
      // 所有驼峰命名格式化
      underscored: true,
      scopes: {
        bh: { //自定义属性
          attributes: {
            // 需要的地方使用 将排除这三个字段
            exclude: ['updated_time', 'deleted_time', 'created_time']
          }
        }
      }
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
