const db = wx.cloud.database()
Page({
  data: {
    data:[],
    userinfo:{},
    openid:"",
    _id:""
  },

  onLoad: function (options) {
    let that = this
    const ui = wx.getStorageSync('userinfo')
    this.setData({
      userinfo:ui,
      openid:ui.openid
    }),
    db.collection('topic').where({
      openid:this.data.openid
    }).get({
      success:function (res) {
        console.log("获取数据库topic成功",res)
        that.setData({
          data:res.data,
        })
      },fail:function (res) {
        console.log("获取数据库topic失败",res)
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