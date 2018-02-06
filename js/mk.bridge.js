/* Momo Bridge v3.0
 * Document: https://fes.wemomo.com/momotouch?action=bridge
 * Syntax compatible with ES5
 *
 * This API is used for momo_webview with app version 5.6+.
 * No guarantee or warranty for any other purpose of usage.
 */

(function(mm, fn) {
    window[mm] = fn();
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
            // AMD for：requirejs
            define(function() {
                return window[mm];
            })
        } else if (define.cmd) {
            // CMD for：seajs
            define(function(require, exports, module) {
                module.exports = window[mm];
            })
        }
    }
})("mm", function() {
    "use strict"
    var BRIDGE_VERSION = '3.5'

    var last_modified = 'Modified: 2016-10-11_11:30:29'
    var uniqueId = 1;


    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }

    // Init with window object
    var ua = window.navigator.userAgent,
        is_m_webview = /momoWebView/.test(ua),
        is_o_webview = /(molive|momoGame)WebView/.test(ua),
        is_webview = is_m_webview || is_o_webview,
        is_ios = /iPhone OS/.test(ua),
        is_android = /[aA]ndroid/.test(ua),
        is_wp = /Windows Phone/.test(ua),
        is_mobile = /Mobile/.test(ua),
        is_pc = !is_mobile,
        is_unknown = (!is_android && !is_ios && !is_wp),
        is_weixin = /MicroMessenger/.test(ua),
        is_hasNet = /netType\/(\d)/.exec(ua),
        is_wifi = !is_webview || !is_hasNet ? false : is_hasNet[1] == '1' ? true : false,
        version = /momoWebView\/(\d+)\.(\d+)\.?(\d+)?/.exec(ua) || ['', '0', '0'],
        momo_main_version = parseInt(version[1]),
        momo_minor_version = parseInt(version[2]),
        momo_version = version[1] + '.' + version[2] + (version[3] ? ('.' + version[3]) : ''),
        arr_build_version = /(ios|android)\/(\d+)\(/.exec(ua),
        build_version = !!arr_build_version ? arr_build_version[2] : 0,
        platform = is_ios ? 'ios' : is_android ? 'android' : is_wp ? 'win_phone' : 'unknown',
        debug = 0,
        query = {}
    //,is_mk = ((location.href.indexOf('_bid')>-1&&momo_version>=6.5&&is_ios)||(/momoKit/.test(ua))&&is_android )? true:false ///momoKit/.test(ua)
        ,
        is_offline = (getUrlParam('_offline') == 1) ? true : false;

    try {
        location.search.substr(1).split("&").forEach(function(item) {
            (item.split("=")[0] in query) ? query[item.split("=")[0]].push(item.split("=")[1]): query[item.split("=")[0]] = [item.split("=")[1], ]
        })
    } catch (err) {}
    /*
     应用于 ios 原陌陌web与客户端通信
     */
    function loadWebViewBridge() {
        if (window.WebViewJavascriptBridge) { return }
        var messagingIframe
        var sendMessageQueue = []
        var receiveMessageQueue = []
        var messageHandlers = {}

        var CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme'
        var QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__'

        var responseCallbacks = {}
        var uniqueId = 1

        function _createQueueReadyIframe(doc) {
            messagingIframe = doc.createElement('iframe')
            messagingIframe.style.display = 'none'
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
            doc.documentElement.appendChild(messagingIframe)
        }

        function init(messageHandler) {
            if (WebViewJavascriptBridge._messageHandler) { throw new Error('WebViewJavascriptBridge.init called twice') }
            WebViewJavascriptBridge._messageHandler = messageHandler
            var receivedMessages = receiveMessageQueue
            receiveMessageQueue = null
            for (var i = 0; i < receivedMessages.length; i++) {
                _dispatchMessageFromObjC(receivedMessages[i])
            }
        }

        function send(data, responseCallback) {
            _doSend({ data: data }, responseCallback)
        }

        function registerHandler(handlerName, handler) {
            messageHandlers[handlerName] = handler
        }

        function callHandler(handlerName, data, responseCallback) {
            _doSend({ handlerName: handlerName, data: data }, responseCallback)
        }

        function _doSend(message, responseCallback) {
            if (responseCallback) {
                var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime()
                responseCallbacks[callbackId] = responseCallback
                message['callbackId'] = callbackId
            }
            sendMessageQueue.push(message)
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
        }

        function _fetchQueue() {
            var messageQueueString = JSON.stringify(sendMessageQueue)
            sendMessageQueue = []
            return messageQueueString
        }

        function _dispatchMessageFromObjC(messageJSON) {
            setTimeout(function _timeoutDispatchMessageFromObjC() {
                var message = JSON.parse(messageJSON)
                var messageHandler
                var responseCallback

                if (message.responseId) {
                    responseCallback = responseCallbacks[message.responseId]
                    if (!responseCallback) { return; }
                    responseCallback(message.responseData)
                    delete responseCallbacks[message.responseId]
                } else {
                    if (message.callbackId) {
                        var callbackResponseId = message.callbackId
                        responseCallback = function(responseData) {
                            _doSend({ responseId: callbackResponseId, responseData: responseData })
                        }
                    }

                    var handler = WebViewJavascriptBridge._messageHandler
                    if (message.handlerName) {
                        handler = messageHandlers[message.handlerName]
                    }

                    try {
                        handler(message.data, responseCallback)
                    } catch (exception) {
                        if (typeof console != 'undefined') {
                            console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception)
                        }
                    }
                }
            })
        }

        function _handleMessageFromObjC(messageJSON) {
            if (receiveMessageQueue) {
                receiveMessageQueue.push(messageJSON)
            } else {
                _dispatchMessageFromObjC(messageJSON)
            }
        }

        window.WebViewJavascriptBridge = {
            init: init,
            send: send,
            registerHandler: registerHandler,
            callHandler: callHandler,
            _fetchQueue: _fetchQueue,
            _handleMessageFromObjC: _handleMessageFromObjC
        }

        var doc = document
        _createQueueReadyIframe(doc)
        init(function(message) { this.log('ios initial') })
    }

    function extend(target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    };

    /*
     通过版本号判断版本支持
     mm.compare('6.2.4') >= 0
     */
    function compare(ver) {
        var version;
        var verType = typeof ver;
        if (verType == 'string' || verType == 'number') {
            version = ver + '';
        } else if (verType == 'object') {
            version = ver[platform];
        } else {
            console.log('不支持的版本号');
            return;
        }
        var now = momo_version.split('.');
        var tar = version.toString().split('.');
        var len = Math.max(tar.length, now.length);
        try {
            for (var i = 0; i < len; i++) {
                var l = isFinite(now[i]) && Number(now[i]) || 0,
                    r = isFinite(tar[i]) && Number(tar[i]) || 0;
                if (l < r) {
                    /* 目标版本低于当前版本 */
                    return -1;
                } else if (l > r) {
                    /* 目标版本大于当前版本 */
                    return 1;
                }
            }
        } catch (e) {
            return -1;
        }
        /* 相等 */
        return 0;
    }

    function checkMK() {
        if (is_android) {
            if (/momoKit/.test(ua)) {
                return true;
            }
        } else if (is_ios) {
            if (build_version >= 451 || is_o_webview) { // 6.5.4 添加了momokit
                if (/momoKit/.test(ua)) return true;
            } else if (compare('6.5') >= 0 && location.href.indexOf('_bid') > -1) {
                return true;
            }
        }
        return false;
    }
    /*
     兼容原陌陌、mk与客户端通信
     */
    var prepare = {
        _native_obj: null,
        _adapter: null,
        NOOP: function() {},
        init: function() {
            /*
             初始化旧版bridge
             */
            if (is_webview) {
                switch (platform) {
                    case 'ios':
                        loadWebViewBridge();
                        this._native_obj = window.WebViewJavascriptBridge;
                        this._adapter = this.iOSAdapter();
                        break;
                    case 'android':
                        if (window.aobj) { //4.1后 存在aobj
                            this._native_obj = window.aobj;
                            this._adapter = this.AndroidAdapter();
                        }
                        break;
                    case 'win_phone':
                        this._adapter = this.WpAdapter();
                        break;
                    default:
                        this._adapter = this.MoAdapter();
                }
            } else {
                this._adapter = this.MoAdapter();
            }
        },
        initMK: function() {
            /*
             初始化mk bridge
             */
            if (is_ios) {
                this._adapter = this.iOS_MK_Adapter();
            } else if (is_android) {
                this._adapter = this.Android_MK_Adapter();
            } else {
                this._adapter = this.MoAdapter();
            }
        },
        MoAdapter: function() {
            /*
             默认adapter
             */
            return {
                name: 'basic',
                invoke: function() {}
            }
        },
        iOSAdapter: function() {
            /*
             旧版bridge ios
             */
            return {
                name: 'ios',
                _NAME: {
                    'init': 'handleStateInfo',
                    'closeWindow': 'close',
                    'callShare': 'showGeneralShare',
                },
                _CB: {
                    'readImage': 'momo_btn_controller_setImageSrc',
                },
                invoke: function() {
                    var args = Array.prototype.slice.apply(arguments)
                    try {

                        // NOTE: the 'this' is binded to the bridge which is the parent of adpater
                        var _adp = this._adapter,
                            __handler, __callback, __cbk

                        // When no param is passed, this will be null not undefined.
                        if (typeof args[1] == 'undefined') args[1] = '{}'
                        args.push(this.NOOP)

                        var _orig = args[0];
                        args[0] = _adp._NAME.hasOwnProperty(args[0]) ? _adp._NAME[args[0]] : args[0]

                        // XXX: doing things on _obj will change args[1] too if args[1] is object
                        var _obj = (typeof args[1] == 'string') ? JSON.parse(args[1]) : args[1]

                        // registe handler for callback
                        if (_orig == 'init') {
                            if (_obj.hasOwnProperty('ui_btn')) {
                                // We should loop through the buttons parameter to
                                // change callback name to handler compatible and
                                // register it.

                                __handler == false
                                for (var i = 0; i < _obj.ui_btn.buttons.length; i++) {
                                    if (_obj.ui_btn.buttons[i].param.callback) {
                                        __callback = _obj.ui_btn.buttons[i].param.callback

                                        this._native_obj.registerHandler(__callback.replace(/\./g, '_'), function(data) {
                                            try {
                                                var cbk = eval(__callback)
                                                if (cbk && typeof cbk === 'function') {
                                                    cbk.call(null, data)
                                                }
                                            } catch (err) {}
                                        }.bind(this))
                                    }
                                }
                            }
                        } else if (_orig == 'callShare' || _orig == 'shareOne') {
                            __callback = _obj.hasOwnProperty('callback') ? _obj.callback : null
                            __handler = __callback.replace(/\./g, '_')
                        } else {
                            __callback = _obj.hasOwnProperty('callback') ? _obj.callback : null
                            __handler = _adp._CB.hasOwnProperty(_orig) ? _adp._CB[_orig] : ''
                            __handler = (__handler == '') ? ('momo_bridge_' + _orig) : __handler
                        }
                        if (__callback && __handler) {

                            this._native_obj.registerHandler(__handler, function(data) {
                                // We evaluate the callback here, as it's defined in json and
                                // write in page. No more security issues, only risk of page crashing.
                                try {
                                    var cbk = eval(__callback)
                                    if (cbk && typeof cbk === 'function') {
                                        if (_orig == 'readImage') {
                                            cbk.call(null, data.id, data.data, data.size, data.type)
                                        } else {
                                            cbk.call(null, data)
                                        }
                                    }
                                } catch (err) {}
                            }.bind(this))
                        }

                        this._native_obj.callHandler.apply(null, args)

                    } catch (err) {}
                }
            }
        },
        AndroidAdapter: function() {
            /*
             旧版bridge android
             */
            return {
                name: 'android',
                invoke: function() {
                    // XXX: Due to unknow reason, we can not apply inside invoke.
                    // maybe coz it is a java object
                    var args = Array.prototype.slice.apply(arguments)
                    var fn = args.shift()
                    if (this._native_obj[fn] && typeof this._native_obj[fn] === 'function') {
                        try {
                            if (args[0]) {
                                this._native_obj[fn](args[0])
                            } else {
                                this._native_obj[fn]()
                            }
                        } catch (err) {}
                    } else {}
                }
            }
        },
        WpAdapter: function() {
            /*
             旧版bridge win phone
             */
            return {
                name: 'win phone',
                invoke: function() {
                    var args = Array.prototype.slice.apply(arguments)
                    var fn = args.shift()

                    try {
                        window.external.notify('{"' + fn + '": ' + args + '}')
                    } catch (err) {}

                }
            }
        },
        mkURL: function(module, name, param) {
            /*
             mk 拼接url
             */
            module = module || "";
            name = name || "";
            param = param || "{}";

            return "mkjsbridge://" + module + "/" + name + "?param=" + encodeURIComponent(param);
        },
        iOS_MK_Adapter: function() {
            /*
             mk ios
             */
            var _this = this;

            function creatIframe(url) {
                var mkfrm = document.createElement('iframe');
                mkfrm.style.display = 'none';
                mkfrm.src = url;
                document.documentElement.appendChild(mkfrm);
                var returnValue = mm.__RETURN_VALUE;
                mm.__RETURN_VALUE = undefined;

                mkfrm.parentNode.removeChild(mkfrm);
                return returnValue;
            }

            return {
                name: 'ios',
                invoke: function(module, name, param) {
                    var iosObj = window['momokit_' + module];
                    /*if (iosObj && iosObj[name]) {
                     iosObj[name](param);
                     }else{
                     creatIframe(_this.mkURL(module, name, param))
                     }*/
                    creatIframe(_this.mkURL(module, name, param))
                }
            }
        },
        Android_MK_Adapter: function(url) {
            /*
             mk android
             */
            var _this = this;
            if (window.mkAobj) {
                return {
                    name: 'android',
                    invoke: function(module, name, param) {
                        module = module || "";
                        name = name || "";
                        param = param || "{}";
                        window.mkAobj.bridgejs(module, name, param)
                    }
                }
            }
            return {
                name: 'android aobj',
                invoke: function(module, name, param) {
                    window.prompt(_this.mkURL(module, name, param));
                }
            }
        }
    }

    /*
     bridge 基础方法
     旧版bridge、mk均包含的属性和方法
     */
    var baseBridge = {
        version: BRIDGE_VERSION,
        last_modified: last_modified,
        is_webview: is_webview, // momo客户端
        is_o_webview: is_o_webview, // live、game客户端
        momo_version: momo_version,
        momo_main_version: momo_main_version,
        momo_minor_version: momo_minor_version,
        build_version: build_version,
        is_wifi: is_wifi,
        is_weixin: is_weixin,
        ua: ua,
        query: query,
        href: window.location.href,
        platform: platform,
        _callbacks: {},
        is_mk: checkMK(),
        is_offline: is_offline,
        _uniqueId: 1,
        bid: getUrlParam('_bid') == null ? '' : parseInt(getUrlParam('_bid')),
        NoneCallback: function() {},
        // 调取客户端前的公共方法
        build: function(obj) {
            /*
             common: ios 、android 使用同一个配置
             ios
             android
             need_mk: 只有mk webview有此功能
             version: 开始支持的版本
             */
            if (obj.hasOwnProperty('common')) {
                obj.ios = obj.common;
                obj.android = obj.common;
            }
            if (!obj.hasOwnProperty(platform)) return;
            var platVoke = obj[platform];

            if (is_m_webview) {
                if ((obj.need_mk && !mm.is_mk) || (obj.version && compare(obj.version) < 0)) {
                    var callback = platVoke[platVoke.length - 1];
                    if (callback && typeof(callback) == 'function') {
                        callback({
                            status: '-99',
                            message: '当前版本不支持此功能，请检查升级'
                        })
                        return;
                    }
                }
            }

            if (baseBridge.is_mk) {
                this.invoke.apply(this, platVoke);
            } else {
                platVoke.shift();
                this.invoke.apply(this, platVoke);
            }
        },
        // 创建callback字符串
        createCallback: function(name, callback) {
            var callbackId = '__BRIDGE_CALLBACK__' + (this._uniqueId++) + '_' + new Date().getTime();
            if (!this._callbacks.hasOwnProperty(name)) {
                this._callbacks[name] = {};
            }
            this._callbacks[name][callbackId] = function() {
                var args = Array.prototype.slice.apply(arguments);
                // 处理转义字符
                if (name != 'getItem') {
                    for (var i = 0; i < args.length; i++) {
                        try {
                            args[i] = JSON.parse(args[i]);
                        } catch (err) {

                        }
                    }
                }

                setTimeout(function() {
                    callback.apply(null, args);
                }, 0);
            }
            return 'mm._callbacks.' + name + '.' + callbackId;
        },
        // 事件传递时使用，为兼容直接invoke的调用，放到mm全局
        fireDocumentEvent: function(type, name, data, origin) {
            var evt;
            if (type == 'bridgeEvent') {
                name = 'be:' + name;
            }

            evt = document.createEvent('Events');
            evt.initEvent(name, false, false);
            evt.name = name;
            if (data) {
                try {
                    evt.data = JSON.parse(data);
                } catch (err) {
                    evt.data = data;
                }
            }
            if (origin) { evt.origin = origin; }
            document.dispatchEvent(evt);
        },
        /* 
         通过版本号判断版本支持
         mm.compare('6.2.4') >= 0
         */
        compare: compare,
        protocol: location.protocol == 'file:' ? 'http:' : location.protocol,
        host: (function() {
            if (location.protocol == 'file:') {
                var _href = location.pathname,
                    reg = /[oO]ffline\/\d+\/(.*\.com)/,
                    aHref = reg.exec(_href);
                if (!!aHref) {
                    return reg.exec(_href)[1];
                }
            }
            return location.host;
        })(),
        pathname: (function() {
            if (location.protocol == 'file:') {
                var _href = location.pathname,
                    reg = /[oO]ffline\/\d+\/.*\.com(\/.*)/,
                    aHref = reg.exec(_href);
                if (!!aHref) {
                    return reg.exec(_href)[1];
                }
            }
            return location.pathname;
        })(),
        // NOTE: ready with DOM loaded.
        ready: function(fn) {
            if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
                fn.call(null, this)
            } else document.addEventListener('DOMContentLoaded', function() {
                fn.call(null, this)
            }.bind(this), false)
            return this
        }
    }

    /* 
     旧版bridge
     */
    var _Bridge = {
        //  Invoke a function from the adapter
        invoke: function(name, param, callback) {
            // convert to array and remove the first argument as that's the fn string.
            // NOTE: the callback fn is not in the arguments.
            if (param) {
                try {
                    var _obj = (typeof param == 'string') ? JSON.parse(param) : param

                    if (param.callback && typeof param.callback == 'function') {
                        _obj.callback = this.createCallback(name, param.callback);
                    }

                    if (callback && typeof callback == 'function' && typeof _obj.callback == 'undefined') {
                        _obj.callback = this.createCallback(name, callback);
                    }

                    param = JSON.stringify(_obj)

                } catch (err) {
                    return;
                }
            }
            window.setTimeout(function() {
                prepare._adapter.invoke.call(prepare, name, param)
            }, 0)
        },
        // Get a key from the adapter.
        get: function(key) {
            return this._adapter[key]
        },
        compatible: function() { // 兼容
            if ((momo_version < 5.6)) {
                if (!window.momo_btn_controller) {
                    window.momo_btn_controller = {
                        setImageSrc: function(id, data, size, type) {
                            if (!data) { return false }
                            document.getElementById(id).src = "data:image/jpeg;base64," + data
                        }
                    }
                }
            }
        }
    }

    /* 
     mk bridge
     */
    var _MK = {
        invoke: function(module, name, param, callback) {
            if (param) {
                try {
                    var _obj = (typeof param == 'string') ? JSON.parse(param) : param

                    if (param.callback && typeof param.callback == 'function') {
                        _obj.callback = this.createCallback(name, param.callback);
                    }

                    if (callback && typeof callback == 'function' && typeof _obj.callback == 'undefined') {
                        _obj.callback = this.createCallback(name, callback);
                    }

                    param = JSON.stringify(_obj)

                } catch (err) {
                    return;
                }
            }
            window.setTimeout(function() {
                prepare._adapter.invoke(module, name, param)
            }, 0)
        }
    }
    /*
     判断是否为mk
     否－初始化旧版bridge
     是－初始化mk bridge
     */
    if (baseBridge.is_mk) {
        prepare.initMK();
        extend(baseBridge, _MK);
    } else {
        prepare.init();
        _Bridge.compatible();
        extend(baseBridge, _Bridge);
    }

    return baseBridge;
});

