'use strict';

const Controller = require('egg').Controller;
// 引入
const fs = require('fs');
const path = require('path');
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

class CommonController extends Controller {
  // 文件上传
  async upload () {
    const { ctx } = this
    // 上传的文件流
    const stream = await ctx.getFileStream()
    // 基础目录
    const uploadBasePath = 'app/public/uploads'
    // 生成唯一文件名
    const filename = `${Date.now()}${path.extname(stream.filename).toLocaleLowerCase()}`
    
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD')
    function mkdirsSync (dirname) {
      if (fs.existsSync(dirname)) {
        return true
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname)
          return true
        }
      }
    }
    mkdirsSync(path.join(uploadBasePath, dirname))

    // 生成写入路径
    const target = path.join(uploadBasePath, dirname, filename)

    // 写入流
    const writeStream = fs.createWriteStream(target)
    try {
      // 文件流写入
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (error) {
      // 出现错误，关闭管道
      await sendToWormhole(stream)
      ctx.throw(500, error)
    }

    const url = path.join('/public/uploads', dirname, filename).replace(/\\|\//g, '/')
    ctx.apiSuccess({ url })
  }
}

module.exports = CommonController;
