const app = getApp()
Page({
    //底部导航栏页面索引
    toList: function(){
      wx.navigateTo({
        url: '/pages/list/list'
      })
    },
    toMyInfo: function(){
      wx.navigateTo({
        url: '/pages/myInfo/myInfo'
      })
    },


})