// 界面
(function() {
    mm.init = function() {
        mm.ui.setUIBtn();
    }

    var hasRefreshed = true;
    mm.ui = {
        /*
         打开链接
         */

        openUrl: function(param) {
            var url = param.url;
            var is_old = mm.compare('6.11') < 0;
            if (param.target == 3) {
                if (is_old) {
                    location.href = 'momochat://immomo.com?goto=' + encodeURIComponent(url);
                    return false;
                }

                mm.ui.openGoto({
                    param: url
                })
                return false;
            }

            if (!mm.is_webview) {
                setTimeout(function() {
                    window.location.href = url;
                }, 20);
                return false;
            }

            if (/^momochat/.test(url)) {
                if (is_old) {
                    location.href = url;
                    return false;
                }
                var reg = new RegExp("(^|&)goto=([^&]*)(&|$)");
                var pos = url.indexOf('?');
                var r = url.indexOf('?') >= 0 ? url.substring(pos + 1).match(reg) : null;
                if (r != null) {
                    mm.ui.openGoto({
                        param: decodeURIComponent(r[2])
                    })
                } else {
                    console.warn('openUrl参数出错');
                }
                return false;
            }

            var is_http = /^http/.test(url);

            if (!is_http) {
                var hashIndex = url.indexOf('#');
                var hash = hashIndex > -1 ? url.substring(hashIndex) : '';

                url = url.replace(hash, '');

                var n = url.indexOf('?');
                var search = n > -1 ? url.substring(n) : '';
                /*
                 * 如果当前为mk webview，
                 * url参数不包含_bid，
                 * 当前页面的bid参数不为空，
                 * 则添加_bid参数
                 * */
                if (mm.is_mk && search.indexOf('_bid=') == -1 && mm.bid !== '') {
                    url += url.indexOf('?') == -1 ? '?' : '&';
                    url += '_bid=' + mm.bid;
                }
                /*
                 * 如果在新webview、外部浏览器打开url
                 * 则添加域名和路径
                 * */
                if (param.target > 0) {
                    if (!/^\//.test(url)) {
                        var len = mm.pathname.lastIndexOf('/');
                        if (len > 0) {
                            var str = mm.pathname.substring(len + 1);
                            url = mm.pathname.replace(str, '') + url;
                        } else {
                            url = '/' + url;
                        }
                    }
                    url = mm.protocol + '//' + mm.host + url;
                }
                url += hash;
                param.url = url;
            }

            switch (param.target) {
                case 0:
                    /*
                     * 如果是跟目录路径，
                     * 则添加域名
                     * */
                    if (!is_http && /^\//.test(url)) {
                        url = mm.protocol + '//' + mm.host + url;
                    }
                    window.location.href = url;
                    return false;
                    break;
                case 1:
                    if (param.pass) {
                        param.url = 'https://passport.immomo.com/authorize?redirect_uri=' + encodeURIComponent(param.url);
                    }
                    if (is_old) {
                        location.href = 'momochat://immomo.com?goto=[momo|url|' + encodeURIComponent(param.url) + ']';
                        return;
                    }
                    if (!mm.is_mk) {
                        mm.build({
                            common: ['ui', 'directGoto', {
                                param: '[momo|url|' + param.url + ']'
                            }]
                        });
                        return;
                    }
                    break;
                case 2:
                    if (!mm.is_mk) {
                        mm.build({
                            common: ['ui', 'openExternalBrowser', { url: param.url }]
                        })
                        return false;
                    }
                    break;
            }
            mm.build({
                common: ['ui', 'openUrl', param]
            })
        },
        /*
         title: '文本',    // goto 规则中的title
         type: 'goto_select_user',    // goto 的具体客户端页面。
         param: { 'tab':'0','multi_select': 0},  // 传送给客户端页面的参数。
         //   可以是一个 字符串 或者 对象
         */
        openGoto: function(param) {

            var endParam = param.param;

            if (mm.is_mk && mm.platform == 'ios') {
                mm.build({
                    common: ['ui', 'openGoto', {
                        goto: endParam
                    }]
                });
            } else {
                mm.build({
                    common: ['ui', 'directGoto', {
                        param: endParam
                    }]
                });
            }
        },
        openWebDialog: function(param) {
            mm.build({
                common: ['ui', 'openWebDialog', param]
            })
        },
        openLinkInExternalBrowser: function(param) {
            var name = mm.is_mk ? 'openLinkInExternalBrowser' : 'openExternalBrowser';
            mm.build({
                common: ['ui', name, param]
            })
        },
        goBack: function(param) {
            mm.build({
                common: ['ui', 'goBack', param]
            })
        },
        reload: function(param) {
            if (mm.is_mk) {
                mm.build({
                    common: ['ui', 'reload', param]
                })
            } else {
                location.reload();
            }
        },
        close: function(param) {
            if (/momoPopup/.test(navigator.userAgent)) {
                mm.ui.closePopup(param);
                return;
            }
            var name = mm.is_mk ? 'close' : 'closeWindow';
            //ios6.5.4 android 6.5.2 开始可以关闭多个webview
            if (mm.platform == 'ios' && mm.compare('6.5.19') < 0) {
                param = {};
            };
            if (mm.platform == 'android' && mm.compare('6.5.2') < 0) {
                param = null;
            };
            mm.build({
                common: ['ui', name, param]
            })
        },
        closePopup: function(param) {
            mm.build({
                common: ['ui', 'closePopup', param]
            })
        },
        showNavBar: function() {
            var name = mm.is_mk ? 'showNavBar' : 'showTitleBar';
            mm.build({
                common: ['ui', name, {}]
            })
        },
        hideNavBar: function(param) {
            var name = mm.is_mk ? 'hideNavBar' : 'hideTitleBar';
            mm.build({
                common: ['ui', name, param]
            })
        },
        postMessage: function(param) {
            if (!/^bn/.test(param.name) && !param.target) {
                param.target = '*';
            }
            mm.build({
                common: ['ui', 'postMessage', param]
            })
        },
        showKeyboard: function(param) {
            mm.build({
                common: ['ui', 'showKeyboard', param]
            })
        },
        showMessage: function(param) {
            mm.build({
                common: ['ui', 'showMessage', param]
            })
        },
        showConfirm: function(param) {
            var newCallback = function(resp) {
                if (!resp) return;
                switch (resp.button) {
                    case 0:
                        param.cancel && param.cancel();
                        break;
                    case 1:
                        param.callback1 && param.callback1();
                        break;
                    case 2:
                        param.callback2 && param.callback2();
                        break;
                    default:
                        break;
                }
                param.finish && param.finish(resp);
            }

            mm.build({
                common: ['ui', 'showConfirm', param, newCallback]
            })
        },
        setUI: function(param) {
            var name = mm.is_mk ? 'setUI' : 'setTitleBarUI';
            if (!param) {
                param = {
                    nav: {
                        mode: 0,
                        color: '',
                        background: ''
                    },
                    uiBtn: {
                        color: '',
                    },
                    backBtn: {
                        color: '',
                    }
                }
            }
            mm.build({
                common: ['ui', name, param]
            })
        },
        setTitle: function(param) {
            if (param && param.title) {
                document.title = param.title;
            }
            mm.build({
                common: ['ui', 'setTitle', param]
            })
        },
        setPulldown: function(param) {
            mm.build({
                common: ['ui', 'setPulldown', param]
            })
        },
        setUIBtn: function(param, callback) {
            if (mm.is_mk) {
                /*
                 如果是mk的webview，使用新方法 setActBtn
                 */
                mm.build({
                    common: ['ui', 'setUIBtn', param, callback]
                })
            } else {
                /*
                 如果不是mk的webview，使用init方法
                 */
                if (param) {
                    var cb;
                    if (callback) {
                        cb = { callback: mm.createCallback('init', callback) };
                    } else {
                        cb = {};
                    }
                    var newParam = {
                        enable: {
                            back: 0, // 后退按钮
                            forward: 0, // 前进
                            refresh: 0, // 刷新
                            share: param.action || 0, // 分享按钮
                            scrollbar: 1, // 原生滚动条显隐 (注：这里对垂直和水平滚动条都不显示)
                            ui_btn: 1 // 右上角复合按钮显隐。(最高优先级，和share互斥)
                        },
                        ui_btn: {
                            title: param.title,
                            buttons: [{
                                text: param.title,
                                action: param.action || 0,
                                param: cb
                            }]
                        }
                    };
                    mm.build({
                        common: ['ui', 'init', newParam]
                    })
                } else {
                    /*
                     如果param为空，清空右上角按钮
                     */
                    mm.build({
                        android: ['ui', 'init', {
                            enable: { back: 0, forward: 0, refresh: 0, share: 0, scrollbar: 0, ui_btn: 0 },
                            ui_btn: { buttons: [{ text: '', action: 0 }] }
                        }],
                        ios: ['ui', 'init', {
                            enable: { back: 0, forward: 0, refresh: 0, share: 0, scrollbar: 0, ui_btn: 0 }
                        }]
                    })
                }
            }
        },

        setUIGroup: function(param) {
            var newCallback = function(resp) {
                if (resp && typeof resp.btn != 'undefined') {
                    param.btns[resp.btn].callback(resp)
                }
            }
            mm.build({
                common: ['ui', 'setUIGroup', param, newCallback],
                need_mk: true,
                version: { ios: '7.3.9', android: '7.3.9' }
            })
        },

        setUIMenu: function(param) {
            if (mm.is_mk) {
                mm.build({
                    common: ['ui', 'setUIMenu', param]
                })
            } else {
                var newParam = {
                    enable: { back: 0, forward: 0, refresh: 0, share: 0, ui_btn: 1 },
                    ui_btn: {
                        title: param.title || '',
                        dropdown: 1,
                        buttons: []
                    }
                }
                param.buttons && param.buttons.forEach(function(button) {
                    if (button.action == 1) { // 兼容 <v5.7
                        newParam.share = button.param;
                        newParam.enable.share = 1;
                    }
                    newParam.ui_btn.buttons.push({
                        text: button.text,
                        icon: button.icon,
                        action: button.action || 0,
                        param: button.param
                    })
                })
                mm.build({
                    common: ['ui', 'init', newParam]
                })
            }
        },
        clearPageCover: function(callback) {
            if (!mm.is_mk || mm.platform != 'ios') return;

            mm.build({
                common: ['ui', 'clearPageCover', {}, callback]
            })
        },
        screenRotate: function(param) {
            mm.build({
                common: ['ui', 'screenRotate', param]
            })
        },
        getVisibility: function(callback) {
            mm.build({
                common: ['ui', 'getVisibility', {}, callback],
                version: { ios: '6.6.3', android: '6.6.1' }
            })
        },
        /* 下拉刷新 */
        refresh: function(callback) {
            hasRefreshed = true;
            var t;
            var reTime = function() {
                if (!hasRefreshed) {
                    mm.ui.refreshEnd();
                }
            }
            var newCallback = function() {
                hasRefreshed = false;
                callback && callback.call(null);
                clearTimeout(t);
                t = setTimeout(reTime, 16000);
            }
            mm.build({
                common: ['ui', 'refresh', {}, newCallback]
            })
        },
        /* 下拉刷新结束 */
        refreshEnd: function() {
            hasRefreshed = true;
            mm.build({
                common: ['ui', 'refreshEnd', {}]
            })
        }
    }

    // 分享
    mm.share = {
        showPanel: function(param, callback) {
            if (typeof callback == 'undefined') {
                callback = function() {};
            }
            var name = mm.is_mk ? 'showPanel' : 'callShare';

            if (param) {
                var projectArr = ['title', 'text', 'url', 'pic'];
                var configs = param.configs;

                if (configs) {
                    /*
                     分享到动态，如果没有参数sdk：
                     1. 如果有大图，默认走服务器下发 sdk=0
                     2. 如果没有大图，默认走sdk分享 sdk=1，分享的默认文字为参数sdk_text
                     */

                    if (configs.momo_feed) {
                        var feed = configs.momo_feed;

                        if (typeof feed.sdk == 'undefined' && !feed.pic && feed.resource) {
                            feed.sdk = 1;
                        }
                    }

                    for (var k in configs) {
                        projectArr.forEach(function(pro) {
                            if (!configs[k].hasOwnProperty(pro) && param[pro]) {
                                configs[k][pro] = param[pro];
                            }
                        });
                    }
                    if (configs.momo_contacts) {
                        !configs.momo_friend && (configs.momo_friend = configs.momo_contacts);
                        !configs.momo_discuss && (configs.momo_discuss = configs.momo_contacts);
                        !configs.momo_group && (configs.momo_group = configs.momo_contacts);
                    }
                }
            }

            mm.build({
                common: ['share', name, param, callback]
            })
        },
        toApp: function(param, callback) {
            var name = mm.is_mk ? 'toApp' : 'shareOne';

            if (param.app == 'momo_feed') {
                /*
                 分享到动态，如果没有参数sdk：
                 1. 如果有大图，默认走服务器下发 sdk=0
                 2. 如果没有大图，默认走sdk分享 sdk=1，分享的默认文字为参数sdk_text
                 */

                if (typeof param.sdk == 'undefined' && !param.pic && param.resource) {
                    param.sdk = 1;
                }
            }
            mm.build({
                common: ['share', name, param, callback]
            })
        }
    }
})();

