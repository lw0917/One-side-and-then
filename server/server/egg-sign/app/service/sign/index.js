/*
 * @Author: jasonandjay
 * @Date: 2019-03-18 20:20:32
 * @Last Modified by: jasonandjay
 * @Last Modified time: 2019-03-27 16:55:09
 */

const Service = require('egg').Service;
class SignService extends Service {
  // 添加面试
  async createSign(params){
    let openid = this.ctx.get('openid');
    let result = await this.app.mysql.insert('sign', {...params, openid, create_time: +new Date()})
    return result.affectedRows === 1;
  }

  // 获取面试列表
  async getSign(params){
    let openid = this.ctx.get('openid');
    let {page, pageSize, ...query} = params;
    // 修正page和pageSize的值
    page = page?page*1: 1;
    pageSize = pageSize?pageSize*1: 10;
    let result = await this.app.mysql.select('sign', {
      where: {...query, openid},
      orders: [['start_time', 'asc']],
      limit: pageSize,
      offset: (page-1)*pageSize
    })
    console.log('result...', page, pageSize);
    return result;
  }

  // 更新面试信息
  async updateSign({id, ...params}){
    // console.log('params...', id, params);
    let openid = this.ctx.get('openid');
    let where = {id};
    if (openid){
      where = {openid, id};
    }
    let result = await this.app.mysql.update('sign', params, {
      where
    })
    return result.affectedRows === 1;
  }

  // 获取面试详情
  async getDetail(id){
    let openid = this.ctx.get('openid');
    let result = await this.app.mysql.get('sign', {id})
    return result;
  }

  // 获取需要通知的面试
  async getNotifyList(){
    // 格式化时间，去掉秒数
    let start_time = +new Date();
    start_time = parseInt(start_time/60000)*60000+60*60*1000;
    // start_time = 1553479800000;
      let result = await this.app.mysql.select('sign', {
      columns: ['openid','company','phone','start_time','address','id', 'form_id'],
      where: {status: -1, remind: -1, start_time}
      // limit: 1
      // orders: [['id', 'desc']]
    })
    console.log('start_time...', start_time, result);
    return result;
  }

  // 更新需要放弃的面试
  async giveupSign(){
    const SQL = `
      SELECT
        id
      FROM
        sign
      WHERE
        status=-1
      AND
        start_time<${+new Date()}
    `
    // 获取每日还没打卡的面试
    let rows = await this.app.mysql.query(SQL);
    // console.log('rows...', rows);
    // 更新面试状态为放弃打卡
    if (rows.length){
      let result = await this.app.mysql.update('sign', {status:1}, {
        where: {id: rows.map(item=>item.id)}
      })
      console.log('service result...', result);
      return result.affectedRows;
    }else{
      return 0;
    }

  }
}
module.exports = SignService;
