$(function(){
    webpackJsonp([13],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(301);
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _hammerjs = __webpack_require__(92);
	
	var _hammerjs2 = _interopRequireDefault(_hammerjs);
	
	var _store = __webpack_require__(303);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _banner = __webpack_require__(11);
	
	var _banner2 = _interopRequireDefault(_banner);
	
	var _bannerItem = __webpack_require__(37);
	
	var _bannerItem2 = _interopRequireDefault(_bannerItem);
	
	var _tab = __webpack_require__(95);
	
	var _tab2 = _interopRequireDefault(_tab);
	
	var _tabItem = __webpack_require__(101);
	
	var _tabItem2 = _interopRequireDefault(_tabItem);
	
	var _page = __webpack_require__(141);
	
	var _page2 = _interopRequireDefault(_page);
	
	var _pageItem = __webpack_require__(146);
	
	var _pageItem2 = _interopRequireDefault(_pageItem);
	
	var _discovery = __webpack_require__(323);
	
	var _discovery2 = _interopRequireDefault(_discovery);
	
	var _owner = __webpack_require__(337);
	
	var _owner2 = _interopRequireDefault(_owner);
	
	var _video = __webpack_require__(362);
	
	var _video2 = _interopRequireDefault(_video);
	
	var _searchArea = __webpack_require__(377);
	
	var _searchArea2 = _interopRequireDefault(_searchArea);
	
	var _searchInputNew = __webpack_require__(382);
	
	var _searchInputNew2 = _interopRequireDefault(_searchInputNew);
	
	var _alertOptionAndroid = __webpack_require__(119);
	
	var _alertOptionAndroid2 = _interopRequireDefault(_alertOptionAndroid);
	
	var _alertOptionIos = __webpack_require__(129);
	
	var _alertOptionIos2 = _interopRequireDefault(_alertOptionIos);
	
	var _confirm = __webpack_require__(134);
	
	var _confirm2 = _interopRequireDefault(_confirm);
	
	var _operationPost = __webpack_require__(139);
	
	var _actions = __webpack_require__(327);
	
	var _directive = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var data = __webpack_require__(8);
	
	(0, _directive.registerDirective)();
	var BASE_OFFSET = parseFloat($('body').css('font-size')) / 16 * 55;
	var AlertOption = mm.platform == 'ios' ? _alertOptionIos2.default : _alertOptionAndroid2.default;
	
	new _vue2.default({
	    el: '#root',
	    components: {
	        Banner: _banner2.default,
	        BannerItem: _bannerItem2.default,
	        Tab: _tab2.default,
	        TabItem: _tabItem2.default,
	        Page: _page2.default,
	        PageItem: _pageItem2.default,
	        Discovery: _discovery2.default,
	        Owner: _owner2.default,
	        Video: _video2.default,
	        SearchArea: _searchArea2.default,
	        SearchInput: _searchInputNew2.default,
	        Confirm: _confirm2.default,
	        AlertOption: AlertOption
	    },
	    vuex: {
	        actions: {
	            init: _actions.init,
	            switchTab: _actions.switchTab
	        },
	        getters: {
	            banners: function banners(state) {
	                return state.banners;
	            },
	            activeTab: function activeTab(state) {
	                return state.activeTab;
	            },
	            isShowRedPoint: function isShowRedPoint(state) {
	                return state.isShowRedPoint;
	            },
	            showInputMask: function showInputMask(state) {
	                return state.inputArea.show;
	            },
	            isRenderDiscovery: function isRenderDiscovery(state) {
	                return state.isRenderDiscovery;
	            }
	        }
	    },
	    store: _store2.default,
	    data: function data() {
	        return {
	            pageHeight: 0,
	            showBanner: false,
	            enterTime: new Date().getTime(),
	            exitTime: null,
	            activeData: {
	                show: false,
	                data: {}
	            },
	            containerSize: {
	                width: 0,
	                height: 0
	            },
	            flowConfirm: {
	                show: false,
	                title: '你正在使用移动网络，继续播放将消耗流量',
	                content: '',
	                btns: null,
	                videoIndex: ''
	            },
	            alertOption: {
	                title: mm.platform == 'ios' ? '' : '操作',
	                show: false,
	                list: []
	            },
	            confirm: {
	                show: false,
	                title: '',
	                content: '',
	                btns: null
	            },
	            more: null
	        };
	    },
	    created: function created() {
	        this.init();
	
	        this.setUIGroup();
	    },
	
	    watch: {
	        showInputMask: function showInputMask(val) {
	            this.toggleBanner(!val, true);
	        },
	        activeTab: function activeTab(val) {
	            if (val != 2) {
	                this.pauseAll();
	            }
	        },
	        banners: function banners(val) {
	            var vm = this;
	            if (val && val.length) {
	                var url = val[0].img;
	                $('body').append($('<img>').attr('src', url).hide().on('load', function () {
	                    vm.toggleBanner(true);
	                    $(this).remove();
	                }));
	            }
	        }
	    },
	    ready: function ready() {
	        var _this2 = this;

			console.log(Date.now() +' ready')
	
	        _vue2.default.nextTick(function () {
	            _this2.pageHeight = _this2.computePageHeight(true);
	        });
	
	        setTimeout(function () {
	            var $page = _this2.$refs.page.$el;
	            var mc = new _hammerjs2.default.Manager($page);
	
	            var Swiper = new _hammerjs2.default.Swipe({ direction: _hammerjs2.default.DIRECTION_HORIZONTAL });
	
	            var Pan = new _hammerjs2.default.Pan({ direction: _hammerjs2.default.DIRECTION_VERTICAL, threshold: 50 });
	
	            mc.add(Swiper);
	
	            mc.on('swipeleft', function (e) {
	                e.srcEvent.stopImmediatePropagation();
	
	                var isInSlider = !!Array.prototype.filter.call(document.getElementsByClassName('swiper-container'), function (el) {
	                    return $(el).find(e.target).size();
	                }).length;
	                if (!isInSlider && _this2.activeTab == 1) {
	                    _this2.switchTab(2);
	                }
	                if (!isInSlider && _this2.activeTab == 0) {
	                    _this2.switchTab(1);
	                }
	            });
	
	            mc.on('swiperight', function (e) {
	                e.srcEvent.stopImmediatePropagation();
	
	                var isInSlider = !!Array.prototype.filter.call(document.getElementsByClassName('swiper-container'), function (el) {
	                    return $(el).find(e.target).size();
	                }).length;
	                if (!isInSlider && _this2.activeTab == 1) {
	                    _this2.switchTab(0);
	                }
	                if (!isInSlider && _this2.activeTab == 2) {
	                    _this2.switchTab(1);
	                }
	            });
	
	            _this2.$refs.page.$el.addEventListener('touchend', function (e) {
	                _this2.touchendHideBanner(e);
	                _this2.touchendHideInput(e);
	            });
	            _this2.$refs.page.$el.addEventListener('touchstart', function (e) {
	                var _e$changedTouches$ = e.changedTouches[0],
	                    clientX = _e$changedTouches$.clientX,
	                    clientY = _e$changedTouches$.clientY;
	
	                _this2.touch = {
	                    clientX: clientX,
	                    clientY: clientY
	                };
	            });
	            _this2.pageHeight = _this2.computePageHeight(true);
	        }, 1000);
	        // this.statEnterOften();
	        $('body').removeClass('loading');
	    },
	
	    methods: {
	        selectItem: _operationPost.selectItem,
	        sureOperate: _operationPost.sureOperate,
	        cancelOperate: _operationPost.cancelOperate,
	        postOp: function postOp(more, post) {
	            this.more = more;
	            this.alertOption.show = true;
	            this.alertOption.list = more && more.map(function (item) {
	                return { id: item.type, text: item.text };
	            });
	        },
	        setUIGroup: function setUIGroup() {
	            if (mm.compare('7.4.1') >= 0) {
	                mm.ui.setUIGroup({
	                    btns: [{
	                        icon: 'https://s.momocdn.com/w/u/img/2016/11/28/1480328560218-unread.png',
	                        callback: function callback() {
	                            mm.ui.openGoto({ param: '[跳转到圈子通知|goto_circlenotice|]' });
	                        }
	                    }, {
	                        icon: 'https://s.momocdn.com/w/u/img/2016/11/28/1480328560212-create-circle.png',
	                        callback: function callback() {
	                            mm.ui.openUrl({ target: 1, url: 'https://m.immomo.com/s/circle2/create-index.html?_bid=1090' });
	                        }
	                    }],
	                    type: 1
	                });
	            } else {
	                mm.ui.setUIBtn({
	                    title: '创建'
	                }, function () {
	                    mm.ui.openUrl({ target: 1, url: './create-index.html?_bid=1090' });
	                });
	            }
	        },
	        flowCancelOp: function flowCancelOp() {
	            this.flowConfirm.show = false;
	        },
	        flowSureOperate: function flowSureOperate() {
	            var video = this.$children[2].$children[2].$children[0].$refs.videos[this.flowConfirm.videoIndex].$children[0].$refs.video,
	                alert = new Date();
	            mm.storage.setItem({
	                path: 'circle2',
	                key: 'networkAlert',
	                value: alert.getTime()
	            });
	
	            video.videoPlay(true);
	            this.flowConfirm.show = false;
	        },
	        pauseAll: function pauseAll() {
	            var videos = this.$refs.page.$children[2].$children[0].$refs.videos;
	            if (videos && videos.length) {
	                for (var i = 0; i < videos.length; i++) {
	                    var videoObj = videos[i].$children[0].$refs.video;
	                    videoObj.$els.video.pause();
	                    videoObj.playing = false;
	                    videoObj.loading = false;
	                    videoObj.showPlayBtn = true;
	                }
	            }
	        },
	        hideActive: function hideActive() {
	            this.activeData.show = false;
	        },
	        activeGoto: function activeGoto() {
	            this.activeData.show = false;
	            mm.ui.openUrl({ target: 3, url: this.activeData.data.goto, pass: 0 });
	        },
	        statEnterOften: function statEnterOften() {
	            // data.setDmGet({     position: 'index_page_enter',     time: this.enterTime
	            // }); history.replaceState({ close: 1 }, null, null); history.pushState(null,
	            // null, null); window.addEventListener('popstate', (e) => {     if (e.state &&
	            // e.state.close) {         this.exitTime = new Date().getTime();
	            //
	            //         data.setDmGet({             position: 'index_page_exit', time:
	            // this.exitTime,             often: this.exitTime - this.enterTime  });
	            // setTimeout(function () {             mk.close();         }, 200);     } })
	        },
	        touchendHideBanner: function touchendHideBanner() {
	            var $page = this.$refs.page.$el;
	            var $nowPageItem = $page.children[0].children[this.activeTab];
	            var $banner = this.$refs.banner && this.$refs.banner.$el;
	            var tab = this.$els.tab;
	
	            var bodyScrollTop = document.body.scrollTop;
	            var scrollTop = $nowPageItem.scrollTop;
	            var bannerHeight = parseInt($($banner).height());
	            var tabHeight = $(tab).height();
	
	            if ($banner) {
	                if (scrollTop < bannerHeight) {
	                    this.toggleBanner(true);
	                    this.showBanner = true;
	                }
	
	                if (scrollTop > bannerHeight && bodyScrollTop < bannerHeight) {
	                    this.toggleBanner(false);
	                    this.showBanner = false;
	                }
	            }
	        },
	        touchendHideInput: function touchendHideInput(e) {
	            var _this3 = this;
	
	            var $banner = this.$refs.banner && this.$refs.banner.$el;
	            var $page = this.$refs.page.$el;
	            var $nowPageItem = $page.children[0].children[this.activeTab];
	            var endTouch = e.changedTouches[0];
	            if (Math.abs(this.touch.clientX - endTouch.clientX) > 50 || Math.abs(this.touch.clientY - endTouch.clientY) < 15) {
	                return;
	            }
	            var isUpSwipe = function isUpSwipe() {
	                return _this3.touch.clientY - endTouch.clientY > 0;
	            };
	            var isDownSwipe = function isDownSwipe() {
	                if ($($banner).height() > 0) {
	                    return _this3.touch.clientY - endTouch.clientY < 0 && $($nowPageItem).scrollTop() < $($banner).height();
	                } else {
	                    return _this3.touch.clientY - endTouch.clientY < 0;
	                }
	            };
	            if (isUpSwipe()) {
	                this.toggleInput(false, !!$banner);
	            }
	            if (isDownSwipe()) {
	                this.toggleInput(true, !!$banner);
	            }
	        },
	        computePageHeight: function computePageHeight(isContainInput) {
	            return $(window).height() - $(this.$els.header).height() + $(this.$els.searchArea).height();
	        },
	        toggleBanner: function toggleBanner(show, pageIsTransition) {
	            var header = this.$els.header,
	                banner = this.$refs.banner && this.$refs.banner.$el,
	                page = this.$refs.page.$el,
	                tab = this.$els.tab,
	                searchArea = this.$els.searchArea,
	                bannerHeight = $(banner).height(),
	                tabHeight = $(tab).height();
	
	            if (banner) {
	                if (show) {
	                    if (pageIsTransition) {
	                        $(page).css('opacity', 1);
	                    }
	                    $(header).add(page).css('transform', 'translate3d(0,' + bannerHeight + 'px,0)').css('-webkit-transform', 'translate3d(0,' + bannerHeight + 'px,0)');
	                } else {
	                    if (pageIsTransition) {
	                        $(page).css('opacity', 0);
	                    }
	                    $(header).add(page).css('transform', '').css('-webkit-transform', '');
	                }
	            } else {}
	        },
	        toggleInput: function toggleInput(show) {
	            var isExistBanner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var searchArea = this.$els.searchArea,
	                searchAreaHeight = $(searchArea).height(),
	                banner = this.$refs.banner && this.$refs.banner.$el,
	                bannerHeight = $(banner).height(),
	                tab = this.$els.tab,
	                page = this.$refs.page.$el,
	                _this = this;
	            if (show) {
	                if (isExistBanner) {} else {
	                    this.pageHeight = this.computePageHeight(false);
	                }
	            } else {
	                var y = $(searchArea).height();
	
	                if (this.showBanner) {
	                    return;
	                }
	                if (isExistBanner) {
	                    $(tab).css('z-index', 6);
	                    $(searchArea).css('z-index', 5);
	
	                    _this.pageHeight = _this.computePageHeight(true);
	                } else {
	                    _this.pageHeight = _this.computePageHeight(true);
	                }
	            }
	        }
	    }
	
	});

/***/ },

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined) {
	  'use strict';
	
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');
	
	var TYPE_FUNCTION = 'function';
	
	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;
	
	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}
	
	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}
	
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;
	
	    if (!obj) {
	        return;
	    }
	
	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	
	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	
	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	
	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');
	
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');
	
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;
	
	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;
	
	    if (properties) {
	        assign(childP, properties);
	    }
	}
	
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}
	
	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}
	
	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}
	
	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}
	
	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}
	
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	
	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}
	
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}
	
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;
	
	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }
	
	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }
	
	    return results;
	}
	
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	
	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	
	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}
	
	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}
	
	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}
	
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	
	var COMPUTE_INTERVAL = 25;
	
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;
	
	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };
	
	    this.init();
	
	}
	
	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },
	
	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },
	
	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};
	
	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;
	
	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
	
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	
	    if (isFirst) {
	        manager.session = {};
	    }
	
	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;
	
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	
	    // emit secret event
	    manager.emit('hammer.input', input);
	
	    manager.recognize(input);
	    manager.session.prevInput = input;
	}
	
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	
	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	
	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	
	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	
	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
	
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
	
	    computeIntervalInputData(session, input);
	
	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}
	
	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};
	
	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };
	
	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }
	
	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;
	
	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
	
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	
	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }
	
	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}
	
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }
	
	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	
	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	
	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }
	
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}
	
	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	
	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	
	    return Math.sqrt((x * x) + (y * y));
	}
	
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};
	
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	
	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;
	
	    this.pressed = false; // mousedown state
	
	    Input.apply(this, arguments);
	}
	
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	
	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	
	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }
	
	        // mouse must be down
	        if (!this.pressed) {
	            return;
	        }
	
	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }
	
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});
	
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	
	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};
	
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	
	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	
	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;
	
	    Input.apply(this, arguments);
	
	    this.store = (this.manager.session.pointerEvents = []);
	}
	
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	
	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);
	
	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	
	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }
	
	        // update the event in the store
	        store[storeIndex] = ev;
	
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });
	
	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});
	
	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;
	
	    Input.apply(this, arguments);
	}
	
	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	
	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }
	
	        if (!this.started) {
	            return;
	        }
	
	        var touches = normalizeSingleTouches.call(this, ev, type);
	
	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);
	
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }
	
	    return [all, changed];
	}
	
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};
	
	    Input.apply(this, arguments);
	}
	
	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;
	
	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }
	
	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;
	
	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });
	
	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }
	
	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }
	
	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }
	
	    if (!changedTargetTouches.length) {
	        return;
	    }
	
	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}
	
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	
	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;
	
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	
	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	
	    this.primaryTouch = null;
	    this.lastTouches = [];
	}
	
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	
	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	            return;
	        }
	
	        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	        if (isTouch) {
	            recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	            return;
	        }
	
	        this.callback(manager, inputEvent, inputData);
	    },
	
	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	
	function recordTouches(eventType, eventData) {
	    if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	    }
	}
	
	function setLastTouch(eventData) {
	    var touch = eventData.changedPointers[0];
	
	    if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {x: touch.clientX, y: touch.clientY};
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;
	        var removeLastTouch = function() {
	            var i = lts.indexOf(lastTouch);
	            if (i > -1) {
	                lts.splice(i, 1);
	            }
	        };
	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	}
	
	function isSyntheticEvent(eventData) {
	    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	    for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	            return true;
	        }
	    }
	    return false;
	}
	
	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	
	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();
	
	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}
	
	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }
	
	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },
	
	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },
	
	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },
	
	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;
	
	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }
	
	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
	
	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture
	
	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;
	
	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }
	
	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }
	
	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },
	
	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};
	
	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	
	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }
	
	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }
	
	    return TOUCH_ACTION_AUTO;
	}
	
	function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION) {
	        return false;
	    }
	    var touchMap = {};
	    var cssSupports = window.CSS && window.CSS.supports;
	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {
	
	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    });
	    return touchMap;
	}
	
	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	
	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});
	
	    this.id = uniqueId();
	
	    this.manager = null;
	
	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);
	
	    this.state = STATE_POSSIBLE;
	
	    this.simultaneous = {};
	    this.requireFail = [];
	}
	
	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},
	
	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },
	
	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }
	
	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },
	
	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }
	
	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },
	
	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },
	
	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },
	
	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;
	
	        function emit(event) {
	            self.manager.emit(event, input);
	        }
	
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	
	        emit(self.options.event); // simple 'eventName' events
	
	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }
	
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },
	
	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },
	
	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },
	
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);
	
	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	
	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	
	        this.state = this.process(inputDataClone);
	
	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },
	
	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line
	
	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },
	
	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};
	
	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}
	
	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}
	
	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}
	
	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	
	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },
	
	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },
	
	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	
	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	
	    this.pX = null;
	    this.pY = null;
	}
	
	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },
	
	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },
	
	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;
	
	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	
	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },
	
	    emit: function(input) {
	
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	
	        var direction = directionStr(input.direction);
	
	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    this._timer = null;
	    this._input = null;
	}
	
	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },
	
	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	
	        this._input = input;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }
	
	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	
	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },
	
	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	
	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;
	
	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }
	
	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	
	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	
	        this.manager.emit(this.options.event, input);
	    }
	});
	
	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	
	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}
	
	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },
	
	    process: function(input) {
	        var options = this.options;
	
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	
	        this.reset();
	
	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }
	
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }
	
	            this._input = input;
	
	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },
	
	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}
	
	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';
	
	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,
	
	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,
	
	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,
	
	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,
	
	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,
	
	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],
	
	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',
	
	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',
	
	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',
	
	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',
	
	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',
	
	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};
	
	var STOP = 1;
	var FORCED_STOP = 2;
	
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});
	
	    this.options.inputTarget = this.options.inputTarget || element;
	
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};
	
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	
	    toggleCssProps(this, true);
	
	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}
	
	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },
	
	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },
	
	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }
	
	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);
	
	        var recognizer;
	        var recognizers = this.recognizers;
	
	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;
	
	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	
	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];
	
	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }
	
	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },
	
	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	
	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	
	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }
	
	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }
	
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	
	        this.touchAction.update();
	        return recognizer;
	    },
	
	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }
	
	        recognizer = this.get(recognizer);
	
	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);
	
	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }
	
	        return this;
	    },
	
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	        if (handler === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },
	
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },
	
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }
	
	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }
	
	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };
	
	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },
	
	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);
	
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};
	
	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    var prop;
	    each(manager.options.cssProps, function(value, name) {
	        prop = prefixed(element.style, name);
	        if (add) {
	            manager.oldCssProps[prop] = element.style[prop];
	            element.style[prop] = value;
	        } else {
	            element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	    });
	    if (!add) {
	        manager.oldCssProps = {};
	    }
	}
	
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	
	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,
	
	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,
	
	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,
	
	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,
	
	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,
	
	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,
	
	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	
	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return Hammer;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}
	
	})(window, document, 'Hammer');


