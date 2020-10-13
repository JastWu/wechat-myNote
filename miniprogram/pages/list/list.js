const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    noteList:[
  ]
    /*
{
      "id":1,
      "title":"test1"
    },{
      "id":2,
      "title":"test2"
    }
    */
    
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
        
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
       
      }
    })
  },

  onShow:function(options){

    /*
    var userName = '';
    wx.getUserInfo({
      success: res => {
       
          userName = res.userInfo.nickName;
        
      }
    })
    */

    var user = app.globalData.openid;

    wx.request({
      url: 'http://localhost/wechatNoteCtrl/getNote',
      data: {"userName":user},
      method:'GET',
      success:res=>{
        var result = res.data.result;
      // this.data.noteList =result;
       this.setData({
        noteList: result
       })
        /*
        var notList = dataset.getElementById("noteList");
        var test = res.result;
        var view1 ='<view class="cu-list menu ">'
                    +'<view class="cu-item ">'
                    +'<view class="content">'
                    +'<text class="cuIcon-circlefill text-grey"></text>';
        
        for(var i = 0 ; i < test.length(); i++ ){
            var text = '<text class="text-grey">'+test[i].title+'</text>';
            var end = view1+text+'</view>'
            +'</view>' 
          +'</view> ';
            notList.append(end);
        }  
        */
      }
    })
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
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

  toWrite: function(){
    wx.navigateTo({
      url: '/pages/write/write'
    })
  },

  

})