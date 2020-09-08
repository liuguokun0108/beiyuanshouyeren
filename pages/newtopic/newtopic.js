const db = wx.cloud.database();
const _ = db.command
var util = require('../../utils/util.js');

Page({
  data:{
    userinfo:{},
    openid:"",
    data:[],
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



  submit:function (e) {
    let that = this
    console.log(e)
    if (that.data.userinfo=="") {
      wx.showToast({
        title: '还未授权',
        icon:"none"
      })
      wx.switchTab({
        url: '../index/index',
      })
    }
    else{
      wx.cloud.callFunction({
        name:'pinglun',
          data:{
            newtopic:e.detail.value.topic,
            openid:that.data.userinfo.openid,
            name:that.data.userinfo.nickName,
            image:that.data.userinfo.avatarUrl,
            praise:0,
            time:this.data.time,
            pinglun:[],
            collected:0
          },
            success:function (res) {
            console.log("添加数据成功",res)
            if(e.detail.value.topic==""){
              wx.showToast({
                title: '不能为空',
                icon:"none"
              })
            }
            wx.showToast({
              title: '发布成功',
              icon:"none"
            })
            wx.switchTab({
              url: '../homepage/homepage',
            })
          },fail:function(res){
            console.log("添加数据失败",res)
          }
      })
    }

  },
  
  onLoad: function (options) {
    let that = this
    var time = util.formatTime(new Date())
    //为页面中time赋值
    this.setData({
      time:time
    })
    //打印
    console.log('当前日期时间',time)
  },

  onShow:function(){
    let that = this
    const ui = wx.getStorageSync('userinfo')
    this.setData({
      userinfo:ui,
      openid:ui.openid,
    })

  }
})