/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(142)
	__vue_script__ = __webpack_require__(144)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/page.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(145)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(143);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-40cd865e&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./page.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-40cd865e&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./page.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-40cd865e], a[_v-40cd865e], img[_v-40cd865e] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-40cd865e], a[_v-40cd865e], img[_v-40cd865e] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-40cd865e] {\n  float: right; }\n\n.border-bottom[_v-40cd865e] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-40cd865e] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-40cd865e] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-40cd865e] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-40cd865e] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-40cd865e] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-40cd865e]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-40cd865e]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-40cd865e]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-40cd865e] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-40cd865e] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-40cd865e] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-40cd865e] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-40cd865e] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-40cd865e] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-40cd865e] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-40cd865e] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-40cd865e] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-40cd865e] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-40cd865e] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-40cd865e], .slide-up-leave[_v-40cd865e] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.page-container[_v-40cd865e] {\n  position: relative;\n  width: 100%;\n  z-index: 1;\n  overflow: hidden; }\n\n.page-wrapper[_v-40cd865e] {\n  width: 100%;\n  height: 100%;\n  -webkit-transition: -webkit-transform 0.3s ease;\n  transition: -webkit-transform 0.3s ease;\n  -o-transition: -o-transform 0.3s ease;\n  -moz-transition: transform 0.3s ease, -moz-transform 0.3s ease;\n  transition: transform 0.3s ease;\n  transition: transform 0.3s ease, -webkit-transform 0.3s ease, -moz-transform 0.3s ease, -o-transform 0.3s ease; }\n", ""]);
	
	// exports


/***/ },

/***/ 144:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        show: {
	            default: true
	        },
	        height: {
	            required: true
	        },
	        activeIndex: {
	            default: 0
	        }
	    },
	    data: function data() {
	        return {
	            wrapperStyleObj: {
	                transform: 'translate(0,0)'
	            }
	        };
	    },
	
	    computed: {
	        containerStyleObj: function containerStyleObj() {
	            return {
	                height: this.height + 'px'
	            };
	        }
	    },
	    methods: {
	        init: function init() {
	            var _this = this;
	
	            this.$children.forEach(function (children, index) {
	                var width = parseInt(window.getComputedStyle(_this.$el).width);
	                var x = width * index + 'px';
	                children.$el.style.transform = 'translate(' + x + ',0)';
	                children.$el.style.webkitTransform = 'translate(' + x + ',0)';
	            });
	        },
	        fresh: function fresh() {
	            var width = parseInt(window.getComputedStyle(this.$el).width);
	            var x = -width * this.activeIndex + 'px';
	            this.wrapperStyleObj.transform = 'translate(' + x + ',0)';
	        }
	    },
	    ready: function ready() {
	        this.init();
	        this.fresh();
	    },
	
	    watch: {
	        activeIndex: function activeIndex() {
	            this.fresh();
	        },
	        height: function height() {}
	    }
	};

/***/ },

/***/ 145:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"page-container\" :style=\"containerStyleObj\" _v-40cd865e=\"\">\n    <div class=\"page-wrapper\" :style=\"wrapperStyleObj\" v-el:wrapper=\"\" _v-40cd865e=\"\">\n        <slot _v-40cd865e=\"\"></slot>\n    </div>\n</div>\n";

/***/ },

/***/ 146:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(147)
	__vue_script__ = __webpack_require__(149)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/page-item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(150)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(148);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-94243e82&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./page-item.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-94243e82&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./page-item.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 148:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-94243e82], a[_v-94243e82], img[_v-94243e82] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-94243e82], a[_v-94243e82], img[_v-94243e82] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-94243e82] {\n  float: right; }\n\n.border-bottom[_v-94243e82] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-94243e82] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-94243e82] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-94243e82] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-94243e82] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-94243e82] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-94243e82]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-94243e82]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-94243e82]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-94243e82] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-94243e82] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-94243e82] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-94243e82] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-94243e82] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-94243e82] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-94243e82] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-94243e82] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-94243e82] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-94243e82] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-94243e82] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-94243e82], .slide-up-leave[_v-94243e82] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.page-slider[_v-94243e82] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n", ""]);
	
	// exports


/***/ },

/***/ 149:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        show: {
	            default: true
	        }
	    },
	    created: function created() {},
	    methods: {}
	};

/***/ },

/***/ 150:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"page-slider\" :style=\"\" _v-94243e82=\"\">\n    <slot _v-94243e82=\"\"></slot>\n</div>\n";

/***/ },

/***/ 301:
167,

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof2 = __webpack_require__(304);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(170);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vuex2.default);
	
	var state = {
	    token: 0,
	    error: '',
	    activeTab: 0,
	    firstDisplays: {
	        discover: false,
	        video: false
	    },
	    isShowRedPoint: {
	        // myCircle: false,
	        discover: false,
	        versionDiscover: null
	    },
	    showGuide: false,
	    banners: null,
	    isRenderDiscovery: false,
	    myCircles: {
	        list: [],
	        page: {
	            title: '',
	            p: 1,
	            totalPage: 1000,
	            loading: false
	        },
	        info: {
	            title: '',
	            totalConst: 0
	        }
	    },
	    myPost: null,
	    discover: {
	        hot_quanzi: {
	            stamp: ''
	        },
	        interest_quanzi: {
	            stamp: ''
	        },
	        quanzi_rank: {
	            stamp: ''
	        },
	        today_hot_posts: {
	            stamp: ''
	        },
	        type_list: {
	            stamp: ''
	        }
	    },
	    hotPosts: {
	        list: [],
	        page: {
	            p: 1,
	            totalPage: 1000,
	            loading: false
	        }
	    },
	    newsPosts: {
	        list: [],
	        page: {
	            p: 1,
	            totalPage: 1000,
	            loading: false
	        }
	    },
	    videoPosts: {
	        list: [],
	        page: {
	            p: 1,
	            totalPage: 1000,
	            loading: false
	        },
	        videoPostTip: {
	            firstPid: '',
	            num: 0,
	            tip: true
	        }
	    },
	    inputArea: {
	        searchText: '',
	        placeholder: '',
	        circles: [],
	        type: 0,
	        isAbleCreate: true,
	        hotKeywords: null,
	        isLoadingSearch: false,
	        hotTypes: null,
	        show: false,
	        page: {
	            page: 1,
	            totalPage: 1000,
	            loading: false
	        }
	    }
	};
	
	var mutations = {
	    /**
	     * 刷新banner状态
	     * @param  {} state
	     * @param  {} banners
	     */
	    FETCH_BANNER: function FETCH_BANNER(state, banners) {
	        state.banners = banners;
	    },
	
	    /**
	     * 刷新我的圈子列表
	     * @param  {} state
	     * @param  {} list
	     */
	    FETCH_MY_CIRCLR_LIST: function FETCH_MY_CIRCLR_LIST(state, list) {
	        state.myCircles.list = list;
	    },
	
	
	    /** 刷新我的圈子页码
	     * @param  {} state
	     * @param  {} pageInfo
	     */
	    FETCH_MY_CIRCLR_PAGE: function FETCH_MY_CIRCLR_PAGE(state, page) {
	        state.myCircles.page = page;
	    },
	    FETCH_MY_CIRCLE_INFO: function FETCH_MY_CIRCLE_INFO(state, info) {
	        state.myCircles.info = info;
	    },
	
	    /**
	     * 刷新我的帖子
	     * @param  {} state
	     * @param  {} pageInfo
	     */
	    FETCH_MY_POSTS: function FETCH_MY_POSTS(state, pageInfo) {
	        state.myPost = pageInfo;
	    },
	
	    /**
	     * 刷新发现
	     * @param  {} state
	     * @param  {} discoverInfo
	     */
	    FETCH_DISCOVER: function FETCH_DISCOVER(state, discoverInfo) {
	        for (var key in discoverInfo) {
	            var o = discoverInfo[key];
	            if ((typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) == 'object') {
	                discoverInfo[key].stamp = Math.random();
	            }
	        }
	        state.discover = discoverInfo;
	    },
	
	    /**
	     * 刷新热帖
	     * @param  {} state
	     * @param  {} posts
	     */
	    FETCH_HOT_POSTS: function FETCH_HOT_POSTS(state, posts) {
	        state.hotPosts.list = posts;
	    },
	
	    /**
	     * 设置热帖页码
	     * @param  {} state
	     * @param  {} page
	     * @param  {} totalPage
	     */
	    SET_HOT_POSTS_PAGE: function SET_HOT_POSTS_PAGE(state, page, totalPage) {
	        state.hotPosts.page.p = page;
	        if (totalPage) {
	            state.hotPosts.page.totalPage = totalPage;
	        }
	    },
	    HOT_POSTS_NEXT_PROGRESS: function HOT_POSTS_NEXT_PROGRESS(state) {
	        state.hotPosts.page.loading = true;
	    },
	    HOT_POSTS_NEXT_COMPLETED: function HOT_POSTS_NEXT_COMPLETED(state) {
	        state.hotPosts.page.loading = false;
	    },
	    ADD_HOT_POSTS: function ADD_HOT_POSTS(state, list) {
	        state.hotPosts.list = state.hotPosts.list.concat(list);
	    },
	
	    /**
	     * 切换标签
	     * @param  {} state
	     * @param  {} activeTab
	     */
	    SWITCH_TAB: function SWITCH_TAB(state, activeTab) {
	        state.activeTab = activeTab;
	    },
	
	
	    /**
	     * 刷新热门关键字
	     * @param  {} state
	     * @param  {} hotKeywords
	     */
	    FETCH_HOT_KEYWORDS: function FETCH_HOT_KEYWORDS(state, hotKeywords) {
	        state.inputArea.hotKeywords = hotKeywords;
	        state.inputArea.placeholder = '\u5927\u5BB6\u90FD\u5728\u641C\uFF1A' + hotKeywords[0];
	    },
	
	    /**
	     * 刷新热门分类
	     * @param  {} state
	     * @param  {} hotTypes
	     */
	    FETCH_HOT_TYPES: function FETCH_HOT_TYPES(state, hotTypes) {
	        state.inputArea.hotTypes = hotTypes;
	    },
	
	
	    /**
	     * 刷新token
	     * @param  {} state
	     * @param  {} token
	     */
	    FETCH_TOKEN: function FETCH_TOKEN(state, token) {
	        state.token = token;
	    },
	
	
	    /**
	     * 关闭搜索框
	     * @param  {} state
	     */
	    CLOSE_SEARCH_INPUT: function CLOSE_SEARCH_INPUT(state) {
	        state.inputArea.show = false;
	    },
	    SHOW_SEARCH_INPUT: function SHOW_SEARCH_INPUT() {
	        state.inputArea.show = true;
	    },
	
	    /**
	     * 设置搜索文本
	     * @param  {} state
	     * @param  {} text
	     */
	    SET_SEARCH_TEXT: function SET_SEARCH_TEXT(state, text, type) {
	        state.inputArea.searchText = text;
	        state.inputArea.type = type;
	    },
	
	
	    /**
	     * 重置搜索分页
	     * @param  {} state
	     */
	    RESET_SEARCH_PAGE: function RESET_SEARCH_PAGE(state) {
	        state.inputArea.page = {
	            p: 1,
	            totalPage: 1000
	        };
	        state.inputArea.type = 0;
	        state.inputArea.isAbleCreate = true;
	        state.inputArea.circles = [];
	    },
	
	
	    /** 设置搜索页码
	     * @param  {} state
	     * @param  {} page
	     * @param  {} totalPage
	     */
	    SET_SEARCH_PAGE: function SET_SEARCH_PAGE(state, page, totalPage) {
	        state.inputArea.page = page;
	        if (totalPage) {
	            state.inputArea.totalPage = totalPage;
	        }
	    },
	
	
	    /**
	     * 禁用搜索创建
	     * @param  {} state
	     */
	    DISABLED_CREATE: function DISABLED_CREATE(state) {
	        state.inputArea.isAbleCreate = false;
	    },
	
	
	    /**
	     * 刷新搜索的圈子
	     * @param  {} state
	     * @param  {} circles
	     */
	    FETCH_SEARCH_CIRCLES: function FETCH_SEARCH_CIRCLES(state, circles) {
	        state.inputArea.circles = circles;
	    },
	
	    /**
	     * 搜索圈子进行中
	     * @param  {} state
	     */
	    SEARCH_CIRCLE_PROGRESS: function SEARCH_CIRCLE_PROGRESS(state) {
	        state.inputArea.isLoadingSearch = true;
	    },
	
	    /**
	     * 搜索圈子完成
	     * @param  {} state
	     */
	    SEARCH_CIRCLE_COMPLETED: function SEARCH_CIRCLE_COMPLETED(state) {
	        state.inputArea.isLoadingSearch = false;
	    },
	
	
	    /**
	     * 搜索加载下一页中
	     */
	    SEARCH_CIRCLE_NEXT_PROGRESS: function SEARCH_CIRCLE_NEXT_PROGRESS(state) {
	        state.inputArea.page.loading = true;
	    },
	
	    /**
	     * 搜索加载下一页完成
	     */
	    SEARCH_CIRCLE_NEXT_COMPLETED: function SEARCH_CIRCLE_NEXT_COMPLETED(state) {
	        state.inputArea.page.loading = false;
	    },
	
	    /**
	     * 加入圈子列表中
	     */
	    ADD_SEARCH_CIRCLES: function ADD_SEARCH_CIRCLES(state, circles) {
	        state.inputArea.circles = state.inputArea.circles.concat(circles);
	    },
	
	    /**
	     * 设置搜索圈子页码
	     */
	    SET_SEARCH_CIRCLES_PAGE: function SET_SEARCH_CIRCLES_PAGE(state, page, totalPage) {
	        state.inputArea.page.p = page;
	        if (totalPage) {
	            state.inputArea.page.totalPage = totalPage;
	        }
	    },
	
	    /**
	     * 重置热帖页码
	     * @param  {} state
	     */
	    RESET_HOT_POSTS_PAGE: function RESET_HOT_POSTS_PAGE(state) {
	        state.hotPosts.page = {
	            p: 1,
	            totalPage: 1000
	        };
	    },
	
	    /**
	     * 刷新最新帖子
	     * @param  {} state
	     * @param  {} list
	     */
	    FETCH_NEWS_POSTS: function FETCH_NEWS_POSTS(state, list) {
	        state.newsPosts.list = list;
	    },
	
	    /**
	     * 设置最新帖子页码
	     * @param  {} state
	     * @param  {} page
	     * @param  {} totalPage
	     */
	    SET_NEWS_POSTS_PAGE: function SET_NEWS_POSTS_PAGE(state, page, totalPage) {
	        state.newsPosts.page = {
	            p: page,
	            totalPage: totalPage
	        };
	    },
	
	    /**
	     * 重置最新帖子页码
	     * @param  {} state
	     */
	    RESET_NEWS_POSTS: function RESET_NEWS_POSTS(state) {
	        state.newsPosts.page = {
	            p: 1,
	            totalPage: 1000
	        };
	        // state.newsPosts.list = [];
	    },
	
	    /**
	     * 刷新最新帖子
	     * @param  {} state
	     * @param  {} list
	     */
	    FETCH_VIDEO_POSTS: function FETCH_VIDEO_POSTS(state, list) {
	        state.videoPosts.list = list;
	    },
	
	    /**
	     * 设置最新帖子页码
	     * @param  {} state
	     * @param  {} page
	     * @param  {} totalPage
	     */
	    SET_VIDEO_POSTS_PAGE: function SET_VIDEO_POSTS_PAGE(state, page, totalPage) {
	        state.videoPosts.page = {
	            p: page,
	            totalPage: totalPage
	        };
	    },
	
	    /**
	     * 重置最新帖子页码
	     * @param  {} state
	     */
	    RESET_VIDEO_POSTS: function RESET_VIDEO_POSTS(state) {
	        state.videoPosts.page = {
	            p: 1,
	            totalPage: 1000
	        };
	        // state.newsPosts.list = [];
	    },
	    SET_VIDEO_POSTS_TIP: function SET_VIDEO_POSTS_TIP(state, pid) {
	        state.videoPosts.videoPostTip = pid;
	        // state.newsPosts.list = [];
	    },
	    ADD_VIDEO_POSTS: function ADD_VIDEO_POSTS(state, list) {
	        state.videoPosts.list = state.videoPosts.list.concat(list);
	    },
	    SET_VIDEO_POSTS_TOGGLE: function SET_VIDEO_POSTS_TOGGLE(state, list) {
	        state.videoPosts.list = list;
	    },
	    VIDEO_POSTS_NEXT_PROGRESS: function VIDEO_POSTS_NEXT_PROGRESS(state) {
	        state.videoPosts.page.loading = true;
	    },
	    VIDEO_POSTS_NEXT_COMPLETED: function VIDEO_POSTS_NEXT_COMPLETED(state) {
	        state.videoPosts.page.loading = false;
	    },
	    NEWS_POSTS_NEXT_PROGRESS: function NEWS_POSTS_NEXT_PROGRESS(state) {
	        state.newsPosts.page.loading = true;
	    },
	    NEWS_POSTS_NEXT_COMPLETED: function NEWS_POSTS_NEXT_COMPLETED(state) {
	        state.newsPosts.page.loading = false;
	    },
	    ADD_NEWS_POSTS: function ADD_NEWS_POSTS(state, list) {
	        state.newsPosts.list = state.newsPosts.list.concat(list);
	    },
	    SET_NEWS_POSTS_TOGGLE: function SET_NEWS_POSTS_TOGGLE(state, list) {
	        state.newsPosts.list = list;
	    },
	    SET_HOT_POSTS_TOGGLE: function SET_HOT_POSTS_TOGGLE(state, list) {
	        state.hotPosts.list = list;
	    },
	
	    // SET_NEWS_DOM_FINISHED(state,val){
	    //     state.newsPosts.domFinished = val;
	    // },
	    // SET_HOT_DOM_FINISHED(state,val){
	    //     state.hotPosts.domFinished = val;
	    // },
	    /**
	     * 加入圈子
	     * @param  {} state
	     * @param  {} qid
	     */
	    JOIN_CIRCLE: function JOIN_CIRCLE(state, qid) {
	        var joinedCircle = state.inputArea.circles.filter(function (circle) {
	            return circle.qid == qid;
	        })[0];
	
	        joinedCircle.is_member = true;
	        state.myCircles.list.push(joinedCircle);
	    },
	    SET_BLUE_POINT: function SET_BLUE_POINT(state, qid, count) {
	        state.myCircles.list.forEach(function (circle, index) {
	            if (circle.qid == qid) {
	                circle.post_count = count;
	                state.myCircles.list.$set(index, circle);
	            }
	        });
	    },
	
	    // // 我的红点
	    // SHOW_RED_POINT_MYCIRCLE(state){
	    //     state.isShowRedPoint.myCircle = true;
	    // },
	    // HIDE_RED_POINT_MYCIRCLE(state){
	    //     state.isShowRedPoint.myCircle = false;
	    // },
	    // 发现红点
	    SET_RED_VERSION_DSC: function SET_RED_VERSION_DSC(state, val) {
	        state.isShowRedPoint.versionDiscover = val;
	    },
	    SHOW_RED_POINT: function SHOW_RED_POINT(state) {
	        state.isShowRedPoint.discover = true;
	    },
	    HIDE_RED_POINT: function HIDE_RED_POINT(state) {
	        state.isShowRedPoint.discover = false;
	    },
	    SHOW_GUIDE: function SHOW_GUIDE(state) {
	        state.showGuide = true;
	    },
	    RENDER_DISCOVERY: function RENDER_DISCOVERY(state) {
	        state.isRenderDiscovery = true;
	    },
	    PAGE_ERROR: function PAGE_ERROR(state, errMsg) {
	        state.error = errMsg;
	    },
	
	    // SET_NEWS_ALLOW_RENDER(state) {
	    //     state.newsPosts.allowRender = true;
	    // },
	    // SET_DISCOVERY_ALLOW_RENDER(state) {
	    //     state.hotPosts.allowRender = true;
	    // },
	
	    // 展示
	    SET_DISPLAY_VIEO: function SET_DISPLAY_VIEO(state) {
	        state.firstDisplays.video = true;
	    },
	    SET_DISPLAY_DISCOVER: function SET_DISPLAY_DISCOVER(state) {
	        state.firstDisplays.discover = true;
	    }
	};
	
	exports.default = new _vuex2.default.Store({
	    state: state,
	    mutations: mutations
	});

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(324)
	__vue_script__ = __webpack_require__(326)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/pages/index/components/discovery.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(336)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(325);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0590cb26&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./discovery.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0590cb26&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./discovery.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-0590cb26], a[_v-0590cb26], img[_v-0590cb26] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-0590cb26], a[_v-0590cb26], img[_v-0590cb26] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-0590cb26] {\n  float: right; }\n\n.border-bottom[_v-0590cb26] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-0590cb26] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-0590cb26] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-0590cb26] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-0590cb26] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-0590cb26] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-0590cb26]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-0590cb26]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-0590cb26]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-0590cb26] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-0590cb26] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-0590cb26] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-0590cb26] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-0590cb26] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-0590cb26] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-0590cb26] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-0590cb26] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-0590cb26] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-0590cb26] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-0590cb26] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-0590cb26], .slide-up-leave[_v-0590cb26] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.category-view-4 > a[_v-0590cb26] {\n  padding-top: 100%; }\n\n.category-view-4 span[_v-0590cb26] {\n  font-size: 0.8125rem; }\n\n.category-view-4 img[_v-0590cb26] {\n  -webkit-filter: brightness(0.7); }\n\n.category-view-2 > a[_v-0590cb26] {\n  padding-top: 44.57%; }\n\n.loading-tip .icon-loading[_v-0590cb26] {\n  width: 1.5625rem;\n  height: 1.5625rem;\n  -moz-transform-origin: center;\n   -ms-transform-origin: center;\n    -o-transform-origin: center;\n       transform-origin: center;\n  -webkit-transform-origin: center; }\n", ""]);
	
	// exports


