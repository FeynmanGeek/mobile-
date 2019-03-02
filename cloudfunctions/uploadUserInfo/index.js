/**
 * 在userInfo记录用户信息
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
 const wxContext = cloud.getWXContext()
  const db = cloud.database()
  return await db.collection('userInfo').add({
    data:{
      _openid:wxContext.OPENID,
      nickName:event.nickName
    }
  })
  /*  
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }*/
}