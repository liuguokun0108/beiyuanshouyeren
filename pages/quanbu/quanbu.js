// pages/quanbu/quanbu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    userinfo:{},
    openid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
    // 比较函数
    compare: function(property) {
      return function(a, b) {
        var value1 = (a[property]);
        var value2 = (b[property]);
        return value2 - value1;
      }
    },
    
    compare1: function(property) {
      return function(a, b) {
        var value1 = Date.parse(a[property]);
        var value2 = Date.parse(b[property]);
        return value2 - value1;
      }
    },

  paixu:function (e) {
    let that = this
    console.log(e)
    var res = that.data.data.sort(that.compare(e.currentTarget.dataset.paixu));
    this.setData({
      data:res,
    })
  },
  paixu1:function (e) {
    let that = this
    console.log(e)
    var res = that.data.data.sort(that.compare1(e.currentTarget.dataset.paixu));
    this.setData({
      data:res,
    })
  },

  onCollectionTap: function(event) {
    let that = this
    // 获取当前点击下标
    console.log(event)
    var index = event.currentTarget.dataset.index;
    wx.cloud.callFunction({
      name: 'dianzan',
      data:{
        _id:event.currentTarget.dataset.id,
        collected:1
      },success:function (res) {
        console.log("点赞成功",res)
      },fail:function (res) {
        console.log("点赞失败",res)
      },
  }),
    // data中获取列表
    db.collection("topic").get({
      success:function(res){
        console.log(res)
        var message = that.data.data;
        for (let i in message) { //遍历列表数据
          if (i == index) { //根据下标找到目标
            var collectStatus = false
            if (message[i].collected == 0) { //如果是没点赞+1
              collectStatus = true
              message[i].collected = parseInt(message[i].collected) + 1
              message[i].praise = parseInt(message[i].praise) + 1
            } else {
              collectStatus = false
              message[i].collected = parseInt(message[i].collected) - 1
              message[i].praise = parseInt(message[i].praise) - 1
            }
            wx.showToast({
              title: collectStatus ? '点赞成功' : '取消点赞',
            })
          }
        }
        that.setData({
          data:message,
        })
      }
    })
  },
  
  onLoad: function (options) {
    let that = this
    db.collection('topic').get({
      success:function (res) {
        console.log("获取成功",res)
        that.setData({
          data:res.data
        })
      },fail:function (res) {
        console.log("获取失败",res)
      }
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