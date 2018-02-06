/* /c/js/2017/07/10/1499672096838-JD1e699b402f98e8d92b20fdeb196458a4.js COMPILE@2017-07-10T07:34:56.903Z WITH:mk.mock:b@4.0.9 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    (function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
            typeof define === 'function' && define.amd ? define(factory) :
                (global.mk = factory());
    }(this, (function () { 'use strict';

        var _isSupport7_1 = mm.compare('7.0.9') > 0;
        var _setSession = false;
        var _analy = { // 发送统计ajax时间的对象
            firstTime: 0,
            lastTime: 0,
            sendCount: 0,
            count: 0,
            isLoaded: false,
            cache: false
        };
        var _allAnaly = {
            start: {},
            data: {},
            net: 'none'
        };

// 获取网络情况
        var deviceBack = function (res) {
            _allAnaly.net = res.network_type;
        };
        if (mm.is_mk) {
            mm.invoke('device', 'getNetworkType', {}, deviceBack);
        } else {
            mm.invoke('getNetworkType', {}, deviceBack);
        }

// ajax begin
        function localAjax(ajaxOpt) {
            var xhr = new window.XMLHttpRequest(),
                data = ajaxOpt.data || '',
                url = ajaxOpt.url,
                ajaxError = ajaxOpt.error,
                ajaxSuccess = ajaxOpt.success;

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var result,
                        error = false;
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && location.protocol == 'file:') {
                        result = xhr.responseText;

                        try {
                            // http://perfectionkills.com/global-eval-what-are-the-options/
                            result = /^\s*$/.test(result) ? null : JSON.parse(result);
                        } catch (e) {
                            error = e;
                        }

                        if (error) ajaxError(error, 'parsererror', xhr);else ajaxSuccess(result, xhr);
                    } else {
                        ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Accept', '*/*');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            if (data && typeof data != "string") {
                var params = [];
                var value;
                for (var i in data) {
                    value = data[i];
                    if (typeof value == 'function') value = value();
                    if (value == null) value = "";
                    params.push(escape(i) + '=' + escape(value));
                }

                data = params.join('&').replace(/%20/g, '+');
            }

            xhr.send(data);
        }
