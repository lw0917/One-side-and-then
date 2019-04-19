/*
 * @Author: jasonandjay
 * @Date: 2019-03-18 19:51:15
 * @Last Modified by: jasonandjay
 * @Last Modified time: 2019-03-27 16:40:42
 */
const Controller = require('egg').Controller;
const axios = require('axios');

class SignController extends Controller{
  /**
   * 获取面试列表
   * /sign
   * GET
   * {page, pageSize, status, remind, company}
   */
  async index(){
    let result = await this.ctx.service.sign.index.getSign(this.ctx.request.query);
    if (result){
      this.ctx.body = {msg:'获取面试列表成功',code:0,data:result}
    }else{
      this.ctx.body = {msg:'获取面试列表失败',code:-1}
    }
  }

  /**
   * 获取面试详情
   * /sign/1
   * GET
   */
  async show(){
    let id = this.ctx.params.id;
    let result = await this.ctx.service.sign.index.getDetail(id);
    if (result){
      this.ctx.body = {msg:'获取面试详情成功',code:0,data:result}
    }else{
      this.ctx.body = {msg:'添加面试详情失败',code:-1}
    }
  }


  /**
   * 更新面试安排
   *  /sign/1
   * PUT
   * {status, remind, sign_time}
   */
  async update(){
    let id = this.ctx.params.id;
    let result = await this.ctx.service.sign.index.updateSign({id, ...this.ctx.request.body});
    if (result){
      this.ctx.body = {msg:'更新面试成功',code:0}
    }else{
      this.ctx.body = {msg:'更新面试失败',code:-1}
    }
  }


  /**
   * 添加面试安排
   * /sign
   * POST
   */
  async create(){
    try{
      this.ctx.validate({
        company:'string',
        address: 'string',
        latitude: 'number',
        longitude: 'number',
        start_time: 'number'
      }, this.ctx.request.body);
    }catch(err){
      this.ctx.status = 401;
      this.ctx.body = {msg:err,code:-1}
      return;
    }

    let result = await this.ctx.service.sign.index.createSign(this.ctx.request.body);
    if (result){
      this.ctx.body = {msg:'添加面试成功',code:0}
    }else{
      this.ctx.body = {msg:'添加面试失败',code:-1}
    }
  }

  // 跑定时任务，每天一次把当天没有打卡和放弃的面试标为已放弃
  async giveupSign(){
    let result = await this.ctx.service.sign.index.giveupSign();
    // console.log('result...', result);
    this.ctx.body = {msg:'今日放弃面试数量'+result, code: 0};
  }

  // 跑定时任务获取需要提醒的面试安排: 一分钟一次
  async notifySign(){
    let access_token = await this.ctx.service.user.wx.getToken();
    let user = await this.ctx.service.sign.index.getNotifyList();
    // 过滤掉无效form_id
    user = user.filter(item=>item.form_id);

    if (!user || !user.length){
      this.ctx.body = {msg:'没有需要推送的面试', code: 0};
      return;
    }
    // 组装模板消息需要的数据
    user.forEach(item=>{
      item.touser = item.openid;
      item.address = JSON.parse(item.address);
      item.data = {
        "keyword1": {
          "value": item.company
        },
        "keyword2": {
          "value": item.phone
        },
        "keyword3": {
          "value": this.ctx.helper.formatDate(item.start_time)
        },
        "keyword4": {
          "value": item.address.address
        },
        "keyword5": {
          "value": "您的面试一个小时后即将开始"
        }
      }
    })
    // 发送模板消息
    let results = await this.sendTemplate(access_token, user);
    // console.log('results...', results);
    // 更新面试状态
    let ids = results.filter(item=>!item.errcode);
    ids = ids.map(item=>item.sign_id);
    // console.log('ids...', ids);
    if (ids.length){
      this.ctx.service.sign.index.updateSign({id:ids, remind: 0})
    }

    this.ctx.body = {results:results, code: 0}
  }

  // 模板消息推送
  async sendTemplate(access_token, user){
    // 模板id
    const template_id = '5gVjvztxsF7A4HBKIksyZ7dXZuJUaYyBkh-x5VytrCE';
    // 小程序路径
    const page = '/pages/sign/detail/main';
    // 放大公司
    const emphasis_keyword = 'keyword3.DATA';
    let results = [];
    for (let i=0,len=user.length; i<len; i++){
      let result = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`, {
        touser: user[i].touser,
        template_id,
        page: page+'?id='+user[i].id,
        form_id: user[i].form_id,
        data: user[i].data
        // 隐藏需要放大的面试信息
        // emphasis_keyword
      })
      // 拼接sign_id
      result = result.data;
      result.sign_id = user[i].id;
      results.push(result);
    }
    return results;
  }
}

module.exports = SignController;
