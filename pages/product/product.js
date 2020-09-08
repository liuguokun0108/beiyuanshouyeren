// pages/product/product.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    topic:[],
    id:"",
    isCollected:false,
    discussShow:false,
    pinglun:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */

  submit:function (e) {
    let that = this
    console.log(e)
    wx.cloud.callFunction({
      name:'yonghupinglun',
      data:{
        id:that.data.data._id,
        pinglun:e.detail.value.pinglun
      },success:function (res) {
        console.log("添加评论成功",res)
        wx.showToast({
          title: '评论成功',
          icon:"none"
        })

      },fail:function (res) {
        console.log("添加评论失败",res)
      },
    })
  },

   xiangqing:function (e) {
     console.log(e)
   },

  

  onLoad: function (options) {
    let that = this
    console.log("获取到话题id:",options.id)
    db.collection('topic').doc(options.id).get({
      success:function (res) {
        console.log('话题获取成功',res)
        that.setData({
          data:res.data,
        })
      },fail:function (res) {
        console.log('话题获取失败',res)
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