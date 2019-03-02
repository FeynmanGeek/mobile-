Page({

  /**
   * 页面的初始数据
   */
  data: {
     bookName_writer:'',//bookName_writer：书名或作者名
     bookInformation:'',
     returnError:'',
     bookid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (option) {
    this.setData({
      bookName_writer:option.id
    })
    if (!wx.cloud) {
      console.log().error("请升级基础库，云开发能力从基础库 2.2.3 开始支持")
    }else{
      wx.cloud.init({
        env: 'zxf-6316ee',
        traceUser: true,
      })
    }
  const db = wx.cloud.database()
  const _ = db.command
  var regexp = '[' + this.data.bookName_writer + ']'
  //通过this.data.bookName_writer得到书籍的详细信息
  db.collection('library').where(_.or([
    {
      bookName: db.RegExp({
        regexp: regexp,
      })
    },
    {
      writer: db.RegExp({
        regexp: regexp,
      })
    }
    ])).get()
      .then(res1 => {
        var length = res1.data.length//不能写this.data.bookInfomation.length
        if(length == 0){
          this.setData({
             returnError:'没有查询到此本书',
          })
        }else{ 
          this.setData({
            bookInformation:res1.data
          })
        }
      })
    },
      /** 
       * 跳转到borrowBooks页面
      */
      pageTransition:function(event){
        this.setData({
          bookid:event.currentTarget.dataset.id,//获得记录书籍的唯一编号_id
        })
          wx.navigateTo({
            url: '../borrowBooks/borrowBooks?id='+this.data.bookid,
          })
      },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }

})