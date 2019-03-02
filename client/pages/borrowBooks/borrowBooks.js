// client/pages/borrowBooks/borrowBooks.js
var util = require('/utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     borrowBooksData:'',//书本编号_id
     image:'',
     openid:'',
     nickName:'',
     currentTime:'',
     closingTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
          this.setData({
            borrowBooksData:options.id
          })
          //加载图片
          wx.cloud.downloadFile({
            fileID: 'cloud://zxf-6316ee.7a78-zxf-6316ee/images/'
              + this.data.borrowBooksData + '.jpg'
          }).then( res1 =>{
            this.setData({
              image:res1.tempFilePath
           })
         })

    var t = util.formatTime(new Date())//得到当前的时间
    var year = t.slice(0, 4)
    var mouth = t.slice(5, 7)
    var day = t.slice(8, 10)
    year = parseInt(year)
    mouth = parseInt(mouth)
    var nextMouth = mouth + 3
    //月份超过12
    if(nextMouth > 12){
      var nextYear = year + 1
      nextMouth = nextMouth - 12
      var time = [nextYear, nextMouth, day].join('-')
      this.setData({
         closingTime:time//得到还书时间
      })  
    }else{
      var time = [year, nextMouth, day].join('-')
      this.setData({
        closingTime:time
      })
    }   
    this.setData({
      currentTime:t.slice(0, 10)//不要时分秒
    })
  //获取用户的openid和匿名信息
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'getOpenid',
    }).then(res2 => {
      db.collection('userInfo').where({
        _openid: res2.result['openid']
      }).get().then(res3 => {
        this.setData({
          openid: res3.data[0]['_openid'],
          nickName: res3.data[0]['nickName']
        })
      })
    }) 
  },

  /**
   * 借书
   */
  borrowBooks:function(event){ 
    const db = wx.cloud.database()
    db.collection('library').doc(this.data.borrowBooksData)
      .get().then(res4 => {
        wx.cloud.callFunction({
          name: 'addRecord', 
          data: {
            openid: this.data.openid,
            nickName: this.data.nickName,
            bookName: res4.data['bookName'],
            currentTime:this.data.currentTime,
            closingTime:this.data.closingTime
          } 
       }).then(res5 => {
          wx.showModal({
            title: '您已成功借到书',
            content: '《' + res5.result['bookName'] + '》',
            showCancel:false,
            confirmText:'好的',
            confirmColor:'black'
          })
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