/**
 * 将用户的借书信息存储到borrowBooks上
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  await db.collection('borrowBooks').add({
    data:{
      _openid:event.openid,
      nickName:event.nickName,
      bookName:event.bookName,
      currentTime:event.currentTime,
      closingTime:event.closingTime
    }
  })

  return {
    bookName:event.bookName
  }
}