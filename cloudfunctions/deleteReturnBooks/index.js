/**
 * 删除用户想要删除的借书信息
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  await db.collection('borrowBooks').where({
      bookName:event.bookName,
      closingTime: event.closingTime,
      _id:event._id,
  }).remove()
  
}