/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _icon = __webpack_require__(69);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _listGroup = __webpack_require__(44);
	
	var _listGroup2 = _interopRequireDefault(_listGroup);
	
	var _listGroupItem = __webpack_require__(49);
	
	var _listGroupItem2 = _interopRequireDefault(_listGroupItem);
	
	var _horizontalSlider = __webpack_require__(151);
	
	var _horizontalSlider2 = _interopRequireDefault(_horizontalSlider);
	
	var _horizontalSliderCell = __webpack_require__(156);
	
	var _horizontalSliderCell2 = _interopRequireDefault(_horizontalSliderCell);
	
	var _post = __webpack_require__(106);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _refresh = __webpack_require__(166);
	
	var _refresh2 = _interopRequireDefault(_refresh);
	
	var _store = __webpack_require__(303);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _actions = __webpack_require__(327);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BASE_OFFSET = parseFloat($('body').css('font-size')) / 16;
	
	exports.default = {
	    props: {
	        show: {
	            default: true
	        },
	        postOp: {}
	    },
	    components: {
	        Icon: _icon2.default, ListGroup: _listGroup2.default, ListGroupItem: _listGroupItem2.default, Post: _post2.default, Slider: _horizontalSlider2.default, SliderCell: _horizontalSliderCell2.default
	    },
	    data: function data() {
	        return {
	            isLoadedALL: false,
	            cardSize: 3
	        };
	    },
	
	    vuex: {
	        actions: {
	            refreshDiscovery: _actions.refreshDiscovery, hotPostsNextPage: _actions.hotPostsNextPage
	        },
	        getters: {
	            firstDisplay: function firstDisplay(state) {
	                return state.firstDisplays.discover;
	            },
	            type_list: function type_list(state) {
	                return state.discover.type_list;
	            },
	            interest_quanzi: function interest_quanzi(state) {
	                return state.discover.interest_quanzi;
	            },
	            hot_quanzi: function hot_quanzi(state) {
	                return state.discover.hot_quanzi;
	            },
	            quanzi_rank: function quanzi_rank(state) {
	                return state.discover.quanzi_rank;
	            },
	            hotPosts: function hotPosts(state) {
	                return state.hotPosts.list;
	            },
	            page: function page(state) {
	                return state.hotPosts.page;
	            }
	        }
	    },
	    computed: {
	        isLoadedALL: function isLoadedALL() {
	            return this.page.p == this.page.totalPage;
	        },
	        cardSize: function cardSize() {
	            var base = parseFloat($('body').css('font-size')) / 16;
	            return ($(window).width() - 11 * base) / 88 / base;
	        }
	    },
	    ready: function ready() {
	        var _this = this;
	
	        _vue2.default.nextTick(function () {
	            _this.mRefresh = new _refresh2.default({
	                wrapper: $('.discovery-wrapper'),
	                position: $('.discovery-wrapper'),
	                triggerScrollTop: $('.discovery-wrapper').parent().parent(),
	                callback: function callback() {
	                    _this.refresh();
	                }
	            });
	        });
	        var $wrapper = $(this.$el).parent();
	        $wrapper.on('scroll', this.scrollLoadData);
	    },
	    methods: {
	        refresh: function refresh() {
	            this.refreshDiscovery(this.mRefresh.end);
	        },
	        scrollLoadData: function scrollLoadData() {
	            var _this2 = this;
	
	            var $wrapper = $(this.$el).parent();
	
	            var docHeight = $wrapper.children().height();
	            var scrollTop = $wrapper.scrollTop();
	            var windowHeight = $wrapper.height();
	            if ($(this.$el).height() < windowHeight + scrollTop + BASE_OFFSET * 45) {
	                $wrapper.off('scroll', this.scrollLoadData);
	                this.hotPostsNextPage(function () {
	                    if (_this2.page.p != _this2.page.totalPage) {
	                        $wrapper.on('scroll', _this2.scrollLoadData);
	                    }
	                });
	            }
	        }
	    }
	};

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(110);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _promise = __webpack_require__(173);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getIterator2 = __webpack_require__(328);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _regenerator = __webpack_require__(331);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(335);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	exports.init = init;
	exports.fetchBanner = fetchBanner;
	exports.fetchMyCircle = fetchMyCircle;
	exports.fetchDiscover = fetchDiscover;
	exports.fetchHotPosts = fetchHotPosts;
	exports.fetchNewsPosts = fetchNewsPosts;
	exports.refreshOwner = refreshOwner;
	exports.resetNewsPostsPage = resetNewsPostsPage;
	exports.newsPostsNextPage = newsPostsNextPage;
	exports.fetchVideoPosts = fetchVideoPosts;
	exports.setTipTrue = setTipTrue;
	exports.refreshVideo = refreshVideo;
	exports.resetVideoPostsPage = resetVideoPostsPage;
	exports.videoPostsNextPage = videoPostsNextPage;
	exports.refreshDiscovery = refreshDiscovery;
	exports.resetHotPostsPage = resetHotPostsPage;
	exports.hotPostsNextPage = hotPostsNextPage;
	exports.fetchHotKeywords = fetchHotKeywords;
	exports.switchTab = switchTab;
	exports.searchCircle = searchCircle;
	exports.searchCircleNextPage = searchCircleNextPage;
	exports.setSearchText = setSearchText;
	exports.closeSearch = closeSearch;
	exports.openSearch = openSearch;
	exports.joinCircle = joinCircle;
	exports.updateBluePoint = updateBluePoint;
	exports.isShowGuide = isShowGuide;
	exports.hitDot = hitDot;
	
	var _vuex = __webpack_require__(170);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _common = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var data = __webpack_require__(8);
	
	var noop = function noop() {};
	
	function init(store) {
	    var init = function () {
	        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	            return _regenerator2.default.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            try {
	                                fetchMyCircle(store);
	                                isShowGuide(store);
	                            } catch (e) {
	                                console.warn('获取首帧错误');
	                            }
	
	                        case 1:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	
	        return function init() {
	            return _ref.apply(this, arguments);
	        };
	    }();
	
	    var dispatch = store.dispatch,
	        state = store.state;
	
	    init().then(function () {
	        try {
	            fetchBanner(store);
	            fetchNewsPosts(store);
	        } catch (e) {
	            console.warn('获取我的列表错误');
	        }
	    }).then(function () {
	        try {
	            fetchDiscover(store);
	            fetchHotKeywords(store);
	        } catch (e) {
	            console.warn('获取发现卡片错误');
	        }
	    }).then(function () {
	        try {
	            fetchHotPosts(store);
	        } catch (e) {
	            console.warn('获取发现列表错误');
	        }
	    }).then(function () {
	        try {
	            fetchVideoPosts(store);
	        } catch (e) {
	            console.warn('获取视频列表错误');
	        }
	    });
	
	    var query = _common.util.getUrlQuery();
	    var source = query.source || 'unkonwn';
	    data.setDmGet({
	        position: 'index_page_display',
	        source_type: source
	    });
	}
	
	function fetchBanner(_ref2) {
	    var dispatch = _ref2.dispatch,
	        state = _ref2.state;
	
	    data.getBanners(function (_ref3) {
	        var ec = _ref3.ec,
	            em = _ref3.em,
	            banners = _ref3.banners;
	
	        if (ec == 200) {
	            dispatch('FETCH_BANNER', banners);
	        } else {
	            mk.showTip(em);
	        }
	    });
	}
	
	function fetchMyCircle(store) {
	    var isCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
	    var dispatch = store.dispatch,
	        state = store.state;
	
	    data.getMyCircle(isCache, function (_ref4) {
	        var ec = _ref4.ec,
	            em = _ref4.em,
	            data = _ref4.data,
	            state = _ref4.state;
	
	        if (ec == 200) {
	            var list = data.my_quanzi.list;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = (0, _getIterator3.default)(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;
	
	                    item._post_count = item.post_count;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            dispatch('FETCH_MY_POSTS', data.my_post);
	            dispatch('FETCH_MY_CIRCLR_LIST', list);
	            dispatch('FETCH_MY_CIRCLR_PAGE', {
	                total_page: data.my_quanzi.total_page,
	                page: data.my_quanzi.p
	            });
	            dispatch('FETCH_MY_CIRCLE_INFO', {
	                title: data.my_quanzi.title_v2,
	                totalConst: data.my_quanzi.quanzi_cnt
	            });
	
	            updateBluePoint(store);
	
	            if (list.length == 0) {
	                mm.storage.getItem({
	                    path: 'circle2', // 区分类别，如果不为空，查找的key名为 path+key
	                    key: 'goToDiscover' // 查找的key
	                }, function (gone) {
	                    if (!gone) {
	                        setTimeout(function () {
	                            switchTab(store, 1);
	                            mm.storage.setItem({
	                                path: 'circle2',
	                                key: 'goToDiscover',
	                                value: 'true'
	                            });
	                        }, 2000);
	                    }
	                });
	            }
	        } else {
	            mk.showTip(em);
	        }
	        callback();
	    });
	}
	
	function fetchDiscover(_ref5) {
	    var dispatch = _ref5.dispatch,
	        state = _ref5.state;
	    var isCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
	
	    data.getDiscover(isCache, function (_ref6) {
	        var ec = _ref6.ec,
	            em = _ref6.em,
	            data = _ref6.data,
	            state = _ref6.state;
	
	        if (ec == 200) {
	            dispatch('FETCH_DISCOVER', data);
	            mm.storage.getItem({
	                path: 'circle2',
	                key: 'red_point_version'
	            }, function (red_point_version) {
	                var lastVersion = red_point_version;
	                var nowVersion = state.version;
	                if (nowVersion > lastVersion && state.red_point == 1) {
	                    dispatch('SET_RED_VERSION_DSC', nowVersion);
	                    dispatch('SHOW_RED_POINT');
	                } else {
	                    dispatch('HIDE_RED_POINT');
	                }
	            });
	        } else {
	            mk.showTip(em);
	        }
	        callback();
	    });
	}
	
	function fetchHotPosts(_ref7) {
	    var dispatch = _ref7.dispatch,
	        state = _ref7.state;
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    data.getDailyHotPost(state.hotPosts.page.p, function (_ref8) {
	        var ec = _ref8.ec,
	            em = _ref8.em,
	            data = _ref8.data;
	
	        if (ec == 200) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = (0, _getIterator3.default)(data.today_hot_posts), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var v = _step2.value;
	
	                    v.postToggle = true;
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            dispatch('FETCH_HOT_POSTS', data.today_hot_posts);
	            dispatch('SET_HOT_POSTS_PAGE', data.p, data.total_page);
	        } else {
	            mk.showTip(em);
	        }
	        callback();
	    });
	}
	
	function fetchNewsPosts(store) {
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	    var dispatch = store.dispatch,
	        state = store.state;
	
	    resetNewsPostsPage(store);
	    data.getNewsPosts(state.hotPosts.page.p, function (_ref9) {
	        var ec = _ref9.ec,
	            em = _ref9.em,
	            data = _ref9.data;
	
	        if (ec == 200) {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = (0, _getIterator3.default)(data.post_list), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var v = _step3.value;
	
	                    v.postToggle = true;
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            dispatch('FETCH_NEWS_POSTS', data.post_list);
	            dispatch('SET_NEWS_POSTS_PAGE', data.p, data.total_page);
	            dispatch('RENDER_DISCOVERY');
	        } else {
	            mk.showTip(em);
	        }
	        callback();
	    });
	}
	function refreshOwner(store) {
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    resetNewsPostsPage(store);
	    _promise2.default.all([new _promise2.default(function (resolve) {
	        fetchMyCircle(store, false, resolve);
	    }), new _promise2.default(function (resolve) {
	        fetchNewsPosts(store, resolve);
	    })]).then(callback);
	}
	function resetNewsPostsPage(_ref10) {
	    var dispatch = _ref10.dispatch,
	        state = _ref10.state;
	
	    dispatch('RESET_NEWS_POSTS', 1, 1000);
	}
	
	function newsPostsNextPage(_ref11) {
	    var dispatch = _ref11.dispatch,
	        state = _ref11.state;
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    // dispatch('SET_DOM_FINISHED',false)
	    var nowPage = +state.newsPosts.page.p;
	    dispatch('NEWS_POSTS_NEXT_PROGRESS');
	    data.getNewsPosts(nowPage + 1, function (_ref12) {
	        var ec = _ref12.ec,
	            em = _ref12.em,
	            data = _ref12.data;
	
	        dispatch('NEWS_POSTS_NEXT_COMPLETED');
	        if (ec == 200) {
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = (0, _getIterator3.default)(data.post_list), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var v = _step4.value;
	
	                    v.postToggle = true;
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	
	            dispatch('ADD_NEWS_POSTS', data.post_list);
	            if (data.post_list.length) {
	                dispatch('SET_NEWS_POSTS_PAGE', nowPage + 1, data.total_page);
	            } else {
	                dispatch('SET_NEWS_POSTS_PAGE', nowPage, nowPage);
	            }
	        } else {
	            mk.showTip(em);
	        }
	        callback();
	    }, function () {
	        dispatch('NEWS_POSTS_NEXT_COMPLETED');
	    });
	}
	
	function fetchVideoPosts(store) {
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	    var dispatch = store.dispatch,
	        state = store.state;
	
	    resetVideoPostsPage(store);
	    data.getVideoPost({ p: 1, page_rows: 10 }, true, function (info) {
	        dispatch('VIDEO_POSTS_NEXT_COMPLETED');
	        if (info.ec == 200) {
	            (function () {
	                var flag = false;
	                dispatch('FETCH_VIDEO_POSTS', info.data.list);
	                dispatch('SET_VIDEO_POSTS_PAGE', parseInt(info.data.p), info.data.total_page);
	                dispatch('RENDER_DISCOVERY');
	                // video推荐视频
	                mm.storage.getItem({
	                    path: 'circle2',
	                    key: 'firstVideoPid'
	                }, function (firstVideoPid) {
	                    console.log(firstVideoPid, 'local');
	                    for (var i = 0; i < info.data.list.length; i++) {
	                        if (info.data.list[i].pid == firstVideoPid) {
	                            mm.storage.setItem({
	                                path: 'circle2',
	                                key: 'firstVideoPid',
	                                value: info.data.list[0].pid
	                            });
	                            dispatch('SET_VIDEO_POSTS_TIP', { firstPid: info.data.list[0].pid, num: i, tip: true });
	                            flag = true;
	                        }
	                        mm.storage.setItem({
	                            path: 'circle2',
	                            key: 'firstVideoPid',
	                            value: info.data.list[0].pid
	                        });
	                    }
	                    if (!flag) {
	                        mm.storage.setItem({
	                            path: 'circle2',
	                            key: 'firstVideoPid',
	                            value: info.data.list[0].pid
	                        });
	                        dispatch('SET_VIDEO_POSTS_TIP', { firstPid: info.data.list[0].pid, num: '10+', tip: true });
	                    }
	                });
	            })();
	        } else {
	            mk.showTip(info.em);
	        }
	        callback();
	    }, function () {
	        dispatch('NEWS_POSTS_NEXT_COMPLETED');
	    });
	}
	function setTipTrue(_ref13) {
	    var dispatch = _ref13.dispatch,
	        state = _ref13.state;
	
	    dispatch('SET_VIDEO_POSTS_TIP', {
	        firstPid: state.videoPosts.videoPostTip.firstPid,
	        num: state.videoPosts.videoPostTip.num,
	        tip: false
	    });
	}
	function refreshVideo(store) {
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    resetVideoPostsPage(store);
	    _promise2.default.all([new _promise2.default(function (resolve) {
	        fetchVideoPosts(store, resolve);
	    })]).then(callback);
	}
	function resetVideoPostsPage(_ref14) {
	    var dispatch = _ref14.dispatch,
	        state = _ref14.state;
	
	    dispatch('RESET_VIDEO_POSTS', 1, 1000);
	}
	function videoPostsNextPage(_ref15) {
	    var dispatch = _ref15.dispatch,
	        state = _ref15.state;
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    var nowPage = state.videoPosts.page.p;
	    dispatch('VIDEO_POSTS_NEXT_PROGRESS');
	    data.getVideoPost({ p: nowPage + 1, page_rows: 10 }, false, function (info) {
	        dispatch('VIDEO_POSTS_NEXT_COMPLETED');
	        if (info.ec == 200) {
	            dispatch('ADD_VIDEO_POSTS', info.data.list);
	            if (info.data.list.length) {
	                dispatch('SET_VIDEO_POSTS_PAGE', parseInt(nowPage + 1), info.data.total_page);
	            } else {
	                dispatch('SET_VIDEO_POSTS_PAGE', parseInt(nowPage), nowPage);
	            }
	        } else {
	            mk.showTip(info.em);
	        }
	        callback();
	    }, function () {
	        mk.showTip('网络出现错误');
	        dispatch('NEWS_POSTS_NEXT_COMPLETED');
	    });
	}
	
	function refreshDiscovery(store) {
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    resetHotPostsPage(store);
	    _promise2.default.all([new _promise2.default(function (resolve) {
	        fetchDiscover(store, false, resolve);
	    }), new _promise2.default(function (resolve) {
	        fetchHotPosts(store, resolve);
	    })]).then(callback);
	}
	function resetHotPostsPage(_ref16) {
	    var dispatch = _ref16.dispatch,
	        state = _ref16.state;
	
	    dispatch('RESET_HOT_POSTS_PAGE');
	}
	function hotPostsNextPage(_ref17) {
	    var dispatch = _ref17.dispatch,
	        state = _ref17.state;
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    var nowPage = +state.hotPosts.page.p;
	    dispatch('HOT_POSTS_NEXT_PROGRESS');
	    data.getDailyHotPost(nowPage + 1, function (_ref18) {
	        var ec = _ref18.ec,
	            em = _ref18.em,
	            data = _ref18.data;
	
	        dispatch('HOT_POSTS_NEXT_COMPLETED');
	        if (ec == 200) {
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = (0, _getIterator3.default)(data.today_hot_posts), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var v = _step5.value;
	
	                    v.postToggle = true;
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            dispatch('ADD_HOT_POSTS', data.today_hot_posts);
	            if (data.today_hot_posts.length) {
	                dispatch('SET_HOT_POSTS_PAGE', nowPage + 1, data.total_page);
	            } else {
	                dispatch('SET_HOT_POSTS_PAGE', nowPage, nowPage);
	            }
	        } else {
	            mk.showTip(em);
	        }
	        callback();
	    }, function () {
	        dispatch('HOT_POSTS_NEXT_COMPLETED');
	    });
	}
	function fetchHotKeywords(_ref19) {
	    var dispatch = _ref19.dispatch,
	        state = _ref19.state;
	
	    data.getHotKeyword(function (_ref20) {
	        var ec = _ref20.ec,
	            em = _ref20.em,
	            data = _ref20.data,
	            state = _ref20.state;
	
	        if (ec == 200) {
	            dispatch('FETCH_HOT_KEYWORDS', data.hot_keywords);
	            dispatch('FETCH_HOT_TYPES', data.quanzi_types);
	            dispatch('FETCH_TOKEN', state.token);
	        } else {
	            mk.showTip(em);
	        }
	    });
	}
	
	function switchTab(_ref21, index) {
	    var dispatch = _ref21.dispatch,
	        state = _ref21.state;
	
	    if (index == 0) {
	        hitDot('owner');
	        // dispatch('SET_NEWS_ALLOW_RENDER');
	        // dispatch('HIDE_RED_POINT_MYCIRCLE');
	    } else if (index == 1) {
	        hitDot('discovery');
	        // dispatch('SET_DISCOVERY_ALLOW_RENDER');
	        if (state.isShowRedPoint.versionDiscover) {
	            mm.storage.setItem({
	                path: 'circle2',
	                key: 'red_point_version',
	                value: state.isShowRedPoint.versionDiscover
	            });
	            dispatch('HIDE_RED_POINT');
	        }
	        dispatch('SET_DISPLAY_DISCOVER');
	    } else {
	        hitDot('video');
	        dispatch('SET_DISPLAY_VIEO');
	    }
	
	    if (!state.isRenderDiscovery) {
	        dispatch('RENDER_DISCOVERY');
	    }
	    dispatch('SWITCH_TAB', index);
	}
	function searchCircle(_ref22) {
	    var dispatch = _ref22.dispatch,
	        state = _ref22.state;
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    dispatch('SEARCH_CIRCLE_PROGRESS');
	    data.searchCircleByName(state.inputArea.searchText, state.inputArea.page.p, function (_ref23) {
	        var ec = _ref23.ec,
	            em = _ref23.em,
	            data = _ref23.data;
	
	        dispatch('SEARCH_CIRCLE_COMPLETED');
	        if (ec == 200) {
	            dispatch('FETCH_SEARCH_CIRCLES', data.quanzi_list);
	        } else {
	            dispatch('DISABLED_CREATE');
	            mk.showTip(em);
	        }
	        callback();
	    }, function () {
	        dispatch('SEARCH_CIRCLE_COMPLETED');
	    });
	}
	function searchCircleNextPage(_ref24) {
	    var dispatch = _ref24.dispatch,
	        state = _ref24.state;
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	
	    dispatch('SEARCH_CIRCLE_NEXT_PROGRESS');
	    data.searchCircleByName(state.inputArea.searchText, state.inputArea.page.p + 1, function (_ref25) {
	        var ec = _ref25.ec,
	            em = _ref25.em,
	            data = _ref25.data;
	
	        dispatch('SEARCH_CIRCLE_NEXT_COMPLETED');
	        if (ec == 200) {
	            dispatch('ADD_SEARCH_CIRCLES', data.quanzi_list);
	            if (data.quanzi_list.length) {
	                dispatch('SET_SEARCH_CIRCLES_PAGE', state.inputArea.page.p + 1);
	            } else {
	                dispatch('SET_SEARCH_CIRCLES_PAGE', state.inputArea.page.p, state.inputArea.page.p);
	            }
	        } else {
	            mk.showTip(em);
	        }
	        callback();
	    }, function () {
	        dispatch('SEARCH_CIRCLE_NEXT_COMPLETED');
	    });
	}
	function setSearchText(_ref26, text, type) {
	    var dispatch = _ref26.dispatch,
	        state = _ref26.state;
	
	    dispatch('SET_SEARCH_TEXT', text, type);
	    dispatch('RESET_SEARCH_PAGE');
	}
	function closeSearch(_ref27) {
	    var dispatch = _ref27.dispatch,
	        state = _ref27.state;
	
	    dispatch('CLOSE_SEARCH_INPUT');
	}
	function openSearch(_ref28) {
	    var dispatch = _ref28.dispatch,
	        state = _ref28.state;
	
	    dispatch('SHOW_SEARCH_INPUT');
	}
	
	function joinCircle(_ref29, qid) {
	    var dispatch = _ref29.dispatch,
	        state = _ref29.state;
	
	    data.joinCircle({
	        qid: qid,
	        token: state.token,
	        src: "category_quanzi_detail"
	    }, function () {
	        var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : body,
	            ec = _ref30.ec,
	            em = _ref30.em,
	            data = _ref30.data;
	
	        if (ec == 200) {
	            dispatch('JOIN_CIRCLE', qid);
	        }
	        mk.showTip(em);
	    }, function () {});
	}
	
	/**
	 * 这里非常蛋疼，因为拿本地存储的数据是个异步的过程。本意是可以纯对象的。结果必须要是被观察的
	 */
	function updateBluePoint(store) {
	    var isAction = false;
	    var list = null;
	    if (store instanceof _vuex2.default.Store) {
	        list = store.state.myCircles.list;
	        isAction = true;
	    } else {
	        list = store;
	    }
	
	    list = JSON.parse((0, _stringify2.default)(list));
	    list = list.map(function (item) {
	        item._post_count = item.post_count;
	        return item;
	    });
	    list = list.map(function (item, index) {
	        if (mm.platform == 'unknown' || mm.compare('7.0.0') != -1) {
	            var post_count = localStorage.getItem('enterCircle-' + item.qid);
	            return setBluePoint(post_count, list, item);
	        } else {
	            var value = localStorage.getItem('enterCircle-' + item.qid);
	            setBluePoint(value, list, item);
	        }
	    });
	
	    function setBluePoint(post_count, list, item) {
	        if (post_count) {
	            item = list.filter(function (circle) {
	                return circle.qid == item.qid;
	            }).map(function (circle) {
	                var count = circle._post_count - post_count;
	                if (count < 0) {
	                    count = 0;
	                }
	                circle.post_count = count;
	                store.dispatch && store.dispatch('SET_BLUE_POINT', item.qid, count);
	                return item;
	            })[0];
	        }
	        return item;
	    }
	    return list;
	}
	
	function isShowGuide(_ref31) {
	    var dispatch = _ref31.dispatch,
	        state = _ref31.state;
	
	    mm.storage.getItem({
	        path: 'circle2', // 区分类别，如果不为空，查找的key名为 path+key
	        key: 'is_show_mask' // 查找的key
	    }, function (show) {
	        if (show != '2.2') {
	            dispatch('SHOW_GUIDE');
	            mm.storage.setItem({
	                path: 'circle2', // 区分类别，如果不为空，存储的key名为 path+key
	                key: 'is_show_mask', // 存储的key
	                value: '2.2' // 存储的值
	            });
	        }
	    });
	}
	
	function hitDot(dot) {
	    mk.ajax({
	        url: '/inc/stat/web/dm',
	        data: {
	            position: 'index_page_display',
	            service: 'circle2.3',
	            dot: dot
	        }
	    });
	}

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(329), __esModule: true };