// 设备相关
(function() {
    mm.device = {
        bindPhone: function(param, callback) {
            mm.build({
                common: ['device', 'bindPhone', {}, callback],
                need_mk: true,
                version: { ios: '6.11.3', android: '7.0' } //7.0
            });
        },
        /* 计步器获取步数 */
        getStepCounter: function(callback) {
            mm.build({
                common: ['device', 'getStepCounter', {}, callback],
                need_mk: true,
                version: { ios: '6.9.5', android: '6.9.5' }
            });
        },
        /*
         唤起原生短信界面，发送短信
         */
        sendSMS: function(param) {
            mm.build({
                common: ['device', 'sendSMS', param],
                need_mk: true
            })
        },
        callPhone: function(param) {
            mm.build({
                common: ['device', 'callPhone', param],
                need_mk: true
            })
        },
        /*
         获取用户系统信息
         返回值：
         systemName: 'iOS',// 系统内核 IOS/Android
         systemVersion: '8.0', // 系统内核版本
         model: 'iPhone',    // 系统型号
         modelVersion: '6',  // 系统型号版本
         */
        getSystemInfo: function(callback) {
            mm.build({
                common: ['device', 'getSystemInfo', {}, callback],
                need_mk: true
            })
        },
        getClientInfo: function(callback) {
            mm.build({
                common: ['device', 'getClientInfo', {}, callback],
                need_mk: true
            })
        },
        getScreenInfo: function(callback) {
            mm.build({
                common: ['device', 'getScreenInfo', {}, callback],
                version: '6.0'
            })
        },
        getBatteryInfo: function(callback) {
            var name = mm.is_mk ? 'getBatteryInfo' : 'getBatteryStatus';
            mm.build({
                common: ['device', name, {}, callback],
                version: '6.0'
            })
        },
        getNetworkType: function(callback) {
            mm.build({
                common: ['device', 'getNetworkType', {}, callback],
                version: '6.0'
            })
        },
        startNetWorkListening: function(param) {
            mm.build({
                common: ['device', 'startNetWorkListening', param]
            })
        },
        // old Bridge Begin
        getAPIList: function(callback) {
            mm.build({
                common: ['device', 'getAPIList', {}, callback]
            })
        },
        getReferee: function(param, callback) {
            mm.build({
                common: ['device', 'getReferee', {}, callback],
                need_mk: true,
                version: { ios: '7.1', android: '7.1' } //7.0
            });
        }
    }
})();

