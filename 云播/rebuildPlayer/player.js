/**
 * 封装阿里播放器，作为直播的播放器，会根据传入的stream，请求/api/play/live/Handler.ashx，
 * 获取包括flv，hls(m3u8)，rtmp的播放地址，并根据设备类型选择播放器类型（video或flash）和
 * 视频格式，支持暂停推流时自动重试。
 *
 * opts：
 * id String 播放器依附的节点的id
 * width String 播放器的宽度，带单位
 * height String 播放器的高度，带单位
 * cover String 播放器的封面图
 * autoplay Boolean 是否强制自动播放，不指定则会使用接口返回值，但能否自动播放还要看浏览器是否允许
 * components Array 组件，参考https://github.com/aliyunvideo/AliyunPlayer_Web/tree/master/customComponents
 * stream String 可选，播放器的直播流的名称
 * audioOnly Boolean 可选，纯音频流
 * videoOnly Boolean 可选，纯视频流
 * callback Function 可选，播放器创建成功的回调，参数{aliplayer}
 *
 * 例：
 * initLivePlayer('player-con', '1280px', '720px', 'img/cover.jpg', function(player){//...});
 * initLivePlayer('player-con', '100%', '100%', 'img/cover.jpg', 'splive', function(player){//...});
 */
(function () {

  var USER_AGENT = window.navigator.userAgent,
    IS_IE = /MSIE|Trident/i.test(USER_AGENT),
    IS_IOS = /iPhone|iPad|iPod/i.test(USER_AGENT),
    HAS_FLASH = (function () {
    if (window.ActiveXObject) {
      if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) {
        return true;
      }
    } else {
      if (navigator.plugins && navigator.plugins.length > 0 && navigator.plugins['Shockwave Flash']) {
        return true;
      }
    }
    return false;
  }()),
    CAN_PLAY_FLV = (function () {
      var n = document.createElement('video');
      return n && n.canPlayType && n.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"') && window.MediaSource && window.fetch && !IS_IE
    } ());

  window.initLivePlayer = function(opts) {
    // 默认回调为空函数
    if (!opts.callback) {
      opts.callback = function () {};
    }

    var playerEl = document.getElementById(opts.id);
    if (!playerEl) return; // dom不存在
    var playerHTML = playerEl.outerHTML;

    // 基础配置
    var config = {
      id: opts.id,
      cover: opts.cover,
      width: opts.width,
      height: opts.height,
      isLive: true
    };
    var player = {};
    getLiveInfo(function(res) {
      // 参数不强制自动播放时，接口返回值来确定是否自动播放
      if ('autoplay' in opts) {
        config.autoplay = !!opts.autoplay;
      } else {
        config.autoplay = res.autoplay;
      }

     // if (res.living) { // 正在推流
        // 支持video标签且不是IE浏览器使用H5播放器，其他使用flash播放器
        if (CAN_PLAY_FLV) {
          player.type = 'h5';
          if (IS_IOS) { // iOS设备H5播放器使用hls
            initH5Player(res.hls);
          } else {
            initH5Player(wrapUrl(res.flv)); // PC端和非iOS设备H5播放器使用flv
          }
        } else {
          player.type = 'flash';
          initFlashPlayer(wrapUrl(res.rtmp)); // Flash播放器使用rtmp
        }
      //} else {
      //  opts.callback(null);
      //}
    }, false);

    function getLiveInfo(success, async) {
      if (typeof async === 'undefined') {
        async = true; // 默认异步
      }
      getInfoTime = new Date().getTime();
      $.ajax({
        type: 'GET',
        url: '/api/play/live/Handler.ashx',
        async: async,
        data: { stream: opts.stream },
        dataType: 'json',
        success: function(res) {
          success(JSON.parse(res.desc));
        },
        error: function(xhr, status, err) {
          if (console) console.log(xhr, status, err);
        }
      });
    }

    function initH5Player(source) {
      $.extend(config, {
        source: source,
        skinLayout: [
          {
            'name': 'bigPlayButton',
            'align': 'cc',
            'x': 0,
            'y': 0
          },
          {
            'name': 'H5Loading',
            'align': 'cc'
          },
          {
            'name': 'tooltip',
            'align': 'blabs',
            'x': 0,
            'y': 56
          },
          {
            'name': 'controlBar',
            'align': 'blabs',
            'x': 0,
            'y': 0,
            'children': [
              {
                'name': 'playButton',
                'align': 'tl',
                'x': 15,
                'y': 12
              },
              {
                'name': 'timeDisplay',
                'align': "tl",
                'x': 10,
                'y': 7
              },
              {
                'name': 'fullScreenButton',
                'align': 'tr',
                'x': 10,
                'y': 12
              },
              {
                'name': 'volume',
                'align': 'tr',
                'x': 5,
                'y': 10
              }
            ]
          }
        ],
        components: opts.components
      });
      player.aliplayer = new Aliplayer(config);

      player.aliplayer.on('error', function() {
        var now = new Date().getTime();
        if (getInfoTime - now > 5 * 60 * 1000) { // 5分钟重新获取播放地址
          setTimeout(function() {
            getLiveInfo(function(res) {
              if (IS_IOS) { // iOS设备H5播放器使用hls
                player.aliplayer.loadByUrl(wrapUrl(res.hls));
              } else {
                player.aliplayer.loadByUrl(wrapUrl(res.flv)); // PC端和非iOS设备H5播放器使用flv
              }
            });
          }, retryPeriod);
        } else {
          setTimeout(function() {
            player.aliplayer.loadByUrl(config.source);
          }, retryPeriod);
        }
      });
      // 开始缓冲
      player.aliplayer.on('waiting', function() {
        retryPeriod = BASE_RETRY_PERIOD;
        retryCount = 0;
      });
      bindEvent();
      // 部分浏览器禁止自动播放，全局增加点击监听来触发播放
      function _autoplay() {
        if (player.aliplayer && player.aliplayer._status !== 'playing') {
          player.aliplayer.play();
        }
        document.documentElement.removeEventListener('mousedown', _autoplay);
      }
      if (config.autoplay) {
        document.documentElement.addEventListener('mousedown', _autoplay);
      }
      opts.callback(player);
    }

    function bindEvent() {
      if (opts.listeners) {
        for (var n in opts.listeners) {
          if (opts.listeners.hasOwnProperty(n) && (typeof opts.listeners[n] === 'function')) {
            player.aliplayer.on(n, opts.listeners[n]);
          }
        }
      }
    }

    function wrapUrl(url) {
      return url + (opts.onlyVideo ? '&onlyvideo=1' : '') + (opts.onlyAudio ? '&onlyaudio=1' : '');
    }

    function initFlashPlayer(source) {
      if (HAS_FLASH) {
        $.extend(config, {
          source: source,
          useFlashPrism: true
        });
        buildFlashPlayer();
        opts.callback(player);
      } else {
        $('#' + opts.id).css({
          'background': 'url("' + opts.cover + '") no-repeat',
          'width': opts.width,
          'height': opts.height
        }).html('<div style="position:absolute;left:50%;top:50%;margin:-60px 0 0 -120px;width:240px;height:120px;font-size:16px;line-height:30px;text-align:center;background:#fff;"><br>Flash插件未安装或未启用<br>点击<a href="http://www.macromedia.com/go/getflashplayer" target="_blank">安装/启用</a></div>');
        opts.callback(null);
      }
    }

    function buildFlashPlayer() {
      if (player.aliplayer) {
        player.aliplayer.dispose();
        document.getElementById(config.id).outerHTML = playerHTML;
      }
      player.aliplayer = new Aliplayer(config);
      document.getElementById(player.aliplayer._id).style.position = 'absolute';
      // 服务器暂停推流，或不流畅时
      player.aliplayer.on('error', function() {
        showError();
        rebuildFlashPlayer();
      });
      // 开始缓冲
      player.aliplayer.on('waiting', function() {
        retryPeriod = BASE_RETRY_PERIOD;
        retryCount = 0;
      })
      bindEvent();
    }

    function showError() {
      $('#' + opts.id).css({
        'background': 'url("' + opts.cover + '") no-repeat',
        'width': opts.width,
        'height': opts.height
      }).append('<iframe src="/js/lib/prismplayer/error.html" width="100%" height="100%" frameborder="0" allowtransparency style="position:absolute;width:100%;height:100%;"></iframe>');
    }

    var BASE_RETRY_PERIOD = 5 * 1000, // 基础重试间隔5秒
      MAX_RETRY_PERIOD = 30 * 1000, // 最长重试间隔30秒
      retryPeriod = BASE_RETRY_PERIOD,
      retryCount = 0,
      getInfoTime = 0;
    function rebuildFlashPlayer() {
      if (player.aliplayer) { // 重试
        var now = new Date().getTime();
        if (++retryCount < 5) { // 重试5次以下
          setTimeout(function() {
            buildFlashPlayer();
          }, retryPeriod);
        } else { // 重试5次以上，增加间隔
          retryPeriod = Math.min(retryPeriod + BASE_RETRY_PERIOD, MAX_RETRY_PERIOD);
          if (getInfoTime - now > 5 * 60 * 1000) { // 5分钟重新获取播放地址
            setTimeout(function() {
              getLiveInfo(function (res) {
                config.source = wrapUrl(res.rtmp);
                buildFlashPlayer();
              });
            }, retryPeriod);
          } else {
            setTimeout(function() {
              buildFlashPlayer();
            }, retryPeriod);
          }
        }
      }
    }
  }
}())
