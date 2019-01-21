const app = getApp()
var util = require('../../../utils/util.js')
var wxParse = require('../../../utils/wxParse/wxParse.js')

// pages/template/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContent(options.title);
  },



  parseHtml: function (article) {
    // var article = '<div>我是HTML代码</div>';
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;
    wxParse.wxParse('article', 'html', article, that, 5);
  },

  /**
   * 获取新闻详细内容列表
   */
  getContent: function (title) {
    title = title.replace(/\s/g, "+");
    var url = app.globalData.baiduUrl + "/s?tn=news&rtt=1&bsst=1&wd=" + title + "&cl=2&origin=ps";
    var that = this;
    util.httpGet(url, function (data) {
      // console.log(data);
      // console.log(document);
      // data = (data.split("</head>")[1])
      if (data.indexOf("<div id=\"container\"") != -1){
        data = data.split("<div id=\"container\"")[1];
      }
      if (data.indexOf("<div id=\"rs\"") != -1) {
        data = data.split("<div id=\"rs\"")[0];
      }
      if (data.indexOf("x</a>") != -1){
        data = data.split("x</a>")[1];
      }
      // console.log(data.split("script"));
      // data = data.split("script")[6];
      data = data.replace(/百度快照/g, "").replace(/查看更多相关资讯>>/g, "").replace(/http:/g, "https:");
      // data = data.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/i, "");
      // data = data + "</div></body></html>";
      that.parseHtml(data);
    });

    // //弹出modal展示新闻详情
    // this.setData({
    //   modalHiddden:false
    // })
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