// 离线包
(function() {
    mm.offline = {
        /**
         强制更新离线包，完成后回调
         调用：
         bid
         url //更新zip包URL
         回调：
         {
             status: 0,  // 0/1 更新离线包后的状态
                         //    0 成功，1失败
             message: '' // 提示文字
         }
         */
        update: function(param, callback) {
            mm.build({
                common: ['offline', 'update', param, callback]
            })
        },
        /**
         强制批量更新离线包，完成后回调
         调用：
         bid:[],
         url:[]
         回调：
         {
             status: 0,  // 0/1 更新离线包后的状态
                         //    0 成功，1失败
             list:[],    // 失败的离线包
             message: '' // 提示文字
         }
         */
        batchUpdate: function(param, callback) {
            mm.build({
                common: ['offline', 'batchUpdate', param, callback]
            })
        },
        /**
         */
        checkUpdate: function(param, callback) {
            mm.build({
                common: ['offline', 'checkUpdate', param, callback]
            })
        },
        isCached: function(param, callback) {
            mm.build({
                common: ['offline', 'isCached', param, callback]
            })
        },
        /*
         移除所有离线包
         */
        clearCache: function(callback) {
            mm.build({
                common: ['offline', 'clearCache', {}, callback]
            })
        },
        /*
         移除某个离线包
         调用：
         bid
         */
        removeCache: function(param, callback) {
            mm.build({
                common: ['offline', 'removeCache', param, callback]
            })
        },
        /*
         获取zip包版本号
         callback： '10' // 0 if it's null
         */
        getVersion: function(param, callback) {
            mm.build({
                common: ['offline', 'getVersion', param, callback]
            })
        }
    }
})();

