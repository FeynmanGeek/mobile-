// client/pages/searchBooks/searchBooks.js
Page({

  /**
   * 页面的初始数据
   */
  //sendData:书名或作者名
  data: {
    sendData:''

  },
  /**
   * 跳转到书籍详情页
   */
  formSubmit:function(event){
     this.setData({
       sendData:event.detail.value.text,//text：书名或作者名
     })
     wx.navigateTo({
       url: '../descriptionOfBooks/descriptionOfBooks?id='+this.data.sendData,
     })
    }
 })
  