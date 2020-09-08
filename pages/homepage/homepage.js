const db = wx.cloud.database()
const _ = db.command
Page({
  data:{
    userinfo:{},
    openid:"",
    data:[],
    praise:[],
  },  
  onLoad(){
	},
	onShow(){
		this.onLoad()
	},  


  // input聚焦时触发
OpenKeyboard(e){
  setTimeout(()=>{
      const isFocus = true
      const bottomStyle = e.target.height + 'px'  //软键盘的高度
      const bottomDefaultStyle =  e.target.height + 'px'
      this.setState({
          bottomStyle,
          bottomDefaultStyle,
          isFocus,
      })
  },80)
},
//输入框失去焦点时触发
OutKeyboard(){
  const commentContent = this.state.commentContent
  this.setState({
      isFocus : false,
      bottomStyle : commentContent ? '0' : '-80rpx',
  })
},

bindtap:function (e) {
  console.log(e)
},

// 更改点赞状态
onCollectionTap: function(event) {
  let that = this
  // 获取当前点击下标
  console.log(event)
  var index = event.currentTarget.dataset.index;
  wx.cloud.callFunction({
    name: 'dianzan',
    data:{
      _id:event.currentTarget.dataset.id,
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
        console.log("获取数据库topic成功",res)
        that.setData({
          data:res.data,
        })
      },fail:function (res) {
        console.log("获取数据库topic失败",res)
      }
    })
  },


  onShow:function (res) {
    let that = this
    db.collection('topic').get({
      success:function (res) {
        console.log("获取数据库topic成功",res)
        that.setData({
          data:res.data,
        })
      },fail:function (res) {
        console.log("获取数据库topic失败",res)
      }
    })
  }
  
})