// 数据请求
(function() {
    mm.http = {
        resetSession: function(callback) {
            mm.build({
                common: ['http', 'resetSession', {}, callback]
            })
        },
        /**
         拉取json数据
         @param {String} url
         @param {Object} param 请求参数
         - method: 客户端请求均为post
         - timeout: 超时时间，默认无超时时间
         */
        request: function(param, callback) {
            param.method = 'post';

            var is_encode = false;

            // var is_encode;

            // if (mm.compare('7.4.1') >= 0 && mm.platform == 'ios') {
            //     is_encode = false;
            // }else if(mm.compare('7.0.9') || mm.is_o_webview){
            //     is_encode = true;
            // }
            // if (is_encode) {
            //     param.encode = 1;
            // }

            var newCallback = function(info) {
                // if (is_encode) {
                //     try {
                //         var codeInfo = window.atob(info);
                //         codeInfo = escape(codeInfo);  // atob后，处理中文
                //         codeInfo = decodeURIComponent(codeInfo);
                //         info = JSON.parse(codeInfo);
                //     } catch(err) {
                //     }
                // }else{
                //     if (typeof info == 'string' && mm.platform == 'android') {
                //         try {
                //             var codeInfo = decodeURIComponent(info);
                //             info = JSON.parse(codeInfo);
                //         } catch(err) {
                //         }
                //     }
                //     if (typeof info == 'string') {
                //         info = info.replace(/\\/g, '\\\\')
                //             .replace(/\t/g, '\\t')
                //             .replace(/\n/g, '\\n')
                //             .replace(/\f/g, '\\f')
                //             .replace(/\r/g, '\\r')
                //             .replace(/[\x00-\x1F\x7F-\x9F]/g, '');
                //         try {
                //             info = JSON.parse(info);
                //         } catch(err) {

                //         }
                //     }
                // }

                callback && callback.call(null, info);
            }

            mm.build({
                common: ['http', 'request', param, newCallback]
            })
        }
    }
})();

