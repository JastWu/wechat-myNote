const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    nickName:''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                nickName: res.userInfo.nickName
              })
            }
          })
        }
      }
    })
  },

    onGetUserInfo: function(e) {
      if (!this.data.logged && e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
      }
    },

    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '地址已复制',
            duration: 1000,
          })
        }
      })
    },

    showQrcode() {
      wx.previewImage({
        urls: ['http://localhost/img/wechatpay.jpg','http://localhost/img/alipay.jpg'],
        current: ['http://localhost/img/wechatpay.jpg','http://localhost/img/alipay.jpg']// 当前显示图片的http链接      
      })
    },

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