// client/pages/returnBooks/returnBooks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnBooksInfomation:[],
    bookName:'',
    zeroBook:'',//没有借书记录
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 加载借书记录的信息
     */
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name:'getOpenid'
    }).then(res1 =>{
      db.collection('borrowBooks').where({
        _openid: res1.result['openid']
      }).get().then(res2 => {
        this.setData({
          returnBooksInfomation: res2.data,
          nickName:res2.data[0]['nickName']
       })
       if (res2.data.length===0){
          this.setData({
            zeroBook:'您还没借书的记录'
          })
        }
      })
    })
   
  
    
  },
  /**
   * 还书
   */
   returnBooks:function(event){
        wx.cloud.callFunction({
        name:'deleteReturnBooks',
        data:{
          bookName:event.currentTarget.dataset.bookname,//在bindtap的“data-”里不能使用驼峰命名法
          closingTime:event.currentTarget.dataset.closingtime,
          _id:event.currentTarget.dataset.id
        }
      }).then(res3 => {
        wx.showModal({
          title: '您已成功还书',
          content: ''+res3.errMsg,
          showCancel:false,
          confirmColor:'black',
          confirmText:'好的'

        })
      })
    
     
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})