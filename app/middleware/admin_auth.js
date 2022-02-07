module.exports = (option, app) => {
  // 后台管理 auth
  return async (ctx, next) => {
    if (!ctx.session.auth) {
      ctx.toast('请先登录', 'danger')
      return ctx.redirect('/admin/login')
    }

    await next()

    if (ctx.status === 404) {
      await ctx.pageFail('页面不存在')
    }
  }
}