/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(205);
	__webpack_require__(176);
	module.exports = __webpack_require__(330);

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(27)
	  , get      = __webpack_require__(215);
	module.exports = __webpack_require__(22).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(332);


/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(333);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };
	
	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }
	
	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	  runtime.AsyncIterator = AsyncIterator;
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(334)))

/***/ },

/***/ 334:
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _promise = __webpack_require__(173);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }
	
	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }
	
	      return step("next");
	    });
	  };
	};

/***/ },

/***/ 336:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div _v-0590cb26=\"\">\n    <div class=\"discovery-wrapper\" _v-0590cb26=\"\">\n        <div _v-0590cb26=\"\">\n            <list-group _v-0590cb26=\"\">\n                <list-group-item v-if=\"type_list &amp;&amp; type_list.list.length\" _v-0590cb26=\"\">\n                    <slider :stamp=\"type_list.stamp\" :title=\"type_list.title\" view-count=\"2.15\" reveal=\"42\" _v-0590cb26=\"\">\n                        <slider-cell v-for=\"item in type_list.list\" track-by=\"type_id\" _v-0590cb26=\"\">\n                            <div class=\"category category-view-2\" _v-0590cb26=\"\">\n                                <a :href=\"item.goto_v2\" v-open=\"_blank\" _v-0590cb26=\"\">\n                                    <img v-load=\"fade\" :src=\"item.type_icon\" _v-0590cb26=\"\">\n                                    <span _v-0590cb26=\"\">{{item.type_name}}</span>\n                                </a>\n                            </div>\n                        </slider-cell>\n                    </slider>\n                </list-group-item>\n\n                <list-group-item v-if=\"quanzi_rank &amp;&amp; quanzi_rank.list.length\" _v-0590cb26=\"\">\n                    <slider :stamp=\"quanzi_rank.stamp\" :title=\"quanzi_rank.title\" padding-bottom=\"39\" :view-count=\"cardSize\" reveal=\"42\" _v-0590cb26=\"\">\n                        <slider-cell v-for=\"item in quanzi_rank.list\" track-by=\"type_id\" _v-0590cb26=\"\">\n                            <!--<a :href=\"item.goto\" v-open=\"_blank\">\n                                    <div class=\"circle-item-img\" :style=\"{backgroundImage:'url('+item.icon+')'}\" v-load=\"fade\"></div>\n                                    <h4>{{item.type_name}}</h4>\n                                </a>-->\n                            <div class=\"category category-view-4\" _v-0590cb26=\"\">\n                                <a :href=\"item.goto\" v-open=\"_blank\" _v-0590cb26=\"\">\n                                    <img v-load=\"fade\" :src=\"item.icon\" _v-0590cb26=\"\">\n                                    <span _v-0590cb26=\"\">{{item.type_name}}</span>\n                                </a>\n                            </div>\n                        </slider-cell>\n                    </slider>\n                </list-group-item>\n                <list-group-item v-if=\"interest_quanzi &amp;&amp; interest_quanzi.list.length\" _v-0590cb26=\"\">\n                    <slider :stamp=\"interest_quanzi.stamp\" :title=\"interest_quanzi.title\" :view-count=\"cardSize\" reveal=\"42\" _v-0590cb26=\"\">\n                        <slider-cell v-for=\"item in interest_quanzi.list\" track-by=\"qid\" _v-0590cb26=\"\">\n                            <div class=\"circle-item\" _v-0590cb26=\"\">\n                                <a :href=\"item.goto\" v-open=\"_blank\" _v-0590cb26=\"\">\n                                    <div class=\"circle-item-img\" :style=\"{backgroundImage:'url('+item.avatar+')'}\" v-load=\"fade\" _v-0590cb26=\"\"></div>\n                                    <h4 _v-0590cb26=\"\">{{item.qname}}</h4>\n                                    <span _v-0590cb26=\"\">{{item.member_cnt}}</span>\n                                </a>\n                            </div>\n                        </slider-cell>\n                    </slider>\n                </list-group-item>\n                <list-group-item v-if=\"hot_quanzi &amp;&amp; hot_quanzi.list.length\" _v-0590cb26=\"\">\n                    <slider :stamp=\"hot_quanzi.stamp\" :title=\"hot_quanzi.title\" padding-bottom=\"39\" :view-count=\"cardSize\" reveal=\"42\" _v-0590cb26=\"\">\n                        <slider-cell v-for=\"item in hot_quanzi.list\" track-by=\"qid\" _v-0590cb26=\"\">\n                            <div class=\"circle-item\" _v-0590cb26=\"\">\n                                <a :href=\"item.goto\" v-open=\"_blank\" _v-0590cb26=\"\">\n                                    <div class=\"circle-item-img\" :style=\"{backgroundImage:'url('+item.avatar+')'}\" v-load=\"fade\" _v-0590cb26=\"\"></div>\n                                    <h4 _v-0590cb26=\"\">{{item.qname}}</h4>\n                                    <span _v-0590cb26=\"\">{{item.member_cnt}}</span>\n                                </a>\n                            </div>\n                        </slider-cell>\n                    </slider>\n                </list-group-item>\n            </list-group>\n            <div v-if=\"hotPosts &amp;&amp; hotPosts.length\" _v-0590cb26=\"\">\n                <list-group title=\"每日热帖\" _v-0590cb26=\"\">\n                    <list-group-item _v-0590cb26=\"\">\n                        <post :title=\"hotPosts[0].title\" :content=\"hotPosts[0].content\" :like_cnt=\"hotPosts[0].like_cnt\" :images=\"hotPosts[0].pics\" :distance=\"hotPosts[0].distance\" :comment-count=\"hotPosts[0].comment_count\" :circle=\"hotPosts[0].quanzi\" :image-count=\"hotPosts[0].pic_count\" :link=\"hotPosts[0].post_goto\" :video=\"hotPosts[0].video\" :time=\"hotPosts[0].time\" :is-like=\"hotPosts[0].is_like\" :pid=\"hotPosts[0].pid\" :read-count=\"hotPosts[0].read_cnt\" :is-elite=\"hotPosts[0].status.elite\" :is-top=\"hotPosts[0].status.top\" :is-new=\"hotPosts[0].status.new\" :more=\"hotPosts[0].op\" :build-in-op=\"false\" v-on:more=\"postOp\" _v-0590cb26=\"\">\n                        </post>\n                    </list-group-item>\n                </list-group>\n                <list-group v-for=\"post in hotPosts\" track-by=\"pid\" _v-0590cb26=\"\">\n                    <list-group-item v-if=\"$index > 0 &amp;&amp; firstDisplay\" _v-0590cb26=\"\">\n                        <post v-if=\"post.postToggle\" :title=\"post.title\" :content=\"post.content\" :like_cnt=\"post.like_cnt\" :images=\"post.pics\" :distance=\"post.distance\" :comment-count=\"post.comment_count\" :circle=\"post.quanzi\" :image-count=\"post.pic_count\" :link=\"post.post_goto\" :video=\"post.video\" :is-like=\"post.is_like\" :time=\"post.time\" :pid=\"post.pid\" :read-count=\"post.read_cnt\" :is-elite=\"post.status.elite\" :is-top=\"post.status.top\" :is-new=\"post.status.new\" :more=\"post.op\" :build-in-op=\"false\" v-on:more=\"postOp\" _v-0590cb26=\"\">\n                        </post>\n                    </list-group-item>\n                </list-group>\n            </div>\n            <div class=\"loading-tip\" v-if=\"hotPosts.length\" _v-0590cb26=\"\">\n                <span _v-0590cb26=\"\"><icon type=\"loading\" v-if=\"!isLoadedALL\" _v-0590cb26=\"\"></icon></span>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(338)
	__vue_script__ = __webpack_require__(340)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/pages/index/components/owner.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(361)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(339);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-aa83c4ae&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./owner.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-aa83c4ae&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./owner.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-aa83c4ae], a[_v-aa83c4ae], img[_v-aa83c4ae] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-aa83c4ae], a[_v-aa83c4ae], img[_v-aa83c4ae] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-aa83c4ae] {\n  float: right; }\n\n.border-bottom[_v-aa83c4ae] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-aa83c4ae], .mycircle-wrapper[_v-aa83c4ae] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-aa83c4ae] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-aa83c4ae] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-aa83c4ae] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-aa83c4ae] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-aa83c4ae]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-aa83c4ae]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-aa83c4ae]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-aa83c4ae] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-aa83c4ae] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-aa83c4ae] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-aa83c4ae] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-aa83c4ae] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-aa83c4ae] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-aa83c4ae] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-aa83c4ae] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-aa83c4ae] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-aa83c4ae] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-aa83c4ae] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-aa83c4ae], .slide-up-leave[_v-aa83c4ae] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.mycircle-wrapper[_v-aa83c4ae] {\n  background-color: #fff;\n  margin-bottom: 0.3125rem; }\n\n.add-button[_v-aa83c4ae] {\n  color: #a8a8a8; }\n\n.circle-cell[_v-aa83c4ae] {\n  display: block;\n  position: relative;\n  background-color: #fff;\n  color: #1e1e1e;\n  height: 3.25rem;\n  line-height: 3.25rem;\n  font-size: 0.9375rem;\n  padding-left: 0.625rem; }\n  .circle-cell[_v-aa83c4ae]:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 200%;\n    height: 1px;\n    background-color: #f0f0f0;\n    -webkit-transform: scale(0.5);\n       -moz-transform: scale(0.5);\n        -ms-transform: scale(0.5);\n         -o-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: left;\n       -moz-transform-origin: left;\n        -ms-transform-origin: left;\n         -o-transform-origin: left;\n            transform-origin: left; }\n  .circle-cell.first[_v-aa83c4ae] {\n    margin-left: 0.625rem;\n    padding-left: 0; }\n    .circle-cell.first[_v-aa83c4ae]:after {\n      content: '';\n      position: absolute;\n      top: 0;\n      right: 0;\n      height: 200%;\n      width: 1px;\n      -webkit-transform: scale(0.5);\n         -moz-transform: scale(0.5);\n          -ms-transform: scale(0.5);\n           -o-transform: scale(0.5);\n              transform: scale(0.5);\n      background-color: #f0f0f0;\n      -webkit-transform-origin: top;\n         -moz-transform-origin: top;\n          -ms-transform-origin: top;\n           -o-transform-origin: top;\n              transform-origin: top; }\n\n.circle-cell-name[_v-aa83c4ae] {\n  display: block;\n  float: left;\n  max-width: 60%;\n  white-space: nowrap;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis; }\n\n.circle-cell-more[_v-aa83c4ae] {\n  position: relative;\n  color: #8c8c8c;\n  font-size: 0.875rem; }\n\n.circle-cell-badge[_v-aa83c4ae] {\n  position: absolute;\n  right: 0.78125rem;\n  top: 50%;\n  -webkit-transform: translate(0, -50%);\n     -moz-transform: translate(0, -50%);\n      -ms-transform: translate(0, -50%);\n       -o-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  color: #aaa;\n  font-size: 0.875rem; }\n\n.right-arrow[_v-aa83c4ae] {\n  position: absolute;\n  background-image: url(http://cdnst.momocdn.com/w/u/img/2016/06/16/1466070807489-arrow-right.png);\n  -webkit-background-size: cover;\n     -moz-background-size: cover;\n       -o-background-size: cover;\n          background-size: cover;\n  position: absolute;\n  top: 50%;\n  right: 0.9375rem;\n  -webkit-transform: translate(0, -50%);\n     -moz-transform: translate(0, -50%);\n      -ms-transform: translate(0, -50%);\n       -o-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  width: 0.5rem;\n  height: 0.8125rem; }\n\n.no-posts[_v-aa83c4ae] {\n  padding: 2.5rem 0;\n  background-color: #fff; }\n  .no-posts .empty-text[_v-aa83c4ae] {\n    padding: 0;\n    font-size: 0.75rem; }\n    .no-posts .empty-text a[_v-aa83c4ae] {\n      color: #3462ff; }\n\n.loading-tip .icon-loading[_v-aa83c4ae] {\n  width: 1.5625rem;\n  height: 1.5625rem;\n  -moz-transform-origin: center;\n   -ms-transform-origin: center;\n    -o-transform-origin: center;\n       transform-origin: center;\n  -webkit-transform-origin: center; }\n", ""]);
	
	// exports


/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _refresh = __webpack_require__(166);
	
	var _refresh2 = _interopRequireDefault(_refresh);
	
	var _icon = __webpack_require__(69);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _listGroup = __webpack_require__(44);
	
	var _listGroup2 = _interopRequireDefault(_listGroup);
	
	var _listGroupItem = __webpack_require__(49);
	
	var _listGroupItem2 = _interopRequireDefault(_listGroupItem);
	
	var _header = __webpack_require__(341);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _grid = __webpack_require__(346);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	var _gridRow = __webpack_require__(351);
	
	var _gridRow2 = _interopRequireDefault(_gridRow);
	
	var _gridCell = __webpack_require__(356);
	
	var _gridCell2 = _interopRequireDefault(_gridCell);
	
	var _post = __webpack_require__(106);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _actions = __webpack_require__(327);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BASE_OFFSET = parseFloat($('body').css('font-size')) / 16;
	
	exports.default = {
	    props: {
	        show: {
	            default: true
	        },
	        postOp: {}
	    },
	    components: {
	        Icon: _icon2.default, ListGroup: _listGroup2.default, ListGroupItem: _listGroupItem2.default, Post: _post2.default, vHeader: _header2.default, Grid: _grid2.default, GridCell: _gridCell2.default, GridRow: _gridRow2.default
	    },
	    vuex: {
	        actions: {
	            refreshOwner: _actions.refreshOwner, newsPostsNextPage: _actions.newsPostsNextPage, updateBluePoint: _actions.updateBluePoint, fetchMyCircle: _actions.fetchMyCircle
	        },
	        getters: {
	            allowRender: function allowRender(state) {
	                return state.newsPosts.allowRender;
	            },
	            self: function self(state) {
	                return state.myPost;
	            },
	            circles: function circles(state) {
	                return state.myCircles;
	            },
	            newsPosts: function newsPosts(state) {
	                return state.newsPosts.list;
	            },
	            page: function page(state) {
	                return state.newsPosts.page;
	            }
	        }
	    },
	    created: function created() {
	        var _this2 = this;
	
	        document.addEventListener('be:resume', function () {
	            _this2.fetchMyCircle(false);
	        });
	    },
	
	    ready: function ready() {
	        var _this3 = this;
	
	        _vue2.default.nextTick(function () {
	            _this3.mRefresh = new _refresh2.default({
	                wrapper: $('.owner-list'),
	                position: $('.owner-list'),
	                triggerScrollTop: $('.owner-list').parent().parent(),
	                callback: _this3.refresh
	            });
	        });
	
	        var $wrapper = $(this.$el).parent();
	        $wrapper.on('scroll', this.scrollLoadData);
	    },
	    computed: {
	        isLoadedALL: function isLoadedALL() {
	            return this.page.p == this.page.totalPage;
	        },
	        circlesCell: function circlesCell() {
	            var arr = [];
	            var tmp = [];
	            var list = this.circles.list;
	            if (list.length == 1) {
	                return [[list[0]]];
	            }
	            list.forEach(function (item, index) {
	                if (index > 6) {
	                    return;
	                }
	                if (index % 2 == 0) {
	                    tmp = [item];
	                } else {
	                    tmp.push(item);
	                    arr.push(tmp);
	                    tmp = [];
	                }
	            });
	            if (tmp.length) {
	                arr.push(tmp);
	            }
	            if (list.length >= 8) {
	                arr[arr.length - 1][1] = {
	                    isMore: true
	                };
	            }
	            return arr;
	        }
	    },
	    methods: {
	        clickCircle: function clickCircle(val, post_count) {
	            localStorage.setItem('enterCircle-' + val, post_count);
	        },
	        refresh: function refresh() {
	            this.refreshOwner(this.mRefresh.end);
	        },
	        scrollLoadData: function scrollLoadData() {
	            var _this4 = this;
	
	            var $wrapper = $(this.$el).parent();
	            var docHeight = $(this.$el).height();
	            var scrollTop = $wrapper.scrollTop();
	            var windowHeight = $wrapper.height();
	            var _this = this;
	            if ($(this.$el).height() < windowHeight + scrollTop + BASE_OFFSET * 55) {
	                $wrapper.off('scroll', this.scrollLoadData);
	                this.newsPostsNextPage(function () {
	
	                    if (_this4.page.p != _this4.page.totalPage) {
	                        $wrapper.on('scroll', _this4.scrollLoadData);
	                    }
	                });
	            }
	        }
	    }
	};

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(342)
	__vue_script__ = __webpack_require__(344)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(345)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(343);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-734f2962&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-734f2962&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-734f2962], a[_v-734f2962], img[_v-734f2962] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-734f2962], a[_v-734f2962], img[_v-734f2962] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-734f2962] {\n  float: right; }\n\n.border-bottom[_v-734f2962], .header[_v-734f2962] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-734f2962] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-734f2962] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-734f2962] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-734f2962] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-734f2962] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-734f2962]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-734f2962]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-734f2962]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-734f2962] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-734f2962] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-734f2962] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-734f2962] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-734f2962] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-734f2962] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-734f2962] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-734f2962] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-734f2962] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-734f2962] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-734f2962] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-734f2962], .slide-up-leave[_v-734f2962] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.header[_v-734f2962] {\n  position: relative;\n  height: 2.75rem;\n  background-color: #fff;\n  padding: 0 0.78125rem; }\n\n.header-title[_v-734f2962] {\n  display: inline-block;\n  height: 2.75rem;\n  line-height: 2.75rem;\n  color: #828282;\n  font-size: 0.875rem; }\n\n.header-small[_v-734f2962] {\n  display: inline-block;\n  height: 2.75rem;\n  line-height: 2.75rem;\n  color: #3462ff;\n  font-size: 0.875rem; }\n\n.header-right[_v-734f2962] {\n  position: absolute;\n  top: 0;\n  height: 2.75rem;\n  line-height: 2.75rem;\n  right: 0.9375rem;\n  font-size: 0.75rem;\n  color: #a8a8a8; }\n", ""]);
	
	// exports


/***/ },