// 媒体
(function() {
    mm.media = {
        uploadImages: function(param, callback) {

            mm.build({
                common: ['media', 'uploadImages', param, callback],
                version: '7.5'
            })
        },
        previewImage: function(param, callback) {
            mm.build({
                common: ['media', 'previewImage', param, callback]
            })
        },
        /*
         v6.3- 支持单张图片上传 readImage
         */
        readImages: function(param, callback) {
            if (!mm.is_mk && mm.compare(6.3) < 0) {
                var newParam = {
                    id: 'image',
                    method: param.method,
                    type: param.type
                }
                var cb = function(id, data, size, type) {
                    callback.call(null, {
                        status: 0, //0:成功 1:取消 2:内存不足
                        images: [{ //成功的图片列表
                            data: data, //图片信息
                            size: size //图片大小
                        }]
                    });
                }
                mm.build({
                    common: ['media', 'readImage', newParam, cb]
                })
                return false;
            }
            mm.build({
                common: ['media', 'readImages', param, callback]
            })
        },
        startAudio: function(param, callback) {
            mm.build({
                common: ['media', 'startAudio', param, callback],
                version: '5.8'
            })
        },
        startVideo: function(param) {
            mm.build({
                common: ['media', 'startVideo', param],
                version: '6.0'
            })
        },
        stopAudio: function(param) {
            mm.build({
                common: ['media', 'stopAudio', param],
                version: '5.8'
            })
        },
        getImageData: function(param, callback) {
            mm.build({
                common: ['media', 'getImageData', param, callback],
                need_mk: true
            })
        },
        getImages: function(param, callback) {
            mm.build({
                common: ['media', 'getImages', param, callback]
            })
        }
    }
})();

