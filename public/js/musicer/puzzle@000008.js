"use strict";
function _typeof(e){
    return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){
        return typeof e
    }:function(e){
        return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
    })(e)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(e){_defineProperty(t,e,r[e])})}return t}!function(e,f,t,r,l,o){var n=void 0!==t&&t.resolve,a=e[r];function c(e){this.module=e,this.vars={}}a||((a=e[r]=function(){this.modules={}}).callbacks=[],a.ready=n?function(){return a.instance?primise.resolve(a.instance.vars()):new primise(function(e){return a.callbacks.push(e)})}:function(e){return a.instance?e(a.instance.vars()):a.callbacks.push(e)}),c.prototype.exec=function(){var n=this,e=this.module.vars;e.filter(function(e){return"var"===e.fn}).forEach(function(e,t){var r=n["exec"+e.fn];r&&r.call(n,e)}),e.filter(function(e){return"var"!==e.fn}).forEach(function(e,t){var r=n["exec"+e.fn];r&&r.call(n,e)})},c.prototype.execvar=function(e){var t=e.name,r=e.value;this.vars[t]=r},c.prototype.execscript=function(e){var r,n=this,t=e.url,o=e.boot,a=e.attrs,c=this.module.buildInVars,i=void 0===c?{}:c;(r=f.createElement(l)).src=t;var s=a||{};Object.keys(s).forEach(function(e){var t=s[e];"boolean"==typeof t?r[e]=t:r.setAttribute(e,t)});var u=f.getElementsByTagName(l)[0];u?u.parentNode.insertBefore(r,u):f.body.appendChild(r),o&&o.length&&(o=o.replace(/\$\{(\s*[A-z0-9_-]+\s*)\}/g,function(e,t){var r=void 0!==n.vars[t]?n.vars[t]:i[t];if(Array.isArray(r)||"object"===_typeof(r))try{r=JSON.stringify(r)}catch(e){r=Array.isArray(r)?"[]":"{}"}return r}),r.onload=function(){var e=f.createElement(l);e.innerHTML=o,u.parentNode.insertBefore(e,u)})};
    var i=a.prototype;i.boot=function(){var t=this,e=o.modules,r=o.buildInVars,n=void 0===r?{}:r;(void 0===e?[]:e).forEach(function(e){(t.modules[e.name]=new c(_objectSpread({},e,{buildInVars:n}))).exec()}),a.callbacks.forEach(function(e){e(t.vars())}),a.callbacks=[]},i.vars=function(){var r=this,n={};return Object.keys(this.modules).forEach(function(e){var t=r.modules[e];n[e]=t.vars}),n.CP_VARS=o.buildInVars||{},n},a.instance=new a,a.instance.boot()}(window,document,window.Promise,"puzzle","script",{"version":179,"env":"","modules":[{"name":"music-wapm","vars":[{"fn":"script","url":"https://s6.music.126.net/static_public/5c25ca49ac1f4d2d427da0fa/1.0.9/musicapm.min.js","boot":"(function(){\n     if (window.MusicAPM) {\n        var puzzleEnv = '${CP_ENV}' || 'prod';\n        var prodKey = '${appkey}';\n        var testKey = '${test_appkey}';\n        var uploadToTest = puzzleEnv !== 'prod' && testKey;\n        var appKey = uploadToTest ? testKey : prodKey;\n        var uploadServer = uploadToTest ? 'https://qa-wapm.igame.163.com' : 'https://sentry.music.163.com/wapm';\n        var install = uploadToTest ? true: Math.random() <= ${sampleRate}\n\n        var options = {\n           enableSPA: ${enableSPA},\n           hashSPA: ${hashSPA},\n           traceResource: ${traceResource},\n           traceLongtask: ${traceLongtask},\n           ignoreUrlPath: ${ignoreUrlPath},\n           uploadServer: uploadServer,\n           syncConfig: false,\n           debug: uploadToTest\n        };\n        install && MusicAPM.install(appKey, options);\n   }\n})();","attrs":{"async":true}},{"fn":"var","name":"on","value":true},{"fn":"var","name":"appkey","value":"040074a0-18d8-44af-808b-cc871c5758c8"},{"fn":"var","name":"test_appkey","value":"3ff296f8-d2a0-4396-851b-5e4a4a4fcf0f"},{"fn":"var","name":"enableSPA","value":false},{"fn":"var","name":"hashSPA","value":false},{"fn":"var","name":"traceLongtask","value":true},{"fn":"var","name":"traceResource","value":true},{"fn":"var","name":"ignoreUrlPath","value":"[{ rule: /\\/\\d{1,20}/g, target: '/**' }]"},{"fn":"var","name":"sampleRate","value":"1"}]},{"name":"sentry","vars":[{"fn":"script","url":"https://s6.music.126.net/static_public/5b7eb1637eef609a0a828c74/sdk/3.26.4/music-raven.min.js","boot":"(function () {\n    if (window.Raven) {\n        var puzzleEnv = '${CP_ENV}' || 'prod';\n        var SENTRY_HOST = 'sentry.music.163.com';\n        var host = '${proxyhost}' || SENTRY_HOST;\n        var options = {\n            sampleRate: ${sampleRate},\n            ignoreErrors: ${ignoreErrors},\n            shouldSendCallback: ${shouldSendCallback},\n            autoBreadcrumbs: ${autoBreadcrumbs},\n            tags: {\n                puzzleEnv: '${CP_ENV}'\n            },\n            withCredentials: host !== SENTRY_HOST\n    }\n    var onlyProd = ${onlyProd};\n    if (puzzleEnv === 'prod' || !onlyProd) {\n        var key = '${key}';\n        var project = '${project}';\n        var dsn = 'https://' + key + '@' + host + '/' + project;\n        if (window._sentryOnLoad) {\n            window._sentryOnLoad(dsn, options);\n        } else {\n            Raven.config(dsn, options).install();\n        }\n    }\n}\n})();","attrs":{"async":true,"crossorigin":"anonymous"}},{"fn":"var","name":"on","value":true},{"fn":"var","name":"key","value":"9ec2fb271d5f452abe7ba0c60a164c40"},{"fn":"var","name":"project","value":"121"},{"fn":"var","name":"sampleRate","value":"1.0"},{"fn":"var","name":"ignoreErrors","value":"[]"},{"fn":"var","name":"shouldSendCallback","value":"function(data) {\n      return true;\n }"},{"fn":"var","name":"autoBreadcrumbs","value":{"xhr":true,"console":true,"dom":true,"location":true,"sentry":true}},{"fn":"var","name":"onlyProd","value":true},{"fn":"var","name":"proxyhost","value":"sentry.music.163.com"}]},{"name":"puzzleConfig","vars":[{"fn":"var","name":"on","value":true},{"fn":"var","name":"config","value":{"musicianLevelPrivilege":[{"range":[0,349],"privilegeList":[{"title":"专属身份认证","desc":"获得网易音乐人认证标志，并在云音乐拥有专属歌手页。"},{"title":"基础数据查询","desc":"可查看作品、收益等相关数据，随时随地掌握最新信息。"},{"title":"粉丝数据查询","desc":"可查看到较详细的粉丝数据报告。包括粉丝年龄、性别、地域分布、关注途径，以及粉丝音乐偏好。"},{"title":"权威榜单推荐","desc":"作品有机会进入网易云音乐原创歌曲榜角逐。"},{"title":"会员尊享资格","desc":"音乐人指数达到300分以上，将在第一次统计个人音乐人指数平均值后，获得云音乐一年期黑胶VIP。"},{"title":"会员包分成","desc":"授权中的作品可以加入会员付费包，在不影响普通用户播放的同时，还可以持续获得收益。"},{"title":"广告分成","desc":"授权中的作品自动开通广告分成，可以持续获得收益。"},{"title":"免费点播分成","desc":"授权中的作品自动开启免费播放分成，产生播放后将会获得收益。"},{"title":"赞赏功能开通","desc":"有资格申请开通赞赏功能；通过审核后，你的作品、电台、专栏，均可以收到来自用户的不固定金额回报。"},{"title":"ISRC申请","desc":"授权中的作品可以免费申请ISRC，作为歌曲“录音”永久唯一的国际识别码。"},{"title":"主创说","desc":"在自己歌曲的评论区发表评论，可以在主创说专区获得曝光。演出公告，新作品预告，创作心情等将更直接传达给你的听众。"},{"title":"视频推歌","desc":"在发布视频时带上歌曲，能获得云音乐视频模块的歌曲推广资源，使视频及歌曲获得更多曝光。"}]},{"range":[350,609],"privilegeList":[{"title":"动态优先特权","desc":"在云音乐发表的动态，将会被优先推荐给喜欢你的用户和喜欢类似音乐风格的用户。"},{"title":"明星音乐人推荐","desc":"将显示在云音乐APP“朋友-添加关注-音乐人”版块下，推荐给更多用户发现和关注。"},{"title":"数字专辑发布","desc":"音乐人指数达到450分后可以发布数字音乐专辑，新作品在云音乐首发，可以获得售卖收益。"},{"title":"官方歌单收录","desc":"优秀作品有机会收录在每月“网易音乐人精选”官方歌单，获得固定曝光机会。"},{"title":"参与云豆现场","desc":"有机会参加云豆现场的线上报名，入选后获得云音乐的官方推广。"},{"title":"站内官号推荐","desc":"优先获得官方站内号 @原创君 推荐，喜欢独立原创音乐的用户都会关注。"}]},{"range":[610,684],"privilegeList":[{"title":"进阶数据查询","desc":"可查看潜在粉丝数量，了解自己在云音乐可挖掘的潜在号召力。"},{"title":"制作资源支持","desc":"有机会获得来自云音乐专业团队提供的专辑录制、制作资源支持。"},{"title":"个性化推荐","desc":"有机会获得云音乐APP首页个性化推荐（私人FM、每日歌曲推荐等）的优先推荐。"},{"title":"官方微博微信推荐","desc":"有机会获得原创音乐人官方微信、微博推荐机会。"}]},{"range":[685,779],"privilegeList":[{"title":"高级数据查询","desc":"可查看每首作品的潜力指数，全面地解读你作品的受欢迎程度。"},{"title":"线上栏目专访","desc":"有机会接受《网易音乐人》栏目专访及专题撰写。"},{"title":"站内官号推荐","desc":"优先获得@网易云音乐 站内影响力最大官号推荐。"},{"title":"参与线下演出","desc":"有机会参与云音乐组织的线下巡演或音乐节演出，一起给乐迷带去最好现场。"}]},{"range":[780],"privilegeList":[{"title":"焦点图推荐","desc":"新作品在云音乐首发，有机会获得全客户端焦点图位置。"},{"title":"云音乐微博推荐","desc":"新作品发布时，有机会获得网易云音乐官方微博及站内官号的推荐。"},{"title":"热搜词推荐","desc":"新作品发布时，将在云音乐搜索框下方关键词显示，获得向海量粉丝全面曝光机会。"},{"title":"原创音乐沙龙","desc":"有机会成为原创音乐人沙龙的现场特邀嘉宾。"}]}]}}]}],"buildInVars":{"CP_ENV":"prod"}});