/***/ 344:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        show: {
	            default: true
	        },
	        title: {},
	        small: {},
	
	        right: {}
	    },
	    created: function created() {},
	    methods: {}
	};

/***/ },

/***/ 345:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"header\" _v-734f2962=\"\">\n    <h4 class=\"header-title\" v-if=\"title\" _v-734f2962=\"\">\n        {{title}}\n        <small class=\"header-small\" v-html=\"small\" v-if=\"small\" _v-734f2962=\"\"></small>\n    </h4>\n    <span class=\"header-right\" _v-734f2962=\"\">\n        <slot class=\"header-right\" name=\"right\" v-if=\"!right\" _v-734f2962=\"\"></slot>\n    </span>\n    <slot _v-734f2962=\"\"></slot>\n</div>\n";

/***/ },

/***/ 346:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(347)
	__vue_script__ = __webpack_require__(349)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/grid.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(350)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(348);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-81579bf0&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./grid.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-81579bf0&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./grid.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-81579bf0], a[_v-81579bf0], img[_v-81579bf0] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-81579bf0], a[_v-81579bf0], img[_v-81579bf0] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-81579bf0] {\n  float: right; }\n\n.border-bottom[_v-81579bf0] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-81579bf0] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-81579bf0] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-81579bf0] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-81579bf0] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-81579bf0] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-81579bf0]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-81579bf0]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-81579bf0]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-81579bf0] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-81579bf0] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-81579bf0] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-81579bf0] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-81579bf0] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-81579bf0] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-81579bf0] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-81579bf0] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-81579bf0] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-81579bf0] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-81579bf0] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-81579bf0], .slide-up-leave[_v-81579bf0] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n", ""]);
	
	// exports


/***/ },

/***/ 349:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        border: {
	            default: true
	        },
	        column: {}
	    },
	    data: function data() {
	        return {
	            gridStyleObj: {}
	        };
	    },
	
	    created: function created() {},
	    methods: {
	        click: function click() {
	            this.$emit('click');
	        }
	    }
	};

/***/ },

/***/ 350:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n<div class=\"grid\" _v-81579bf0=\"\">\n    <slot _v-81579bf0=\"\"></slot>\n</div>\n";

/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(352)
	__vue_script__ = __webpack_require__(354)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/grid-row.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(355)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(353);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-71b91a15&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./grid-row.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-71b91a15&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./grid-row.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-71b91a15], a[_v-71b91a15], img[_v-71b91a15] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-71b91a15], a[_v-71b91a15], img[_v-71b91a15] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-71b91a15] {\n  float: right; }\n\n.border-bottom[_v-71b91a15] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-71b91a15] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-71b91a15] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-71b91a15] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-71b91a15] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-71b91a15] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-71b91a15]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-71b91a15]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-71b91a15]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-71b91a15] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-71b91a15] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-71b91a15] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-71b91a15] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-71b91a15] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-71b91a15] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-71b91a15] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-71b91a15] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-71b91a15] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-71b91a15] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-71b91a15] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-71b91a15], .slide-up-leave[_v-71b91a15] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.grid-row[_v-71b91a15] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex; }\n", ""]);
	
	// exports


/***/ },

/***/ 354:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        border: {
	            default: true
	        },
	        column: {
	            default: 2
	        }
	    },
	    data: function data() {
	        return {
	            gridStyleObj: {}
	        };
	    },
	
	    ready: function ready() {
	        var _this = this;
	
	        this.$children.forEach(function (children) {
	            children.$el.style.width = 1 / _this.column * 100 + '%';
	        });
	    },
	    methods: {
	        click: function click() {
	            this.$emit('click');
	        }
	    }
	};

/***/ },

/***/ 355:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n<div class=\"grid-row clearfix\" _v-71b91a15=\"\">\n    <slot _v-71b91a15=\"\"></slot>\n</div>\n";

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(357)
	__vue_script__ = __webpack_require__(359)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/grid-cell.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(360)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(358);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e2843692&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./grid-cell.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e2843692&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./grid-cell.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-e2843692], a[_v-e2843692], img[_v-e2843692] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-e2843692], a[_v-e2843692], img[_v-e2843692] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-e2843692] {\n  float: right; }\n\n.border-bottom[_v-e2843692] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-e2843692] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-e2843692] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-e2843692] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-e2843692] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-e2843692] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-e2843692]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-e2843692]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-e2843692]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-e2843692] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-e2843692] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-e2843692] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-e2843692] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-e2843692] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-e2843692] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-e2843692] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-e2843692] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-e2843692] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-e2843692] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-e2843692] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-e2843692], .slide-up-leave[_v-e2843692] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.grid-cell[_v-e2843692] {\n  float: left; }\n", ""]);
	
	// exports


/***/ },

/***/ 359:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {},
	    created: function created() {},
	    methods: {
	        click: function click() {
	            this.$emit('click');
	        }
	    }
	};

/***/ },

/***/ 360:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n<div class=\"grid-cell\" :style=\"\" _v-e2843692=\"\">\n    <slot _v-e2843692=\"\"></slot>\n</div>\n";

/***/ },

/***/ 361:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div _v-aa83c4ae=\"\">\n    <div class=\"owner-list\" _v-aa83c4ae=\"\">\n        <div _v-aa83c4ae=\"\">\n            <div class=\"my-tie\" _v-aa83c4ae=\"\">\n                <list-group v-if=\"self\" _v-aa83c4ae=\"\">\n                    <list-group-item :href=\"self.goto\" :image=\"self.icon\" :label=\"self.title\" _v-aa83c4ae=\"\">\n                    </list-group-item>\n                </list-group>\n            </div>\n\n            <div class=\"mycircle-wrapper\" _v-aa83c4ae=\"\">\n                <v-header :title=\"circles.info.title\" :small=\"circles.info.totalConst\" _v-aa83c4ae=\"\">\n                    <a slot=\"right\" href=\"./circle-all.html\" v-open=\"_blank\" _v-aa83c4ae=\"\">\n                        <icon type=\"add\" style=\"vertical-align: middle;margin-top: -2px;\" _v-aa83c4ae=\"\"></icon>\n                        <span class=\"add-button\" _v-aa83c4ae=\"\">添加</span>\n                    </a>\n                </v-header>\n                <grid v-if=\"circles &amp;&amp; circles.list.length\" _v-aa83c4ae=\"\">\n                    <grid-row v-for=\"row in circlesCell\" _v-aa83c4ae=\"\">\n                        <grid-cell v-for=\"cell in row\" _v-aa83c4ae=\"\">\n                            <a v-if=\"cell.isMore\" class=\"circle-cell circle-cell-more\" href=\"./my-circle.html?from=index\" v-open=\"_blank\" _v-aa83c4ae=\"\">\n                                查看全部\n                                <span class=\"right-arrow\" _v-aa83c4ae=\"\"></span>\n                            </a>\n                            <a v-else=\"\" :class=\"['circle-cell',$index == 0 ? 'first':'']\" @click=\"clickCircle(cell.qid,cell._post_count)\" :href=\"cell.goto\" v-open=\"_blank\" _v-aa83c4ae=\"\">\n                                <span class=\"circle-cell-name\" _v-aa83c4ae=\"\">\n                                    {{cell.qname}}\n                                </span>\n                                <icon type=\"circlemanager\" v-if=\"cell.is_manager\" style=\"margin-left:0.3125rem;vertical-align:middle;\" _v-aa83c4ae=\"\"></icon>\n                                <span class=\"circle-cell-badge\" v-if=\"cell.post_count\" _v-aa83c4ae=\"\">\n                                    {{ cell.post_count &gt; 99 ? '99+':cell.post_count}}\n                                </span>\n                            </a>\n                        </grid-cell>\n                    </grid-row>\n                </grid>\n\n                <div class=\"no-posts\" v-if=\"circles &amp;&amp; !circles.list.length\" _v-aa83c4ae=\"\">\n                    <div class=\"empty-text\" _v-aa83c4ae=\"\">\n                        你还没有加入任何圈子，\n                        <a href=\"./circle-all.html\" v-open=\"_blank\" _v-aa83c4ae=\"\">去添加</a>\n                    </div>\n                </div>\n            </div>\n\n            <div v-if=\"newsPosts &amp;&amp; newsPosts.length\" _v-aa83c4ae=\"\">\n                <list-group title=\"最新帖子\" _v-aa83c4ae=\"\">\n                    <list-group-item _v-aa83c4ae=\"\">\n                        <post :title=\"newsPosts[0].title\" :content=\"newsPosts[0].content\" :like_cnt=\"newsPosts[0].like_cnt\" :images=\"newsPosts[0].pics\" :distance=\"newsPosts[0].distance\" :comment-count=\"newsPosts[0].comment_count\" :circle=\"newsPosts[0].quanzi\" :image-count=\"newsPosts[0].pic_count\" :link=\"newsPosts[0].post_goto\" :video=\"newsPosts[0].video\" :user=\"newsPosts[0].user\" :time=\"newsPosts[0].time\" :is-like=\"newsPosts[0].is_like\" :pid=\"newsPosts[0].pid\" :read-count=\"newsPosts[0].read_cnt\" :is-elite=\"newsPosts[0].status.elite\" :is-top=\"newsPosts[0].status.top\" :more=\"newsPosts[0].op\" :build-in-op=\"false\" :is-new=\"newsPosts[0].status.new\" v-on:more=\"postOp\" _v-aa83c4ae=\"\">\n                        </post>\n                    </list-group-item>\n                </list-group>\n                <list-group v-for=\"post in newsPosts\" track-by=\"$index\" _v-aa83c4ae=\"\">\n                    <!-- <list-group-item v-if=\"$index > 0 && allowRender\"> -->\n                    <list-group-item v-if=\"$index > 0\" _v-aa83c4ae=\"\">\n                        <post v-if=\"post.postToggle\" :title=\"post.title\" :content=\"post.content\" :like_cnt=\"post.like_cnt\" :images=\"post.pics\" :distance=\"post.distance\" :comment-count=\"post.comment_count\" :circle=\"post.quanzi\" :image-count=\"post.pic_count\" :link=\"post.post_goto\" :user=\"post.user\" :video=\"post.video\" :is-like=\"post.is_like\" :time=\"post.time\" :pid=\"post.pid\" :read-count=\"post.read_cnt\" :is-elite=\"post.status.elite\" :is-top=\"post.status.top\" :more=\"post.op\" :build-in-op=\"false\" :is-new=\"post.status.new\" v-on:more=\"postOp\" _v-aa83c4ae=\"\"></post>\n                    </list-group-item>\n                </list-group>\n            </div>\n            <div class=\"loading-tip\" _v-aa83c4ae=\"\">\n                <!-- <span><icon type=\"loading\" v-if=\"!isLoadedALL\"></icon>{{isLoadedALL ? '已加载全部数据':'正在加载'}}</span> -->\n                <span _v-aa83c4ae=\"\"><icon type=\"loading\" v-if=\"!isLoadedALL\" _v-aa83c4ae=\"\"></icon></span>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 362:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(363)
	__vue_script__ = __webpack_require__(365)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/pages/index/components/video.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(376)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 363:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(364);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0db7c91e&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./video.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0db7c91e&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./video.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 364:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-0db7c91e], a[_v-0db7c91e], img[_v-0db7c91e] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-0db7c91e], a[_v-0db7c91e], img[_v-0db7c91e] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-0db7c91e] {\n  float: right; }\n\n.border-bottom[_v-0db7c91e] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-0db7c91e], .mycircle-wrapper[_v-0db7c91e] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-0db7c91e] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-0db7c91e] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-0db7c91e] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-0db7c91e] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-0db7c91e]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-0db7c91e]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-0db7c91e]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-0db7c91e] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-0db7c91e] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-0db7c91e] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-0db7c91e] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-0db7c91e] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-0db7c91e] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-0db7c91e] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-0db7c91e] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-0db7c91e] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-0db7c91e] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-0db7c91e] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-0db7c91e], .slide-up-leave[_v-0db7c91e] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.mycircle-wrapper[_v-0db7c91e] {\n  margin-bottom: 0.3125rem;\n  position: relative; }\n\n.new-video-tips[_v-0db7c91e] {\n  width: 100%;\n  height: 3.125rem;\n  line-height: 3.125rem;\n  background-color: #53a5fa;\n  text-align: center;\n  opacity: 0;\n  font-size: 0.9375rem;\n  color: #ffffff;\n  position: absolute;\n  z-index: 5;\n  left: 0;\n  top: 0; }\n\n@-webkit-keyframes tipAnimation {\n  0% {\n    opacity: 0; }\n  20% {\n    opacity: 1; }\n  80% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes tipAnimation {\n  0% {\n    opacity: 0; }\n  20% {\n    opacity: 1; }\n  80% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes tipAnimation {\n  0% {\n    opacity: 0; }\n  20% {\n    opacity: 1; }\n  80% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes tipAnimation {\n  0% {\n    opacity: 0; }\n  20% {\n    opacity: 1; }\n  80% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n.loading-tip .icon-loading[_v-0db7c91e] {\n  width: 1.5625rem;\n  height: 1.5625rem;\n  -moz-transform-origin: center;\n   -ms-transform-origin: center;\n    -o-transform-origin: center;\n       transform-origin: center;\n  -webkit-transform-origin: center; }\n", ""]);
	
	// exports


/***/ },

/***/ 365:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _refresh = __webpack_require__(166);
	
	var _refresh2 = _interopRequireDefault(_refresh);
	
	var _icon = __webpack_require__(69);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _listGroup = __webpack_require__(44);
	
	var _listGroup2 = _interopRequireDefault(_listGroup);
	
	var _listGroupItem = __webpack_require__(49);
	
	var _listGroupItem2 = _interopRequireDefault(_listGroupItem);
	
	var _header = __webpack_require__(341);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _grid = __webpack_require__(346);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	var _gridRow = __webpack_require__(351);
	
	var _gridRow2 = _interopRequireDefault(_gridRow);
	
	var _gridCell = __webpack_require__(356);
	
	var _gridCell2 = _interopRequireDefault(_gridCell);
	
	var _postVideo = __webpack_require__(366);
	
	var _postVideo2 = _interopRequireDefault(_postVideo);
	
	var _actions = __webpack_require__(327);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BASE_OFFSET = parseFloat($('body').css('font-size')) / 16;
	
	exports.default = {
	    props: {
	        show: {
	            default: true
	        }
	    },
	    components: {
	        Icon: _icon2.default, ListGroup: _listGroup2.default, ListGroupItem: _listGroupItem2.default, PostVideo: _postVideo2.default, vHeader: _header2.default, Grid: _grid2.default, GridCell: _gridCell2.default, GridRow: _gridRow2.default
	    },
	    vuex: {
	        actions: {
	            refreshVideo: _actions.refreshVideo, videoPostsNextPage: _actions.videoPostsNextPage, fetchMyCircle: _actions.fetchMyCircle, setTipTrue: _actions.setTipTrue
	        },
	        getters: {
	            firstDisplay: function firstDisplay(state) {
	                return state.firstDisplays.video;
	            },
	            videoPostTip: function videoPostTip(state) {
	                return state.videoPosts.videoPostTip;
	            },
	            self: function self(state) {
	                return state.myPost;
	            },
	            circles: function circles(state) {
	                return state.myCircles;
	            },
	            videoPosts: function videoPosts(state) {
	                return state.videoPosts.list;
	            },
	            page: function page(state) {
	                return state.videoPosts.page;
	            },
	            token: function token(state) {
	                return state.token;
	            }
	        }
	    },
	    ready: function ready() {
	        var _this = this;
	
	        var $wrapper = $(this.$el).parent();
	        _vue2.default.nextTick(function () {
	            _this.mRefresh = new _refresh2.default({
	                wrapper: $('.video-list'),
	                position: $('.video-list'),
	                triggerScrollTop: $('.video-list').parent().parent(),
	                callback: _this.refresh
	            });
	        });
	        $wrapper.on('scroll', this.scrollLoadData);
	    },
	    computed: {
	        isLoadedALL: function isLoadedALL() {
	            return this.page.p == this.page.totalPage;
	        },
	        circlesCell: function circlesCell() {
	            var arr = [];
	            var tmp = [];
	            var list = this.circles.list;
	            if (list.length == 1) {
	                return [[list[0]]];
	            }
	            list.forEach(function (item, index) {
	                if (index > 6) {
	                    return;
	                }
	                if (index % 2 == 0) {
	                    tmp = [item];
	                } else {
	                    tmp.push(item);
	                    arr.push(tmp);
	                    tmp = [];
	                }
	            });
	            if (tmp.length) {
	                arr.push(tmp);
	            }
	            if (list.length >= 8) {
	                arr[arr.length - 1][1] = {
	                    isMore: true
	                };
	            }
	            return arr;
	        },
	        tipStyle: function tipStyle() {
	            var _this2 = this;
	
	            if (this.videoPostTip.num == 0) {
	                return [{ opacity: 0 }, { animation: '' }, { '-webkit-animation': '' }];
	            } else {
	                setTimeout(function () {
	                    _this2.setTipTrue();
	                }, 3000);
	                return [{ opacity: 0 }, { animation: 'tipAnimation 3s' }, { '-webkit-animation': 'tipAnimation 3s' }];
	            }
	        }
	    },
	    methods: {
	        refresh: function refresh() {
	            this.refreshVideo(this.mRefresh.end);
	        },
	        pauseAll: function pauseAll() {
	            var videos = this.$refs.videos;
	            if (videos && videos.length) {
	                for (var i = 0; i < videos.length; i++) {
	                    var videoObj = videos[i].$children[0].$refs.video;
	                    videoObj.$els.video.pause();
	                    videoObj.playing = false;
	                    videoObj.showPlayBtn = true;
	                }
	            }
	        },
	        scrollLoadData: function scrollLoadData() {
	            var _this3 = this;
	
	            var $wrapper = $(this.$el).parent();
	            var docHeight = $wrapper.children().height();
	            var scrollTop = $wrapper.scrollTop();
	            var windowHeight = $wrapper.height();
	            if (docHeight < windowHeight + scrollTop + BASE_OFFSET * 55) {
	                $wrapper.off('scroll', this.scrollLoadData);
	                this.videoPostsNextPage(function () {
	                    if (_this3.page.p != _this3.page.totalPage) {
	                        $wrapper.on('scroll', _this3.scrollLoadData);
	                    }
	                });
	            }
	
	            var videos = this.$refs.videos;
	            videos.map(function (item, index) {
	                if ($(item.$el).offset().top && $(item.$el).offset().top < $(window).height() + BASE_OFFSET * 200) {
	                    item.$children[0].$children[2].showBackground = true;
	                }
	            });
	
	            mm.storage.getItem({
	                path: 'circle2',
	                key: 'videoIndex'
	            }, function (index) {
	                if (index && index <= _this3.videoPosts.length) {
	                    var item = $wrapper.find('.list-group').eq(index);
	                    if (item.offset().top && -item.offset().top + BASE_OFFSET * 40 > item.height() || item.offset().top > $(window).height()) {
	                        _this3.pauseAll();
	                    }
	                }
	            });
	        }
	    }
	};

/***/ },

