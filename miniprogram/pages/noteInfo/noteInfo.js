// miniprogram/pages/write/write.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    note:{},
    
  },
  onGetOpenid: function() {
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid

        //查找带过来的数据，后台获取，展示
        var noteid = options.noteid;
        wx.request({
          url: 'http://localhost/wechatNoteCtrl/getNoteById',
          data: {"id":noteid},
          method:'GET',
          success:res=>{
              var result = res.data.result;
              this.setData({
                note:result,
                noteid:options.noteid
              })
              
          }
        })

        
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
       
      }
    })
  },


  updateNoteForm:function(e){
    var title = e.detail.value.title;
    var content = e.detail.value.content;
    var noteid = e.detail.value.noteid;

    wx.request({
      url: 'http://localhost/wechatNoteCtrl/updateNote',
      data: {"title":title,"content":content,"id":noteid},
      method:'GET',
      success:res=>{
          var result = res.data.result;
          if(result == "success"){
            wx.navigateTo({
              url: '/pages/list/list'
            })
          }
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