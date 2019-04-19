/*
 * @Author: tao
 * @Date: 2019-01-30 08:35:53
 * @Last Modified by: jasonandjay
 * @Last Modified time: 2019-03-27 14:51:20
 * @Func: 应用的路由配置部分
 */
module.exports = app => {
    const {router , controller, config} = app;
    config.log('服务器重新启动...');
    /**
     * resources对应路径说明
     * /posts GET => index
     * /posts/new GET => new
     * /posts/:id GET => show
     * /posts/:id/edit GET => edit
     * /posts  POST => create
     * /posts/:id PUT => update
     * /posts/:id DELETE => destroy
     */
    /**
     * 小程序用户获取微信信息
     */
    router.resources('/user/wx', controller.user.wx);
    // 获取openid
    router.post('/user/code2session', controller.user.wx.code2session);
    // 刷新token
    router.get('/user/updateToken', controller.user.wx.updateToken);
    // 更新手机号
    router.post('/user/updatePhone', controller.user.wx.updatePhone);
    // 解密数据
    router.post('/user/decrypt', controller.user.wx.decrypt);
    // 模板通知
    router.get('/sign/notify', controller.sign.index.notifySign);
    // 更新面试状态
    router.get('/sign/giveup', controller.sign.index.giveupSign);
    /**
     * 面试安排的CURD接口
     *
     */
    router.resources('/sign', controller.sign.index);
}