// 传感器
(function() {
    mm.sensor = {
        // 取得当前位置信息 
        getLocation: function(callback) {
            var newCallback = function(resp) {
                if (mm.platform == 'ios') {
                    resp.latitude = resp.lat;
                    resp.longitude = resp.lng;
                    delete resp.lat;
                    delete resp.lng;
                }
                callback.call(null, resp);
            }
            mm.build({
                common: ['sensor', 'getLocation', {}, newCallback]
            })
        },
        openLocation: function(param, callback) {
            mm.build({
                common: ['sensor', 'openLocation', param, callback]
            })
        },
        // 浏览内置地图位置 
        viewLocation: function(param) {
            mm.build({
                common: ['sensor', 'viewLocation', param]
            })
        },
        vibrate: function(param) {
            mm.build({
                common: ['sensor', 'vibrate', param]
            })
        }
    }
})();

// 应用
(function() {
    function initAppObj(param) {
        if (!param.hasOwnProperty('apps')) return;
        var type = mm.is_mk ? 'apps' : 'games';
        var pre = param.apps;
        var endObj = {};
        endObj[type] = {};
        for (var k in pre) {
            var _url = "url_" + mm.platform;
            endObj[type][k] = {
                schema: pre[k].schema,
                url: pre[k][_url] || '',
                param: pre[k].param || {}
            }
        }
        return endObj;
    }
    mm.app = {
        // 添加app下载，到下载器 仅安卓
        downloadApp: function(param, callback) {
            if (mm.compare(6.3) >= 0) { callback = null; }
            mm.build({
                android: ['app', 'downloadApp', param, callback]
            })
        },
        // 获取下载列表，仅安卓
        getDownloadList: function(callback) {
            mm.build({
                android: ['app', 'getDownloadList', {}, callback]
            })
        },
        // 检查app是否已安装
        isInstalled: function(param, callback) {
            /* 最终格式：
             apps: {
             'ex_hero_X8dFahX': {
             schema: 'http://itunes.apple.com/cn/app/?id=859037264&ls=1&mt=8',
             url:''
             },
             'ex_bydz_9sH6dXG': {
             schema: 'http://itunes.apple.com/cn/app/?id=860491710&ls=1&mt=8',
             url:''
             }
             }
             */
            var name = mm.is_mk ? 'isInstalled' : 'checkGames';
            var endParam = initAppObj(param);

            mm.build({
                common: ['app', name, endParam, callback]
            })
        },
        // 安装app
        installApps: function(param, callback) {
            var cb;
            if (mm.is_mk) {
                cb = callback;
            } else {
                cb = function(resp) {
                    callback.call(null, {
                        games: JSON.parse(resp)
                    })
                }
            }
            /* 最终格式：
             apps: {
             'ex_hero_X8dFahX': {
             schema: 'http://itunes.apple.com/cn/app/?id=859037264&ls=1&mt=8',
             url:  'http://itunes.apple.com/cn/app/?id=859037264&ls=1&mt=8'  //url区分平台
             },
             'ex_bydz_9sH6dXG': {
             schema: 'http://itunes.apple.com/cn/app/?id=860491710&ls=1&mt=8',
             url: 'http://itunes.apple.com/cn/app/?id=860491710&ls=1&mt=8',

             }
             }
             */
            var name = mm.is_mk ? 'installApps' : 'installGames';
            var endParam = initAppObj(param);
            mm.build({
                common: ['app', name, endParam, cb]
            })
        },
        // 唤起第三方应用
        launchApp: function(param) {
            mm.build({
                common: ['app', 'launchApp', {
                    schema: param.schema,
                    url: param['url_' + mm.platform] || ''
                }]
            })
        },
        //调起手机设置
        launchPhoneSetting: function(param) {
            if (!param) param = { type: 0 }

            if (typeof param.type == 'undefined') {
                param.type = 0;
            }
            mm.build({
                common: ['app', 'launchPhoneSetting', param]
            })
        },
        //调起手机管家
        launchApp: function(param) {
            if (!param) param = { type: 0 }
            if (typeof param.type == 'undefined') {
                param.type = 0;
            }
            mm.build({
                common: ['app', 'launchApp', param]
            })
        }
    }
})();