/***/ 366:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(367)
	__vue_script__ = __webpack_require__(369)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/post-video.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(375)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 367:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(368);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0b347760&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./post-video.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0b347760&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./post-video.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 368:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-0b347760], a[_v-0b347760], img[_v-0b347760] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-0b347760], a[_v-0b347760], img[_v-0b347760] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-0b347760] {\n  float: right; }\n\n.border-bottom[_v-0b347760] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-0b347760] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-0b347760] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-0b347760] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-0b347760] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-0b347760] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-0b347760]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-0b347760]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-0b347760]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-0b347760] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-0b347760] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-0b347760] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-0b347760] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-0b347760] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-0b347760] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-0b347760] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-0b347760] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-0b347760] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-0b347760] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-0b347760] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-0b347760], .slide-up-leave[_v-0b347760] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\nprogress[_v-0b347760]::-moz-progress-bar {\n  background: #0064B4; }\n\nprogress[_v-0b347760]::-webkit-progress-bar {\n  background: #e6e6e6; }\n\nprogress[_v-0b347760]::-webkit-progress-value {\n  background: #0064B4; }\n\n.video[_v-0b347760]::-webkit-media-controls-enclosure {\n  /*禁用播放器控制栏的样式*/\n  /*display: none !important;*/ }\n\n.post-wrapper[_v-0b347760] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 100%;\n  min-height: 100px; }\n\n.user-info[_v-0b347760] {\n  display: block;\n  position: relative;\n  height: 2.34375rem;\n  padding: 0.625rem; }\n  .user-info .user-avatar[_v-0b347760] {\n    position: absolute;\n    top: 0.65625rem;\n    left: 0.625rem;\n    width: 2.34375rem;\n    height: 2.34375rem;\n    -webkit-border-radius: 0.15625rem;\n       -moz-border-radius: 0.15625rem;\n            border-radius: 0.15625rem; }\n  .user-info .user-name[_v-0b347760] {\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n    padding-left: 2.96875rem;\n    font-size: 1rem;\n    font-weight: normal;\n    color: #1e1e1e;\n    width: 80%;\n    overflow: visible;\n    white-space: nowrap;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis; }\n    .user-info .user-name.vip[_v-0b347760] {\n      color: #f22c2e; }\n    .user-info .user-name span[_v-0b347760] {\n      line-height: 1.40625rem;\n      display: inline-block;\n      vertical-align: middle; }\n    .user-info .user-name .name-text[_v-0b347760] {\n      display: block;\n      max-width: 100%;\n      overflow: hidden;\n      -o-text-overflow: ellipsis;\n         text-overflow: ellipsis;\n      white-space: nowrap; }\n  .user-info .user-badge[_v-0b347760] {\n    padding-left: 2.96875rem;\n    font-size: 0;\n    line-height: 1rem; }\n    .user-info .user-badge > div[_v-0b347760] {\n      margin-left: 0.125rem;\n      vertical-align: middle; }\n    .user-info .user-badge > div[_v-0b347760]:first-child {\n      margin-left: 0; }\n  .user-info .user-go[_v-0b347760] {\n    height: 0.8125rem;\n    position: absolute;\n    right: 0.625rem;\n    top: 1.40625rem; }\n\n.video-info[_v-0b347760] {\n  position: relative;\n  width: 100%; }\n  .video-info .video-info-title[_v-0b347760] {\n    color: #1e1e1e;\n    padding: 0.9375rem 0.625rem 1.25rem;\n    border-bottom: 1px solid #f1f1f1;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n    line-height: 0.9375rem;\n    font-size: 0.9375rem;\n    width: 100%;\n    overflow: hidden;\n    white-space: nowrap;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis; }\n  .video-info .video-info-more[_v-0b347760] {\n    width: 100%;\n    height: 1.5625rem;\n    padding: 0.5rem 0;\n    position: relative; }\n    .video-info .video-info-more .agree[_v-0b347760], .video-info .video-info-more .comment[_v-0b347760], .video-info .video-info-more .share[_v-0b347760] {\n      width: 33.3%;\n      height: 100%;\n      float: left;\n      position: relative; }\n      .video-info .video-info-more .agree p[_v-0b347760], .video-info .video-info-more .comment p[_v-0b347760], .video-info .video-info-more .share p[_v-0b347760] {\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        -webkit-transform: translate(-50%, -50%);\n           -moz-transform: translate(-50%, -50%);\n            -ms-transform: translate(-50%, -50%);\n             -o-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        height: 1rem; }\n        .video-info .video-info-more .agree p img[_v-0b347760], .video-info .video-info-more .agree p span[_v-0b347760], .video-info .video-info-more .comment p img[_v-0b347760], .video-info .video-info-more .comment p span[_v-0b347760], .video-info .video-info-more .share p img[_v-0b347760], .video-info .video-info-more .share p span[_v-0b347760] {\n          display: block;\n          float: left; }\n        .video-info .video-info-more .agree p img[_v-0b347760], .video-info .video-info-more .comment p img[_v-0b347760], .video-info .video-info-more .share p img[_v-0b347760] {\n          height: 1rem;\n          margin-top: -shift(4); }\n        .video-info .video-info-more .agree p span[_v-0b347760], .video-info .video-info-more .comment p span[_v-0b347760], .video-info .video-info-more .share p span[_v-0b347760] {\n          color: #bebebe;\n          font-size: 0.75rem;\n          line-height: 1rem;\n          padding-left: 0.3125rem; }\n    .video-info .video-info-more .agree .like-count-blue[_v-0b347760] {\n      color: #007aff !important; }\n    .video-info .video-info-more .agree[_v-0b347760]:before, .video-info .video-info-more .agree[_v-0b347760]:after {\n      content: '';\n      height: 100%;\n      width: 0.03125rem;\n      background: #f1f1f1;\n      position: absolute;\n      top: 0; }\n    .video-info .video-info-more .agree[_v-0b347760]:before {\n      left: 0; }\n    .video-info .video-info-more .agree[_v-0b347760]:after {\n      right: 0; }\n", ""]);
	
	// exports


/***/ },

/***/ 369:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(110);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _icon = __webpack_require__(69);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _showTip = __webpack_require__(81);
	
	var _showTip2 = _interopRequireDefault(_showTip);
	
	var _data = __webpack_require__(8);
	
	var _url2 = __webpack_require__(112);
	
	var _url3 = _interopRequireDefault(_url2);
	
	var _querystring = __webpack_require__(116);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	var _videoPlayer = __webpack_require__(370);
	
	var _videoPlayer2 = _interopRequireDefault(_videoPlayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: {
	        videoIndex: {},
	        title: {},
	        content: {},
	        commentCount: {},
	        imageCount: {},
	        readCount: {},
	        likeCount: {},
	        images: {},
	        distance: {},
	        link: {},
	        isElite: {},
	        isTop: {},
	        isNew: {},
	        isLike: {},
	        user: {},
	        time: {},
	        video: {},
	        op: {},
	        pid: {},
	        trackBy: {},
	        videoSize: {},
	        myVideo: {}
	    },
	    components: {
	        icon: _icon2.default,
	        showTip: _showTip2.default,
	        videoPlayer: _videoPlayer2.default
	    },
	    vuex: {
	        getters: {
	            token: function token(state) {
	                return state.token;
	            }
	        }
	    },
	    data: function data() {
	        return {
	            showTip: {
	                text: '',
	                show: false
	            },
	            playing: false,
	            loading: false,
	            userNameClassObj: {
	                'user-name': true,
	                'vip': this.user && this.user.vip_info && this.user.vip_info.valid
	            }
	        };
	    },
	    computed: {
	        agreeSrc: function agreeSrc() {
	            if (this.isLike == 1) {
	                return 'https://s.momocdn.com/w/u/img/2016/11/17/1479360846742-agree-blue.png';
	            } else {
	                return 'https://s.momocdn.com/w/u/img/2016/11/17/1479356013080-agree.png';
	            }
	        }
	    },
	    created: function created() {},
	    ready: function ready() {},
	
	    methods: {
	        getReadyState: function getReadyState() {
	            setInterval;
	        },
	        pauseAll: function pauseAll() {
	            var videos = this.$root.$refs.page.$children[2].$children[0].$refs.videos;
	            for (var i = 0; i < videos.length; i++) {
	                var videoObj = videos[i].$children[0].$refs.video;
	                videoObj.$els.video.pause();
	                videoObj.playing = false;
	                videoObj.showPlayBtn = true;
	            }
	        },
	        likePost: function likePost() {
	            var _this = this;
	
	            var type = this.isLike ? 0 : 1;
	            if (this.likeRuquesting) {
	                return;
	            }
	            this.likeRuquesting = true;
	            this.isLike = !!type;
	            type == 1 ? ++this.likeCount : --this.likeCount;
	
	            (0, _data.postLike)(this.pid, type, this.token, function () {
	                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : body,
	                    ec = _ref.ec,
	                    em = _ref.em;
	
	                if (ec == 200) {} else {
	                    _this.isLike = !type;
	                    mk.showError(em);
	                }
	                _this.likeRuquesting = false;
	            }, function () {
	                _this.likeRuquesting = false;
	            });
	        },
	        openUserProfile: function openUserProfile(momoid) {
	            console.log('click');
	            this.pauseAll();
	            var prm = {
	                websource: "quanziv2_goto_profile",
	                momoid: momoid,
	                websourcetype: 12
	            };
	            var param = {
	                "m": {
	                    "t": "跳转到话题首页",
	                    "a": "goto_profile",
	                    "prm": (0, _stringify2.default)(prm),
	                    "a_id": ""
	                },
	                "cb_prm": {},
	                "cb_path": "",
	                "cb_url": ""
	            };
	            var _url = 'momochat://immomo.com?goto=' + (0, _stringify2.default)(param);
	
	            mm.ui.openUrl({
	                url: _url,
	                target: 1
	            });
	        },
	        openDetailAndShowInput: function openDetailAndShowInput(e, showinput) {
	            this.pauseAll();
	            var urlObj, url, searchObj;
	            urlObj = _url3.default.parse(this.link);
	            searchObj = _querystring2.default.parse(urlObj.query);
	            searchObj.showinput = showinput;
	            urlObj.query = searchObj;
	            urlObj.query.from = "4";
	            delete urlObj.search;
	            url = _url3.default.format(urlObj);
	            mm.ui.openUrl({
	                target: 1,
	                url: url
	            });
	        },
	        sharePost: function sharePost() {
	            this.pauseAll();
	            var url = 'https://m.immomo.com/s/circle2/post-detail.html?pid=' + this.pid + '&from=2&_bid=1090';
	            var pic;
	            this.video && this.video.cover_url ? pic = this.video.share_url : pic = this.images && this.images[0].l || '';
	            var text = this.circle ? '我分享了“' + this.circle.qname + '”圈子的帖子' : '我分享了一条帖子';
	            mm.share.showPanel({
	                title: this.title,
	                pic: url,
	                text: '这个活动不错，有人一起去吗？',
	                apps: ['momo_feed', 'momo_contacts'],
	                type: 1,
	                url: url,
	                callback: function callback() {},
	                configs: {
	                    momo_feed: {
	                        text: text,
	                        pic: '',
	                        url: url,
	                        sdk: 1,
	                        resource: {
	                            title: this.title,
	                            desc: this.content,
	                            icon: pic,
	                            link: url,
	                            from: "quanzi"
	                        }
	                    }, 'momo_contacts': {
	                        title: text,
	                        text: this.title,
	                        url: url,
	                        pic: pic
	                    }
	                }
	            }, function () {});
	        }
	    }
	};

/***/ },

/***/ 370:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(371)
	__vue_script__ = __webpack_require__(373)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/video-player.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(374)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 371:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(372);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d3510296&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./video-player.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d3510296&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./video-player.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 372:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-d3510296], a[_v-d3510296], img[_v-d3510296] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-d3510296], a[_v-d3510296], img[_v-d3510296] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-d3510296] {\n  float: right; }\n\n.border-bottom[_v-d3510296] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-d3510296] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-d3510296] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-d3510296] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-d3510296] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-d3510296] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-d3510296]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-d3510296]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-d3510296]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-d3510296] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-d3510296] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-d3510296] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-d3510296] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-d3510296] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-d3510296] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-d3510296] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-d3510296] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-d3510296] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-d3510296] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-d3510296] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-d3510296], .slide-up-leave[_v-d3510296] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.video-mask[_v-d3510296] {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 2; }\n\n.video-container[_v-d3510296] {\n  width: 100%;\n  height: auto;\n  position: relative;\n  overflow: hidden;\n  background-color: #000000; }\n  .video-container video[_v-d3510296]::-webkit-media-controls {\n    display: none; }\n  .video-container .video[_v-d3510296] {\n    display: block;\n    -webkit-background-size: auto 100%;\n       -moz-background-size: auto 100%;\n         -o-background-size: auto 100%;\n            background-size: auto 100%;\n    background-repeat: no-repeat;\n    background-position: center; }\n  .video-container .video-play[_v-d3510296] {\n    width: 12%;\n    height: 21.327%;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    z-index: 4;\n    -webkit-transform: translate(-50%, -50%);\n       -moz-transform: translate(-50%, -50%);\n        -ms-transform: translate(-50%, -50%);\n         -o-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    background: url(\"https://s.momocdn.com/w/u/img/2016/11/09/1478661069357-play-center.png\") no-repeat center;\n    -webkit-background-size: contain;\n       -moz-background-size: contain;\n         -o-background-size: contain;\n            background-size: contain; }\n  .video-container .video-pause[_v-d3510296] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/11/09/1478661069049-paused-center.png\") no-repeat center;\n    -webkit-background-size: contain;\n       -moz-background-size: contain;\n         -o-background-size: contain;\n            background-size: contain; }\n  .video-container .video-loading[_v-d3510296] {\n    background: none;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 0.5625rem; }\n    .video-container .video-loading .play-loading[_v-d3510296] {\n      margin: 0; }\n  .video-container .video-controls[_v-d3510296] {\n    width: 100%;\n    height: 1.5625rem;\n    padding-top: 0.625rem;\n    position: absolute;\n    left: 0;\n    bottom: 0; }\n    .video-container .video-controls .hideBar[_v-d3510296] {\n      opacity: 0;\n      z-index: 3; }\n    .video-container .video-controls .showBar[_v-d3510296] {\n      opacity: 1;\n      z-index: 4; }\n    .video-container .video-controls > div[_v-d3510296] {\n      width: 100%;\n      height: 1.5625rem;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      -webkit-box-sizing: border-box;\n         -moz-box-sizing: border-box;\n              box-sizing: border-box;\n      padding: 0rem 0.625rem;\n      -webkit-transition: opacity .3s;\n      -o-transition: opacity .3s;\n      -moz-transition: opacity .3s;\n      transition: opacity .3s; }\n      .video-container .video-controls > div[_v-d3510296]:first-child {\n        height: 2.1875rem;\n        padding-top: 0.625rem;\n        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(transparent), to(rgba(0, 0, 0, 0.25)));\n        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(transparent), to(rgba(0, 0, 0, 0.25)));\n        background: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.25)); }\n      .video-container .video-controls > div .control-play[_v-d3510296] {\n        float: left;\n        z-index: 8;\n        width: 1.09375rem;\n        height: 1.03125rem;\n        position: relative; }\n        .video-container .video-controls > div .control-play img[_v-d3510296] {\n          height: 0.71875rem;\n          position: absolute;\n          left: 50%;\n          top: 50%;\n          -webkit-transform: translate(-50%, -50%);\n             -moz-transform: translate(-50%, -50%);\n              -ms-transform: translate(-50%, -50%);\n               -o-transform: translate(-50%, -50%);\n                  transform: translate(-50%, -50%); }\n      .video-container .video-controls > div .pre-time[_v-d3510296] {\n        float: left;\n        padding-left: 0.6875rem;\n        color: rgba(255, 255, 255, 0.6);\n        font-size: 0.6875rem;\n        font-weight: 500;\n        line-height: 1.1875rem; }\n      .video-container .video-controls > div .progress[_v-d3510296] {\n        height: 0.09375rem;\n        position: absolute;\n        left: 4.9375rem;\n        right: 2.96875rem;\n        top: 1.1875rem; }\n        .video-container .video-controls > div .progress .progressBtn[_v-d3510296] {\n          position: absolute;\n          height: 1.875rem;\n          width: 1.875rem;\n          top: -0.875rem;\n          left: -0.9375rem; }\n          .video-container .video-controls > div .progress .progressBtn span[_v-d3510296] {\n            height: 0.75rem;\n            width: 0.75rem;\n            background: #ffffff;\n            -webkit-border-radius: 50%;\n               -moz-border-radius: 50%;\n                    border-radius: 50%;\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            -webkit-transform: translate(-50%, -50%);\n               -moz-transform: translate(-50%, -50%);\n                -ms-transform: translate(-50%, -50%);\n                 -o-transform: translate(-50%, -50%);\n                    transform: translate(-50%, -50%); }\n        .video-container .video-controls > div .progress progress[_v-d3510296] {\n          float: left;\n          width: 100%;\n          height: 100%;\n          border: none;\n          -moz-user-select: none;\n          -webkit-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n          -webkit-appearance: none;\n          -moz-appearance: none;\n               appearance: none; }\n          .video-container .video-controls > div .progress progress[_v-d3510296]::-webkit-progress-bar {\n            background-color: rgba(255, 255, 255, 0.5); }\n          .video-container .video-controls > div .progress progress[_v-d3510296]::-webkit-progress-value {\n            background-color: #ffffff; }\n      .video-container .video-controls > div .time-left-ctrl[_v-d3510296] {\n        float: right;\n        color: rgba(255, 255, 255, 0.6);\n        line-height: 1.1875rem;\n        font-size: 0.6875rem;\n        font-weight: 500; }\n      .video-container .video-controls > div .video-views[_v-d3510296] {\n        float: left;\n        height: 0.9375rem;\n        line-height: 0.9375rem;\n        font-size: 0.6875rem;\n        font-weight: 500;\n        color: rgba(255, 255, 255, 0.6); }\n      .video-container .video-controls > div .time-left[_v-d3510296] {\n        float: right;\n        height: 0.875rem;\n        line-height: 0.875rem;\n        padding: 0 0.15625rem 0 0.5625rem;\n        font-weight: 500;\n        font-size: 0.6875rem;\n        color: rgba(255, 255, 255, 0.6);\n        -webkit-border-radius: 0.46875rem;\n           -moz-border-radius: 0.46875rem;\n                border-radius: 0.46875rem;\n        border: 1px solid rgba(255, 255, 255, 0.3);\n        background-color: rgba(0, 0, 0, 0.5); }\n        .video-container .video-controls > div .time-left span[_v-d3510296], .video-container .video-controls > div .time-left img[_v-d3510296] {\n          float: left;\n          display: inline-block; }\n        .video-container .video-controls > div .time-left span[_v-d3510296] {\n          min-width: 2.03125rem;\n          text-align: left;\n          line-height: 0.875rem; }\n        .video-container .video-controls > div .time-left img[_v-d3510296] {\n          opacity: .6;\n          margin: 0.1875rem 0.25rem 0 0; }\n", ""]);
	
	// exports


/***/ },

