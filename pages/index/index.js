Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    openid:"",
  },
  onGotUserInfo:function (e) {
    let that = this
    wx.cloud.callFunction({
      name:"login",
      success:function (res) {
        console.log("云函数调用成功",res)
        that.setData({
          openid:res.result.openid,
          userinfo:e.detail.userInfo
        })
        that.data.userinfo.openid = that.data.openid
        console.log("openid",that.data.userinfo)
        wx.setStorageSync('userinfo', that.data.userinfo)
      },fail:function (res) {
        console.log("云函数调用失败",res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    let that = this
    const ui = wx.getStorageSync('userinfo')
    this.setData({
      userinfo:ui,
      openid:ui.openid,
    })
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