// 本地存储
(function() {
    mm.storage = {
        // 获取某条数据
        /*
         @param params {Object}
         //callid: String    // 用来标示请求id, 返回时把该值传回
         host: String  // 如果host不为空, 且是该页面的域名的父域名, 则往host写, 如果为空则往页面的域名写, 其他为错误
         path: String  // 区分业务
         key: String     // 数据对应的key
         */
        getItem: function(param, callback) {
            /*{
             host:
             path:
             key: '',
             value: ''
             }*/

            mm.build({
                common: ['storage', 'getItem', param, callback]
            })
        },
        setItem: function(param) {
            param.value += '';
            mm.build({
                common: ['storage', 'setItem', param]
            })
        },
        removeItem: function(param) {
            mm.build({
                common: ['storage', 'removeItem', param]
            })
        },
        clearItem: function(param) {
            var name = 'clearItem';
            if (mm.platform == 'ios' && mm.compare(6.8) <= 0) {
                name = 'clear';
            }
            mm.build({
                common: ['storage', name, param]
            })
        }
    }
})();
// 支付
(function() {
    mm.pay = {
        /* 收银台 */
        cashDesk: function(param, callback) {
            mm.build({
                common: ['pay', 'cashDesk', param, callback],
                version: { ios: '6.11.3', android: '7.0' } //7.0,mk&非mk
            })
        },
        cashKey: function(param, callback) {
            mm.build({
                common: ['pay', 'cashKey', param, callback],
                version: { ios: '6.11.3', android: '7.0' } //7.0,mk&非mk
            })
        },
        doAlipay: function(param, callback) {
            mm.build({
                common: ['pay', 'doAlipay', param, callback]
            })
        },
        bindAlipay: function(param, callback) {
            mm.build({
                common: ['pay', 'bindAlipay', param, callback],
                need_mk: true,
                version: { ios: '6.11.3', android: '7.0' } //7.0,mk
                //version: '7.0'
            })
        },
        doWXpay: function(param, callback) {
            mm.build({
                common: ['pay', 'doWXpay', param, callback],
                version: { ios: '6.7', android: '6.8' }
            })
        },
        sendPayResult: function(param) {
            mm.build({
                common: ['pay', 'sendPayResult', param],
                version: { ios: '6.9', android: '6.9' }
            })
        },
        doWXwithhold: function(param, callback) {
            mm.build({
                common: ['pay', 'doWXwithhold', param],
                version: { ios: '7.7', android: '7.7' }
            })
        },
        doAliwithhold: function(param, callback) {
            mm.build({
                common: ['pay', 'doAliwithhold', param],
                version: { ios: '7.7', android: '7.7' }
            })
        }
    }
})();
// 指定动作
(function() {
    mm.action = {
        doAuthenticate: function(param){
            mm.build({
                common: ['action', 'doAuthenticate', param]
            })
        },
        setLiveBtn: function(param, callback) {
            mm.build({
                common: ['action', 'setLiveBtn', param, callback],
                version: { ios: '7.2.1', android: '7.2.1' }
            });
        },
        getUserPlace: function(param, callback) {
            mm.build({
                common: ['action', 'getUserPlace', param, callback],
                version: { ios: '7.2', android: '7.2' }
            });
        },
        getLoginStatus: function(callback) {
            mm.build({
                common: ['action', 'getLoginStatus', {}, callback],
                version: { ios: '6.9.5', android: '6.9.5' }
            });
        },
        /* 发布圈子帖子 */
        circlePublish: function(param, callback) {
            mm.build({
                common: ['action', 'circlePublish', param, callback]
            });
        },
        commentKeyboard: function(param, callback) {
            mm.build({
                common: ['action', 'commentKeyboard', param, callback]
            });
        },
        gotoPage: function(param, callback) {
            if (mm.compare('7.0') < 0 && param.type == 'goto_select_all') {
                param.type = 'goto_select_contacts';
            }
            console.log(param)
            mm.build({
                common: ['action', 'gotoPage', param, callback]
            });
        },
        setChatBubble: function(param, callback) {
            var name, newParam;
            if (mm.is_mk) {
                name = 'setChatBubble';
                newParam = param
            } else {
                name = 'doAction';
                newParam = {
                    type: 'customBubble',
                    param: param
                }
            }
            mm.build({
                common: ['action', name, newParam, callback]
            })
        },
        setProfileCover: function(param, callback) {
            var name, newParam;
            if (mm.is_mk) {
                name = 'setProfileCover';
                newParam = param
            } else {
                name = 'doAction';
                newParam = {
                    type: 'setProfileCover',
                    param: param
                }
            }
            mm.build({
                common: ['action', name, newParam, callback]
            })
        },
        SVIPGroupUpdgrade: function(param, callback) {
            var name, newParam;
            if (mm.is_mk) {
                name = 'SVIPGroupUpdgrade';
                newParam = param
            } else {
                name = 'doAction';
                newParam = {
                    type: 'SVIPGroupUpdgrade',
                    param: param
                }
            }
            mm.build({
                common: ['action', name, newParam, callback]
            })
        },
        verifyLogin: function(callback) {
            var name;
            if (mm.is_mk) {
                name = 'verifyLogin';
                newParam = {};
            } else {
                name = 'doAction';
                newParam = {
                    type: 'verifyLogin',
                    param: {}
                }
            }
            mm.build({
                common: ['action', name, newParam, callback]
            })
        },
        reportSpam: function(param, callback) {
            var name, newParam;
            if (mm.is_mk) {
                name = 'reportSpam';
                newParam = param
            } else {
                name = 'doAction';
                newParam = {
                    type: 'reportSpam',
                    param: param
                }
            }
            mm.build({
                common: ['action', name, newParam, callback]
            })
        },
        modifyGroupPartyFinish: function(param, callback) {
            var name, newParam;
            if (mm.is_mk) {
                name = 'modifyGroupPartyFinish';
                newParam = param
            } else {
                name = 'doAction';
                newParam = {
                    type: 'modifyGroupPartyFinish',
                    param: param
                }
            }
            mm.build({
                common: ['action', name, newParam, callback]
            })
        },
        refreshUserProfile: function(param, callback) {
            var name, newParam;
            if (mm.is_mk) {
                name = 'refreshUserProfile';
                newParam = param
            } else {
                name = 'doAction';
                newParam = {
                    type: 'refreshUserProfile',
                    param: param
                }
            }
            mm.build({
                common: ['action', 'refreshUserProfile', param, callback]
            })
        },
        refreshGroupProfile: function(param, callback) {
            mm.build({
                common: ['action', 'refreshGroupProfile', param, callback],
                need_mk: true
            })
        },
        getUserInfo: function(callback) {
            mm.build({
                common: ['action', 'getUserInfo', {}, callback]
            })
        },
        checkContacts: function(param, callback) {
            if (typeof param.data == 'object') {
                param.data = JSON.stringify(param.data)
            }
            mm.build({
                common: ['action', 'checkContacts', param, callback],
                need_mk: true
            })
        },
        getChatList: function() {
            var callback, param;
            if (arguments.length == 1) {
                param = { count: 10 };
                callback = arguments[0];
            } else {
                param = arguments[0];
                callback = arguments[1];
            }
            mm.build({
                common: ['action', 'getChatList', param, callback]
            })
        },
        liveIdentify: function() {
            mm.build({
                common: ['action', 'liveIdentify', {}]
            })
        }

    }
})();

//游戏
(function() {
    mm.game = {

    }
})();

//声网
(function() {
    mm.agora = {
        /*加入声网频道*/
        joinChannel: function(param) {
            mm.build({
                common: ['agora', 'joinChannel', param]
            })
        },
        setAgoraAudio: function(param) {
            mm.build({
                common: ['agora', 'setAgoraAudio', param]
            })
        },
        leavelChannel: function(param) {
            mm.build({
                common: ['agora', 'leavelChannel', param]
            })
        },
        //严格意义上不属于直接与声网交互，但是获取的音频文件交给声网播放
        checkResVersion: function(param) {
            mm.build({
                common: ['agora', 'checkResVersion', param]
            })
        },
        playSound: function(param) {
            mm.build({
                common: ['agora', 'playSound', param]
            })
        },
        stopSound: function(param) {
            mm.build({
                common: ['agora', 'stopSound', param]
            })
        }
    }
})();