/***/ 373:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _loading = __webpack_require__(252);
	
	var _loading2 = _interopRequireDefault(_loading);
	
	var _data = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: {
	        video: {},
	        readCount: {},
	        token: {},
	        pid: {},
	        isIndex: false,
	        index: ''
	    },
	    data: function data() {
	        return {
	            loading: false,
	            playing: false,
	            showPlayBtn: true,
	            controlShow: {
	                show: false,
	                control: false
	            },
	            progress: {
	                totalTimeS: 1,
	                nowTimeS: 0,
	                nowTime: 0,
	                timeLeft: 0,
	                timeLeftSpecial: 0
	            },
	            positionAnimation: {},
	            timer: {
	                styleTimer: '',
	                controlTimer: '',
	                visibility: ''
	            },
	            targetBtn: {},
	            firstPlay: true,
	            showBackground: false
	        };
	    },
	    components: {
	        loading: _loading2.default
	    },
	    computed: {
	        videoSize: function videoSize() {
	            return {
	                width: $(window).width(),
	                height: Math.ceil($(window).width() * 9 / 16)
	            };
	        },
	        controlStyle: function controlStyle() {
	            if (this.controlShow.show) {
	                return {
	                    '-webkit-transition': 'opacity .2s',
	                    transition: 'opacity .2s',
	                    opacity: 1
	                };
	            } else {
	                return {
	                    '-webkit-transition': 'opacity .2s',
	                    transition: 'opacity .2s',
	                    opacity: 0
	                };
	            }
	        }
	    },
	    created: function created() {},
	    watch: {
	        'controlShow.show': function controlShowShow(val) {
	            if (val) {
	                this.positionAnimation = {
	                    '-webkit-transition': 'none',
	                    transition: 'none',
	                    '-webkit-transform': 'translate3d(' + $(this.$el).find('progress').width() * this.$els.video.currentTime / this.$els.video.duration + 'px,0,0)',
	                    transform: 'translate3d(' + $(this.$el).find('progress').width() * this.$els.video.currentTime / this.$els.video.duration + 'px,0,0)'
	                };
	            }
	        },
	        'playing': function playing(val) {
	            this.calculateProgress();
	        }
	    },
	    methods: {
	        exitFullscreen: function exitFullscreen() {
	            var video = this.$els.video;
	            if (video.exitFullscreen) {
	                video.exitFullscreen();
	            } else if (video.webkitExitFullscreen) {
	                video.webkitExitFullscreen();
	            }
	        },
	
	        setPhoneNetwork: function setPhoneNetwork(val) {
	            this.alertOptions.phoneNetwork = val;
	        },
	        networkAlert: function networkAlert(done) {
	            var _this2 = this;
	
	            var _this = this;
	
	            mm.device.getNetworkType(function (res) {
	                if (res) {
	                    if (res.network_type != 'wifi') {
	                        mm.storage.getItem({
	                            path: 'circle2',
	                            key: 'networkAlert'
	                        }, function (date) {
	                            var t = new Date();
	                            if (!date || date == '' || parseInt(date) + 24 * 60 * 60 * 1000 < t.getTime()) {
	                                if (_this2.isIndex) {
	                                    var alertConfirm = _this2.$parent.$parent.$parent.$parent.$parent.$parent;
	                                    alertConfirm.flowConfirm.show = true;
	                                    alertConfirm.flowConfirm.title = '提示';
	                                    alertConfirm.flowConfirm.content = '你正在使用移动网络，继续播放将消耗流量';
	                                    alertConfirm.flowConfirm.videoIndex = _this2.index;
	                                } else {
	                                    var _alertConfirm = _this2.$parent;
	                                    _alertConfirm.confirm.type = 1;
	                                    _alertConfirm.confirm.show = true;
	                                    _alertConfirm.confirm.title = '提示';
	                                    _alertConfirm.confirm.content = '你正在使用移动网络，继续播放将消耗流量';
	                                    _alertConfirm.confirm.text = '';
	                                }
	                            } else {
	                                done();
	                            }
	                        });
	                    } else {
	                        done();
	                    }
	                } else {
	                    done();
	                }
	            });
	            if (mm.momo_version == '0.0') {
	                done();
	            }
	        },
	        pauseAll: function pauseAll() {
	            if (this.$parent.$parent) {
	                var videos = this.$root.$refs.page.$children[2].$children[0].$refs.videos;
	                for (var i = 0; i < videos.length; i++) {
	                    var videoObj = videos[i].$children[0].$refs.video;
	                    videoObj.$els.video.pause();
	                    videoObj.playing = false;
	                    videoObj.loading = false;
	                    videoObj.showPlayBtn = true;
	                }
	            }
	        },
	        videoPlayPv: function videoPlayPv() {
	            mk.ajax({
	                data: {
	                    token: this.token,
	                    pid: this.pid,
	                    source: this.isIndex ? 'index' : 'post-detail'
	                },
	                url: '/inc/quanzi/v2/post/statPlayPv',
	                dataType: 'json',
	                type: 'post',
	                useCache: false,
	                success: function success() {},
	                error: function error() {}
	            });
	            this.firstPlay = false;
	        },
	
	        videoPlay: function videoPlay(controlBtn) {
	            var _this3 = this;
	
	            var _this = this;
	            if (this.playing) {
	                clearInterval(this.timer.visibility);
	                this.$els.video.pause();
	                this.playing = false;
	                this.loading = false;
	            } else {
	                this.pauseAll();
	                this.networkAlert(function () {
	                    mm.storage.setItem({
	                        path: 'circle2',
	                        key: 'videoIndex',
	                        value: _this3.index
	                    });
	
	                    if (_this3.firstPlay) {
	                        _this3.loading = true;
	                    }
	                    _this3.$els.video.play();
	                    _this3.playing = true;
	                    _this3.exitFullscreen;
	                    if (controlBtn) {
	                        clearTimeout(_this3.timer.controlTimer);
	                    }
	                    if (_this3.playing && !_this3.loading) {
	                        _this3.showPlayBtn = false;
	                    }
	
	                    _this3.hideControlBar();
	                });
	
	                if (this.firstPlay && this.token && this.pid) {
	                    this.videoPlayPv();
	                }
	            }
	        },
	        ended: function ended() {
	            clearInterval(this.timer.styleTimer);
	            this.playing = false;
	            this.showPlayBtn = true;
	        },
	
	        controlToggle: function controlToggle() {
	            if (this.controlShow.show) {
	                this.controlShow.show = false;
	                if (this.playing) {
	                    this.showPlayBtn = false;
	                }
	            } else {
	                this.controlShow.show = true;
	                if (this.playing) {
	                    this.showPlayBtn = true;
	                }
	                this.hideControlBar();
	            }
	        },
	        hideControlBar: function hideControlBar() {
	            var _this4 = this;
	
	            clearTimeout(this.timer.controlTimer);
	            this.timer.controlTimer = setTimeout(function () {
	                _this4.controlShow.show = false;
	                if (_this4.playing) {
	                    _this4.showPlayBtn = false;
	                }
	            }, 6000);
	        },
	
	        loadedmetadata: function loadedmetadata() {
	            this.progress.totalTimeS = this.$els.video.duration;
	            this.progress.nowTimeS = this.$els.video.currentTime;
	            this.progress.nowTime = this.formatTime(this.$els.video.currentTime);
	            this.progress.timeLeft = this.formatTime(this.$els.video.duration - this.$els.video.currentTime);
	            this.progress.timeLeftSpecial = this.formatTime(this.$els.video.duration - this.$els.video.currentTime, true);
	        },
	
	        timeupdate: function timeupdate() {
	            if (this.$els.video.currentTime == this.$els.video.duration) {
	                this.$els.video.currentTime = 0;
	                this.positionAnimation = {
	                    '-webkit-transition': 'transform linear',
	                    transition: 'transform linear',
	                    '-webkit-transform': 'translate3d(0,0,0)',
	                    transform: 'translate3d(0,0,0)'
	                };
	            }
	            this.progress.nowTimeS = this.$els.video.currentTime;
	            this.progress.nowTime = this.formatTime(this.$els.video.currentTime);
	            this.progress.timeLeft = this.formatTime(this.$els.video.duration - this.$els.video.currentTime);
	            this.progress.timeLeftSpecial = this.formatTime(this.$els.video.duration - this.$els.video.currentTime, true);
	        },
	
	        formatTime: function formatTime(t, type) {
	            if (!type) {
	                return Math.floor(t / 60) == 0 ? '0' + Math.floor(t / 60) + ':' + (Math.floor(t % 60) / 100).toFixed(2).slice(-2) : Math.floor(t / 60) + ':' + (Math.floor(t % 60) / 100).toFixed(2).slice(-2);
	            } else {
	                return Math.floor(t / 60) + '′' + (Math.floor(t % 60) / 100).toFixed(2).slice(-2);
	            }
	        },
	
	        targetBtnStart: function targetBtnStart(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.targetBtn = {
	                startX: e.touches[0].clientX,
	                startY: e.touches[0].clientY,
	                preX: $(this.$el).find('.progressBtn').css('transform'),
	                nowX: ''
	            };
	            clearInterval(this.timer.styleTimer);
	            clearTimeout(this.timer.controlTimer);
	        },
	        targetBtnMove: function targetBtnMove(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var nowPosition = {
	                clientX: e.touches[0].clientX,
	                clientY: e.touches[0].clientY
	            };
	            var pre = this.targetBtn.preX,
	                offset = void 0,
	                now = void 0;
	            pre = parseInt(pre.substring(12, pre.length - 11));
	            offset = nowPosition.clientX - this.targetBtn.startX;
	            now = pre + offset;
	            if (now < 0) {
	                now = 0;
	            }
	            if (now > $(this.$el).find('progress').width()) {
	                now = $(this.$el).find('progress').width();
	            }
	
	            this.targetBtn.nowX = now;
	            this.positionAnimation = {
	                '-webkit-transition': 'transform linear',
	                transition: 'transform linear',
	                '-webkit-transform': 'translate3d(' + now + 'px,0,0)',
	                transform: 'translate3d(' + now + 'px,0,0)'
	            };
	
	            var seekTime = this.targetBtn.nowX / $(this.$el).find('progress').width() * this.progress.totalTimeS;
	            this.$els.video.currentTime = seekTime;
	        },
	        targetBtnEnd: function targetBtnEnd(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.calculateProgress();
	            this.hideControlBar();
	        },
	
	        calculateProgress: function calculateProgress() {
	            var _this5 = this;
	
	            if (this.playing) {
	                this.timer.styleTimer = setInterval(function () {
	                    if (_this5.$els.video.currentTime != 0) {
	                        _this5.positionAnimation = {
	                            '-webkit-transition': 'transform 0.2s linear',
	                            transition: 'transform 0.2s linear',
	                            '-webkit-transform': 'translate3d(' + $(_this5.$el).find('progress').width() * _this5.$els.video.currentTime / _this5.$els.video.duration + 'px,0,0)',
	                            transform: 'translate3d(' + $(_this5.$el).find('progress').width() * _this5.$els.video.currentTime / _this5.$els.video.duration + 'px,0,0)'
	                        };
	                    } else {
	                        _this5.positionAnimation = {
	                            transition: 'none',
	                            '-webkit-transform': 'translate3d(0,0,0)',
	                            transform: 'translate3d(0,0,0)'
	                        };
	                    }
	                }, 200);
	            } else {
	                clearInterval(this.timer.styleTimer);
	            }
	        }
	    },
	    ready: function ready() {
	        var _this6 = this;
	
	        var BASE_OFFSET = parseFloat($('body').css('font-size')) / 16;
	        if ($(this.$el).offset().top && $(this.$el).offset().top < $(window).height() + BASE_OFFSET * 400) {
	            this.showBackground = true;
	        }
	
	        this.$els.video.controls = false;
	        this.$els.video.addEventListener("playing", function (val) {
	            if (val.type == "playing") {
	                _this6.loading = false;
	                _this6.showPlayBtn = false;
	            }
	        });
	    }
	};

/***/ },

/***/ 374:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"video-container\" :style=\"{height: videoSize.height + 'px'}\" _v-d3510296=\"\">\n    <video class=\"video\" :style=\"{backgroundImage: 'url(' + showBackground ? video.cover_url : 'https://s.momocdn.com/w/u/img/2016/12/16/1481872386646-bg.png' + ')'}\" :width=\"videoSize.width\" :height=\"videoSize.height\" :poster=\"showBackground ? video.cover_url : 'https://s.momocdn.com/w/u/img/2016/12/16/1481872386646-bg.png'\" preload=\"metadata\" playsinline=\"true\" webkit-playsinline=\"true\" x-webkit-airplay=\"true\" v-el:video=\"\" controls=\"false\" @click=\"controlToggle\" @loadedmetadata=\"loadedmetadata\" @timeupdate=\"timeupdate\" @ended=\"ended\" _v-d3510296=\"\">\n        <source :src=\"video.video_url\" type=\"video/mp4\" _v-d3510296=\"\">\n    </video>\n    <div v-if=\"!playing\" @click=\"controlToggle\" class=\"video-mask\" _v-d3510296=\"\"></div>\n    <div :class=\"['video-play', {'video-pause': playing, 'video-loading': loading }]\" @click=\"videoPlay(false)\" v-if=\"showPlayBtn\" _v-d3510296=\"\">\n        <loading class=\"play-loading\" v-if=\"loading\" _v-d3510296=\"\"></loading>\n    </div>\n    <div class=\"video-controls\" _v-d3510296=\"\">\n        <div :class=\"{hideBar:!controlShow.show,showBar:controlShow.show}\" _v-d3510296=\"\">\n            <div class=\"control-play\" @click=\"videoPlay(true)\" _v-d3510296=\"\">\n                <img v-show=\"!playing\" src=\"https://s.momocdn.com/w/u/img/2016/11/09/1478660513488-play.png\" _v-d3510296=\"\">\n                <img v-show=\"playing\" src=\"https://s.momocdn.com/w/u/img/2016/11/09/1478661069312-paused.png\" _v-d3510296=\"\">\n            </div>\n            <div class=\"pre-time\" _v-d3510296=\"\">\n                {{progress.nowTime}}\n            </div>\n            <div class=\"progress\" _v-d3510296=\"\">\n                <div class=\"progressBtn\" :style=\"positionAnimation\" @touchstart=\"targetBtnStart\" @touchmove=\"targetBtnMove\" @touchend=\"targetBtnEnd\" _v-d3510296=\"\">\n                    <span _v-d3510296=\"\"></span>\n                </div>\n                <progress :value=\"progress.nowTimeS\" :max=\"progress.totalTimeS\" _v-d3510296=\"\">(*^__^*)</progress>\n            </div>\n            <div class=\"time-left-ctrl\" _v-d3510296=\"\">\n                {{progress.timeLeft}}\n            </div>\n        </div>\n        <div :class=\"{hideBar:controlShow.show,showBar:!controlShow.show}\" _v-d3510296=\"\">\n            <div class=\"video-views\" _v-d3510296=\"\">{{readCount}}播放</div>\n            <div class=\"time-left\" v-if=\"progress.timeLeftSpecial != 0\" _v-d3510296=\"\">\n                <img v-if=\"playing\" src=\"https://s.momocdn.com/w/u/img/2016/11/16/1479286704666-Beat2.gif\" _v-d3510296=\"\">\n                <span _v-d3510296=\"\">{{progress.timeLeftSpecial}}″</span>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 375:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"post-wrapper\" _v-0b347760=\"\">\n    <div class=\"user-info\" v-if=\"user\" @click.prevent=\"openUserProfile(user.momoid)\" _v-0b347760=\"\">\n        <a href=\"javascript:\" _v-0b347760=\"\">\n            <img class=\"user-avatar\" :src=\"user.img\" v-load=\"fade\" _v-0b347760=\"\">\n        </a>\n        <h4 :class=\"userNameClassObj\" _v-0b347760=\"\">\n            <span class=\"name-text\" v-html=\"user.name\" _v-0b347760=\"\"></span>\n        </h4>\n        <div class=\"user-badge\" _v-0b347760=\"\">\n            <icon type=\"gender\" :gender=\"user.sex\" :age=\"user.age\" _v-0b347760=\"\"></icon>\n            <!--<icon type=\"vip\" v-if=\"user.svip_info.valid\" :level=\"user.vip_info.active_level\" :year=\"user.vip_info.year\" :svip=\"user.svip_info.valid\"></icon>-->\n            <icon v-if=\"user.label == 3\" type=\"circleadmin\" _v-0b347760=\"\"></icon>\n            <icon v-if=\"user.label == 2\" type=\"red-people\" _v-0b347760=\"\"></icon>\n            <icon v-if=\"user.label == 1\" type=\"popular\" _v-0b347760=\"\"></icon>\n            <icon type=\"circle-level\" :level=\"user.quanzi_level\" _v-0b347760=\"\"></icon>\n        </div>\n        <img class=\"user-go\" src=\"https://s.momocdn.com/w/u/img/2016/11/09/1478676561650-right.png\" _v-0b347760=\"\">\n    </div>\n    <video-player :video=\"video\" :read-count=\"readCount\" :pid=\"pid\" :token=\"token\" :index=\"videoIndex\" is-index=\"true\" v-ref:video=\"\" _v-0b347760=\"\">\n    </video-player>\n    <div class=\"video-info\" _v-0b347760=\"\">\n        <div class=\"video-info-title\" v-on:click.stop.prevent=\"openDetailAndShowInput(e,0)\" _v-0b347760=\"\">\n            {{title}}\n        </div>\n        <div class=\"video-info-more\" _v-0b347760=\"\">\n            <div class=\"share\" v-on:click.stop.prevent=\"sharePost\" _v-0b347760=\"\">\n                <p _v-0b347760=\"\">\n                    <img src=\"https://s.momocdn.com/w/u/img/2016/11/17/1479357016002-share.png\" _v-0b347760=\"\">\n                    <!-- <img src=\"https://s.momocdn.com/w/u/img/2016/11/09/1478673811989-share.png\"/> -->\n                </p>\n            </div>\n            <div class=\"agree\" v-on:click=\"likePost\" _v-0b347760=\"\">\n                <p _v-0b347760=\"\">\n                    <img :src=\"agreeSrc\" _v-0b347760=\"\">\n                    <span v-if=\"likeCount != 0\" :class=\"{'like-count-blue': isLike == 1}\" _v-0b347760=\"\">{{likeCount}}</span>\n                </p>\n            </div>\n            <div class=\"comment\" v-on:click.stop.prevent=\"openDetailAndShowInput(e,1)\" _v-0b347760=\"\">\n                <p _v-0b347760=\"\">\n                    <img src=\"https://s.momocdn.com/w/u/img/2016/11/17/1479356013080-comment.png\" _v-0b347760=\"\">\n                    <!-- <img src=\"https://s.momocdn.com/w/u/img/2016/11/09/1478673811941-comment.png\"/> -->\n                    <span v-if=\"commentCount != 0\" _v-0b347760=\"\">{{commentCount}}</span>\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 376:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div _v-0db7c91e=\"\">\n    <div class=\"video-list\" _v-0db7c91e=\"\">\n        <div class=\"mycircle-wrapper\" v-if=\"firstDisplay\" _v-0db7c91e=\"\">\n            <!-- <div class=\"new-video-tips\" v-if=\"videoPostTip.num != 0 && videoPostTip.tip\" :style=\"tipStyle\">\n                为你推荐{{videoPostTip.num}}条新视频\n            </div> -->\n            <div v-if=\"videoPosts &amp;&amp; videoPosts.length > 0\" _v-0db7c91e=\"\">\n                <list-group v-for=\"item in videoPosts\" track-by=\"pid\" v-ref:videos=\"\" _v-0db7c91e=\"\">\n                    <post-video :video-index=\"$index\" :title=\"item.title\" :content=\"item.content\" :like_cnt=\"item.like_cnt\" :images=\"item.pics\" :distance=\"item.distance\" :comment-count=\"item.comment_count\" :like-count=\"item.like_cnt\" :read-count=\"item.read_cnt\" :image-count=\"item.pic_count\" :link=\"item.goto\" :is-elite=\"item.status.elite\" :is-top=\"item.status.top\" :is-new=\"item.status.new\" :is-like=\"item.is_like\" :user=\"item.user\" :time=\"item.time\" :video=\"item.video\" :op=\"refresh\" :pid=\"item.pid\" _v-0db7c91e=\"\"></post-video>\n                </list-group>\n            </div>\n            <div class=\"loading-tip\" _v-0db7c91e=\"\">\n                <span _v-0db7c91e=\"\">\n                    <icon type=\"loading\" v-if=\"!isLoadedALL\" _v-0db7c91e=\"\"></icon>\n                </span>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 377:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(378)
	__vue_script__ = __webpack_require__(380)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/pages/index/components/search-area.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(381)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(379);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e481caf0&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search-area.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e481caf0&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search-area.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-e481caf0], a[_v-e481caf0], img[_v-e481caf0] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-e481caf0], a[_v-e481caf0], img[_v-e481caf0] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-e481caf0] {\n  float: right; }\n\n.border-bottom[_v-e481caf0] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-e481caf0] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-e481caf0] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-e481caf0] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-e481caf0] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-e481caf0] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-e481caf0]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-e481caf0]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-e481caf0]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-e481caf0] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-e481caf0] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-e481caf0] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-e481caf0] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-e481caf0] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-e481caf0] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-e481caf0] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-e481caf0] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-e481caf0] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-e481caf0] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-e481caf0] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-e481caf0], .slide-up-leave[_v-e481caf0] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n*[_v-e481caf0], a[_v-e481caf0], img[_v-e481caf0] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.hot-keywords-wrapper[_v-e481caf0] {\n  padding: 0 0.9375rem;\n  margin: 1.5625rem 0; }\n\n.hot-keyword-title[_v-e481caf0] {\n  margin-bottom: 0.625rem;\n  color: #b7b7b7;\n  font-size: 0.75rem;\n  line-height: 1;\n  font-weight: normal; }\n\n.hot-keyword-item[_v-e481caf0] {\n  float: left;\n  background-color: #fff;\n  font-size: 0.875rem;\n  -webkit-border-radius: 0.15625rem;\n     -moz-border-radius: 0.15625rem;\n          border-radius: 0.15625rem;\n  margin: 0 0.625rem 0.625rem 0;\n  padding: 0.4375rem 0.9375rem;\n  color: #a0a0a0; }\n  .hot-keyword-item[_v-e481caf0]:active {\n    background: #e5e4e4; }\n\n.search-result-item[_v-e481caf0] {\n  position: relative; }\n\n.search-result-avatar[_v-e481caf0] {\n  position: absolute;\n  top: 0.8125rem;\n  left: 0;\n  height: 2.8125rem;\n  width: 2.8125rem;\n  -webkit-border-radius: 0.25rem;\n     -moz-border-radius: 0.25rem;\n          border-radius: 0.25rem; }\n\n.search-result-item-wrapper[_v-e481caf0] {\n  display: block;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0.9375rem 0.625rem 0.9375rem 0; }\n  .search-result-item-wrapper > h5[_v-e481caf0] {\n    margin-top: 0.15625rem;\n    margin-bottom: 0.3125rem;\n    font-size: 1rem;\n    font-weight: normal;\n    line-height: 1;\n    color: #1e1e1e;\n    max-width: 68%;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap; }\n  .search-result-item-wrapper > span[_v-e481caf0] {\n    font-size: 0.8125rem;\n    line-height: 1;\n    color: #aaaaaa; }\n\n.search-result-btn[_v-e481caf0] {\n  position: absolute;\n  top: 50%;\n  right: 0.75rem;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-transform: translate(0, -50%);\n     -moz-transform: translate(0, -50%);\n      -ms-transform: translate(0, -50%);\n       -o-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  background-color: #3868fb;\n  -webkit-border-radius: 0.15625rem;\n     -moz-border-radius: 0.15625rem;\n          border-radius: 0.15625rem;\n  font-size: 0.875rem;\n  color: #fff;\n  text-align: center;\n  line-height: 1.875rem;\n  padding: 0;\n  min-width: 3.4375rem;\n  padding: 0 0.46875rem;\n  height: 1.875rem;\n  z-index: 1; }\n\n.search-result-tip[_v-e481caf0] {\n  position: absolute;\n  top: 50%;\n  right: 1.5625rem;\n  font-size: 0.75rem;\n  -webkit-transform: translate(0, -50%);\n     -moz-transform: translate(0, -50%);\n      -ms-transform: translate(0, -50%);\n       -o-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  color: #aaaaaa; }\n\n.search-result-none[_v-e481caf0] {\n  padding: 9.375rem 2.65625rem; }\n  .search-result-none .icon.icon-empty-blue[_v-e481caf0] {\n    display: block;\n    margin: 0 auto 1.8125rem; }\n\n.search-result-occupied[_v-e481caf0] {\n  display: block;\n  margin: 0 auto 1.875rem;\n  width: 13.33333333%; }\n\n.search-result-none-title[_v-e481caf0] {\n  color: #5a5a5a;\n  font-size: 1rem;\n  line-height: 1.25rem;\n  text-align: center;\n  font-weight: normal; }\n\n.search-result-none-tip[_v-e481caf0] {\n  text-align: center;\n  color: #aaaaaa;\n  font-size: 0.8125rem;\n  line-height: 1.3125rem;\n  margin-bottom: 1.5625rem; }\n\n.result-list[_v-e481caf0] {\n  overflow: auto; }\n\n.search-input-wrapper[_v-e481caf0] {\n  position: relative;\n  z-index: 1; }\n\n.search-result-wrapper[_v-e481caf0] {\n  /*padding-bottom: 1px;*/ }\n\n.search-header[_v-e481caf0] {\n  background: #f0f0f0; }\n\n.search-header > div + div[_v-e481caf0] {\n  padding: 0 0.40625rem; }\n\n.search-result-item[_v-e481caf0] {\n  position: static; }\n\n.search-result-avatar[_v-e481caf0] {\n  left: 0.78125rem; }\n\n.search-input-wrapper.search-input-wrapper-focus[_v-e481caf0] {\n  background: whitesmoke !important; }\n", ""]);
	
	// exports


/***/ },

