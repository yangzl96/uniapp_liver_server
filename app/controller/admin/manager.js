'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  // 创建管理员页面
  async create () {
    const { ctx } = this
    await ctx.renderTemplate({
      // 页面标题
      title: "创建管理员",
      // 模板类型 form表单，table表格分页
      tempType: "form",
      // 表单配置
      form: {
        // 提交地址
        action: "/admin/manager",
        // 字段配置
        fields: [{
          label: "用户名",
          type: "text",
          name: "username",
          placeholder: "用户名"
        }, {
          label: "密码",
          type: "text",
          name: "password",
          placeholder: "密码"
        }]
      },
      // 新增成功跳转路径
      successUrl: "/admin/manager"
    });
  }
  // 创建管理员
  async save () {
    const { ctx } = this
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '管理员账户'
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码'
      }
    })
    const { username, password } = ctx.request.body
    const user = await ctx.model.Manager.findOne({
      where: {
        username
      }
    })
    if (user) {
      return ctx.apiFail('管理员已存在')
    }
    await ctx.model.Manager.create({ username, password })
    ctx.apiSuccess()
  }
  // 管理员列表
  async index () {
    const { ctx } = this
    const data = await ctx.page('Manager')
    await ctx.renderTemplate({
      title: '管理员列表',
      tempType: "table",
      table: {
        // 按钮
        buttons: {
          // 新增操作
          add: "/admin/manager/create"
        },
        // 表头
        columns: [{
          title: "管理员",
          fixed: 'left',
          key: "username"
        }, {
          title: "创建时间",
          fixed: 'center',
          width: 180,
          key: "created_time"
        }, {
          title: "操作",
          width: 200,
          fixed: 'center',
          action: {
            edit: function (id) {
              return `/admin/manager/edit/${id}`
            },
            delete: function (id) {
              return `/admin/manager/delete/${id}`
            },
          }
        }]
      },
      data
    })
  }
  // 删除管理员
  async delete () {
    const { ctx } = this
    const id = ctx.params.id
    await ctx.model.Manager.destroy({
      where: {
        id
      }
    })
    ctx.toast('删除成功', 'success')
    ctx.redirect('/admin/manager')
  }
  // 编辑表单页面
  async edit () {
    const { ctx } = this
    const id = ctx.params.id
    let data = await ctx.model.Manager.findOne({
      where: {
        id
      }
    })
    if (!data) {
      return await ctx.pageFail('该记录不存在')
    }
    data = JSON.parse(JSON.stringify(data))
    delete data.password
    await ctx.renderTemplate({
      id,
      title: "修改管理员",
      tempType: "form",
      form: {
        // 提交地址
        action: "/admin/manager/" + id,
        // 字段配置
        fields: [{
          label: "用户名",
          type: "text",
          name: "username",
          placeholder: "用户名",
        }, {
          label: "密码",
          type: "text",
          name: "password",
          placeholder: "密码"
        }],
        // 默认值
        data
      },
      // 修改成功跳转路径
      successUrl: "/admin/manager"
    })
  }
  // 编辑逻辑
  async update () {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: "int",
        required: true
      },
      username: {
        type: "string",
        required: true,
        desc: "管理员名称"
      },
      password: {
        type: "string",
        required: false,
        desc: "密码"
      }
    })
    let id = ctx.params.id
    let { username, password } = ctx.request.body

    let manager = await app.model.Manager.findOne({
      where: {
        id
      }
    })
    if (!manager) {
      return ctx.apiFail('该记录不存在')
    }
    const Op = app.Sequelize.Op
    if ((await app.model.Manager.findOne({
      where: {
        id: {
          [Op.ne]: id
        },
        username
      }
    }))) {
      return ctx.apiFail('管理员名称已存在')
    }
    manager.username = username
    if (password) {
      manager.password = password
    }
    ctx.apiSuccess(await manager.save())
  }
}

module.exports = ManagerController;