// ajax end

        window.addEventListener('load', function () {
            _analy.isLoaded = true;
            CommonSendAjaxMMA(true);
        }, false);

        function CommonSendAjaxMMA(isLoadEvent, options) {
            if (!_analy) return;
            if (!isLoadEvent && options.analy) {
                _analy.count++;
                _analy.lastTime = Date.now();
            }

            if (_analy.isLoaded && _analy.sendCount <= _analy.count) {
                if (_analy.firstTime) {
                    if (typeof MMA != 'undefined') {
                        delete _analy.sendCount;
                        delete _analy.isLoaded;
                        MMA.addInit({
                            ajax: _analy
                        });
                        if (MMA.sendLog) {
                            MMA.sendLog(_allAnaly.data);
                        }
                        _analy = null;
                        _allAnaly.data = null;
                    }
                } else {
                    _analy = null;
                }
            }
        }

        function sendMMA(url, ext, cxp) {
            if (typeof MMA == 'undefined') return;

            MMA.sendEvent(null, {
                api: 1,
                lucky: 1,
                et: 4,
                cu: url,
                cxp: cxp || 'ajax_error',
                ext: ext
            });
        }

        function getRequest(options, storageObj) {
            this.options = options;
            this.storageObj = storageObj;
            this.resp = null;

            if (_analy) {
                if (!_analy.firstTime) _analy.firstTime = Date.now();
                if (options.analy) {
                    _analy.sendCount++;
                }
            }
            _allAnaly.start[options.url + storageObj.cacheKey] = Date.now();

            /*
             如果在陌陌客户端，执行mm.http.request
             如果不在陌陌客户端，执行ajax
             */
            if (options.useCache) {
                /*
                 如果用缓存，获取localstorage中的值
                 并执行ajax，与localstorage的值进行比较，如果不同，重复success操作
                 如果不用缓存，每次进行请求
                 */
                this.getLocalStorage.apply(this, arguments);
            } else {
                this.sendRequest.apply(this, arguments);
            }
        }

        getRequest.prototype = {
            getLocalStorage: function () {
                var _self = this;
                var options = this.options;
                var storageObj = this.storageObj;
                _self.sendRequest(arguments);

                var resp = localStorage.getItem(storageObj.path + storageObj.key);
                if (!resp) return;

                var dt;
                if (_isSupport7_1) {
                    try {
                        var dt = window.atob(resp);
                        dt = escape(dt); // atob后，处理中文
                        dt = decodeURIComponent(dt);
                        options._mock.origin = dt;
                        dt = JSON.parse(dt);
                    } catch (err) {
                        dt = _self.changeCode(resp);
                    }
                } else {
                    dt = _self.changeCode(resp);
                }

                options._mock.originObj = dt;
                options.success.call(options, dt);
                if (_analy) {
                    _analy.cache = true;
                }
            },
            changeCode: function (resp) {
                var dt;
                try {
                    dt = JSON.parse(resp);
                } catch (err) {
                    try {
                        var codeInfo = resp.replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x1F\x7F-\x9F]/g, '');
                        dt = JSON.parse(codeInfo);
                    } catch (err) {
                        dt = resp;
                    }
                }

                this.options._mock.origin = resp;
                return dt;
            },
            sendRequest: function (resp) {
                var _self = this;
                var options = this.options;
                var sendObj = {
                    url: options.url, // 请求的url
                    data: options.data,
                    dataType: 'json',
                    type: 'POST' // 强制使用post
                };

                // 如果是mk webview 使用bridge请求，否则用ajax请求
                if (mm.is_mk) {
                    mm.http.request(sendObj, function (resp) {
                        if (resp) {
                            if (typeof resp == 'object') {
                                if (resp.ec && (resp.ec < 0 || resp.ec == 1)) {
                                    resp.em = '网络好像有点问题';
                                    options.success && options.success.call(options, resp);
                                    // 如果从cache获取到数据，执行finish
                                    if (options._mock.originObj && options.finish) {
                                        options.finish.call(options, options._mock.originObj);
                                    }
                                    sendMMA(options.url, resp);
                                    return;
                                }
                                if (!_setSession && /^\d\d\d401$/.test(resp.ec)) {
                                    _setSession = true;

                                    mm.http.resetSession(function (sess) {
                                        _self.sendRequest();
                                        sess.ec = resp.ec;
                                        sendMMA(options.url, sess, 'ajax_session');
                                    });
                                    return;
                                }
                            } else {
                                sendMMA(options.url, resp, 'ajax_datatype');
                            }
                        }

                        _self.onlineSuc(resp);
                    });
                } else {
                    try {
                        sendObj.success = function (resp) {
                            _self.onlineSuc.call(_self, resp);
                        };
                        sendObj.error = function (resp, textState) {
                            if (resp) {
                                _self.onlineErr({
                                    ready: resp.readyState,
                                    status: resp.status,
                                    text: textState
                                }, resp);
                            }

                            return;
                        };
                        localAjax(sendObj);
                    } catch (err) {
                        console.warn('mock warn: $.ajax error');
                    }
                }
            },
            onlineSuc: function (resp) {
                var _self = this;
                var options = this.options;
                var storageObj = this.storageObj;
                if (options.useCache && !!resp) {
                    var is_obj = typeof resp == 'object';
                    var dataStr = is_obj ? JSON.stringify(resp) : resp;

                    if (_isSupport7_1) {
                        var dataStr = encodeURIComponent(dataStr);
                        dataStr = unescape(dataStr);
                        dataStr = window.btoa(dataStr);
                    }

                    if (!!options._mock.origin && options._mock.origin == dataStr && options.finish) {
                        options.finish.call(options, resp);
                        return false;
                    }

                    if (!is_obj || is_obj && (resp.ec == 200 || resp.ec == 0)) {

                        $.extend(storageObj, {
                            value: dataStr
                        });
                        localStorage.setItem(storageObj.path + storageObj.key, dataStr);
                    }
                }
                options.end = true;
                // 添加请求时间统计
                var now = Date.now();
                var send = {};
                send[now] = {
                    type: 'ajax',
                    data: {
                        net: _allAnaly.net,
                        uri: options.url.replace(/\?.*/, ''),
                        wt: now - _allAnaly.start[options.url + storageObj.cacheKey],
                        origin: location.href.replace(/\?.*/, ''),
                        bid: mm.bid
                    }
                };
                if (_allAnaly.data) {
                    _allAnaly.data[now] = send[now];
                } else {
                    if (MMA.sendLog) {
                        MMA.sendLog(send);
                    }
                }

                if (options._mock.origin) {
                    options.update.call(options, resp);
                } else {
                    options.success.call(options, resp);
                }
                if (options.finish) {
                    options.finish.call(options, resp);
                }
            },
            onlineErr: function (err, resp) {
                var options = this.options;
                if (options.error) options.error.call(options, resp);
                sendMMA(options.url, err);
            }
        };

        var mk = {
            version: '4.0.10',
            ajax: function (opt) {
                var options = $.extend(true, opt);
                var _success = options.success,
                    _update = options.update,
                    _error = options.error,
                    _finish = options.finish,
                    _progress = options.progress,
                    cacheKey = options.cacheKey;

                options._mock = {};

                /*
                 mk.immomo.com：
                 pc 和 非mk：'https://m.immomo.com/mk' + url
                 mk：'https://mk.immomo.com' + url
                 */

                if (opt.host) {
                    if (mm.is_mk) {
                        options.url = opt.host + options.url;
                    } else {
                        if (opt.host.indexOf('mk.immomo.com') > -1) {
                            if (mm.is_webview) {
                                mk.showError(); // 非mk webview不支持加密域名
                                sendMMA(opt.host + options.url, '', 'mk_url_error');
                                return;
                            }
                            options.url = '/mk' + options.url;
                        }
                    }
                } else {
                    if (mm.is_mk && !/^http/.test(options.url)) {
                        options.url = mm.protocol + '//' + mm.host + options.url;
                    }
                }

                if (!cacheKey) {
                    var opt_data = options.url;
                    if (options.data) {
                        opt_data += options.url.indexOf('?') > -1 ? '&' : '?';
                        var data_arr = [];
                        for (var k in options.data) {
                            data_arr.push(k + '=' + options.data[k]);
                        }
                        opt_data += data_arr.join('&');
                    }
                    cacheKey = encodeURI(opt_data);
                }
                var storageObj = {
                    path: options.cachePath || '',
                    key: cacheKey
                };

                // 线上数据返回 callback
                options.success = function (data, status, xhr) {
                    CommonSendAjaxMMA(false, options);
                    _success && _success.apply(options, arguments);
                    _progress && _progress.apply(options, arguments);
                };

                // 数据更新时 callback
                options.update = function (data, status, xhr) {
                    _update && _update.apply(options, arguments);
                    _progress && _progress.apply(options, arguments);
                };

                options.error = function (xhr, errorType, error) {
                    CommonSendAjaxMMA(false, options);
                    _error && _error.apply(options, arguments);
                };

                new getRequest(options, storageObj);
            },
            /*
             错误提示，可以通过修改 mk.showError 来改变
             */
            showError: function (errorText) {
                errorText = errorText || '网络好像有点问题';
                if (typeof mm != 'undefined') {
                    mm.ui.showMessage({
                        status: 2,
                        message: errorText
                    });
                }
            },
            post: function (url, data, success) {
                if (typeof data == 'function') success = data, data = undefined;

                return mk.ajax({
                    url: url,
                    data: data,
                    success: success
                });
            }
        };

        window.mk = mk;

        return mk;

    })));

},{}]},{},[1]);