/***/ 380:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _searchInput = __webpack_require__(64);
	
	var _searchInput2 = _interopRequireDefault(_searchInput);
	
	var _icon = __webpack_require__(69);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _listGroup = __webpack_require__(44);
	
	var _listGroup2 = _interopRequireDefault(_listGroup);
	
	var _listGroupItem = __webpack_require__(49);
	
	var _listGroupItem2 = _interopRequireDefault(_listGroupItem);
	
	var _button = __webpack_require__(74);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _store = __webpack_require__(303);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _actions = __webpack_require__(327);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: {
	        show: {
	            default: true
	        }
	    },
	    vuex: {
	        actions: {
	            searchCircle: _actions.searchCircle,
	            setSearchText: _actions.setSearchText,
	            closeSearch: _actions.closeSearch,
	            joinCircle: _actions.joinCircle,
	            searchCircleNextPage: _actions.searchCircleNextPage,
	            openSearch: _actions.openSearch
	        },
	        getters: {
	            showInputMask: function showInputMask(state) {
	                return state.inputArea.show;
	            },
	            searchText: function searchText(state) {
	                return state.inputArea.searchText;
	            },
	            searchPlaceholder: function searchPlaceholder(state) {
	                return state.inputArea.placeholder;
	            },
	            searchCircleResult: function searchCircleResult(state) {
	                return state.inputArea.circles;
	            },
	            isAbleCreate: function isAbleCreate(state) {
	                return state.inputArea.isAbleCreate;
	            },
	            hotKeywords: function hotKeywords(state) {
	                return state.inputArea.hotKeywords;
	            },
	            hotTypes: function hotTypes(state) {
	                return state.inputArea.hotTypes;
	            },
	            page: function page(state) {
	                return state.inputArea.page;
	            },
	            isLoadingSearch: function isLoadingSearch(state) {
	                return state.inputArea.isLoadingSearch;
	            }
	        }
	    },
	    data: function data() {
	        return {
	            isTransfromBug: $.os.ios && parseFloat($.os.version) < 10
	        };
	    },
	
	    components: {
	        SearchInput: _searchInput2.default, Icon: _icon2.default, ListGroup: _listGroup2.default, ListGroupItem: _listGroupItem2.default, vButton: _button2.default
	    },
	    ready: function ready() {
	        var $resultList = $(this.$refs.searchInput.$els.resultList);
	        $resultList.on('scroll', this.scrollLoadData);
	    },
	
	    methods: {
	        blurInput: function blurInput() {},
	        clickPlaceholder: function clickPlaceholder() {
	            if ($.os.android && parseFloat($.os.version) < 4.4) {
	                mm.ui.openUrl({
	                    target: 1,
	                    url: './circle-all.html?_bid=1090&keywords='
	                });
	                return false;
	            } else {
	                return true;
	            }
	        },
	        onOpen: function onOpen() {
	            if (this.isTransfromBug) {
	                $('.search-input-wrapper').attr('style', '');
	            }
	            this.toggleTransfrom(true);
	            this.openSearch();
	        },
	        onClose: function onClose() {
	            if (this.isTransfromBug) {
	                $('.search-input-wrapper').css('position', 'relative');
	            }
	            this.toggleTransfrom(false);
	
	            this.closeSearch();
	        },
	        keywordChange: function keywordChange(keyword) {
	            var _this = this;
	
	            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	            var $resultList = $(this.$refs.searchInput.$els.resultList);
	
	            if (typeof keyword != 'string') return;
	            this.setSearchText(keyword, type);
	            $resultList.on('scroll', this.scrollLoadData);
	            if (keyword) {
	                this.searchCircle(function () {
	
	                    if (_this.isTransfromBug) {
	                        $('.search-input-wrapper').css('position', 'absolute');
	                        setTimeout(function () {
	                            $('.search-input-wrapper').css('position', 'fixed');
	                        }, 0);
	                    }
	                });
	            }
	        },
	        createCircleLink: function createCircleLink() {
	            mm.ui.openUrl({
	                target: 1,
	                url: 'https://m.immomo.com/s/circle2/create-index.html?_bid=1090'
	            });
	        },
	        scrollLoadData: function scrollLoadData() {
	            var _this2 = this;
	
	            var $resultList = $(this.$refs.searchInput.$els.resultList);
	
	            var docHeight = $resultList.children().height();
	            var scrollTop = $resultList.scrollTop();
	            var windowHeight = $resultList.height();
	            if (docHeight == windowHeight + scrollTop) {
	                $resultList.off('scroll', this.scrollLoadData);
	                this.searchCircleNextPage(function () {
	                    if (_this2.page.p != _this2.page.totalPage) {
	                        $resultList.on('scroll', _this2.scrollLoadData);
	                    }
	                });
	            }
	        },
	        toggleTransfrom: function toggleTransfrom(show) {
	            var tab = this.$root.$els.tab,
	                tabHeight = $(tab).height();
	
	            if (show) {
	                $(this.$el).css('z-index', 8).find('.search-input-container').css('transform', 'translate3d(0,' + -tabHeight + 'px,0)').css('-webkit-transform', 'translate3d(0,' + -tabHeight + 'px,0)');
	            } else {
	
	                $(this.$el).css('z-index', 5).find('.search-input-container').css('transform', '').css('-webkit-transform', '');
	            }
	        }
	    }
	};

/***/ },

/***/ 381:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n<div _v-e481caf0=\"\">\n    <search-input class=\"search-input-container\" :show-input-mask=\"showInputMask\" :is-index=\"true\" :search-text=\"searchText\" :click-placeholder=\"clickPlaceholder\" :placeholder=\"searchPlaceholder\" :is-transition=\"true\" v-on:blur=\"blurInput\" v-on:change=\"keywordChange\" v-on:close=\"onClose\" v-on:open=\"onOpen\" v-ref:search-input=\"\" _v-e481caf0=\"\">\n        <div class=\"hot-keywords-wrapper\" v-if=\"hotKeywords &amp;&amp; hotKeywords.length &amp;&amp; searchCircleResult.length == 0 &amp;&amp; searchText == ''\" _v-e481caf0=\"\">\n            <h5 class=\"hot-keyword-title\" _v-e481caf0=\"\">热门关键字</h5>\n            <ul class=\"hot-keyword-list clearfix\" _v-e481caf0=\"\">\n                <li class=\"hot-keyword-item\" v-for=\"keyword in hotKeywords\" v-on:click=\"keywordChange(keyword)\" _v-e481caf0=\"\">\n                    {{keyword}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"hot-keywords-wrapper\" v-if=\"hotTypes &amp;&amp; hotTypes.length &amp;&amp; searchCircleResult.length == 0 &amp;&amp; searchText == ''\" _v-e481caf0=\"\">\n            <h5 class=\"hot-keyword-title\" _v-e481caf0=\"\">按分类查找</h5>\n            <ul class=\"hot-keyword-list clearfix\" _v-e481caf0=\"\">\n                <li class=\"hot-keyword-item\" v-for=\"type in hotTypes\" v-on:click=\"keywordChange(type)\" _v-e481caf0=\"\">\n                    {{type}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"search-result-wrapper\" v-if=\"searchText &amp;&amp; searchCircleResult.length != 0\" _v-e481caf0=\"\">\n            <list-group _v-e481caf0=\"\">\n                <list-group-item v-for=\"circle in searchCircleResult\" track-by=\"qid\" :image=\"circle.avatar\" :href=\"circle.goto\" size=\"md\" _v-e481caf0=\"\">\n                    <div class=\"search-result-item\" _v-e481caf0=\"\">\n                        <!--<img class=\"search-result-avatar\" :src=\"circle.avatar\">-->\n                        <a class=\"search-result-item-wrapper\" v-open=\"_blank\" _v-e481caf0=\"\">\n                            <h5 _v-e481caf0=\"\">{{circle.qname}}</h5>\n                            <span _v-e481caf0=\"\">{{circle.desc}}</span>\n                        </a>\n                        <a class=\"search-result-btn\" href=\"javascript:\" v-if=\"!circle.is_member\" v-on:click.prevent.stop=\"joinCircle(circle.qid)\" _v-e481caf0=\"\">加入</a>\n                        <a class=\"search-result-tip\" href=\"javascript:\" v-else=\"\" _v-e481caf0=\"\">已加入</a>\n                    </div>\n                </list-group-item>\n            </list-group>\n        </div>\n        <div class=\"search-result-none\" v-if=\"searchText &amp;&amp; searchCircleResult.length == 0 &amp;&amp; !isLoadingSearch &amp;&amp; isAbleCreate\" _v-e481caf0=\"\">\n            <icon type=\"empty-blue\" _v-e481caf0=\"\"></icon>\n            <h3 class=\"search-result-none-title\" _v-e481caf0=\"\">未找到圈子</h3>\n            <p class=\"search-result-none-tip\" _v-e481caf0=\"\">没有找到\"{{searchText}}\"相关圈子</p>\n            <v-button :block=\"true\" href=\"javascript:\" v-on:click.prevent=\"createCircleLink\" _v-e481caf0=\"\">创建</v-button>\n        </div>\n    </search-input>\n</div>\n";

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(383)
	__vue_script__ = __webpack_require__(385)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/pages/index/components/search-input-new.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(386)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 383:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(384);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6f22259c&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search-input-new.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6f22259c&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search-input-new.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n*[_v-6f22259c], a[_v-6f22259c], img[_v-6f22259c] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n*[_v-6f22259c], a[_v-6f22259c], img[_v-6f22259c] {\n  -webkit-tap-highlight-color: transparent !important; }\n\n.pull-right[_v-6f22259c] {\n  float: right; }\n\n.border-bottom[_v-6f22259c] {\n  border-bottom: 1px solid #f0f0f0; }\n\n.border-top[_v-6f22259c] {\n  border-top: 1px solid #f0f0f0; }\n\n.border-left[_v-6f22259c] {\n  border-left: 1px solid #f0f0f0; }\n\n.border-right[_v-6f22259c] {\n  border-right: 1px solid #f0f0f0; }\n\n.other-info-wrapper[_v-6f22259c] {\n  font-size: 0.75rem;\n  color: #bebebe;\n  vertical-align: middle;\n  line-height: 1rem;\n  position: relative; }\n  .other-info-wrapper .comment-num[_v-6f22259c] {\n    display: inline-block;\n    position: relative;\n    float: right;\n    text-align: left;\n    padding: 0px;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box; }\n    .other-info-wrapper .comment-num[_v-6f22259c]:before {\n      content: ' ';\n      display: block;\n      width: 0.75rem;\n      height: 0.75rem;\n      background-image: url(\"https://s.momocdn.com/w/u/img/2016/04/14/1460621908608-talkpop.png\");\n      -webkit-background-size: 100% 100%;\n         -moz-background-size: 100% 100%;\n           -o-background-size: 100% 100%;\n              background-size: 100% 100%;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: -1.21875rem;\n      top: 0.09375rem; }\n\n.arrow[_v-6f22259c]:after {\n  content: '';\n  width: 0.46875rem;\n  height: 0.46875rem;\n  border: 0.09375rem solid #bebebe;\n  border-width: 0 0.09375rem 0.09375rem 0;\n  -moz-transform: rotate(-45deg);\n   -ms-transform: rotate(-45deg);\n    -o-transform: rotate(-45deg);\n       transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  display: inline-block;\n  position: relative; }\n\n.arrow-down[_v-6f22259c]:after {\n  bottom: 0.09375rem;\n  -moz-transform: rotate(45deg);\n   -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n       transform: rotate(45deg);\n  -webkit-transform: rotate(45deg); }\n\n.player-sex-age-box[_v-6f22259c] {\n  background-color: #ffa5ba;\n  display: block;\n  height: 0.75rem;\n  line-height: 0.75rem;\n  color: #FFF;\n  float: left;\n  padding: 0rem 0.28125rem;\n  -webkit-border-radius: 0.0625rem;\n     -moz-border-radius: 0.0625rem;\n          border-radius: 0.0625rem;\n  margin-right: 0.125rem; }\n  .player-sex-age-box .player-sex[_v-6f22259c] {\n    height: 0.46875rem;\n    line-height: 0.46875rem;\n    vertical-align: middle;\n    float: left;\n    margin-top: 0.125rem; }\n  .player-sex-age-box .player-age[_v-6f22259c] {\n    line-height: 0.625rem;\n    height: 0.625rem;\n    font-size: 0.625rem;\n    margin-left: 0.1875rem;\n    vertical-align: middle;\n    float: left;\n    padding-top: 0.0625rem; }\n\n.male[_v-6f22259c] {\n  background-color: #97bcf0; }\n\n.status-wrapper[_v-6f22259c] {\n  text-align: center;\n  height: 100%; }\n  .status-wrapper .icon-no-result-status[_v-6f22259c] {\n    background: url(\"https://s.momocdn.com/w/u/img/2016/04/28/1461816721997-empty-box.png\") no-repeat;\n    display: inline-block;\n    width: 4.6875rem;\n    height: 3.15625rem;\n    float: none;\n    -webkit-background-size: 100% auto;\n       -moz-background-size: 100% auto;\n         -o-background-size: 100% auto;\n            background-size: 100% auto;\n    margin-right: 0rem; }\n  .status-wrapper .icon-wrapper[_v-6f22259c] {\n    padding-top: 8rem;\n    margin-bottom: 1.5625rem; }\n  .status-wrapper .status-title[_v-6f22259c] {\n    padding: 0 0.9375rem;\n    line-height: 1.5625rem;\n    font-size: 0.9375rem;\n    color: #5a5a5a; }\n  .status-wrapper .status-content[_v-6f22259c] {\n    padding: 0 0.9375rem;\n    color: #aaa;\n    font-size: 0.875rem; }\n\n.highlight-font[_v-6f22259c] {\n  color: #3868fb; }\n\n.slide-up-transition[_v-6f22259c] {\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  -webkit-transform: translate3d(0, 0, 0);\n     -moz-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  opacity: 1; }\n\n/* .expand-enter 定义进入的开始状态 */\n/* .expand-leave 定义离开的结束状态 */\n.slide-up-enter[_v-6f22259c], .slide-up-leave[_v-6f22259c] {\n  -webkit-transform: translate3d(0, 100px, 0);\n     -moz-transform: translate3d(0, 100px, 0);\n          transform: translate3d(0, 100px, 0);\n  opacity: 0; }\n\n.search-input[_v-6f22259c] {\n  display: block;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  padding-left: 1.75rem;\n  font-size: 0.8125rem;\n  height: 1.75rem;\n  line-height: 1.5;\n  background-image: url(https://s.momocdn.com/w/u/img/2016/06/20/1466389938072-search.png);\n  background-position: 0.6875rem center;\n  -webkit-background-size: 0.6875rem 0.6875rem;\n     -moz-background-size: 0.6875rem;\n       -o-background-size: 0.6875rem;\n          background-size: 0.6875rem;\n  background-color: #fff;\n  background-repeat: no-repeat;\n  width: 100%;\n  -webkit-border-radius: 0.15625rem;\n     -moz-border-radius: 0.15625rem;\n          border-radius: 0.15625rem; }\n  .search-input[_v-6f22259c]:placeholder {\n    color: #b4b4b4; }\n  .search-input[_v-6f22259c]:focus {\n    /*padding: shift(16);*/\n    /*background-image:none;*/ }\n  .search-input[disabled][_v-6f22259c], .search-input[_v-6f22259c]:disabled {\n    opacity: 1; }\n\n.search-input-wrapper[_v-6f22259c] {\n  -webkit-transition: -webkit-transform .25s ease;\n  transition: -webkit-transform .25s ease;\n  -o-transition: -o-transform .25s ease;\n  -moz-transition: transform .25s ease, -moz-transform .25s ease;\n  transition: transform .25s ease;\n  transition: transform .25s ease, -webkit-transform .25s ease, -moz-transform .25s ease, -o-transform .25s ease; }\n  .search-input-wrapper.search-input-wrapper-focus[_v-6f22259c] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    background: whitesmoke;\n    z-index: 7;\n    -webkit-backface-visibility: hidden; }\n\n.search-header[_v-6f22259c] {\n  position: relative; }\n\n.search-info[_v-6f22259c] {\n  margin-top: 2.5rem; }\n\n.search-input-btn[_v-6f22259c] {\n  position: absolute;\n  top: 0;\n  right: -50%;\n  display: block;\n  border: none;\n  padding: 0 0.5rem;\n  text-align: center;\n  background-color: transparent;\n  color: #3868fb;\n  font-size: 1rem;\n  height: 2.75rem;\n  -webkit-transition: right ease 0.25s;\n  -o-transition: right ease 0.25s;\n  -moz-transition: right ease 0.25s;\n  transition: right ease 0.25s; }\n  .search-input-btn.search-input-btn-show[_v-6f22259c] {\n    right: 0; }\n\n.search-input-close[_v-6f22259c] {\n  display: block;\n  position: absolute;\n  top: 50%;\n  right: 0.84375rem;\n  height: 0.9375rem;\n  width: 0.9375rem;\n  -webkit-transform: translate(0, -50%);\n     -moz-transform: translate(0, -50%);\n      -ms-transform: translate(0, -50%);\n       -o-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  background-image: url(\"https://s.momocdn.com/w/u/img/2016/08/04/1470301121785-input-close.png?_bid=1090\");\n  -webkit-background-size: 100% 100%;\n     -moz-background-size: 100%;\n       -o-background-size: 100%;\n          background-size: 100%; }\n  .search-input-wrapper-focus .search-input-close[_v-6f22259c] {\n    right: 0.46875rem; }\n\n.result-list[_v-6f22259c] {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\n.search-input-wrapper[_v-6f22259c] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 2.75rem;\n  width: 100%;\n  padding: 0.5rem;\n  background: #f0f0f0; }\n", ""]);
	
	// exports


/***/ },

/***/ 385:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _actions = __webpack_require__(327);
	
	exports.default = {
	    props: {
	        placeholder: {
	            default: '搜索'
	        },
	        showInputMask: {
	            default: false
	        },
	        searchText: {
	            default: ''
	        },
	        mask: {
	            default: false
	        }
	    },
	    vuex: {
	        actions: {
	            closeSearch: _actions.closeSearch,
	            openSearch: _actions.openSearch
	        },
	        getters: {
	            showInputMask: function showInputMask(state) {
	                return state.inputArea.show;
	            }
	        }
	    },
	    data: function data() {
	        return {};
	    },
	    computed: {
	        wrapperClassObj: function wrapperClassObj() {
	            return {
	                'search-input-wrapper': true,
	                'search-input-wrapper-focus': this.showInputMask
	            };
	        }
	    },
	    watch: {
	        focus: function focus() {},
	        searchText: function searchText(val) {
	            if (typeof val == 'string') {
	                this.$emit('change', val);
	            }
	        }
	    },
	    created: function created() {},
	    ready: function ready() {},
	    methods: {
	        blurInput: function blurInput() {
	            this.$emit('blur', this.searchText);
	        },
	        onClickPlaceholder: function onClickPlaceholder() {
	            this.openSearch();
	        }
	    }
	};

/***/ },

/***/ 386:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"search-input-container search-input-wrapper\" _v-6f22259c=\"\">\n    <div class=\"search-header placeholder\" v-el:header=\"\" _v-6f22259c=\"\">\n        <label v-on:click=\"onClickPlaceholder\" _v-6f22259c=\"\">\n            <input type=\"text\" class=\"search-input\" :placeholder=\"placeholder\" :disabled=\"mask\" debounce=\"500\" @blur=\"blurInput\" v-model=\"searchText\" _v-6f22259c=\"\">\n            <span class=\"search-input-close\" v-if=\"searchText\" v-on:click=\"searchText = ''\" _v-6f22259c=\"\"></span>\n        </label>\n    </div>\n    <!-- <div :class=\"isIndex ? 'search-info search-header' : 'search-header'\" v-el:header v-show=\"type&&showInputMask\">\n        <label :class=\"searchInputLabelClassObj\" v-on:click=\"onFocus\">\n            <input type=\"text\" :placeholder=\"placeholder\" class=\"search-input\" v-el:input v-on:blur=\"blurInput\" v-on:click=\"showInputMask = true\" v-model=\"searchText\" debounce=\"500\">\n            <span class=\"search-input-close\" v-if=\"searchText\" v-on:click=\"searchText = ''\"></span>\n        </label>\n        <button :class=\"searchInputBtnClassObj\" v-on:click=\"cancel\">取消</button>\n    </div> -->\n    <!-- <div class=\"result-list\" v-show=\"type&&showInputMask\" v-el:result-list>\n        <slot></slot>\n    </div> -->\n</div>\n";

/***/ }

});
console.log(Date.now()+' end')
})