/*
 * @Author: jasonandjay
 * @Date: 2019-03-18 19:51:15
 * @Last Modified by: jasonandjay
 * @Last Modified time: 2019-03-26 12:21:38
 */
const Controller = require('egg').Controller;
const axios = require('axios');
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt');
const appId = 'wx3375420e2c184d34';

class WxController extends Controller{
  /**
  * code码兑换session
  * /user/code2session
  * POST
  * {code}
  */
  async code2session(){
    try{
      this.ctx.validate({code:'string'}, this.ctx.request.body);
    }catch(err){
      this.ctx.status = 401;
      this.ctx.body = {msg:err,code:0}
      return;
    }

    let {code} = this.ctx.request.body;
    try{
      let res =  await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wx3375420e2c184d34&secret=4dc4e7b4f413b882cea2af4f92a4c484&js_code=${code}&grant_type=authorization_code`);
      if (!res.data.errcode){
        let {openid, session_key} = res.data;
        let result = await this.ctx.service.user.wx.createSessionKey(openid, session_key);
        if (result && Object.keys(result).length){
          this.ctx.body = {msg: '获取openid成功', code: 0, data: {...result, openid}};
        }else{
          this.ctx.body = {msg:'保存openid和session_key失败', code:-2};
        }
      }else{
        this.ctx.body = {msg: res.data.errmsg, code:res.data.errcode};
      }
    }catch(e){
      this.ctx.body = {msg: '登陆失败', code:-3};
    }
  }


  // 更新手机号
  async updatePhone(){
    try{
      this.ctx.validate({phone: 'number'}, this.ctx.request.body);
    }catch(err){
      this.ctx.status = 401;
      this.ctx.body = {msg:err, code:-1}
      return;
    }

    let {phone} = this.ctx.request.body;
    let result = await this.ctx.service.user.wx.updatePhone(phone);
    if (result){
      this.ctx.body = {msg: '绑定手机号成功', code: 0};
    }else{
      this.ctx.body = {msg: '绑定手机号失败', code: -2};
    }
  }

  // 解密手机号
  async decrypt(){
    try{
      this.ctx.validate({iv:'string',encryptedData:'string'}, this.ctx.request.body);
    }catch(err){
      this.ctx.status = 401;
      this.ctx.body = {msg:err, code:-1}
      return;
    }

    let {encryptedData, iv} = this.ctx.request.body;
    let sessionKey = await this.ctx.service.user.wx.getSessionKey();
    try{
      let pc = new WXBizDataCrypt(appId, sessionKey)
      let data = pc.decryptData(encryptedData , iv)
      // 绑定手机号
      let result = await this.ctx.service.user.wx.updatePhone(data.phoneNumber)
      this.ctx.body = {msg: '解密数据成功', data, code: 0};
    }catch(e){
      this.ctx.body = {msg: '解密数据失败', e, code: -2};
    }
  }

  // 更新token
  async updateToken(){
    try{
      let res =  await axios.get(`https://api.weixin.qq.com/cgi-bin/token?appid=wx3375420e2c184d34&secret=4dc4e7b4f413b882cea2af4f92a4c484&grant_type=client_credential`);
      if (!res.data.errcode){
        let {access_token, expires_in} = res.data;
        let result = this.ctx.service.user.wx.createToken(access_token, expires_in);
        if (result){
          this.ctx.body = {msg: '获取token成功', code: 0};
        }else{
          this.ctx.body = {msg:'保存token', code:-2};
        }
      }else{
        this.ctx.body = {msg: res.data.errmsg, code:res.data.errcode};
      }
    }catch(e){
      this.ctx.body = {msg: '获取token失败', code:-3};
    }
  }
}

module.exports = WxController;
