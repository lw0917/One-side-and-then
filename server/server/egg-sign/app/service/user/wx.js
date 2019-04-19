/*
 * @Author: jasonandjay
 * @Date: 2019-03-18 20:20:32
 * @Last Modified by: jasonandjay
 * @Last Modified time: 2019-03-26 12:00:46
 */

const Service = require('egg').Service;
class UserService extends Service {
    // 保存session_key
    async createSessionKey(openid, session_key){
      let user = await this.app.mysql.select('user', {
        where: {openid}
      });
      let result = null, phone = '';
      if (user && user.length){
        // 更新用户session_key
        result = await this.app.mysql.update('user', {session_key, update_time: +new Date()}, {
          where: {openid}
        });
        phone = user[0].phone;
      }else{
        // 新建用户
        result = await this.app.mysql.insert('user', {openid, session_key, create_time: +new Date(), update_time: +new Date()})
      }
      if (result.affectedRows === 1){
        return {phone};
      }else{
        return false;
      }
    }

    // 获取session_key
    async getSessionKey(){
      let openid = this.ctx.get('openid');
      let result = await this.app.mysql.select('user', {
        where: {openid},
        columns: ['session_key']
      })
      return result[0].session_key;
    }

    // 创建token
    async createToken(token, expires_in){
      let result = await this.app.mysql.insert('token', {token, expires_in, create_time: +new Date()})
      return result.affectedRows === 1;
    }

    // 获取token
    async getToken(){
      let token = await this.app.mysql.select('token', {
        // where: {page:1},
        columns: ['token'],
        orders: [['id', 'desc']],
        limit: 1
      });
      return token[0].token;
    }

    // 更新手机号
    async updatePhone(phone){
      let openid = this.ctx.get('openid');
      let result = await this.app.mysql.update('user', {phone}, {
        where: {openid}
      })
      return result.affectedRows === 1;
    }
}
module.exports = UserService;
