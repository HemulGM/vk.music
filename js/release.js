! function(e) {
	function t(s) {
		if (i[s]) return i[s].exports;
		var n = i[s] = {
			exports: {},
			id: s,
			loaded: !1
		};
		return e[s].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
	}
	var i = {};
	return t.m = e, t.c = i, t.p = "", t(0)
}([function(e, t, i) {
	"use strict";
	var s, n = i(2),
		a = i(8),
		o = i(1),
		r = i(23),
		c = i(15),
		d = i(32),
		l = i(3),
		u = i(14),
		h = i(40),
		p = i(5),
		m = {
			standByTimer: -1,
			activeState: !1,
			toggleMode: function() {
				this.activeState = !this.activeState, u.setStandByStatus(this.activeState)
			}
		};
	n.data.windowId = stbWebWindow.windowId(), n.data.isPortal = 1 === n.data.windowId, i(38), window.stbEvent.addListener(window.stbEvent.HDMI_CONNECTED, function() {
		var e = {};
		try {
			e = JSON.parse(u.getEnv('{"varList":["hdmi_event_delay"]}'))
		} catch (t) {
			e = {
				hdmi_event_delay: "0"
			}
		}
		clearTimeout(m.standByTimer), u.getStandByStatus() && "0" !== e.hdmi_event_delay && m.toggleMode()
	}), window.stbEvent.addListener(window.stbEvent.HDMI_DISCONNECTED, function() {
		var e = {};
		try {
			e = JSON.parse(u.getEnv('{"varList":["hdmi_event_delay"]}')), e = e.result
		} catch (t) {
			e = {
				hdmi_event_delay: "0"
			}
		}
		u.getStandByStatus() || "0" === e.hdmi_event_delay || (m.standByTimer = setTimeout(function() {
			m.toggleMode()
		}, 1e3 * e.hdmi_event_delay))
	}), n.history = new r, n.exit = function() {
		h.setVirtualKeyboardPosition("none"), u.setVKButtonState(!1), window.parent !== window ? (n.player.pause(), window.parent.postMessage("hide", "*")) : (n.player.pause(), n.params.referrer = n.params.referrer || i(45)(), window.location.href = n.params.referrer || "file:///home/web/services.html")
	}, n.addListeners({
		load: function() {
			var e;
			if (window.parent !== window && window.parent.postMessage("show", "*"), u.setVKButtonState(!1), u.setAppButtonState(!0), u.setServiceButtonState(!0), u.setTvButtonState(!1), n.params = i(44)(location.search.substring(1)), s = new c({
					$node: document.getElementById("exitAlert"),
					visible: !1,
					events: {
						keydown: function(e) {
							e.stop = !0, e.code === o.ok ? n.exit() : e.code !== o.back && e.code !== o.exit || (this.hide(), n.history.current.panel.focusEntry.focus())
						}
					}
				}), s.$header.innerText = "", s.$footer.innerText = "", !l.ready) {
				n.params.appId && (l.appId = n.params.appId);
				try {
					if (e = u.loadUserData(l.CACHE_FILE_NAME), !e) throw "no data";
					e = JSON.parse(e), l.checkToken(e.access_token, function(e) {
						n.player = new d({
							$node: document.getElementById("pmPlayer")
						}), n.$loader = document.getElementById("pmLoading"), a.init([i(20), i(22), i(21)]), a.pages.forEach(function(e) {
							e.emit("load")
						}), e ? a.navigate("pageMain") : a.navigate("pageLogin")
					})
				} catch (t) {
					n.player = new d({
						$node: document.getElementById("pmPlayer")
					}), n.$loader = document.getElementById("pmLoading"), a.init([i(20), i(22), i(21)]), a.pages.forEach(function(e) {
						e.emit("load")
					}), a.navigate("pageLogin")
				}
			}
		},
		unload: function() {
			n.exit()
		},
		keydown: function(e) {
			e.code === o.exit && (s.$content.innerText = p.t("Exit from app?\n Ok/Back"), s.show(), s.focus())
		}
	}), u.setNativeStringMode(!0)
}, function(e, t, i) {
	"use strict";
	e.exports = {
		back: 8,
		"delete": 46,
		channelPrev: 1009,
		channelNext: 9,
		ok: 13,
		exit: 27,
		up: 38,
		down: 40,
		left: 37,
		right: 39,
		pageUp: 33,
		pageDown: 34,
		end: 35,
		home: 36,
		volumeUp: 107,
		volumeDown: 109,
		f1: 112,
		f2: 113,
		f3: 114,
		f4: 115,
		refresh: 116,
		frame: 117,
		phone: 119,
		set: 120,
		tv: 121,
		menu: 122,
		web: 123,
		mic: 2032,
		rewind: 2066,
		forward: 2070,
		app: 2076,
		usbMounted: 2080,
		usbUnmounted: 2081,
		playPause: 2082,
		stop: 2083,
		power: 2085,
		record: 2087,
		info: 2089,
		mute: 2192,
		clock: 2032,
		audio: 2071,
		keyboard: 2076
	}
}, function(e, t, i) {
	"use strict";
	var s, n, a = i(41),
		o = i(8),
		r = i(1),
		c = {};
	i(42), window.parent && window.parent.gSTB && (window.dvbManager = window.parent.dvbManager, window.epgManager = window.parent.epgManager, window.gSTB = window.parent.gSTB, window.pvrManager = window.parent.pvrManager, window.stbDownloadManager = window.parent.stbDownloadManager, window.stbStorage = window.parent.stbStorage, window.stbUpdate = window.parent.stbUpdate, window.stbUPnP = window.parent.stbUPnP, window.stbWebWindow = window.parent.stbWebWindow, window.stbWindowMgr = window.parent.stbWindowMgr, window.timeShift = window.parent.timeShift), s = new a({
		debug: !1,
		host: !0,
		screen: null,
		time: {
			init: +new Date,
			load: 0,
			done: 0
		}
	}), s.setScreen = function(e) {
		var t;
		return e ? (e.availHeight = e.height - (e.availTop + e.availBottom), e.availWidth = e.width - (e.availLeft + e.availRight), window.moveTo(0, 0), window.resizeTo(e.width, e.height), t = document.querySelector("link[rel=stylesheet]"), t && t instanceof HTMLLinkElement && document.head.removeChild(t), t = document.createElement("link"), t.rel = "stylesheet", t.href = "css/release." + e.height + ".css?" + +new Date, document.head.appendChild(t), this.data.metrics = e, !0) : !1
	}, s.EVENT_END_OF_FILE = 1, s.EVENT_GET_MEDIA_INFO = 2, s.EVENT_PLAYBACK_BEGIN = 4, s.EVENT_CONTENT_ERROR = 5, s.EVENT_DUAL_MONO_DETECT = 6, s.EVENT_INFO_GET = 7, s.EVENT_SUBTITLE_LOAD_ERROR = 8, s.EVENT_SUBTITLE_FIND = 9, s.EVENT_HDMI_CONNECT = 32, s.EVENT_HDMI_DISCONNECT = 33, s.EVENT_RECORD_FINISH_SUCCESSFULL = 34, s.EVENT_RECORD_FINISH_ERROR = 35, s.EVENT_DVB_SCANING = 40, s.EVENT_DVB_FOUND = 41, s.EVENT_DVB_CHANELL_EPG_UPDATE = 42, s.EVENT_DVB_ANTENNA_OFF = 43, s.setScreen(i(52)[screen.height]);
	for (n in r) "volumeUp" !== n && "volumeDown" !== n && (c[r[n]] = !0);
	s.defaultEvents = {
		load: function(e) {
			s.data.time.load = e.timeStamp, s.events[e.type] && s.emit(e.type, e), o.pages.forEach(function(t) {
				t.events[e.type] && t.emit(e.type, e)
			}), s.data.time.done = +new Date, s.events.done && s.emit("done", e)
		},
		unload: function(e) {
			s.events[e.type] && s.emit(e.type, e), o.pages.forEach(function(t) {
				t.events[e.type] && t.emit(e.type, e)
			})
		},
		error: function(e) {},
		keydown: function(e) {
			var t, i = o.current;
			0 !== e.keyCode && (e.code = e.keyCode, e.shiftKey && (e.code += 1e3), e.altKey && (e.code += 2e3), t = i.activeComponent, t && t !== i && (t.events[e.type] && t.emit(e.type, e), !e.stop && t.propagate && t.parent && t.parent.events[e.type] && t.parent.emit(e.type, e)), e.stop || (i.events[e.type] && i.emit(e.type, e), e.stop || s.events[e.type] && s.emit(e.type, e)), s.data.host && c[e.code] && e.preventDefault())
		},
		keypress: function(e) {
			var t = o.current;
			t.activeComponent && t.activeComponent !== t && t.activeComponent.events[e.type] && t.activeComponent.emit(e.type, e)
		},
		click: function(e) {},
		contextmenu: function(e) {
			e.preventDefault()
		},
		mousewheel: function(e) {
			var t = o.current;
			t.activeComponent && t.activeComponent !== t && t.activeComponent.events[e.type] && t.activeComponent.emit(e.type, e), e.stop || t.events[e.type] && t.emit(e.type, e)
		}
	};
	for (n in s.defaultEvents) window.addEventListener(n, s.defaultEvents[n]);
	window.stbEvent = {}, window.stbEvent.onEvent = function(e, t) {
		if (s.events.media) {
			if (t) try {
				t = JSON.parse(t)
			} catch (i) {}
			s.emit("media", {
				code: parseInt(e, 10),
				info: t
			})
		}
	}, window.stbEvent.onBroadcastMessage = function(e, t, i) {
		s.events.message && s.emit("message", {
			broadcast: !0,
			windowId: e,
			message: t,
			data: i
		})
	}, window.stbEvent.onMessage = function(e, t, i) {
		s.events.message && s.emit("message", {
			broadcast: !1,
			windowId: e,
			message: t,
			data: i
		})
	}, window.stbEvent.onMount = function(e) {
		s.events["device:mount"] && s.emit("device:mount", {
			state: e
		})
	}, window.stbEvent.onMediaAvailable = function() {
		s.events["media:available"] && s.emit("media:available")
	}, window.stbEvent.onNetworkStateChange = function(e) {
		s.events["internet:state"] && s.emit("internet:state", {
			state: e
		})
	}, window.stbEvent.onWebBrowserProgress = function(e) {
		s.events["browser:progress"] && s.emit("browser:progress", {
			progress: e
		})
	}, window.stbEvent.onWindowActivated = function() {
		s.events["window:focus"] && s.emit("window:focus")
	}, window.gSTB && gSTB.SetNativeStringMode && gSTB.SetNativeStringMode(!0), e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e, t) {
		a.token = e.sid, a.userId = e.mid, a.request("storage.get", "global=0&key=lang", function(e) {
			e ? (a.lang = parseInt(e, 10), n.active = a.lang) : (a.setLang(n.RUSSIAN), n.active = a.lang)
		}), a.request("audio.get", "offset=0&count=1&need_user=1", function(e) {
			a.userInfo = e.shift(), t && t()
		})
	}
	var n = i(5),
		a = {
			totalAlbums: 0,
			ready: !1,
			userId: -1,
			userInfo: {},
			delay: 333,
			lang: n.RUSSIAN,
			token: null,
			onLogOut: function() {},
			lastRequestTime: (new Date).getTime(),
			CACHE_FILE_NAME: "vk.music.json",
			appId: "5776857",
			APP_DOMAIN: "http://tests.infomir.com.ua/vkmusic/",
			APP_SCOPE: "audio",
			VERSION: "5.27",
			AUTH_URL: ""
		},
		o = !1,
		r = null;
	a.AUTH_URL = "https://oauth.vk.com/authorize?client_id=" + a.appId + "&scope=" + a.APP_SCOPE + "&redirect_uri=" + a.APP_DOMAIN + "&display=page&v=" + a.VERSION + "&response_type=token", a.onCaptcha = function(e, t, s, n) {
		null === r && (r = i(36)), r.activate(e, t, s, n)
	}, a.request = function(e, t, i) {
		var s, n = (new Date).getTime(),
			r = arguments,
			c = new XMLHttpRequest;
		return n - this.lastRequestTime < this.delay ? void setTimeout(function() {
			a.request.apply(a, r)
		}, n - this.lastRequestTime) : (this.lastRequestTime = n, o ? c.open("GET", "http://pifpaf.eu1.frbit.net/index.php?url=" + encodeURIComponent("https://api.vk.com/method/" + e + "?" + t + "&version=" + a.VERSION + "&access_token=" + a.token), !0) : c.open("GET", "https://api.vk.com/method/" + e + "?" + t + "&version=" + a.VERSION + "&access_token=" + a.token, !0), i && c.addEventListener("readystatechange", function() {
			if (4 === c.readyState) try {
				s = JSON.parse(c.responseText), o && ("String" === s.contents.constructor.name && (s.contents = {
					response: [""]
				}), s = s.contents), s.error && 14 === s.error.error_code ? a.onCaptcha(s.error, e, t, i) : i(s.response, s.error)
			} catch (n) {}
		}), void c.send())
	}, a.checkToken = function(e, t) {
		a.token = e, a.request("audio.get", "offset=0&count=1&need_user=1", function(i) {
			void 0 !== i ? (a.userInfo = i.shift(), a.userId = a.userInfo.id, s({
				sid: e,
				mid: a.userId
			}, function() {
				a.ready = !0, t(!0)
			})) : t(!1)
		})
	}, a.setLang = function(e, t) {
		return a.lang !== e ? (a.lang = e, n.active = e, a.request("storage.set", "global=0&key=lang&value=" + e, t), !0) : !1
	}, a.getLyrics = function(e, t) {
		e && a.request("audio.getLyrics", "lyrics_id=" + e, t)
	}, a.logout = function() {
		a.ready = !1, a.onLogOut()
	}, e.exports = a
}, function(e, t, i) {
	"use strict";

	function s(e) {
		var t, i = this;
		if (e = e || {}, this.visible = !0, this.focusable = !0, this.$node = null, this.$body = null, this.parent = null, this.children = [], this.propagate = !!e.propagate, n.call(this, e.data), this.$node = e.$node || document.createElement("div"), this.$body = e.$body || this.$node, this.$node.className += " component " + (e.className || ""), this.id = e.id || this.$node.id || "cid" + o++, e.parent && e.parent.add(this), e.visible === !1 && this.hide(), e.focusable === !1 && (this.focusable = !1), this.defaultEvents) {
			e.events = e.events || {};
			for (t in this.defaultEvents) e.events[t] = e.events[t] || this.defaultEvents[t]
		}
		e.events && this.addListeners(e.events), e.children && this.add.apply(this, e.children), this.$node.addEventListener("click", function(e) {
			0 === e.button && (i.focus(), i.events.click && i.emit("click", {
				event: e
			})), e.stopPropagation()
		})
	}
	var n = i(12),
		a = i(8),
		o = 0;
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.defaultEvents = null, s.prototype.add = function(e) {
		var t;
		for (t = 0; t < arguments.length; t++) e = arguments[t], this.children.push(e), e.parent = this, e.$node && null === e.$node.parentNode && this.$body.appendChild(e.$node), this.events.add && this.emit("add", {
			item: e
		})
	}, s.prototype.remove = function() {
		this.parent && (a.current.activeComponent === this && (this.blur(), this.parent.focus()), this.parent.children.splice(this.parent.children.indexOf(this), 1)), this.children.forEach(function(e) {
			e.remove()
		}), this.removeAllListeners(), this.$node.parentNode.removeChild(this.$node), this.events.remove && this.emit("remove")
	}, s.prototype.focus = function(e) {
		var t = a.current,
			i = t.activeComponent;
		return this.focusable && this !== i ? (i && i.blur(), t.activeComponent = i = this, i.$node.classList.add("focus"), i.events.focus && i.emit("focus", e), !0) : !1
	}, s.prototype.blur = function() {
		var e = a.current,
			t = e.activeComponent;
		return this.$node.classList.remove("focus"), this === t ? (e.activeComponent = null, this.events.blur && this.emit("blur"), !0) : !1
	}, s.prototype.show = function(e) {
		return this.visible ? !0 : (this.$node.classList.remove("hidden"), this.visible = !0, this.events.show && this.emit("show", e), !0)
	}, s.prototype.hide = function() {
		return this.visible ? (this.$node.classList.add("hidden"), this.visible = !1, this.events.hide && this.emit("hide"), !0) : !0
	}, e.exports = s
}, function(e, t) {
	"use strict";
	var i = {
		meta: [{
			id: 0,
			value: "Русский"
		}, {
			id: 1,
			value: "English"
		}, {
			id: 2,
			value: "German"
		}],
		RUSSIAN: 0,
		ENGLISH: 1,
		GERMAN: 2,
		keyboards: {},
		charTables: {},
		translations: {},
		active: 0
	};
	i.charTables[i.RUSSIAN] = {
		65: "a",
		67: "b",
		68: "c",
		69: "d",
		70: "e",
		71: "f",
		72: "g",
		73: "h",
		74: "i",
		75: "j",
		76: "k",
		77: "l",
		78: "m",
		79: "n",
		80: "o",
		81: "p",
		82: "q",
		83: "r",
		84: "s",
		85: "t",
		86: "u",
		87: "v",
		88: "w",
		89: "x",
		90: "y",
		91: "z"
	}, i.keyboards[i.RUSSIAN] = [
		["а", "б", "в", "г", "д"],
		["e", "ж", "з", "и", "к"],
		["л", "м", "н", "о", "п"],
		["р", "с", "т", "у", "ф"],
		["х", "ц", "ч", "ш", "щ"],
		["ь", "ъ", "ы", "э", "ю"],
		["я", {
			className: "keySpace",
			value: " "
		}, {
			className: "keyBack",
			value: ""
		}, {
			className: "keyNums",
			value: "123.?"
		}, {
			className: "keyLang",
			value: "RU"
		}]
	], i.keyboards[i.ENGLISH] = [
		["a", "b", "c", "d", "e"],
		["f", "g", "h", "i", "j"],
		["k", "l", "m", "n", "o"],
		["p", "q", "r", "s", "t"],
		["u", "v", "w", "x", "y"],
		["z", {
			className: "keySpace",
			value: " "
		}, {
			className: "keyBack",
			value: ""
		}, {
			className: "keyNums",
			value: "123.?"
		}, {
			className: "keyLang",
			value: "EN"
		}]
	], i.keyboards[i.GERMAN] = [
		["a", "b", "c", "d", "e"],
		["f", "g", "h", "i", "j"],
		["k", "l", "m", "n", "o"],
		["p", "q", "r", "s", "t"],
		["u", "v", "w", "x", "y"],
		["z", "ä", "ö", "ü", "ß"],
		[{
			className: "keySpace",
			value: " "
		}, {
			className: "keyBack",
			value: ""
		}, {
			className: "keyNums",
			value: "123.?",
			colSpan: 2
		}, {
			className: "keyLang",
			value: "DE"
		}]
	], i.translations[i.RUSSIAN] = {
		"My music": "Мои аудиозаписи",
		"Suggested music": "Рекомендации",
		"Popular music": "Популярное",
		"My folders": "Мои альбомы",
		Search: "Поиск",
		Settings: "Параметры",
		"Current track": "Текущая композиция",
		Back: "Назад",
		"Track lyrics": "Текст песни",
		Loading: "Загрузка",
		Delete: "Удалить",
		Language: "Язык",
		"Search results": "Результаты поиска",
		Account: "Аккаунт",
		"Logout from": "Выйти из аккаунта",
		Login: "Войти",
		"Reboot to apply changes?\n Ok/Back": "Перезагрузиться чтобы изменения вступили в силу?\n Ок/Назад",
		"File open error": "Ошибка открытия файла, возможно трек изъят правообладателем",
		"Input code from image": "Введите код с картинки",
		"We suggest music based on what you listen to from My audio files.\n Please add and listen to some more tracks.": "Рекомендации основываются на музыке из списка Ваших аудиозаписей.\n Для получения рекомендаций добавьте на свою страницу и прослушайте больше композиций.",
		"No tracks in this folder": "Нет аудиозаписей в этом альбоме",
		"Exit from app?\n Ok/Back": "Выйти из приложения? Oк/Назад"
	}, i.translations[i.ENGLISH] = {
		"My music": "My music",
		"Suggested music": "Suggested music",
		"Popular music": "Popular music",
		"My folders": "My folders",
		Search: "Search",
		Settings: "Settings",
		"Current track": "Current track",
		Back: "Back",
		"Track lyrics": "Track lyrics",
		Loading: "Loading",
		Delete: "Delete",
		Language: "Language",
		"Search results": "Search results",
		Account: "Account",
		"Logout from": "Logout from",
		Login: "Login",
		"Reboot to apply changes?\n Ok/Back": "Reboot to apply changes?\n Ok/Back",
		"File open error": "File open error",
		"Input code from image": "Input code from image",
		"We suggest music based on what you listen to from My audio files.\n Please add and listen to some more tracks.": "We suggest music based on what you listen to from My audio files.\n Please add and listen to some more tracks.",
		"No tracks in this folder": "No tracks in this folder",
		"Exit from app?\n Ok/Back": "Exit from app?\n Ok/Back"
	}, i.translations[i.GERMAN] = {
		"My music": "Meine Musik",
		"Suggested music": "Empfehlungen",
		"Popular music": "Populäre Musik",
		"My folders": "Meine Alben",
		Search: "Suche",
		Settings: "Einstellungen",
		"Current track": "Aktuelle Track",
		Back: "Zurück",
		"Track lyrics": "Track lyrics",
		Loading: "Laden",
		Delete: "Löschen",
		Language: "Sprache",
		"Search results": "Suchergebnisse",
		Account: "Konto",
		"Logout from": "Logout",
		Login: "Login",
		"Reboot to apply changes?\n Ok/Back": "Neustarten, um Änderungen anzuwenden?\n Ok/Zurück",
		"File open error": "Datei offener Fehler.",
		"Input code from image": "Geben Sie den Code von Bild Ein",
		"We suggest music based on what you listen to from My audio files.\n Please add and listen to some more tracks.": "Wir schlagen Musik gegründet darauf vor, wem Sie von Meine Musik zuhören.\n Fügen Sie bitte einige weitere Titel ein. ",
		"No tracks in this folder": "Keine Tracks in diesem Album",
		"Exit from app?\n Ok/Back": "Beenden app?\n Ok/Zurück"
	}, i.t = function(e) {
		return this.translations[this.active][e] ? this.translations[this.active][e] : e
	}, e.exports = i
}, function(e, t, i) {
	"use strict";
	var s = i(2),
		n = {
			itemsPerPage: 36,
			listSize: 12,
			listSearchSize: 13
		};
	switch (s.data.metrics.height) {
		case 1080:
			n.itemsPerPage = 36, n.listSize = 12, n.listSearchSize = 13;
			break;
		case 576:
			n.itemsPerPage = 39, n.listSize = 13, n.listSearchSize = 13;
			break;
		case 480:
			n.itemsPerPage = 39, n.listSize = 13, n.listSearchSize = 13
	}
	e.exports = n
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, e.focusable = e.focusable || !1, e.className = "panel " + (e.className || ""), n.call(this, e)
	}
	var n = i(4);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, e.exports = s
}, function(e, t, i) {
	"use strict";
	var s, n = i(12);
	s = new n, s.current = null, s.history = [], s.pages = [], s.ids = {}, s.init = function(e) {
		var t, i, s;
		if (e) {
			for (this.pages = [], this.pages = e, t = 0, i = e.length; i > t; t++) s = e[t], this.ids[s.id] = s, s.active && (this.current = s);
			return this.events.init && this.emit("init", {
				pages: e
			}), !0
		}
		return !1
	}, s.parse = function(e) {
		var t = {
			name: "",
			data: []
		};
		return t.data = e.split("/").map(decodeURIComponent), t.name = t.data.shift().slice(1), t
	}, s.stringify = function(e, t) {
		return t = Array.isArray(t) ? t : [], e = encodeURIComponent(e), t = t.map(encodeURIComponent), t.unshift(e), t.join("/")
	}, s.show = function(e, t) {
		return e && !e.active ? (e.$node.classList.add("active"), e.active = !0, this.current = e, e.events.show && e.emit("show", {
			page: e,
			data: t
		}), !0) : !1
	}, s.hide = function(e) {
		return e && e.active ? (e.$node.classList.remove("active"), e.active = !1, this.current = null, e.events.hide && e.emit("hide", {
			page: e
		}), !0) : !1
	}, s.navigate = function(e, t) {
		var i = this.current,
			s = this.ids[e];
		return s && !s.active ? (location.hash = this.stringify(e, t), this.hide(this.current), this.show(s, t), this.events.navigate && this.emit("navigate", {
			from: i,
			to: s
		}), this.history.push(s), !0) : !1
	}, s.back = function() {
		var e, t;
		return this.history.length > 1 && (e = this.history.pop(), t = this.history[this.history.length - 1], t && !t.active) ? (location.hash = t.id, this.hide(this.current), this.show(t), this.events.navigate && this.emit("navigate", {
			from: e,
			to: t
		}), !0) : !1
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, this.viewSize = 10, this.realSize = 100, this.value = 0, this.type = this.TYPE_VERTICAL, this.thumbRect = null, this.trackRect = null, e.focusable = e.focusable || !1, e.className = "scrollBar " + (e.className || ""), e.type && (this.type = e.type), this.type === this.TYPE_HORIZONTAL && (e.className += " horizontal"), n.call(this, e), this.$thumb = this.$body.appendChild(document.createElement("div")), this.$thumb.className = "thumb", this.init(e)
	}
	var n = i(4);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.TYPE_VERTICAL = 1, s.prototype.TYPE_HORIZONTAL = 2, s.prototype.init = function(e) {
		e = e || {}, e.realSize && (this.realSize = e.realSize), e.viewSize && (this.viewSize = e.viewSize), this.viewSize >= this.realSize ? this.$thumb.classList.add("hidden") : this.$thumb.classList.remove("hidden"), void 0 !== e.value && this.scrollTo(e.value), this.type === this.TYPE_VERTICAL ? this.$thumb.style.height = this.viewSize / this.realSize * 100 + "%" : this.$thumb.style.width = this.viewSize / this.realSize * 100 + "%", this.thumbRect = this.$thumb.getBoundingClientRect(), this.trackRect = this.$node.getBoundingClientRect()
	}, s.prototype.scrollTo = function(e) {
		return this.value !== e ? (0 !== this.thumbRect.height && 0 !== this.thumbRect.width || (this.trackRect = this.$node.getBoundingClientRect(), this.thumbRect = this.$thumb.getBoundingClientRect()), this.type === this.TYPE_VERTICAL ? this.$thumb.style.marginTop = (this.trackRect.height - this.thumbRect.height) * e / (this.realSize - this.viewSize) + "px" : this.$thumb.style.marginLeft = (this.trackRect.width - this.thumbRect.width) * e / (this.realSize - this.viewSize) + "px", this.events.change && this.emit("change", {
			curr: e,
			prev: this.value
		}), e >= this.realSize && (e = this.realSize, this.events.done && this.emit("done")), this.value = e, !0) : !1
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		var t = this;
		this.activeOffset = 0, this.activeIndex = 0, this.$markItem = null, this.dataProvider = null, this.free = !0, this.left = {
			min: 0,
			max: 60,
			active: 0,
			step: 3
		}, this.nameInterval = -1, this.nameTimeout = -1, this.$prevFocus = null, o.call(this, e), this.$node.classList.add("audioList"), this.addListener("focus:item", function(e) {
			return null === e.$prev ? (t.$prevFocus = e.$curr, t.scrollLongName(e.$curr), void(t.activeIndex = e.$curr.index)) : (e.$prev.index < e.$curr.index ? ++t.activeIndex : --t.activeIndex, t.$prevFocus = e.$prev, e.$prev.$name.style.left = "0px", void t.scrollLongName(e.$curr))
		}), this.addListener("move:view", function(e) {
			e.prevIndex > e.currIndex ? (--t.activeIndex, --t.activeOffset) : (++t.activeIndex, ++t.activeOffset), t.$focusItem && t.scrollLongName(t.$focusItem)
		}), this.addListener("focus", function() {
			t.$focusItem && t.scrollLongName(t.$focusItem)
		}), this.addListener("blur", function() {
			clearTimeout(t.nameTimeout), clearInterval(t.nameInterval), t.$focusItem.$name.style.left = "0px"
		}), this.addListener("overflow", function(e) {
			t.free && (e.direction === a.down ? (t.free = !1, t.dataProvider.get({
				offset: t.activeOffset + t.size,
				count: t.size
			}, function(e, i) {
				return i ? void(t.free = !0) : (e.length < t.size ? (t.data = t.data.slice(e.length, t.data.length), t.data = t.data.concat(e)) : (t.data = t.data.slice(t.size, t.data.length), t.data = t.data.concat(e)), t.viewIndex = 0, t.renderView(1), t.emit("data:changed", {
					total: t.activeOffset + t.size + e.length
				}), void(t.free = !0))
			})) : t.activeOffset > 0 && (t.free = !1, t.dataProvider.get({
				offset: t.activeOffset - t.size < 0 ? 0 : t.activeOffset - t.size,
				count: t.size
			}, function(e, i) {
				if (i) return void(t.free = !0);
				for (; e.length;) t.data.unshift(e.pop());
				for (; t.data.length > r.itemsPerPage;) t.data.pop();
				t.viewIndex = r.itemsPerPage + 1, t.activeOffset < t.size ? t.renderView(t.activeIndex - 1) : t.renderView(t.size - 1), t.emit("data:changed", {
					total: t.activeOffset + e.length
				}), t.free = !0
			})))
		}), this.addListener("click:item", function(e) {
			null === t.$prevFocus && (t.$prevFocus = e.$item), e.$item.index > t.$prevFocus.index ? (--t.activeIndex, t.activeIndex += e.$item.index - t.$prevFocus.index) : e.$item.index < t.$prevFocus.index && (++t.activeIndex, t.activeIndex -= t.$prevFocus.index - e.$item.index)
		})
	}
	var n = i(2),
		a = i(1),
		o = i(13),
		r = i(6);
	s.prototype = Object.create(o.prototype), s.prototype.constructor = s, s.prototype.defaultEvents = {
		mousewheel: function(e) {
			this.type === this.TYPE_VERTICAL && e.wheelDeltaY && this.move(e.wheelDeltaY > 0 ? a.up : a.down), this.type === this.TYPE_HORIZONTAL && e.wheelDeltaX && this.move(e.wheelDeltaX > 0 ? a.left : a.right)
		},
		keydown: function(e) {
			switch (e.code) {
				case a.up:
				case a.down:
				case a.home:
				case a.end:
					this.move(e.code);
					break;
				case a.ok:
					void 0 !== this.events["click:item"] && this.emit("click:item", {
						$item: this.$focusItem,
						event: e
					})
			}
		}
	}, s.prototype.scrollLongName = function(e) {
		var t = this;
		clearTimeout(this.nameTimeout), clearInterval(this.nameInterval), e.$name.style.left = "0px", e.$ns.clientWidth < e.$ns.scrollWidth && (this.nameTimeout = setTimeout(function() {
			t.left.min = -1 * (e.$ns.scrollWidth - e.$ns.offsetWidth + t.left.max), t.left.active = 0, t.nameInterval = setInterval(function() {
				return t.left.active < t.left.min ? void t.scrollLongName(e) : (t.left.active -= t.left.step, void(e.$name.style.left = t.left.active + "px"))
			}, 150)
		}, 1e3))
	}, s.prototype.renderItem = function(e, t) {
		e.isReady ? (e.$artist.innerHTML = t.artist, e.$icon.className = "icon play", e.$title.innerHTML = "&nbsp;-&nbsp;" + t.title, e.$duration.innerText = t.value) : (e.$icon = document.createElement("div"), e.$icon.className = "icon play", e.appendChild(e.$icon), e.$ns = document.createElement("div"), e.$ns.className = "nameWrap", e.$name = document.createElement("div"), e.$name.className = "name", e.$artist = document.createElement("span"), e.$artist.className = "artist", e.$artist.innerHTML = t.artist, e.$title = document.createElement("span"), e.$title.innerHTML = "&nbsp;-&nbsp;" + t.title, e.$name.appendChild(e.$artist), e.$name.appendChild(e.$title), e.$ns.appendChild(e.$name), e.appendChild(e.$ns), e.$duration = document.createElement("div"), e.$duration.className = "duration", e.$duration.innerText = t.value, e.appendChild(e.$duration), e.isReady = !0)
	}, s.prototype.markItem = function(e) {
		return this.$markItem && (this.$markItem.$icon.className = "icon play"), 0 > e || e < this.activeOffset ? !1 : (this.$markItem = this.$body.children.item(e - this.activeOffset), this.$markItem && this.$markItem.data.aid === n.player.activeTrack.aid ? (this.$markItem.$icon.className = "icon pause", !0) : !1)
	}, s.prototype.updateData = function(e) {
		this.data = e, this.viewIndex = -1, this.renderView(0), this.activeOffset = 0, this.activeIndex = 0, null !== this.$focusItem && this.$focusItem.classList.remove("focus"), this.$prevFocus = null, this.$focusItem = this.$body.firstChild, this.$focusItem.classList.add("focus")
	}, s.prototype.renderView = function(e) {
		var t, i, s, n, a;
		if (this.viewIndex !== e) {
			for (n = this.viewIndex, this.viewIndex = a = e, i = 0; i < this.size; i++) {
				if (t = this.$body.children[i], s = this.data[e], void 0 !== s) t.data = s, t.index = e, this.renderItem(t, s), s.mark ? t.classList.add("mark") : t.classList.remove("mark");
				else
					for (t.data = t.index = void 0, t.isReady = !1; t.lastChild;) t.removeChild(t.lastChild);
				e++
			}
			return void 0 !== this.events["move:view"] && this.emit("move:view", {
				prevIndex: n,
				currIndex: a
			}), !0
		}
		return !1
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s() {
		this.id = ++n, this.total = 0, this.cached = {
			from: 0,
			to: 0,
			items: []
		}
	}
	var n = 0;
	s.prototype.get = function() {}, s.prototype.getOne = function() {}, s.prototype.getRandom = function() {}, s.prototype.getFromCache = function(e) {
		return e.offset >= this.cached.from && e.offset + e.count <= this.cached.to ? {
			exists: !0,
			items: this.cached.items.slice(e.offset - this.cached.from, e.offset - this.cached.from + e.count)
		} : {
			exists: !1,
			items: []
		}
	}, s.prototype.secondsToTime = function(e) {
		var t = Math.floor(e / 3600),
			i = Math.floor((e - 3600 * t) / 60);
		return e = e - 3600 * t - 60 * i, 10 > e && (e = "0" + e), t > 1 && 10 > i && (i = "0" + i), 1 > t ? t = "" : 10 > t && (t = "0" + t + ":"), t + i + ":" + e
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s() {
		this.events = {}
	}
	s.prototype = {
		addListener: function(e, t) {
			this.events[e] = this.events[e] || [], this.events[e].push(t)
		},
		once: function(e, t) {
			var i = this;
			this.events[e] = this.events[e] || [], this.events[e].push(function s(n) {
				t(n), i.removeListener(e, s)
			})
		},
		addListeners: function(e) {
			var t;
			if ("object" == typeof e)
				for (t in e) e.hasOwnProperty(t) && this.addListener(t, e[t])
		},
		removeListener: function(e, t) {
			this.events[e] && (this.events[e] = this.events[e].filter(function(e) {
				return e !== t
			}), 0 === this.events[e].length && (this.events[e] = void 0))
		},
		removeAllListeners: function(e) {
			0 === arguments.length ? this.events = {} : e && (this.events[e] = void 0)
		},
		emit: function(e, t) {
			var i, s = this.events[e];
			if (s)
				for (i = 0; i < s.length; i++) s[i].call(this, t)
		}
	}, s.prototype.constructor = s, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, this.$focusItem = null, this.viewIndex = null, this.data = [], this.type = this.TYPE_VERTICAL, this.size = 5, this.cycle = !1, this.scroll = null, e.type && (this.type = e.type), e.className = "list " + (e.className || ""), this.type === this.TYPE_HORIZONTAL && (e.className += " horizontal"), a.call(this, e), this.init(e)
	}

	function n(e) {
		var t, i;
		for (t = 0; t < e.length; t++) i = e[t], "object" != typeof i && (i = e[t] = {
			value: e[t]
		});
		return e
	}
	var a = i(4),
		o = i(1);
	s.prototype = Object.create(a.prototype), s.prototype.constructor = s, s.prototype.TYPE_VERTICAL = 1, s.prototype.TYPE_HORIZONTAL = 2, s.prototype.renderItemDefault = function(e, t) {
		e.innerText = t.value
	}, s.prototype.renderItem = s.prototype.renderItemDefault, s.prototype.defaultEvents = {
		mousewheel: function(e) {
			this.type === this.TYPE_VERTICAL && e.wheelDeltaY && this.move(e.wheelDeltaY > 0 ? o.up : o.down), this.type === this.TYPE_HORIZONTAL && e.wheelDeltaX && this.move(e.wheelDeltaX > 0 ? o.left : o.right)
		},
		keydown: function(e) {
			switch (e.code) {
				case o.up:
				case o.down:
				case o.right:
				case o.left:
				case o.pageUp:
				case o.pageDown:
				case o.home:
				case o.end:
					this.move(e.code);
					break;
				case o.ok:
					this.events["click:item"] && this.emit("click:item", {
						$item: this.$focusItem,
						event: e
					})
			}
		}
	}, s.prototype.init = function(e) {
		var t, i, s = this,
			a = this.$body.children.length,
			o = function(e) {
				this.data && (s.focusItem(this), s.events["click:item"] && s.emit("click:item", {
					$item: this,
					event: e
				}))
			};
		if (void 0 !== e.cycle && (this.cycle = e.cycle), e.scroll && (this.scroll = e.scroll), e.data && (this.data = n(e.data)), e.render && (this.renderItem = e.render), e.size && (this.size = e.size), this.size !== a)
			for (a > 0 && (this.$body.innerText = null), i = 0; i < this.size; i++) t = document.createElement("div"), t.index = i, t.className = "item", t.addEventListener("click", o), this.$body.appendChild(t);
		void 0 !== e.viewIndex, this.viewIndex = null, void 0 !== e.focusIndex ? this.focusIndex(e.focusIndex) : this.renderView(e.viewIndex || 0)
	}, s.prototype.renderView = function(e) {
		var t, i, s, n, a;
		if (this.viewIndex !== e) {
			for (n = this.viewIndex, this.viewIndex = a = e, i = 0; i < this.size; i++) t = this.$body.children[i], s = this.data[e], s ? (t.data = s, t.index = e, this.renderItem(t, s), s.mark ? t.classList.add("mark") : t.classList.remove("mark")) : (t.data = t.index = void 0, t.innerHTML = "&nbsp;"), e++;
			return this.events["move:view"] && this.emit("move:view", {
				prevIndex: n,
				currIndex: a
			}), this.events["select:item"] && this.emit("select:item", {
				$item: t
			}), this.scroll && this.scroll.scrollTo(this.viewIndex), !0
		}
		return !1
	}, s.prototype.move = function(e) {
		(e === o.up && this.type === this.TYPE_VERTICAL || e === o.left && this.type === this.TYPE_HORIZONTAL) && (this.$focusItem && this.$focusItem.index > 0 ? this.$focusItem === this.$body.firstChild ? this.renderView(this.viewIndex - 1) : this.focusItem(this.$focusItem.previousSibling) : this.cycle ? (this.move(o.end), this.events.cycle && this.emit("cycle", {
			direction: e
		})) : this.events.overflow && this.emit("overflow", {
			direction: e
		})), (e === o.down && this.type === this.TYPE_VERTICAL || e === o.right && this.type === this.TYPE_HORIZONTAL) && (this.$focusItem && this.$focusItem.index < this.data.length - 1 ? this.$focusItem === this.$body.lastChild ? this.renderView(this.viewIndex + 1) : this.focusItem(this.$focusItem.nextSibling) : this.cycle ? (this.move(o.home), this.events.cycle && this.emit("cycle", {
			direction: e
		})) : this.events.overflow && this.emit("overflow", {
			direction: e
		})), e === o.pageUp && (this.viewIndex < this.size ? this.renderView(0) : this.renderView(this.viewIndex - this.size + 1), this.focusItem(this.$body.firstChild)), e === o.pageDown && (this.data.length > this.size ? (this.viewIndex > this.data.length - 2 * this.size ? this.renderView(this.data.length - this.size) : this.renderView(this.viewIndex + this.size - 1), this.focusItem(this.$body.lastChild)) : this.focusItem(this.$body.children[this.data.length - 1])), e === o.home && (this.renderView(0), this.focusItem(this.$body.firstChild)), e === o.end && (this.data.length > this.size ? (this.renderView(this.data.length - this.size), this.focusItem(this.$body.lastChild)) : this.focusItem(this.$body.children[this.data.length - 1]))
	}, s.prototype.focusItem = function(e) {
		var t = this.$focusItem;
		return e && t !== e ? (null !== t && (t.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
			$item: t
		})), this.$focusItem = e, this.$focusItem.data = this.data[this.$focusItem.index], e.classList.add("focus"), this.events["focus:item"] && this.emit("focus:item", {
			$prev: t,
			$curr: e
		}), this.events["select:item"] && this.emit("select:item", {
			$item: e
		}), !0) : !1
	}, s.prototype.focusIndex = function(e) {
		var t = this.viewIndex || 0;
		e >= t + this.size ? (e = e < this.data.length - 1 ? e : this.data.length - 1, this.renderView(e - this.size + 1), this.focusItem(this.$body.lastChild)) : t > e ? (e = e > 0 ? e : 0, this.renderView(e), this.focusItem(this.$body.firstChild)) : (null === this.viewIndex && this.renderView(0), this.focusItem(this.$body.children[e - t]))
	}, s.prototype.markItem = function(e, t) {
		t ? e.classList.add("mark") : e.classList.remove("mark"), e.data.mark = t
	}, e.exports = s
}, function(e, t) {
	"use strict";
	e.exports = {
		initPlayer: gSTB.InitPlayer,
		saveUserData: gSTB.SaveUserData,
		loadUserData: gSTB.LoadUserData,
		setPosTime: gSTB.SetPosTime,
		getPosTime: gSTB.GetPosTime,
		play: gSTB.Play,
		pause: gSTB.Pause,
		continuePlay: gSTB.Continue,
		getVolume: gSTB.GetVolume,
		setVolume: gSTB.SetVolume,
		setNativeStringMode: gSTB.SetNativeStringMode,
		setServiceButtonState: gSTB.EnableServiceButton,
		setVKButtonState: gSTB.EnableVKButton,
		setAppButtonState: gSTB.EnableAppButton,
		setTvButtonState: gSTB.EnableTvButton,
		hideVK: gSTB.HideVirtualKeyboard,
		showVK: gSTB.ShowVirtualKeyboard,
		getStandByStatus: gSTB.GetStandByStatus,
		setStandByStatus: gSTB.StandBy,
		getEnv: gSTB.GetEnv
	}
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, e.className = "modalMessage " + (e.className || ""), n.call(this, e), this.$header = this.$body.appendChild(document.createElement("div")), this.$content = this.$body.appendChild(document.createElement("div")), this.$footer = this.$body.appendChild(document.createElement("div")), this.$header.className = "header", this.$content.className = "content", this.$footer.className = "footer", this.$header.innerText = "header", this.$content.innerText = "content", this.$footer.innerText = "footer"
	}
	var n = i(47);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, e.focusable = e.focusable || !1, e.visible = e.visible || !1, e.className = "widget " + (e.className || ""), n.call(this, e)
	}
	var n = i(4);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, this.active = !1, this.activeComponent = null, e.className = "page " + (e.className || ""), n.call(this, e), this.active = this.$node.classList.contains("active"), null === this.$node.parentNode && document.body.appendChild(this.$node), this.page = this
	}
	var n = i(4);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, e.exports = s
}, function(e, t, i) {
	"use strict";
	var s = i(3),
		n = i(11),
		a = new n;
	a.activeAlbumId = 0, a.albums = {}, a.getAlbums = function(e) {
		s.request("audio.getAlbums", "&owner_id=" + s.userId, function(t) {
			var i, n;
			for (s.totalAlbums = t.shift(), i = 0, n = t.length; n > i; ++i) t[i].value = t[i].title;
			e(t)
		})
	}, a.get = function(e, t) {
		var i = this,
			n = e.albumId || this.activeAlbumId,
			a = this.getFromCache(e);
		i.albums[n] || (i.albums[n] = {
			total: 1
		}), a.exists && a.items.length && a.items[0].album_id === n ? t(a.items) : e.offset < i.albums[n].total ? s.request("audio.get", "offset=" + e.offset + "&count=" + e.count + "&album_id=" + n + "&owner_id=" + s.userId, function(s) {
			var a, o;
			if (void 0 !== s) {
				for (i.albums[n].total = s.shift(), a = 0, o = s.length; o > a; ++a) s[a].value = i.secondsToTime(s[a].duration);
				i.cached.from = e.offset, i.cached.items = s, i.cached.to = i.cached.from + s.length, t(s)
			}
		}) : t([], !0)
	}, a.getOne = function(e, t) {
		a.get({
			offset: e,
			count: 1
		}, function(e) {
			t(e[0])
		})
	}, a.getRandom = function(e) {
		var t = Math.floor(Math.random() * (this.albums[this.activeAlbumId].total - 1));
		s.request("audio.get", "offset=" + t + "&album_id=" + this.activeAlbumId + "&count=1", function(i) {
			i[0].value = i[0].value || a.secondsToTime(i[0].duration), e(i[0], t)
		})
	}, a.setActiveAlbumId = function(e) {
		this.activeAlbumId !== e && (this.activeAlbumId = parseInt(e, 10), this.cached.from = 0, this.cached.to = 0, this.cached.items = [])
	}, e.exports = a
}, function(e, t, i) {
	"use strict";
	var s = i(3),
		n = i(11),
		a = i(6),
		o = new n;
	o.activeGenreId = 0, o.total = 8 * a.listSize, o.getGenres = function(e) {
		e([{
			id: 1,
			value: "Rock"
		}, {
			id: 2,
			value: "Pop"
		}, {
			id: 3,
			value: "Rap & Hip-Hop"
		}, {
			id: 4,
			value: "Easy Listening"
		}, {
			id: 5,
			value: "Dance & House"
		}, {
			id: 6,
			value: "Instrumental"
		}, {
			id: 7,
			value: "Metal"
		}, {
			id: 8,
			value: "Dubstep"
		}, {
			id: 9,
			value: "Jazz & Blues"
		}, {
			id: 10,
			value: "Drum & Bass"
		}, {
			id: 11,
			value: "Trance"
		}, {
			id: 13,
			value: "Ethnic"
		}, {
			id: 14,
			value: "Acoustic & Vocal"
		}, {
			id: 15,
			value: "Reggae"
		}, {
			id: 16,
			value: "Classical"
		}, {
			id: 17,
			value: "Indie Pop"
		}, {
			id: 18,
			value: "Other"
		}, {
			id: 19,
			value: "Speech"
		}, {
			id: 21,
			value: "Alternative"
		}, {
			id: 22,
			value: "Electropop & Disco"
		}])
	}, o.get = function(e, t) {
		var i = this,
			n = e.genreId || this.activeGenreId,
			a = this.getFromCache(e);
		a.exists && i.cached.items.length && i.cached.items[0].genre === n ? t(a.items) : e.offset < this.total ? s.request("audio.getPopular", "offset=0&count=" + (i.total + 40) + "&genre_id=" + n, function(s) {
			void 0 !== s ? (s.forEach(function(e) {
				e.value = i.secondsToTime(e.duration)
			}), i.cached.from = 0, i.cached.items = s.slice(0, i.total), i.cached.to = i.total, t(s.slice(e.offset, e.offset + e.count))) : t([], !0)
		}) : t([], !0)
	}, o.getOne = function(e, t) {
		o.get({
			offset: e,
			count: 1
		}, function(e) {
			e && e.length && t(e[0])
		})
	}, o.getRandom = function(e) {
		var t = Math.floor(Math.random() * (s.totalPopular - 1));
		s.request("audio.getPopular", "offset=" + t + "&genre_id=" + this.activeGenreId + "&count=1", function(i) {
			i[0].value = i[0].value || o.secondsToTime(i[0].duration), e(i[0], t)
		})
	}, o.setActiveGenre = function(e) {
		this.activeGenreId !== e && (this.activeGenreId = parseInt(e, 10), this.cached.from = 0, this.cached.to = 0, this.cached.items = [])
	}, e.exports = o
}, function(e, t, i) {
	"use strict";
	e.exports = new(i(17))({
		$node: window.pageInit
	})
}, function(e, t, i) {
	"use strict";

	function s(e) {
		return "window." + e + ".id"
	}

	function n(e, t) {
		var i, n = s(e),
			a = stbStorage.getItem(n);
		if (a) try {
			i = JSON.parse(stbWindowMgr.windowInfo(a)), -1 === i.result.url.indexOf(t) && stbWebWindow.messageSend(a, "window.load", t), e === l.BROWSER ? (a = stbWindowMgr.openWebFace(t), stbStorage.setItem(n, a)) : stbWindowMgr.windowShow(a)
		} catch (o) {
			debug.error(o), stbWindowMgr.openWebFace(t)
		} else a = e === l.BROWSER ? stbWindowMgr.openWebFace(t) : stbWindowMgr.windowInit(JSON.stringify({
			url: t,
			backgroundColor: "#000"
		})), stbStorage.setItem(n, a);
		return a
	}
	var a = i(2),
		o = i(17),
		r = i(3),
		c = i(14),
		d = new o({
			$node: document.getElementById("pageLogin")
		}),
		l = {
			PORTAL: "portal",
			HELP: "help",
			DOWNLOAD_MANAGER: "dlman",
			PVR: "recordsManager",
			BROWSER: "ibman",
			BROWSER_VIEW: "ibmanView",
			PORTALS_LOADER: "portalsLoader",
			SYSTEM_SETTINGS: "systemSettings"
		};
	d.id = "pageLogin", d.addListener("show", function() {
		var e, t, i = -1,
			o = !1,
			d = {
				480: {
					x: 47,
					y: 24,
					w: 640,
					h: 432
				},
				576: {
					x: 55,
					y: -24,
					w: 637,
					h: 528
				},
				720: {
					x: 40,
					y: -30,
					w: 1200,
					h: 660
				},
				1080: {
					x: 50,
					y: -80,
					w: 1820,
					h: 1e3
				}
			};
		t = d[window.screen.height], c.saveUserData(r.CACHE_FILE_NAME, "{}"), setTimeout(function() {
			n(l.BROWSER, "file:///home/web/public/app/ibman/index.html?mode=2&view=1&url=" + encodeURIComponent(r.AUTH_URL))
		}, 0), i = setInterval(function() {
			var n = stbWindowMgr.getCurrWebUrl(),
				d = {};
			return e = stbStorage.getItem(s(l.BROWSER)), 0 === n.length && o ? (a.exit(), void clearInterval(i)) : (o = !0, stbWindowMgr.SetVirtualKeyboardCoord("bottom"), stbWindowMgr.resizeWebWindow(t.x, t.y, t.w, t.h), void(-1 !== n.indexOf("#") && -1 !== n.indexOf("access_token") && (n = n.split("#")[1].split("&"), n.forEach(function(e) {
				var t = e.split("=");
				d[t[0]] = t[1]
			}), d.access_token && d.user_id && (clearInterval(i), stbWebWindow.messageSend(e, "close"), c.saveUserData(r.CACHE_FILE_NAME, JSON.stringify(d)), location.href = location.href.split("#")[0]))))
		}, 1e3)
	}), e.exports = d
}, function(e, t, i) {
	"use strict";
	var s, n, a = "pageMain",
		o = document.getElementById(a),
		r = i(17),
		c = new r({
			$node: o
		}),
		d = i(1),
		l = i(8),
		u = i(13),
		h = i(3),
		p = i(5),
		m = document.getElementById("pmHintTrackInfo"),
		f = i(2),
		v = i(37);
	c.addListener("show", function() {
		h.ready ? (s.$focusItem = s.$body.firstChild, s.$focusItem.classList.add("focus"), f.history.push({
			panel: s.$body.firstChild.data.panel,
			menuIndex: 0
		})) : l.navigate("pageLogin")
	}), c.addListener("keydown", function(e) {
		e.code === d.playPause ? (f.data.host && e.preventDefault(), f.player.isPlayed ? f.player.pause() : f.player.play()) : e.code === d.pageDown ? (f.data.host && e.preventDefault(), f.player.next()) : e.code === d.pageUp ? (f.data.host && e.preventDefault(), f.player.prev()) : e.code === d.info ? (f.data.host && e.preventDefault(), v.toggle()) : e.code === d.f3 ? (f.data.host && e.preventDefault(), null !== f.player.activeTrack.url && (f.history.activeTrackPlace.menuIndex === f.history.current.menuIndex ? f.history.activeTrackPlace.panel.hide() : f.history.current.panel.hide(), f.history.data.push(f.history.activeTrackPlace), f.history.current = f.history.activeTrackPlace, s.markItem(s.$body.children.item(f.history.current.menuIndex)), f.history.current.panel.$node.classList.remove("hidden"), f.history.current.panel.visible = !0, f.history.activeTrackPlace.panel.scrollToTrack(f.player.position))) : e.code === d.left ? s.focus() : e.code === d.right ? f.history.current.panel.focusEntry.focus() : e.code === d.back ? (f.data.host && e.preventDefault(), f.history.pop()) : e.code === d.f1 || e.code === d.f2 ? f.history.current.panel.emit("keydown", e) : e.code === d.volumeUp ? n.up() : e.code === d.volumeDown ? n.down() : e.code === d.mute ? n.toggleMute() : e.code === d.forward ? f.player.updatePosition(!0) : e.code === d.rewind ? f.player.updatePosition(!1) : e.code > 47 && e.code < 58 && f.player.inputPosition(e.code - 48)
	}), f.history.addListener("pop", function(e) {
		if (null !== e.prev) {
			if (null === e.curr) return f.history.current = e.prev, void f.history.data.push(e.prev);
			if (e.curr.panel.id === e.prev.panel.id) return;
			e.prev.panel.hide()
		}
		e.curr.panel.show(), s.markItem(s.$body.children.item(e.curr.menuIndex))
	}), f.history.addListener("push", function(e) {
		null !== e.prev && e.prev.panel.hide(), e.curr.panel.show(), s.markItem(s.$body.children.item(e.curr.menuIndex))
	}), c.addListener("load", function() {
		var e = [{
			value: p.t("My music"),
			panel: i(48)
		}, {
			value: p.t("Suggested music"),
			panel: i(49)
		}, {
			value: p.t("Popular music"),
			panel: i(30)
		}, {
			value: p.t("My folders"),
			panel: i(28)
		}, {
			value: p.t("Search"),
			panel: i(50)
		}, {
			value: p.t("Settings"),
			panel: i(51)
		}];
		h.onLogOut = function() {
			f.history.data = [], f.history.current = null, l.navigate("pageLogin")
		}, s = new u({
			$node: document.getElementById("pmListMenu"),
			data: e,
			size: e.length,
			navigate: function(e) {
				switch (e.code) {
					case d.up:
					case d.down:
					case d.home:
					case d.end:
						this.move(e.code);
						break;
					case d.ok:
						void 0 !== this.events["click:item"] && this.emit("click:item", {
							$item: this.$focusItem,
							event: e
						})
				}
			},
			render: function(e, t) {
				e.textContent = t.value
			},
			events: {
				"click:item": function(e) {
					f.history.current.id !== e.$item.data.panel.id && f.history.push({
						panel: e.$item.data.panel,
						menuIndex: e.$item.index
					})
				},
				overflow: function(e) {
					e.direction === d.up && f.player.focus()
				}
			}
		}), e.forEach(function(e) {
			c.add(e.panel)
		}), c.add(i(31)), c.add(i(29)), s.markItem = function(e) {
			s.$markItem && s.$markItem.classList.remove("mark"), e.classList.add("mark"), s.$markItem = e
		}, c.add(s), c.focusable = !1, c.add(f.player), f.player.initUI(), f.player.addListener("keydown", function(e) {
			e.code === d.down && s.focus()
		}), f.player.addListener("play", function(e) {
			e.track.lyrics_id ? m.style.display = "table" : m.style.display = "none"
		}), m.innerText = p.t("Track lyrics"), document.getElementById("pmHintCurrentTrack").innerText = p.t("Current track"), document.getElementById("pmHintBack").innerText = p.t("Back"), n = i(39)
	}), e.exports = c
}, function(e, t, i) {
	"use strict";

	function s(e) {
		this.current = null, this.data = e || [], n.call(this)
	}
	var n = i(12);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.push = function(e) {
		var t = this.current;
		this.data.push(e), this.current = e, this.events.push && this.emit("push", {
			prev: t,
			curr: this.current
		})
	}, s.prototype.pop = function() {
		var e = null;
		return this.data.length > 0 && (e = this.data.pop(), this.current = this.data.length > 0 ? this.data[this.data.length - 1] : null, this.events.pop && this.emit("pop", {
			prev: e,
			curr: this.current
		})), e
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, e.className = "button " + (e.className || ""), n.call(this, e), e.icon && (this.$icon = this.$body.appendChild(document.createElement("div")), this.$icon.className = "icon " + e.icon), this.$text = this.$body.appendChild(document.createElement("div")), this.$text.classList.add("text"), e.value && (this.$text.innerText = e.value)
	}
	var n = i(4),
		a = i(1);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.clickDuration = 200, s.prototype.defaultEvents = {
		click: function() {
			var e = this;
			this.$node.classList.add("click"), setTimeout(function() {
				e.$node.classList.remove("click")
			}, this.clickDuration)
		},
		keydown: function(e) {
			e.code === a.ok && this.events.click && this.emit("click", {
				event: e
			})
		}
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, this.map = [], this.$focusItem = null, this.data = [], this.cycleX = !0, this.cycleY = !0, this.focusX = 0, this.focusY = 0, e.className = "grid " + (e.className || ""), r.call(this, e), this.init(e)
	}

	function n(e) {
		var t, i, s;
		for (t = 0; t < e.length; t++)
			for (i = 0; i < e[t].length; i++) s = e[t][i], "object" != typeof s ? s = e[t][i] = {
				value: e[t][i],
				colSpan: 1,
				rowSpan: 1
			} : (s.colSpan = s.colSpan || 1, s.rowSpan = s.rowSpan || 1);
		return e
	}

	function a(e, t, i, s, n, a) {
		var o, r;
		for (o = i; i + n > o; o++) {
			for (e.length < o + 1 && e.push([]); void 0 !== e[o][t];) t++;
			for (r = t; t + s > r; r++) e[o].length < r + 1 && e[o].push(), e[o][r] = a, void 0 === a.x && (a.x = r), void 0 === a.y && (a.y = o)
		}
	}

	function o(e) {
		var t, i, s, n = [];
		for (t = 0; t < e.length; t++)
			for (i = 0; i < e[t].length; i++) s = e[t][i], a(n, i, t, s.colSpan, s.rowSpan, s.$item), delete s.$item;
		return n
	}
	var r = i(4),
		c = i(1);
	s.prototype = Object.create(r.prototype), s.prototype.constructor = s, s.prototype.renderItemDefault = function(e, t) {
		e.innerText = t.value
	}, s.prototype.renderItem = s.prototype.renderItemDefault, s.prototype.defaultEvents = {
		mousewheel: function(e) {
			e.wheelDeltaY && this.move(e.wheelDeltaY > 0 ? c.up : c.down), e.wheelDeltaX && this.move(e.wheelDeltaX > 0 ? c.left : c.right)
		},
		keydown: function(e) {
			switch (e.code) {
				case c.up:
				case c.down:
				case c.right:
				case c.left:
					this.move(e.code);
					break;
				case c.ok:
					this.events["click:item"] && this.emit("click:item", {
						$item: this.$focusItem,
						event: e
					})
			}
		}
	}, s.prototype.init = function(e) {
		var t, i, s, a, r, c, d, l = this,
			u = !1,
			h = function(e) {
				this.data.disable !== !0 && (l.focusItem(this), l.events["click:item"] && l.emit("click:item", {
					$item: this,
					event: e
				}))
			};
		if (void 0 !== e.cycleX && (this.cycleX = e.cycleX), void 0 !== e.cycleY && (this.cycleY = e.cycleY), e.data && this.data !== e.data && (this.data = e.data, u = !0), e.render && this.renderItem !== e.render && (this.renderItem = e.render, u = !0), u) {
			for (this.$table = document.createElement("table"), r = document.createElement("tbody"), this.data = n(this.data), t = 0; t < this.data.length; t++) {
				for (s = r.insertRow(), i = 0; i < this.data[t].length; i++) a = s.insertCell(-1), a.className = "item", d = this.data[t][i], d.$item = a, a.colSpan = d.colSpan, a.rowSpan = d.rowSpan, d.focus && (c = a), d.disable && a.classList.add("disable"), d.mark && a.classList.add("mark"), this.renderItem(a, d), a.data = d, a.addEventListener("click", h);
				r.appendChild(s)
			}
			this.map = o(this.data), this.$body.innerText = null, this.$table.appendChild(r), this.$body.appendChild(this.$table), c ? this.focusItem(c) : this.focusItem(this.map[0][0])
		}
	}, s.prototype.move = function(e) {
		for (var t = this.focusX, i = this.focusY, s = !0, n = !1, a = !1; s;) {
			switch (e) {
				case c.up:
					i > 0 ? i-- : this.cycleY ? (i = this.map.length - 1, a = !0) : n = !0;
					break;
				case c.down:
					i < this.map.length - 1 ? i++ : this.cycleY ? (i = 0, a = !0) : n = !0;
					break;
				case c.right:
					t < this.map[i].length - 1 ? t++ : this.cycleX ? (t = 0, a = !0) : n = !0;
					break;
				case c.left:
					t > 0 ? t-- : this.cycleX ? (t = this.map[i].length - 1, a = !0) : n = !0
			}
			t === this.focusX && i === this.focusY && (s = !1), this.map[i][t] !== this.map[this.focusY][this.focusX] && this.map[i][t].data.disable !== !0 && (s = !1), n && (s = !1, this.map[i][t].data.disable === !0 && (t = this.focusX, i = this.focusY))
		}
		a && this.events.cycle && this.emit("cycle", {
			direction: e
		}), n && this.events.overflow && this.emit("overflow", {
			direction: e
		}), this.focusItem(this.map[i][t]), this.focusX = t, this.focusY = i
	}, s.prototype.focusItem = function(e) {
		var t = this.$focusItem;
		return e && t !== e && e.data.disable !== !0 ? (null !== t && (t.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
			$item: t
		})), this.focusX = e.x, this.focusY = e.y, this.$focusItem = e, e.classList.add("focus"), this.events["focus:item"] && this.emit("focus:item", {
			$prev: t,
			$curr: e
		}), !0) : !1
	}, s.prototype.markItem = function(e, t) {
		t ? e.classList.add("mark") : e.classList.remove("mark"), e.data.mark = t
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, this.value = "", this.type = this.TYPE_TEXT, e.className = "input " + (e.className || ""), n.call(this, e), this.$line = this.$body.appendChild(document.createElement("div")), this.$line.className = "line", this.$caret = this.$line.appendChild(document.createElement("div")), this.$caret.className = "caret", this.$placeholder = this.$line.appendChild(document.createElement("div")), this.$placeholder.className = "placeholder", this.$caret.index = 0, this.init(e)
	}
	var n = i(4),
		a = i(1);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.TYPE_TEXT = 0, s.prototype.TYPE_PASSWORD = 1, s.prototype.defaultEvents = {
		keypress: function(e) {
			this.addChar(String.fromCharCode(e.keyCode), this.$caret.index)
		},
		keydown: function(e) {
			switch (e.code) {
				case a["delete"]:
					this.removeChar(this.$caret.index);
					break;
				case a.back:
					this.removeChar(this.$caret.index - 1);
					break;
				case a.left:
					this.setCaretPosition(this.$caret.index - 1);
					break;
				case a.right:
					this.setCaretPosition(this.$caret.index + 1);
					break;
				case a.end:
				case a.down:
					this.setCaretPosition(this.value.length);
					break;
				case a.home:
				case a.up:
					this.setCaretPosition(0)
			}
		}
	}, s.prototype.init = function(e) {
		e.type && (this.type = e.type), e.value && this.setValue(e.value), e.placeholder && (this.$placeholder.innerText = e.placeholder), this.$line.dir = e.direction || "ltr"
	}, s.prototype.addChar = function(e, t) {
		var i = document.createElement("div");
		t = void 0 === t ? this.$caret.index : t, 0 === this.value.length && this.$line.removeChild(this.$placeholder), i.className = "char", this.value = this.value.substring(0, t) + e + this.value.substring(t, this.value.length), ++this.$caret.index, this.type === this.TYPE_PASSWORD ? i.innerText = "*" : " " === e ? i.innerHTML = "&nbsp;" : i.innerText = e, t >= this.value.length ? (this.$line.appendChild(i), this.$line.appendChild(this.$caret)) : (this.$line.insertBefore(this.$caret, this.$line.children[t]), this.$line.insertBefore(i, this.$caret)), this.events.input && this.emit("input", {
			value: this.value
		})
	}, s.prototype.removeChar = function(e) {
		var t = this.value;
		e = void 0 === e ? this.$caret.index - 1 : e, this.value.length > 0 && (this.$caret.index === e && e < this.value.length ? this.$line.removeChild(this.$line.children[e + 1]) : this.$caret.index > e && (--this.$caret.index, this.$line.removeChild(this.$line.children[e])), this.value = this.value.substring(0, e) + this.value.substring(e + 1, this.value.length), this.events.input && t !== this.value && this.emit("input", {
			value: this.value
		})), 0 === this.value.length && this.$line.appendChild(this.$placeholder)
	}, s.prototype.setCaretPosition = function(e) {
		e >= 0 && e <= this.value.length && this.$caret.index !== e && (this.$line.removeChild(this.$caret), e === this.value.length ? this.$line.appendChild(this.$caret) : this.$line.insertBefore(this.$caret, this.$line.children[e]), this.$caret.index = e)
	}, s.prototype.setValue = function(e) {
		var t, i, s = this.value.length,
			n = e.length,
			a = 0;
		if (e !== this.value) {
			if (n > 0) {
				if (this.$placeholder.parentNode === this.$line && this.$line.removeChild(this.$placeholder), this.$line.removeChild(this.$caret), n !== s)
					if (i = n - s, i > 0)
						for (a = 0; i > a; a++) t = this.$line.appendChild(document.createElement("div")), t.className = "char";
					else
						for (a = 0; a > i; a--) this.$line.removeChild(this.$line.lastChild);
				for (a = 0; n > a; a++) t = this.$line.children[a], this.type === this.TYPE_PASSWORD ? t.innerHTML = "*" : " " === e[a] ? t.innerHTML = "&nbsp;" : t.innerText = e[a];
				this.value = e, this.$caret.index = n, this.$line.appendChild(this.$caret)
			} else this.value = "", this.$line.innerText = "", this.$line.appendChild(this.$caret), this.$line.appendChild(this.$placeholder);
			this.events.input && this.emit("input", {
				value: this.value
			})
		}
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, this.max = 100, this.min = 0, this.value = 0, this.step = 1, e.focusable = e.focusable || !1, e.className = "progressBar " + (e.className || ""), n.call(this, e), this.$value = this.$body.appendChild(document.createElement("div")), this.$value.className = "value", this.init(e)
	}
	var n = i(4);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.set = function(e) {
		var t = this.value;
		return this.value !== e && e <= this.max && e >= this.min ? (this.value = e, e = Math.abs(this.value - this.min) / this.step, 100 === e && this.events.done && this.emit("done"), this.$value.style.width = e + "%", this.events.change && this.emit("change", {
			curr: this.value,
			prev: t
		}), !0) : !1
	}, s.prototype.init = function(e) {
		void 0 !== e.max && (this.max = e.max), void 0 !== e.min && (this.min = e.min), void 0 !== e.value && (this.value = e.value), this.step = Math.abs(this.max - this.min) / 100, this.$value.style.width = Math.abs(this.min - this.value) / this.step + "%"
	}, e.exports = s
}, function(e, t, i) {
	"use strict";
	var s = i(2),
		n = i(1),
		a = i(7),
		o = i(9),
		r = i(13),
		c = i(6),
		d = i(18),
		l = new a({
			$node: document.getElementById("pmTabMyAlbums"),
			visible: !1,
			focusable: !0
		}),
		u = new o({
			$node: document.getElementById("pmScrollMyAlbums")
		}),
		h = i(29),
		p = null;
	l.addListener("show", function() {
		null === p ? (s.$loader.style.display = "block", d.getAlbums(function(e) {
			var t, i = 0,
				a = 0;
			if (p = new r({
					$node: document.getElementById("pmListMyAlbums"),
					size: c.listSize,
					data: e,
					render: function(e, t) {
						e.isReady ? e.$name.innerText = t.value : (e.$icon = document.createElement("div"), e.$icon.className = "icon play", e.appendChild(e.$icon), e.$name = document.createElement("div"), e.$name.className = "name", e.$name.innerText = t.value, e.appendChild(e.$name), e.isReady = !0)
					},
					events: {
						"click:item": function(e) {
							d.activeAlbumId || d.setActiveAlbumId(e.$item.data.album_id), h.albumId = e.$item.data.album_id, s.history.push({
								panel: h,
								menuIndex: 3
							})
						},
						"move:view": function(e) {
							e.prevIndex < e.currIndex ? i += a : i -= a, u.scrollTo(i)
						},
						keydown: function(e) {
							switch (e.code) {
								case n.up:
								case n.down:
								case n.right:
								case n.left:
								case n.home:
								case n.end:
									this.move(e.code);
									break;
								case n.ok:
									void 0 !== this.events["click:item"] && this.emit("click:item", {
										$item: this.$focusItem,
										event: e
									})
							}
						}
					}
				}), e.length < c.listSize)
				for (t = c.listSize - 1; t >= e.length;) p.$body.children.item(t).className = "", --t;
			l.add(p), l.focusEntry = p, a = p.$body.firstChild.offsetHeight, s.$loader.style.display = "none", p.show(), p.focus(), p.focusItem(p.$body.firstChild), u.init({
				max: e.length * p.$body.firstChild.offsetHeight
			}), i = u.min
		})) : p.focus()
	}), e.exports = l
}, function(e, t, i) {
	"use strict";
	var s, n = i(2),
		a = i(8),
		o = i(1),
		r = i(7),
		c = i(9),
		d = i(15),
		l = i(10),
		u = i(6),
		h = i(18),
		p = i(5),
		m = new r({
			$node: document.getElementById("pmTabMyAlbumTracks"),
			visible: !1,
			focusable: !0
		}),
		f = new c({
			$node: document.getElementById("pmScrollMyAlbumsTracks"),
			focusable: !1
		}),
		v = new d({
			hidden: !0
		}),
		y = null;
	m.albumId = 0, f.hide(), v.hide(), m.add(v), v.$content.innerText = p.t("No tracks in this folder"), v.$header.innerText = "", v.$footer.innerText = "", m.addListener("show", function() {
		null === y ? (n.$loader.style.display = "block", h.get({
			offset: 0,
			count: 2 * u.listSize,
			albumId: m.albumId
		}, function(e) {
			return s = i(28), 0 === e.length ? (a.current.emit("keydown", {
				code: o.left
			}), n.$loader.style.display = "none", v.show(), void setTimeout(function() {
				v.hide(), n.history.push({
					panel: s,
					menuIndex: 3
				})
			}, 3e3)) : (v.hide(), y = new l({
				$node: document.getElementById("pmAudioListMyAlbums"),
				size: u.listSize,
				data: e
			}), m.add(y), n.$loader.style.display = "none", f.show(), m.focusEntry = y, y.dataProvider = {
				get: function(e, t) {
					e.albumId = m.albumId, h.get(e, t)
				}
			}, y.addListener("data:changed", function(e) {
				f.realSize < e.total && (f.init({
					realSize: e.total
				}), f.value = y.activeOffset - 1, f.scrollTo(y.activeOffset)), n.player.isPlayed && n.player.dataProvider.id === h.id && y.markItem(n.player.position)
			}), y.addListener("move:view", function() {
				y.activeOffset + u.listSize >= h.albums[m.albumId].total ? f.scrollTo(y.activeOffset + 1) : f.scrollTo(y.activeOffset), n.player.isPlayed && n.player.dataProvider.id === h.id && y.markItem(n.player.position)
			}), y.addListener("keydown", function(e) {
				e.code === o.back && n.history.data[n.history.data.length - 2].panel.id === m.id && n.history.pop()
			}), y.addListener("click:item", function() {
				n.player.dataProvider.id === h.id ? (h.setActiveAlbumId(y.$focusItem.data.album), n.player.isPlayed && n.player.position === y.activeIndex ? n.player.pause() : (n.player.position = y.activeIndex, n.player.play(y.$focusItem.data))) : (n.player.setDataProvider(h, y.activeIndex), n.history.activeTrackPlace = {
					panel: m,
					menuIndex: 3
				}, h.setActiveAlbumId(y.$focusItem.data.album), n.player.play(y.$focusItem.data))
			}), f.init({
				realSize: y.data.length + 1,
				viewSize: u.listSize
			}), y.focus(), void y.focusItem(y.$body.firstChild))
		})) : m.albumId !== y.data[0].album ? (v.hide(), n.$loader.style.display = "block", y.hide(), h.get({
			offset: 0,
			count: 2 * u.listSize,
			albumId: m.albumId
		}, function(e) {
			return 0 === e.length ? (a.current.emit("keydown", {
				code: o.left
			}), n.$loader.style.display = "none", v.show(), void setTimeout(function() {
				v.hide(), n.history.push({
					panel: s,
					menuIndex: 3
				})
			}, 5e3)) : (y.updateData(e), y.show(), f.init({
				realSize: y.data.length + 1
			}), n.$loader.style.display = "none", y.focus(), void y.markItem(-1))
		})) : m.albumId === n.player.dataProvider.activeAlbumId ? (y.focus(), y.markItem(n.player.position)) : (y.focus(), y.markItem(-1))
	}), m.scrollToTrack = function(e) {
		s.hide(), h.activeAlbumId !== m.albumId && (m.albumId = h.activeAlbumId, e = -1), y.markItem(e) ? y.focus() : (n.$loader.style.display = "block", y.hide(), h.get({
			offset: n.player.position,
			count: 2 * u.listSize,
			albumId: h.activeAlbumId
		}, function(e) {
			y.activeOffset = n.player.position, y.activeIndex = n.player.position, y.updateData(e), y.show(), f.init({
				realSize: n.player.position + y.data.length + 1
			}), n.player.activeTrack.title !== e[0].title && y.renderItem(y.$body.firstChild, n.player.activeTrack), n.$loader.style.display = "none", y.focus(), y.markItem(n.player.position), f.scrollTo(n.player.position)
		}))
	}, n.player.addListener("play", function(e) {
		m.visible && m.albumId === h.activeAlbumId && n.player.dataProvider.id === h.id && (e.offset === y.activeIndex + 1 ? y.move(o.down) : e.offset === y.activeIndex - 1 && y.move(o.up), y.markItem(e.offset))
	}), n.player.addListener("pause", function() {
		m.visible && y.markItem(-1)
	}), e.exports = m
}, function(e, t, i) {
	"use strict";
	var s = i(2),
		n = i(1),
		a = i(7),
		o = i(9),
		r = i(13),
		c = i(6),
		d = i(19),
		l = new a({
			$node: document.getElementById("pmTabPopularGenres"),
			visible: !1,
			focusable: !0
		}),
		u = new o({
			$node: document.getElementById("pmScrollPopularGenres")
		}),
		h = i(31),
		p = null;
	l.addListener("show", function() {
		null === p ? d.getGenres(function(e) {
			u.init({
				realSize: e.length,
				viewSize: c.listSize
			}), p = new r({
				$node: document.getElementById("pmListPopularGenres"),
				size: c.listSize,
				data: e,
				render: function(e, t) {
					e.isReady ? e.$name.innerText = t.value : (e.$icon = document.createElement("div"), e.$icon.className = "icon play", e.appendChild(e.$icon), e.$name = document.createElement("div"), e.$name.className = "name", e.$name.innerText = t.value, e.appendChild(e.$name), e.isReady = !0)
				},
				scroll: u,
				events: {
					keydown: function(e) {
						switch (e.code) {
							case n.up:
							case n.down:
							case n.right:
							case n.left:
							case n.home:
							case n.end:
								this.move(e.code);
								break;
							case n.ok:
								void 0 !== this.events["click:item"] && this.emit("click:item", {
									$item: this.$focusItem,
									event: e
								})
						}
					},
					"click:item": function(e) {
						d.activeGenreId || d.setActiveGenre(e.$item.data.id), h.genreId = e.$item.data.id, s.history.push({
							panel: h,
							menuIndex: 2
						})
					}
				}
			}), l.add(p), l.focusEntry = p, p.show(), p.focus(), p.focusItem(p.$body.firstChild), u.init({
				max: e.length * p.$body.firstChild.offsetHeight
			})
		}) : p.focus()
	}), e.exports = l
}, function(e, t, i) {
	"use strict";
	var s, n = i(2),
		a = i(8),
		o = i(1),
		r = i(7),
		c = i(9),
		d = i(15),
		l = i(10),
		u = i(6),
		h = i(19),
		p = i(5),
		m = new r({
			$node: document.getElementById("pmTabPopular"),
			visible: !1,
			focusable: !0
		}),
		f = new c({
			$node: document.getElementById("pmScrollPopular"),
			focusable: !1
		}),
		v = new d({
			hidden: !0
		}),
		y = null;
	m.genreId = 0, f.hide(), v.hide(), m.add(v), v.$content.innerText = p.t("No tracks in this category"), v.$header.innerText = "", v.$footer.innerText = "", m.addListener("show", function() {
		null === y ? (n.$loader.style.display = "block", h.get({
			offset: 0,
			count: 2 * u.listSize,
			genreId: m.genreId
		}, function(e) {
			return s = i(30), 0 === e.length ? (a.current.emit("keydown", {
				code: o.left
			}), n.$loader.style.display = "none", v.show(), void setTimeout(function() {
				v.hide(), n.history.push({
					panel: s,
					menuIndex: 2
				})
			}, 3e3)) : (v.hide(), y = new l({
				$node: document.getElementById("pmAudioListPopular"),
				size: u.listSize,
				data: e
			}), m.add(y), n.$loader.style.display = "none", f.show(), m.focusEntry = y, y.dataProvider = {
				get: function(e, t) {
					e.genreId = m.genreId, h.get(e, t)
				}
			}, y.addListener("data:changed", function(e) {
				f.realSize < e.total && (f.init({
					realSize: e.total
				}), f.value = y.activeOffset - 1, f.scrollTo(y.activeOffset)), n.player.isPlayed && n.player.dataProvider.id === h.id && y.markItem(n.player.position)
			}), y.addListener("move:view", function() {
				y.activeOffset + u.listSize >= h.total ? f.scrollTo(y.activeOffset + 1) : f.scrollTo(y.activeOffset), n.player.isPlayed && n.player.dataProvider.id === h.id && y.markItem(n.player.position) && y.$markItem.data.aid !== n.player.activeTrack.aid && y.markItem(-1)
			}), y.addListener("click:item", function() {
				n.player.dataProvider.id === h.id ? (h.setActiveGenre(y.$focusItem.data.genre), n.player.isPlayed && n.player.position === y.activeIndex ? n.player.pause() : (n.player.position = y.activeIndex, n.player.play(y.$focusItem.data))) : (n.player.setDataProvider(h, y.activeIndex), h.setActiveGenre(y.$focusItem.data.genre), n.history.activeTrackPlace = {
					panel: m,
					menuIndex: 2
				}, n.player.play(y.$focusItem.data))
			}), y.addListener("keydown", function(e) {
				e.code === o.back && n.history.data[n.history.data.length - 2].panel.id === m.id && n.history.pop()
			}), f.init({
				realSize: y.data.length + 1,
				viewSize: u.listSize
			}), y.focus(), void y.focusItem(y.$body.firstChild))
		})) : m.genreId !== y.data[0].genre ? (n.$loader.style.display = "block", y.hide(), h.get({
			offset: 0,
			count: 2 * u.listSize,
			genreId: m.genreId
		}, function(e) {
			y.updateData(e), y.show(), f.init({
				realSize: y.data.length + 1
			}), n.$loader.style.display = "none", y.focus(), y.markItem(-1)
		})) : m.genreId === n.player.dataProvider.activeGenreId ? (y.focus(), y.markItem(n.player.position)) : (y.focus(), y.markItem(-1))
	}), m.scrollToTrack = function(e) {
		s.hide(), h.activeGenreId !== m.genreId && (m.genreId = h.activeGenreId, e = -1), y.markItem(e) ? y.focus() : (n.$loader.style.display = "block", y.hide(), h.get({
			offset: n.player.position,
			count: 2 * u.listSize,
			genreId: h.activeGenreId
		}, function(e) {
			y.activeOffset = n.player.position, y.activeIndex = n.player.position, y.updateData(e), y.show(), f.init({
				realSize: n.player.position + y.data.length + 1
			}), n.player.activeTrack.title !== e[0].title && y.renderItem(y.$body.firstChild, n.player.activeTrack), n.$loader.style.display = "none", y.focus(), y.markItem(n.player.position), f.scrollTo(n.player.position)
		}))
	}, n.player.addListener("play", function(e) {
		m.visible && m.genreId === h.activeGenreId && n.player.dataProvider.id === h.id && (e.offset === y.activeIndex + 1 ? y.move(o.down) : e.offset === y.activeIndex - 1 && y.move(o.up), y.markItem(e.offset))
	}), n.player.addListener("pause", function() {
		m.visible && y.markItem(-1)
	}), e.exports = m
}, function(e, t, i) {
	"use strict";

	function s(e) {
		var t = this;
		e = e || {}, this.isShuffled = !1, this.isPlayed = !1, this.isRepeated = !1, this.activeTrack = {
			url: null
		}, this.position = -1, this.dataProvider = {
			id: null,
			getOne: function() {}
		}, this.buttons = [], this.focusButtonIndex = this.BUTTON_PLAY, this.$statusCurrentArtist = document.getElementById("pmPlayerTrackArtist"), this.$statusCurrentTrackName = document.getElementById("pmPlayerTrackName"), this.$statusCurrentTrackTime = document.getElementById("pmPlayerTrackTime"), this.$statusCurrentTrack = document.getElementById("pmPlayerTrack"), this.timeout = -1, this.left = {
			min: 0,
			max: 30,
			active: 0,
			step: 3
		}, this.nameInterval = -1, this.nameTimeout = -1, this.positionTimeout = -1, this.errorMessage = new c({
			visible: !1
		}), this.lastDirection = this.BUTTON_NEXT, a.call(this, e), this.errorMessage.$body.appendChild(document.createTextNode(d.t("File open error"))), this.errorMessage.$node.classList.add("errorFileOpen"), this.$body.appendChild(this.errorMessage.$node), this.addListener("keydown", function(e) {
			e.code === n.left && t.focusButtonIndex > 0 ? (e.stop = !0, t.buttons[t.focusButtonIndex].$node.classList.remove("focus"), --t.focusButtonIndex, t.buttons[t.focusButtonIndex].$node.classList.add("focus")) : e.code === n.right && t.focusButtonIndex < this.BUTTON_SHUFFLE ? (e.stop = !0, t.buttons[t.focusButtonIndex].$node.classList.remove("focus"), ++t.focusButtonIndex, t.buttons[t.focusButtonIndex].$node.classList.add("focus")) : e.code === n.ok && (e.stop = !0, t.buttons[t.focusButtonIndex].emit("click"))
		}), this.addListener("focus", function() {
			t.buttons[t.focusButtonIndex].$node.classList.add("focus")
		}), this.addListener("blur", function() {
			t.buttons[t.focusButtonIndex].$node.classList.remove("focus"), t.focusButtonIndex = this.BUTTON_PLAY
		}), l.initPlayer(), window.stbEvent.addListener(window.stbEvent.PLAY_END, function() {
			t.isPlayed = !1, clearTimeout(t.timeout), t.buttons[t.BUTTON_PLAY].$body.classList.remove("pauseTrack"), t.buttons[t.BUTTON_PLAY].$body.classList.add("playTrack"), t.progressBar.set(0), t.emit("pause", {
				offset: t.position
			}), t.isRepeated ? t.play(t.activeTrack) : t.lastDirection === t.BUTTON_PREV ? t.prev() : t.next()
		}), window.stbEvent.addListener(window.stbEvent.PLAY_START, function() {
			t.isPlayed || (t.buttons[t.BUTTON_PLAY].$body.classList.remove("playTrack"), t.buttons[t.BUTTON_PLAY].$body.classList.add("pauseTrack"), t.isPlayed = !0), clearTimeout(t.timeout), t.timeout = setTimeout(function() {
				t.incrementProgress(l.getPosTime())
			}, 1e3)
		}), window.stbEvent.addListener(window.stbEvent.PLAY_ERROR, function() {
			t.errorMessage.show(), t.isPlayed = !1, clearTimeout(t.timeout), t.buttons[t.BUTTON_PLAY].$body.classList.remove("pauseTrack"), t.buttons[t.BUTTON_PLAY].$body.classList.add("playTrack"), t.progressBar.set(0), setTimeout(function() {
				t.errorMessage.hide()
			}, 5e3), t.next()
		})
	}
	var n = i(1),
		a = i(4),
		o = i(27),
		r = i(24),
		c = i(16),
		d = i(5),
		l = i(14);
	s.prototype = Object.create(a.prototype), s.prototype.constructor = s, s.prototype.BUTTON_NEXT = 0, s.prototype.BUTTON_PLAY = 1, s.prototype.BUTTON_PREV = 2, s.prototype.BUTTON_REPEAT = 3, s.prototype.BUTTON_SHUFFLE = 4, s.prototype.play = function(e) {
		var t = this;
		return void 0 === e && null === this.activeTrack.url ? (this.position = -1, void this.next()) : (void 0 === e && (e = this.activeTrack), void(e.aid === this.activeTrack.aid ? (this.buttons[this.BUTTON_PLAY].$body.classList.remove("playTrack"), this.buttons[this.BUTTON_PLAY].$body.classList.add("pauseTrack"), this.isPlayed = !0, this.timeout = setTimeout(function() {
			t.incrementProgress(l.getPosTime())
		}, 1e3), this.emit("play", {
			track: this.activeTrack,
			offset: this.position
		}), l.continuePlay()) : (this.activeTrack = e, this.updateTrackStatus(), l.play("auto " + e.url), this.emit("play", {
			track: e,
			offset: this.position
		}))))
	}, s.prototype.next = function() {
		var e = this;
		this.isShuffled ? this.dataProvider.getRandom(function(t, i) {
			e.pause(), e.position = i, e.play(t), e.emit("play:random")
		}) : this.isRepeated || this.dataProvider.getOne(this.position + 1, function(t) {
			e.pause(), ++e.position, e.play(t), e.emit("play:next", {
				offset: e.position
			})
		})
	}, s.prototype.prev = function() {
		var e = this;
		this.isShuffled ? this.dataProvider.getRandom(function(t, i) {
			e.pause(), e.position = i, e.play(t), e.emit("play:random");
		}) : !this.isRepeated && this.position > 0 && this.dataProvider.getOne(this.position - 1, function(t) {
			e.pause(), --e.position, e.play(t), e.emit("play:prev", {
				offset: e.position
			})
		})
	}, s.prototype.pause = function() {
		this.isPlayed && (this.buttons[this.BUTTON_PLAY].$body.classList.remove("pauseTrack"), this.buttons[this.BUTTON_PLAY].$body.classList.add("playTrack"), this.isPlayed = !1, l.pause(), clearTimeout(this.timeout), this.emit("pause", {
			offset: this.position
		}))
	}, s.prototype.incrementProgress = function(e) {
		var t = this;
		e = e || this.progressBar.value + 1, this.isPlayed && (this.progressBar.set(e), e = Math.round(e), this.$statusCurrentTrackTime.innerText = this.dataProvider.secondsToTime(this.progressBar.max - e), this.timeout = setTimeout(function() {
			t.incrementProgress(l.getPosTime())
		}, 1e3))
	}, s.prototype.updateTrackStatus = function() {
		this.activeTrack.url && (this.$statusCurrentArtist.innerHTML = this.activeTrack.artist, this.$statusCurrentTrackName.innerHTML = this.activeTrack.title, this.$statusCurrentTrackTime.innerText = this.dataProvider.secondsToTime(this.activeTrack.duration), this.progressBar.init({
			max: this.activeTrack.duration,
			value: 0
		}), this.scrollLongName(this.$statusCurrentTrack))
	}, s.prototype.scrollLongName = function(e) {
		var t = this;
		clearTimeout(this.nameTimeout), clearInterval(this.nameInterval), e.style.left = "0px", e.clientWidth < e.scrollWidth && (this.nameTimeout = setTimeout(function() {
			t.left.min = -1 * (e.scrollWidth - e.clientWidth + t.left.max), t.left.active = 0, t.nameInterval = setInterval(function() {
				return t.left.active < t.left.min ? void t.scrollLongName(e) : (t.left.active -= t.left.step, void(e.style.left = t.left.active + "px"))
			}, 150)
		}, 1e3))
	}, s.prototype.updatePosition = function(e) {
		var t = this;
		this.pause(), clearTimeout(this.positionTimeout), e ? (this.progressBar.set(Math.round(this.progressBar.value + 2 * this.progressBar.step)), this.positionTimeout = setTimeout(function() {
			t.lastDirection = t.BUTTON_NEXT, l.setPosTime(t.progressBar.value), t.play(t.activeTrack)
		}, 600)) : (this.progressBar.set(Math.round(this.progressBar.value - 2 * this.progressBar.step)), this.positionTimeout = setTimeout(function() {
			t.lastDirection = t.BUTTON_PREV, l.setPosTime(t.progressBar.value), t.play(t.activeTrack)
		}, 600)), this.$statusCurrentTrackTime.innerText = this.dataProvider.secondsToTime(this.progressBar.max - this.progressBar.value)
	}, s.prototype.inputPosition = function(e) {
		var t, i, s = this;
		this.activeTrack.url && (clearTimeout(this.positionTimeout), -1 === this.positionTimeout ? (clearTimeout(this.timeout), this.$statusCurrentTrackTime.className = "active", this.$statusCurrentTrackTime.innerText = "00:00:0" + e, this.progressBar.set(e)) : (t = this.$statusCurrentTrackTime.innerText.replace(/:/g, ""), "0" === t[0] ? (t = t.substring(1, 6) + e, i = 3600 * parseInt(t.substring(0, 2), 10), i += 60 * parseInt(t.substring(2, 4), 10), i += parseInt(t.substring(4, 6), 10), i > this.progressBar.max ? (i = this.progressBar.max, this.$statusCurrentTrackTime.innerText = s.dataProvider.secondsToTime(i)) : this.$statusCurrentTrackTime.innerText = t.substring(0, 2) + ":" + t.substring(2, 4) + ":" + t.substring(4, 6), this.progressBar.set(i)) : this.progressBar.set(this.activeTrack.duration)), this.positionTimeout = setTimeout(function() {
			s.$statusCurrentTrackTime.className = "", s.positionTimeout = -1, s.$statusCurrentTrackTime.innerText = s.dataProvider.secondsToTime(s.progressBar.max - s.progressBar.value), l.setPosTime(s.progressBar.value), s.progressBar.value === s.activeTrack.duration ? s.next() : s.play(s.activeTrack)
		}, 3e3))
	}, s.prototype.initUI = function() {
		var e = this,
			t = document.createElement("div");
		this.progressBar = new o, this.buttons = [new r({
			icon: "prevTrack",
			events: {
				click: function() {
					e.prev()
				}
			}
		}), new r({
			icon: "playTrack",
			events: {
				click: function() {
					e.isPlayed ? e.pause() : e.play(null === e.activeTrack.url ? void 0 : e.activeTrack)
				}
			}
		}), new r({
			icon: "nextTrack",
			events: {
				click: function() {
					e.next()
				}
			}
		}), new r({
			icon: "repeatTrack",
			events: {
				click: function() {
					e.isRepeated ? e.buttons[e.BUTTON_REPEAT].$body.classList.remove("active") : e.buttons[e.BUTTON_REPEAT].$body.classList.add("active"), e.isRepeated = !e.isRepeated
				}
			}
		}), new r({
			icon: "shuffleTracks",
			events: {
				click: function() {
					e.isShuffled ? e.buttons[e.BUTTON_SHUFFLE].$body.classList.remove("active") : e.buttons[e.BUTTON_SHUFFLE].$body.classList.add("active"), e.isShuffled = !e.isShuffled
				}
			}
		})], this.add(this.progressBar), this.buttons.forEach(function(i) {
			t.appendChild(i.$node), i.$node.classList.add(i.$icon.classList.item(1)), e.add(i)
		}), this.$body.appendChild(t), this.progressBar.set(0)
	}, s.prototype.setDataProvider = function(e, t) {
		this.dataProvider = e, this.position = t || 0
	}, e.exports = s
}, function(e, t, i) {
	"use strict";
	var s = i(3),
		n = i(11),
		a = new n;
	a.total = 1, a.get = function(e, t) {
		var i, n, o = this,
			r = this.getFromCache(e),
			c = 0;
		return r.exists ? (this.cached.to <= e.offset + e.count && a.get({
			offset: this.cached.to,
			count: e.count
		}), void t(r.items)) : (i = e.offset, n = 2 * e.count, e.offset >= n && o.cached.from >= e.offset + e.count ? (i -= e.count, n += e.count, c = e.count) : 0 >= i ? (i = 0, c = 0) : n *= 1.5, i >= a.total ? void t([], !0) : void s.request("audio.get", "offset=" + i + "&count=" + n + "&owner_id=" + s.userId, function(s) {
			void 0 !== s && (a.total = s.shift(), s.forEach(function(e) {
				e.value = o.secondsToTime(e.duration)
			}), o.cached.from = i, o.cached.items = s, o.cached.to = o.cached.from + s.length, t && t(s.slice(c, c + e.count)))
		}))
	}, a.getOne = function(e, t) {
		a.get({
			offset: e,
			count: 1
		}, function(e) {
			t(e[0])
		})
	}, a.getRandom = function(e) {
		var t = Math.floor(Math.random() * (a.total - 1));
		a.get({
			offset: t,
			count: 1
		}, function(i) {
			i[0].value = i[0].value || a.secondsToTime(i[0].duration), e(i[0], t)
		})
	}, e.exports = a
}, function(e, t, i) {
	"use strict";
	var s = i(3),
		n = i(11),
		a = i(6),
		o = new n;
	o.total = 8 * a.listSize, o.get = function(e, t) {
		var i = this,
			n = this.getFromCache(e);
		n.exists ? t(n.items) : e.offset < o.total ? s.request("audio.getRecommendations", "shuffle=0&offset=0&count=" + (i.total + 20), function(s) {
			void 0 !== s ? (s.forEach(function(e) {
				e.value = i.secondsToTime(e.duration)
			}), i.cached.from = 0, i.cached.items = s.slice(0, i.total), i.cached.to = i.total, t(s.slice(e.offset, e.offset + e.count))) : t([], !0)
		}) : t([], !0)
	}, o.getOne = function(e, t) {
		o.get({
			offset: e,
			count: 1
		}, function(e) {
			e && e.length && t(e[0])
		})
	}, o.getRandom = function(e) {
		var t = Math.floor(99 * Math.random());
		o.get({
			offset: t,
			count: 1
		}, function(i) {
			i && i.length && e(i[0], t)
		})
	}, e.exports = o
}, function(e, t, i) {
	"use strict";
	var s = i(3),
		n = i(11),
		a = new n;
	a.activeSearchQuery = "", a.replaceTemplace = '<span class="selected">$1</span>', a.total = 980, a.get = function(e, t) {
		var i = this,
			n = e.query || this.activeSearchQuery;
		e.offset < a.total ? s.request("audio.search", "offset=" + e.offset + "&count=" + e.count + "&q=" + n, function(e) {
			var s;
			void 0 !== e ? (e.shift(), n = n.trim(), s = new RegExp("(" + n + ")", "gi"), e.forEach(function(e) {
				e.value = i.secondsToTime(e.duration), e.name = "<b>" + e.artist + "</b>&nbsp;-&nbsp;" + e.title, n.length && (e.name = e.name.replace(s, i.replaceTemplace))
			}), t(e)) : t([], !0)
		}) : t([], !0)
	}, a.getOne = function(e, t) {
		a.get({
			offset: e,
			count: 1
		}, function(e) {
			t(e[0])
		})
	}, a.getRandom = function(e) {
		a.get({
			offset: Math.floor(999 * Math.random()),
			count: 1
		}, function(t) {
			e(t[0])
		})
	}, a.setActiveSearchQuery = function(e) {
		this.activeSearchQuery !== e && (this.activeSearchQuery = e)
	}, e.exports = a
}, function(e, t, i) {
	"use strict";
	var s = i(26),
		n = i(25),
		a = i(16),
		o = i(1),
		r = i(2),
		c = i(3),
		d = {
			method: "",
			urlParams: "",
			callback: null
		},
		l = new a({
			$node: document.getElementById("captchaWidget"),
			$body: document.getElementById("captchaWidgetBody"),
			visible: !1
		}),
		u = new s({
			events: {
				keydown: function(e) {
					e.stop = !0
				}
			}
		}),
		h = new n({
			cycleY: !1,
			data: [
				["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", {
					value: "ok",
					code: o.ok,
					rowSpan: 6
				}],
				["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
				["k", "l", "m", "n", "o", "p", "q", "r", "s", "t"],
				["u", "v", "w", "x", "y", "z", ".", ",", "!", "%"],
				[{
					value: "left",
					code: o.left
				}, {
					value: "right",
					code: o.right
				}, {
					value: "backspace",
					code: o.back
				}, "@", "#", "$", "^", "&", "*", "/"],
				["(", ")", "{", "}", "-", "=", '"', "'", "[", "]"]
			],
			events: {
				keydown: function(e) {
					e.stop = !0
				},
				"click:item": function(e) {
					e.$item.data.code === o.ok ? u.value && (d.urlParams += "&captcha_key=" + u.value, u.setValue(""), c.request.call(c, d.method, d.urlParams, function(e) {
						if (e) {
							l.hide();
							try {
								r.history.current.panel.focusEntry.focus()
							} catch (t) {}
							d.callback(e)
						}
					})) : e.$item.data.code === o.left ? u.moveCaret(o.left) : e.$item.data.code === o.right ? u.moveCaret(o.right) : e.$item.data.code === o.back ? u.removeChar() : u.addChar(e.$item.data.value)
				}
			}
		}),
		p = document.createElement("img"),
		m = document.createElement("div");
	p.className = "captchaImage", h.$body.classList.add("captchaKeyBoard"), m.className = "header", m.innerText = "Input code from image", l.$body.appendChild(m), l.activate = function(e, t, i, s) {
		this.show(), h.focus(), i += "&captcha_sid=" + e.captcha_sid, d.method = t, d.urlParams = i, d.callback = s, p.setAttribute("src", e.captcha_img)
	}, l.$body.appendChild(p), l.add(u, h), e.exports = l
}, function(e, t, i) {
	"use strict";
	var s = i(2),
		n = i(1),
		a = i(16),
		o = i(7),
		r = i(9),
		c = new a({
			$node: document.getElementById("pmModalInfo"),
			$body: document.getElementById("pmModalInfoBody"),
			visible: !1
		}),
		d = new r({
			$node: document.getElementById("pmScrollModalInfoContent")
		}),
		l = new o({
			$node: document.getElementById("pmLyricsText"),
			focusable: !0
		}),
		u = i(5),
		h = i(3),
		p = document.getElementById("pmLabelModalInfoArtist"),
		m = document.getElementById("pmLabelModalInfoTrackTitle"),
		f = document.getElementById("pmModalInfoBack"),
		v = 0,
		y = 0;
	l.addListener("keydown", function(e) {
		if (e.code === n.down && v < d.max) e.stop = !0, v += y;
		else if (e.code === n.up && v > 0) e.stop = !0, v -= y;
		else if (e.code === n.back || e.code === n.exit) return e.stop = !0, void c.toggle();
		v > d.max ? d.scrollTo(d.max) : d.scrollTo(v), l.$body.style.top = "-" + v + "px"
	}), c.toggle = function() {
		var e, t = this;
		this.visible ? (this.hide(), l.$body.style.top = "0px", s.history.current.panel.focusEntry.focus()) : null !== s.player.activeTrack.url && (e = s.player.activeTrack, h.getLyrics(e.lyrics_id, function(i) {
			t.show(), l.focus(), p.innerHTML = e.artist, m.innerHTML = "&nbsp;-&nbsp;" + e.title, l.$body.innerText = i.text.trim(), setTimeout(function() {
				d.init({
					realSize: l.$body.scrollHeight + l.$body.offsetHeight,
					viewSize: l.$body.offsetHeight
				}), v = 0, d.max = d.realSize - d.viewSize - 80, y = d.viewSize - 80
			}, 0)
		}))
	}, f.innerText = u.t("Back"), e.exports = c
}, function(e, t, i) {
	"use strict";
	var s, n = i(12);
	s = new n, s.PLAY_END = "1", s.PLAY_START = "4", s.PLAY_ERROR = "5", s.HDMI_CONNECTED = "32", s.HDMI_DISCONNECTED = "33", s.onEvent = function(e) {
		this.emit(e)
	}, window.stbEvent = s
}, function(e, t, i) {
	"use strict";
	var s = i(16),
		n = i(27),
		a = i(14),
		o = a.getVolume(),
		r = 5,
		c = -1,
		d = new s({
			$node: document.getElementById("volumeWidget"),
			$body: document.getElementById("volumeWidgetBody"),
			visible: !0
		}),
		l = new n({
			$node: document.getElementById("volumeBar"),
			min: 0,
			max: 100,
			value: a.getVolume()
		}),
		u = document.getElementById("volumeValue"),
		h = !1,
		p = 0;
	d.up = function() {
		clearTimeout(c), d.$node.classList.add("active"), l.set(o + r), c = setTimeout(function() {
			d.$node.classList.remove("active")
		}, 1e3)
	}, d.down = function() {
		clearTimeout(c), d.$node.classList.add("active"), l.set(o - r), c = setTimeout(function() {
			d.$node.classList.remove("active")
		}, 1e3)
	}, d.toggleMute = function() {
		clearTimeout(c), h ? (d.$node.classList.add("active"), u.classList.remove("mute"), l.set(p), c = setTimeout(function() {
			d.$node.classList.remove("active")
		}, 1e3)) : (d.$node.classList.add("active"), u.classList.add("mute"), l.set(0)), h = !h
	}, l.addListener("change", function(e) {
		p = e.prev, o = e.curr, a.setVolume(e.curr)
	}), e.exports = d
}, function(e, t) {
	"use strict";
	e.exports = {
		WILD_WEB: "ibmanView",
		ids: [],
		open: function(e, t) {
			var i;
			return e === this.WILD_WEB && (i = stbStorage.getItem(this.WILD_WEB), i && stbWindowMgr.closeWindow(i), this.ids.push(stbWindowMgr.initWebWindow(t)), stbStorage.setItem(this.WILD_WEB, this.ids[this.ids.length - 1])), this.ids[this.ids.length - 1]
		},
		close: function(e, t) {
			var i = this.ids.indexOf(e); - 1 !== i && (stbWindowMgr.closeWindow(this.ids.splice(i, 1)[0]), t === this.WILD_WEB && stbStorage.removeItem(this.WILD_WEB))
		},
		closeAll: function() {
			for (var e = this.ids.pop(); e;) stbWindowMgr.closeWindow(e), e = this.ids.pop();
			stbStorage.removeItem(this.WILD_WEB)
		},
		setVirtualKeyboardPosition: stbWindowMgr.SetVirtualKeyboardCoord
	}
}, function(e, t, i) {
	"use strict";

	function s(e) {
		n.call(this), this.data = e || {}
	}
	var n = i(12);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.idName = "id", s.prototype.clear = function() {
		var e = this.data;
		return Object.keys(e).length > 0 ? (this.data = {}, this.events.clear && this.emit("clear", {
			data: e
		}), !0) : !1
	}, s.prototype.init = function(e) {
		return e ? (this.clear(), this.data = e, this.events.init && this.emit("init", {
			data: e
		}), !0) : !1
	}, s.prototype.has = function(e) {
		return this.data.hasOwnProperty(e)
	}, s.prototype.get = function(e) {
		return this.data[e]
	}, s.prototype.set = function(e, t) {
		var i = e in this.data,
			s = {
				name: e,
				curr: t
			};
		return i ? (s.prev = this.data[e], t !== s.prev ? (this.data[e] = t, this.events.change && this.emit("change", s), !0) : !1) : (this.data[e] = t, this.events.change && this.emit("change", s), !0)
	}, s.prototype.unset = function(e) {
		var t, i = e in this.data;
		return i ? (t = {
			name: e,
			prev: this.data[e]
		}, delete this.data[e], this.events.change && this.emit("change", t), !0) : !1
	}, e.exports = s
}, function(e, t) {
	"use strict";
	if (!("classList" in document.documentElement)) {
		var i = Array.prototype,
			s = i.indexOf,
			n = i.slice,
			a = i.push,
			o = i.splice,
			r = i.join;
		window.DOMTokenList = function(e) {
			if (this._element = e, e.className !== this._classCache) {
				if (this._classCache = e.className, !this._classCache) return;
				var t, i = this._classCache.replace(/^\s+|\s+$/g, "").split(/\s+/);
				for (t = 0; t < i.length; t++) a.call(this, i[t])
			}
		}, window.DOMTokenList.prototype = {
			add: function(e) {
				this.contains(e) || (a.call(this, e), this._element.className = n.call(this, 0).join(" "))
			},
			contains: function(e) {
				return -1 !== s.call(this, e)
			},
			item: function(e) {
				return this[e] || null
			},
			remove: function(e) {
				var t = s.call(this, e); - 1 !== t && (o.call(this, t, 1), this._element.className = n.call(this, 0).join(" "))
			},
			toString: function() {
				return r.call(this, " ")
			},
			toggle: function(e) {
				return this.contains(e) ? this.remove(e) : this.add(e), this.contains(e)
			}
		}, Object.defineProperty(Element.prototype, "classList", {
			get: function() {
				return new window.DOMTokenList(this)
			}
		})
	}
}, function(e, t) {
	"use strict";
	e.exports = function(e) {
		var t = {};
		return e.split("&").forEach(function(e) {
			e = e.split("="), 2 === e.length && (t[e[0]] = decodeURIComponent(e[1]))
		}), t
	}
}, function(e, t) {
	"use strict";

	function i(e) {
		for (var t = i.options, s = t.parser[t.strictMode ? "strict" : "loose"].exec(e), n = {}, a = 14; a--;) n[t.key[a]] = s[a] || "";
		return n[t.q.name] = {}, n[t.key[12]].replace(t.q.parser, function(e, i, s) {
			i && (n[t.q.name][i] = s)
		}), n
	}
	i.options = {
		strictMode: !1,
		key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
		q: {
			name: "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	}, e.exports = i
}, function(e, t, i) {
	"use strict";
	var s = i(43);
	e.exports = function() {
		var e = s(location.search.substring(1));
		return e.referrer ? decodeURIComponent(e.referrer) : document.referrer ? location.href.split("#")[0] === document.referrer ? !1 : document.referrer : !1
	}
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, e.className = "checkBox " + (e.className || ""), this.value = !!e.value, this.value && (e.className += " checked"), n.call(this, e), this.group = null, e.group && (this.group = e.group, void 0 === o[e.group] ? o[e.group] = [this] : o[e.group].push(this))
	}
	var n = i(4),
		a = i(1),
		o = {};
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.defaultEvents = {
		click: function() {
			this.set(!this.value)
		},
		keydown: function(e) {
			e.code === a.ok && this.set(!this.value)
		}
	}, s.prototype.set = function(e) {
		var t, i;
		if (this.value !== e) {
			if (!this.value && null !== this.group)
				for (t = 0, i = o[this.group].length; i > t; t++) o[this.group][t].set(!1);
			return this.value = !this.value, this.$node.classList.toggle("checked"), this.events.change && this.emit("change", {
				value: this.value
			}), !0
		}
		return !1
	}, e.exports = s
}, function(e, t, i) {
	"use strict";

	function s(e) {
		e = e || {}, e.className = "modalBox " + (e.className || ""), e.$body = document.createElement("div"), e.$body.className = "body", n.call(this, e), this.$node.appendChild(document.createElement("div").appendChild(this.$body).parentNode)
	}
	var n = i(4);
	s.prototype = Object.create(n.prototype), s.prototype.constructor = s, e.exports = s
}, function(e, t, i) {
	"use strict";
	var s = i(2),
		n = i(8),
		a = i(1),
		o = i(7),
		r = i(9),
		c = i(10),
		d = i(6),
		l = i(33),
		u = new o({
			$node: document.getElementById("pmTabMyAudio"),
			visible: !1,
			focusable: !0
		}),
		h = new r({
			$node: document.getElementById("pmScrollMyAudio"),
			focusable: !1
		}),
		p = null;
	h.hide(), u.addListener("show", function() {
		null === p ? (s.player.setDataProvider(l), s.history.activeTrackPlace = {
			panel: u,
			menuIndex: 0
		}, s.$loader.style.display = "block", l.get({
			offset: 0,
			count: 2 * d.listSize
		}, function(e) {
			return 0 === e.length ? (n.current.emit("keydown", {
				code: a.left
			}), void(s.$loader.style.display = "none")) : (p = new c({
				$node: document.getElementById("pmAudioList"),
				size: d.listSize,
				data: e
			}), u.add(p), s.$loader.style.display = "none", h.show(), u.focusEntry = p, p.dataProvider = l, p.addListener("data:changed", function(e) {
				s.player.isPlayed && s.player.dataProvider.id === l.id && p.markItem(s.player.position), h.realSize < e.total && (h.init({
					realSize: e.total
				}), h.value = p.activeOffset - 1, h.scrollTo(p.activeOffset))
			}), p.addListener("move:view", function() {
				s.player.isPlayed && s.player.dataProvider.id === l.id && p.markItem(s.player.position), p.activeOffset <= h.realSize - h.viewSize && h.scrollTo(p.activeOffset)
			}), p.addListener("click:item", function() {
				s.player.dataProvider.id === l.id ? s.player.isPlayed && s.player.position === p.activeIndex ? s.player.pause() : (s.player.position = p.activeIndex, s.player.play(p.$focusItem.data)) : (s.player.setDataProvider(l, p.activeIndex), s.history.activeTrackPlace = {
					panel: u,
					menuIndex: 0
				}, s.player.play(p.$focusItem.data))
			}), h.init({
				realSize: p.data.length + 1,
				viewSize: d.listSize
			}), p.focus(), void p.focusIndex(0))
		})) : (p.focus(), p.markItem(-1))
	}), u.scrollToTrack = function(e) {
		p.markItem(e) ? p.focus() : (s.$loader.style.display = "block", l.get({
			offset: e,
			count: 2 * d.listSize
		}, function(t) {
			t && t.length && (p.updateData(t), p.activeOffset = e, p.activeIndex = e, p.focus(), s.$loader.style.display = "none", p.markItem(e), h.init({
				realSize: e + p.size
			}), h.scrollTo(e - 1))
		}))
	}, s.player.addListener("play", function(e) {
		u.visible && s.player.dataProvider.id === l.id && (e.offset === p.activeIndex + 1 ? p.move(a.down) : e.offset === p.activeIndex - 1 && p.move(a.up), p.markItem(e.offset))
	}), s.player.addListener("pause", function() {
		u.visible && p.markItem(-1)
	}), e.exports = u
}, function(e, t, i) {
	"use strict";
	var s = i(2),
		n = i(8),
		a = i(1),
		o = i(7),
		r = i(9),
		c = i(10),
		d = i(6),
		l = i(34),
		u = i(5),
		h = new o({
			$node: document.getElementById("pmTabRecommendations"),
			visible: !1,
			focusable: !0
		}),
		p = new r({
			$node: document.getElementById("pmScrollRecommendations"),
			focusable: !1
		}),
		m = document.getElementById("pmEmptyRecommendations"),
		f = null;
	p.hide(), h.addListener("show", function() {
		null === f ? (m.innerText = "", s.$loader.style.display = "block", l.get({
			offset: 0,
			count: 2 * d.listSize
		}, function(e) {
			return 0 === e.length ? (n.current.emit("keydown", {
				code: a.left
			}), s.$loader.style.display = "none", void(m.innerText = u.t("We suggest music based on what you listen to from My audio files.\n Please add and listen to some more tracks."))) : (m.style.display = "none", f = new c({
				$node: document.getElementById("pmAudioListRecommendations"),
				size: d.listSize,
				data: e
			}), h.add(f), s.$loader.style.display = "none", p.show(), h.focusEntry = f, f.dataProvider = l, f.addListener("data:changed", function(e) {
				p.realSize < e.total && (p.init({
					realSize: e.total
				}), p.value = f.activeOffset - 1, p.scrollTo(f.activeOffset)), s.player.isPlayed && s.player.dataProvider.id === l.id && f.markItem(s.player.position)
			}), f.addListener("move:view", function() {
				f.activeOffset + d.listSize >= l.total ? p.scrollTo(f.activeOffset + 1) : p.scrollTo(f.activeOffset), s.player.isPlayed && s.player.dataProvider.id === l.id && f.markItem(s.player.position)
			}), f.addListener("click:item", function() {
				s.player.dataProvider.id === l.id ? s.player.isPlayed && s.player.position === f.activeIndex ? s.player.pause() : (s.player.position = f.activeIndex, s.player.play(f.$focusItem.data)) : (s.player.setDataProvider(l, f.activeIndex), s.history.activeTrackPlace = {
					panel: h,
					menuIndex: 1
				}, s.player.play(f.$focusItem.data))
			}), p.init({
				realSize: f.data.length + 1,
				viewSize: d.listSize
			}), f.focus(), void f.focusItem(f.$body.firstChild))
		})) : (f.focus(), f.markItem(-1))
	}), h.scrollToTrack = function(e) {
		f.markItem(e) ? f.focus() : (s.$loader.style.display = "block", l.get({
			offset: e,
			count: 2 * d.listSize
		}, function(t) {
			f.activeOffset = e, f.activeIndex = e, f.updateData(t), f.focus(), s.$loader.style.display = "none", f.markItem(e), p.scrollTo(e)
		}))
	}, s.player.addListener("play", function(e) {
		h.visible && s.player.dataProvider.id === l.id && (e.offset === f.activeIndex + 1 ? f.move(a.down) : e.offset === f.activeIndex - 1 && f.move(a.up), f.markItem(e.offset) && s.player.activeTrack.aid !== f.$focusItem.data.aid && s.player.play(f.$focusItem.data))
	}), s.player.addListener("pause", function() {
		h.visible && f.markItem(-1)
	}), e.exports = h
}, function(e, t, i) {
	"use strict";

	function s(e, t) {
		var i;
		return function() {
			var s = this,
				n = arguments;
			clearTimeout(i), i = setTimeout(function() {
				i = null, e.apply(s, n)
			}, t)
		}
	}

	function n() {
		v.isDigits = !1, ++v.activeLanguage, v.activeLanguage > k.GERMAN && (v.activeLanguage = k.RUSSIAN), v.init({
			data: k.keyboards[v.activeLanguage]
		})
	}
	var a, o = i(2),
		r = i(1),
		c = i(7),
		d = i(26),
		l = i(25),
		u = i(9),
		h = i(23),
		p = i(10),
		m = [
			[1, 2, 3, 4, 5],
			[6, 7, 8, 9, 0],
			[".", ",", "-", ":", "?"],
			["!", "@", "#", "$", {
				className: "keyNums",
				value: "ABC"
			}]
		],
		f = null,
		v = null,
		y = i(6),
		g = new h,
		$ = new c({
			$node: document.getElementById("pmTabSearch"),
			visible: !1
		}),
		I = new d({
			$node: document.getElementById("pmInputSearch"),
			events: {
				keydown: function(e) {
					switch (e.code) {
						case r["delete"]:
							this.removeChar(this.$caret.index);
							break;
						case r.back:
							this.removeChar(this.$caret.index - 1);
							break;
						case r.left:
							this.setCaretPosition(this.$caret.index - 1);
							break;
						case r.right:
							this.setCaretPosition(this.$caret.index + 1);
							break;
						case r.end:
							this.setCaretPosition(this.value.length);
							break;
						case r.home:
							this.setCaretPosition(0)
					}
					e.stop = !0, e.code !== r.down && e.code !== r.up || g.push(v)
				}
			}
		}),
		b = new u({
			$node: document.getElementById("pmScrollSearchResults")
		}),
		T = i(35),
		w = i(3),
		k = i(5),
		E = document.getElementById("pmHintLanguageBox"),
		x = document.getElementById("pmHintDeleteBox");
	document.getElementById("pmHintLanguage").innerText = k.t("Language"), document.getElementById("pmHintDelete").innerText = k.t("Delete"), a = s(function(e) {
		$.searchQuery = e.value, null !== f && T.get({
			offset: 0,
			count: y.itemsPerPage,
			query: e.value
		}, function(e) {
			0 !== e.length && (f.updateData(e), b.init({
				realSize: f.data.length
			}), b.scrollTo(0))
		})
	}, 1e3), $.searchQuery = "", $.add(I), $.add(b), g.addListener("push", function(e) {
		e.curr.focus(), $.focusEntry = e.curr
	}), g.addListener("pop", function(e) {
		e.curr.focus(), $.focusEntry = e.curr
	}), $.addListener("show", function() {
		E.style.display = "table", x.style.display = "table", null === v ? (v = new l({
			$node: document.getElementById("pmGridSearchKeyboard"),
			data: k.keyboards[w.lang],
			cycleX: !1,
			cycleY: !1,
			events: {
				keydown: function(e) {
					switch (e.code) {
						case r.up:
						case r.down:
							this.move(e.code);
							break;
						case r.right:
							e.stop = !0, this.move(e.code);
							break;
						case r.left:
							0 !== v.focusX && (e.stop = !0), this.move(e.code);
							break;
						case r.ok:
							this.events["click:item"] && this.emit("click:item", {
								$item: this.$focusItem,
								event: e
							})
					}
				},
				"click:item": function(e) {
					"keyBack" === e.$item.data.className ? I.removeChar() : "keyNums" === e.$item.data.className ? (v.isDigits ? v.init({
						data: k.keyboards[v.activeLanguage]
					}) : v.init({
						data: m
					}), v.isDigits = !v.isDigits) : "keyLang" === e.$item.data.className ? n() : (I.addChar(e.$item.data.value), I.focus(), v.focus())
				},
				overflow: function(e) {
					e.direction === r.right ? (g.push(f), null === f.$focusItem && f.focusItem(f.$body.firstChild)) : e.direction !== r.up && e.direction !== r.down || g.push(I)
				}
			},
			render: function(e, t) {
				e.innerText = t.value, t.className && e.classList.add(t.className)
			}
		}), $.focusEntry = v, v.activeLanguage = w.lang, v.isDigits = !1, $.add(v), T.get({
			offset: 0,
			count: 2 * y.listSize,
			query: ""
		}, function(e) {
			0 === e.length && e.push({
				bad: !0,
				value: 0
			}), f = new p({
				$node: document.getElementById("pmAudioListSearchResults"),
				size: y.listSearchSize,
				data: e,
				render: function(e, t) {
					t.bad || (e.isReady ? (e.$name.innerHTML = t.name, e.$icon.className = "icon play", e.$duration.innerText = t.value) : (e.$icon = document.createElement("div"), e.$icon.className = "icon play", e.appendChild(e.$icon), e.$ns = document.createElement("div"), e.$ns.className = "nameWrap", e.appendChild(e.$ns), e.$name = document.createElement("div"), e.$name.className = "name", e.$name.innerHTML = t.name, e.$ns.appendChild(e.$name), e.$duration = document.createElement("div"), e.$duration.className = "duration", e.$duration.innerText = t.value, e.appendChild(e.$duration), e.isReady = !0))
				}
			}), f.$node.classList.remove("loading"), f.dataProvider = {
				get: function(e, t) {
					e.query = $.searchQuery, T.get(e, t)
				}
			}, f.addListener("data:changed", function(e) {
				b.realSize < e.total && (b.init({
					realSize: e.total
				}), b.value = f.activeOffset - 1, b.scrollTo(f.activeOffset)), o.player.isPlayed && o.player.dataProvider.id === T.id && f.markItem(o.player.position)
			}), f.addListener("keydown", function(e) {
				e.code === r.left && (g.push(v), e.stop = !0)
			}), f.addListener("move:view", function() {
				if (f.activeOffset + y.listSize >= T.total) b.scrollTo(f.activeOffset + 1);
				else try {
					b.scrollTo(f.activeOffset)
				} catch (e) {}
				o.player.isPlayed && o.player.dataProvider.id === T.id && f.markItem(o.player.position)
			}), f.addListener("click:item", function() {
				o.player.dataProvider.id === T.id ? o.player.isPlayed && o.player.position === f.activeIndex ? o.player.pause() : (o.player.position = f.activeIndex, o.player.play(f.$focusItem.data)) : (T.activeSearchQuery = $.searchQuery, o.player.setDataProvider(T, f.activeIndex), o.history.activeTrackPlace = {
					panel: $,
					menuIndex: 4
				}, o.player.play(f.$focusItem.data))
			}), b.init({
				realSize: f.data.length + 1,
				viewSize: y.listSearchSize
			}), $.add(f), $.focusEntry.focus()
		}), I.addListener("input", a)) : $.searchQuery === o.player.dataProvider.activeSearchQuery ? ($.focusEntry.focus(), null !== f && f.markItem(o.player.position)) : ($.focusEntry.focus(), null !== f && f.markItem(-1))
	}), $.addListener("hide", function() {
		E.style.display = "none", x.style.display = "none"
	}), $.scrollToTrack = function(e) {
		o.player.dataProvider.activeSearchQuery !== $.searchQuery && ($.searchQuery = o.player.dataProvider.activeSearchQuery, e = -1), f.markItem(e) ? f.focus() : (o.$loader.style.display = "block", f.hide(), T.get({
			offset: o.player.position,
			count: 2 * y.listSize,
			query: o.player.dataProvider.activeSearchQuery
		}, function(e) {
			f.activeOffset = o.player.position, f.activeIndex = o.player.position, f.updateData(e), f.show(), b.init({
				realSize: o.player.position + f.data.length + 1
			}), o.player.activeTrack.title !== e[0].title && f.renderItem(f.$body.firstChild, o.player.activeTrack), f.focus(), o.$loader.style.display = "none", f.markItem(o.player.position), b.scrollTo(o.player.position)
		}))
	}, o.addListener("keydown", function(e) {
		$.visible && (e.code === r.f1 ? I.removeChar() : e.code === r.f2 && n())
	}), o.player.addListener("play", function(e) {
		$.visible && o.player.dataProvider.id === T.id && (e.offset === f.activeIndex + 1 ? f.move(r.down) : e.offset === f.activeIndex - 1 && f.move(r.up), f.markItem(e.offset))
	}), o.player.addListener("pause", function() {
		$.visible && f.markItem(-1)
	}), document.getElementById("pmLabelSearchResults").innerText = k.t("Search results") + ":", e.exports = $
}, function(e, t, i) {
	"use strict";
	var s = i(7),
		n = i(46),
		a = i(13),
		o = i(24),
		r = i(15),
		c = i(2),
		d = i(1),
		l = i(3),
		u = i(5),
		h = new s({
			$node: document.getElementById("pmTabSettings"),
			visible: !1
		}),
		p = new a({
			$node: document.getElementById("pmCheckBoxList"),
			size: 3,
			data: u.meta,
			render: function(e, t) {
				var i = document.createElement("div");
				e.check = new n({
					group: "language",
					value: !1
				}), i.textContent = t.value, e.appendChild(e.check.$node), this.add(e.check), e.appendChild(i)
			}
		}),
		m = new o({
			$node: document.getElementById("pmButtonLogOut"),
			value: u.t("Logout from") + " ",
			events: {
				keydown: function(e) {
					e.code === d.up && (m.$node.classList.remove("focus"), p.$focusItem.classList.add("focus"), p.focus())
				},
				click: function() {
					l.logout()
				}
			}
		}),
		f = new r({
			$node: document.getElementById("rebootAlert"),
			visible: !1,
			events: {
				keydown: function(e) {
					e.stop = !0, e.code === d.ok ? location.reload() : e.code !== d.back && e.code !== d.exit || (f.hide(), c.history.current.panel.focusEntry.focus())
				}
			}
		}),
		v = document.getElementById("pmLabelLanguage"),
		y = document.createElement("span"),
		g = document.getElementById("pmLabelAccount");
	p.addListener("click:item", function(e) {
		l.lang !== e.$item.data.id && (e.$item.check.set(!0), p.focusItem(e.$item), l.setLang(p.$focusItem.data.id, function() {
			f.show(), f.focus()
		}))
	}), p.addListener("overflow", function(e) {
		e.direction === d.down && (p.$focusItem.classList.remove("focus"), m.focus())
	}), v.textContent = u.t("Language"), y.className = "username", g.textContent = u.t("Account"), h.add(p), h.add(m), h.focusEntry = p, f.$content.innerText = u.t("Reboot to apply changes?\n Ok/Back"), f.$header.innerText = "", f.$footer.innerText = "", h.addListener("show", function() {
		switch (m.$body.appendChild(y), y.innerText = l.userInfo.name, l.lang) {
			case u.ENGLISH:
			case u.GERMAN:
			case u.RUSSIAN:
				p.focus(), p.focusItem(p.$body.firstChild), p.$body.children.item(l.lang).check.set(!0);
				break;
			default:
				p.focus(), p.focusItem(p.$body.children.item(u.ENGLISH)), p.$focusItem.check.set(!0)
		}
	}), e.exports = h
}, function(e, t) {
	"use strict";
	e.exports = {
		480: {
			height: 480,
			width: 720,
			availTop: 24,
			availBottom: 24,
			availRight: 32,
			availLeft: 48
		},
		576: {
			height: 576,
			width: 720,
			availTop: 24,
			availBottom: 24,
			availRight: 26,
			availLeft: 54
		},
		720: {
			height: 720,
			width: 1280,
			availTop: 30,
			availBottom: 30,
			availRight: 40,
			availLeft: 40
		},
		1080: {
			height: 1080,
			width: 1920,
			availTop: 45,
			availBottom: 45,
			availRight: 60,
			availLeft: 60
		}
	}
}]);