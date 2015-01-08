! function(e, t) {
	function n(e) {
		var t = ht[e] = {};
		return G.each(e.split(tt), function(e, n) {
			t[n] = !0
		}), t
	}

	function i(e, n, i) {
		if (i === t && 1 === e.nodeType) {
			var r = "data-" + n.replace(gt, "-$1").toLowerCase();
			if (i = e.getAttribute(r), "string" == typeof i) {
				try {
					i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : mt.test(i) ? G.parseJSON(i) : i
				} catch (o) {}
				G.data(e, n, i)
			} else i = t
		}
		return i
	}

	function r(e) {
		var t;
		for (t in e)
			if (("data" !== t || !G.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}

	function o() {
		return !1
	}

	function s() {
		return !0
	}

	function a(e) {
		return !e || !e.parentNode || 11 === e.parentNode.nodeType
	}

	function l(e, t) {
		do e = e[t]; while (e && 1 !== e.nodeType);
		return e
	}

	function u(e, t, n) {
		if (t = t || 0, G.isFunction(t)) return G.grep(e, function(e, i) {
			var r = !! t.call(e, i, e);
			return r === n
		});
		if (t.nodeType) return G.grep(e, function(e) {
			return e === t === n
		});
		if ("string" == typeof t) {
			var i = G.grep(e, function(e) {
				return 1 === e.nodeType
			});
			if (Mt.test(t)) return G.filter(t, i, !n);
			t = G.filter(t, i)
		}
		return G.grep(e, function(e) {
			return G.inArray(e, t) >= 0 === n
		})
	}

	function c(e) {
		var t = qt.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement)
			for (; t.length;) n.createElement(t.pop());
		return n
	}

	function d(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
	}

	function f(e, t) {
		if (1 === t.nodeType && G.hasData(e)) {
			var n, i, r, o = G._data(e),
				s = G._data(t, o),
				a = o.events;
			if (a) {
				delete s.handle, s.events = {};
				for (n in a)
					for (i = 0, r = a[n].length; r > i; i++) G.event.add(t, n, a[n][i])
			}
			s.data && (s.data = G.extend({}, s.data))
		}
	}

	function p(e, t) {
		var n;
		1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), G.support.html5Clone && e.innerHTML && !G.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Jt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.selected = e.defaultSelected : "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue : "script" === n && t.text !== e.text && (t.text = e.text), t.removeAttribute(G.expando))
	}

	function h(e) {
		return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
	}

	function m(e) {
		Jt.test(e.type) && (e.defaultChecked = e.checked)
	}

	function g(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = yn.length; r--;)
			if (t = yn[r] + n, t in e) return t;
		return i
	}

	function v(e, t) {
		return e = t || e, "none" === G.css(e, "display") || !G.contains(e.ownerDocument, e)
	}

	function y(e, t) {
		for (var n, i, r = [], o = 0, s = e.length; s > o; o++) n = e[o], n.style && (r[o] = G._data(n, "olddisplay"), t ? (r[o] || "none" !== n.style.display || (n.style.display = ""), "" === n.style.display && v(n) && (r[o] = G._data(n, "olddisplay", C(n.nodeName)))) : (i = nn(n, "display"), r[o] || "none" === i || G._data(n, "olddisplay", i)));
		for (o = 0; s > o; o++) n = e[o], n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? r[o] || "" : "none"));
		return e
	}

	function w(e, t, n) {
		var i = dn.exec(t);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
	}

	function b(e, t, n, i) {
		for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > r; r += 2) "margin" === n && (o += G.css(e, n + vn[r], !0)), i ? ("content" === n && (o -= parseFloat(nn(e, "padding" + vn[r])) || 0), "margin" !== n && (o -= parseFloat(nn(e, "border" + vn[r] + "Width")) || 0)) : (o += parseFloat(nn(e, "padding" + vn[r])) || 0, "padding" !== n && (o += parseFloat(nn(e, "border" + vn[r] + "Width")) || 0));
		return o
	}

	function x(e, t, n) {
		var i = "width" === t ? e.offsetWidth : e.offsetHeight,
			r = !0,
			o = G.support.boxSizing && "border-box" === G.css(e, "boxSizing");
		if (0 >= i || null == i) {
			if (i = nn(e, t), (0 > i || null == i) && (i = e.style[t]), fn.test(i)) return i;
			r = o && (G.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + b(e, t, n || (o ? "border" : "content"), r) + "px"
	}

	function C(e) {
		if (hn[e]) return hn[e];
		var t = G("<" + e + ">").appendTo(W.body),
			n = t.css("display");
		return t.remove(), ("none" === n || "" === n) && (rn = W.body.appendChild(rn || G.extend(W.createElement("iframe"), {
			frameBorder: 0,
			width: 0,
			height: 0
		})), on && rn.createElement || (on = (rn.contentWindow || rn.contentDocument).document, on.write("<!doctype html><html><body>"), on.close()), t = on.body.appendChild(on.createElement(e)), n = nn(t, "display"), W.body.removeChild(rn)), hn[e] = n, n
	}

	function T(e, t, n, i) {
		var r;
		if (G.isArray(t)) G.each(t, function(t, r) {
			n || xn.test(e) ? i(e, r) : T(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
		});
		else if (n || "object" !== G.type(t)) i(e, t);
		else
			for (r in t) T(e + "[" + r + "]", t[r], n, i)
	}

	function k(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var i, r, o, s = t.toLowerCase().split(tt),
				a = 0,
				l = s.length;
			if (G.isFunction(n))
				for (; l > a; a++) i = s[a], o = /^\+/.test(i), o && (i = i.substr(1) || "*"), r = e[i] = e[i] || [], r[o ? "unshift" : "push"](n)
		}
	}

	function N(e, n, i, r, o, s) {
		o = o || n.dataTypes[0], s = s || {}, s[o] = !0;
		for (var a, l = e[o], u = 0, c = l ? l.length : 0, d = e === Pn; c > u && (d || !a); u++) a = l[u](n, i, r), "string" == typeof a && (!d || s[a] ? a = t : (n.dataTypes.unshift(a), a = N(e, n, i, r, a, s)));
		return !d && a || s["*"] || (a = N(e, n, i, r, "*", s)), a
	}

	function E(e, n) {
		var i, r, o = G.ajaxSettings.flatOptions || {};
		for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
		r && G.extend(!0, e, r)
	}

	function S(e, n, i) {
		var r, o, s, a, l = e.contents,
			u = e.dataTypes,
			c = e.responseFields;
		for (o in c) o in i && (n[c[o]] = i[o]);
		for (;
			"*" === u[0];) u.shift(), r === t && (r = e.mimeType || n.getResponseHeader("content-type"));
		if (r)
			for (o in l)
				if (l[o] && l[o].test(r)) {
					u.unshift(o);
					break
				}
		if (u[0] in i) s = u[0];
		else {
			for (o in i) {
				if (!u[0] || e.converters[o + " " + u[0]]) {
					s = o;
					break
				}
				a || (a = o)
			}
			s = s || a
		}
		return s ? (s !== u[0] && u.unshift(s), i[s]) : void 0
	}

	function $(e, t) {
		var n, i, r, o, s = e.dataTypes.slice(),
			a = s[0],
			l = {}, u = 0;
		if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), s[1])
			for (n in e.converters) l[n.toLowerCase()] = e.converters[n];
		for (; r = s[++u];)
			if ("*" !== r) {
				if ("*" !== a && a !== r) {
					if (n = l[a + " " + r] || l["* " + r], !n)
						for (i in l)
							if (o = i.split(" "), o[1] === r && (n = l[a + " " + o[0]] || l["* " + o[0]])) {
								n === !0 ? n = l[i] : l[i] !== !0 && (r = o[0], s.splice(u--, 0, r));
								break
							}
					if (n !== !0)
						if (n && e["throws"]) t = n(t);
						else try {
							t = n(t)
						} catch (c) {
							return {
								state: "parsererror",
								error: n ? c : "No conversion from " + a + " to " + r
							}
						}
				}
				a = r
			}
		return {
			state: "success",
			data: t
		}
	}

	function _() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}

	function A() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}

	function j() {
		return setTimeout(function() {
			Kn = t
		}, 0), Kn = G.now()
	}

	function D(e, t) {
		G.each(t, function(t, n) {
			for (var i = (ei[t] || []).concat(ei["*"]), r = 0, o = i.length; o > r; r++)
				if (i[r].call(e, t, n)) return
		})
	}

	function L(e, t, n) {
		var i, r = 0,
			o = Zn.length,
			s = G.Deferred().always(function() {
				delete a.elem
			}),
			a = function() {
				for (var t = Kn || j(), n = Math.max(0, l.startTime + l.duration - t), i = n / l.duration || 0, r = 1 - i, o = 0, a = l.tweens.length; a > o; o++) l.tweens[o].run(r);
				return s.notifyWith(e, [l, r, n]), 1 > r && a ? n : (s.resolveWith(e, [l]), !1)
			}, l = s.promise({
				elem: e,
				props: G.extend({}, t),
				opts: G.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Kn || j(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var i = G.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(i), i
				},
				stop: function(t) {
					for (var n = 0, i = t ? l.tweens.length : 0; i > n; n++) l.tweens[n].run(1);
					return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
				}
			}),
			u = l.props;
		for (H(u, l.opts.specialEasing); o > r; r++)
			if (i = Zn[r].call(l, e, u, l.opts)) return i;
		return D(l, u), G.isFunction(l.opts.start) && l.opts.start.call(e, l), G.fx.timer(G.extend(a, {
			anim: l,
			queue: l.opts.queue,
			elem: e
		})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
	}

	function H(e, t) {
		var n, i, r, o, s;
		for (n in e)
			if (i = G.camelCase(n), r = t[i], o = e[n], G.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), s = G.cssHooks[i], s && "expand" in s) {
				o = s.expand(o), delete e[i];
				for (n in o) n in e || (e[n] = o[n], t[n] = r)
			} else t[i] = r
	}

	function F(e, t, n) {
		var i, r, o, s, a, l, u, c, d, f = this,
			p = e.style,
			h = {}, m = [],
			g = e.nodeType && v(e);
		n.queue || (c = G._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, d = c.empty.fire, c.empty.fire = function() {
			c.unqueued || d()
		}), c.unqueued++, f.always(function() {
			f.always(function() {
				c.unqueued--, G.queue(e, "fx").length || c.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === G.css(e, "display") && "none" === G.css(e, "float") && (G.support.inlineBlockNeedsLayout && "inline" !== C(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", G.support.shrinkWrapBlocks || f.done(function() {
			p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
		}));
		for (i in t)
			if (o = t[i], Yn.exec(o)) {
				if (delete t[i], l = l || "toggle" === o, o === (g ? "hide" : "show")) continue;
				m.push(i)
			}
		if (s = m.length) {
			a = G._data(e, "fxshow") || G._data(e, "fxshow", {}), "hidden" in a && (g = a.hidden), l && (a.hidden = !g), g ? G(e).show() : f.done(function() {
				G(e).hide()
			}), f.done(function() {
				var t;
				G.removeData(e, "fxshow", !0);
				for (t in h) G.style(e, t, h[t])
			});
			for (i = 0; s > i; i++) r = m[i], u = f.createTween(r, g ? a[r] : 0), h[r] = a[r] || G.style(e, r), r in a || (a[r] = u.start, g && (u.end = u.start, u.start = "width" === r || "height" === r ? 1 : 0))
		}
	}

	function M(e, t, n, i, r) {
		return new M.prototype.init(e, t, n, i, r)
	}

	function P(e, t) {
		var n, i = {
				height: e
			}, r = 0;
		for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = vn[r], i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}

	function O(e) {
		return G.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
	}
	var q, B, W = e.document,
		R = e.location,
		I = e.navigator,
		z = e.jQuery,
		U = e.$,
		X = Array.prototype.push,
		V = Array.prototype.slice,
		K = Array.prototype.indexOf,
		J = Object.prototype.toString,
		Y = Object.prototype.hasOwnProperty,
		Q = String.prototype.trim,
		G = function(e, t) {
			return new G.fn.init(e, t, q)
		}, Z = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
		et = /\S/,
		tt = /\s+/,
		nt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		it = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		rt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		ot = /^[\],:{}\s]*$/,
		st = /(?:^|:|,)(?:\s*\[)+/g,
		at = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		lt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
		ut = /^-ms-/,
		ct = /-([\da-z])/gi,
		dt = function(e, t) {
			return (t + "").toUpperCase()
		}, ft = function() {
			W.addEventListener ? (W.removeEventListener("DOMContentLoaded", ft, !1), G.ready()) : "complete" === W.readyState && (W.detachEvent("onreadystatechange", ft), G.ready())
		}, pt = {};
	G.fn = G.prototype = {
		constructor: G,
		init: function(e, n, i) {
			var r, o, s;
			if (!e) return this;
			if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
			if ("string" == typeof e) {
				if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : it.exec(e), !r || !r[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
				if (r[1]) return n = n instanceof G ? n[0] : n, s = n && n.nodeType ? n.ownerDocument || n : W, e = G.parseHTML(r[1], s, !0), rt.test(r[1]) && G.isPlainObject(n) && this.attr.call(e, n, !0), G.merge(this, e);
				if (o = W.getElementById(r[2]), o && o.parentNode) {
					if (o.id !== r[2]) return i.find(e);
					this.length = 1, this[0] = o
				}
				return this.context = W, this.selector = e, this
			}
			return G.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), G.makeArray(e, this))
		},
		selector: "",
		jquery: "1.8.3+1",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return V.call(this)
		},
		get: function(e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
		},
		pushStack: function(e, t, n) {
			var i = G.merge(this.constructor(), e);
			return i.prevObject = this, i.context = this.context, "find" === t ? i.selector = this.selector + (this.selector ? " " : "") + n : t && (i.selector = this.selector + "." + t + "(" + n + ")"), i
		},
		each: function(e, t) {
			return G.each(this, e, t)
		},
		ready: function(e) {
			return G.ready.promise().done(e), this
		},
		eq: function(e) {
			return e = +e, -1 === e ? this.slice(e) : this.slice(e, e + 1)
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		slice: function() {
			return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
		},
		map: function(e) {
			return this.pushStack(G.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: X,
		sort: [].sort,
		splice: [].splice
	}, G.fn.init.prototype = G.fn, G.extend = G.fn.extend = function() {
		var e, n, i, r, o, s, a = arguments[0] || {}, l = 1,
			u = arguments.length,
			c = !1;
		for ("boolean" == typeof a && (c = a, a = arguments[1] || {}, l = 2), "object" == typeof a || G.isFunction(a) || (a = {}), u === l && (a = this, --l); u > l; l++)
			if (null != (e = arguments[l]))
				for (n in e) i = a[n], r = e[n], a !== r && (c && r && (G.isPlainObject(r) || (o = G.isArray(r))) ? (o ? (o = !1, s = i && G.isArray(i) ? i : []) : s = i && G.isPlainObject(i) ? i : {}, a[n] = G.extend(c, s, r)) : r !== t && (a[n] = r));
		return a
	}, G.extend({
		noConflict: function(t) {
			return e.$ === G && (e.$ = U), t && e.jQuery === G && (e.jQuery = z), G
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? G.readyWait++ : G.ready(!0)
		},
		ready: function(e) {
			if (e === !0 ? !--G.readyWait : !G.isReady) {
				if (!W.body) return setTimeout(G.ready, 1);
				G.isReady = !0, e !== !0 && --G.readyWait > 0 || (B.resolveWith(W, [G]), G.fn.trigger && G(W).trigger("ready").off("ready"))
			}
		},
		isFunction: function(e) {
			return "function" === G.type(e)
		},
		isArray: Array.isArray || function(e) {
			return "array" === G.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function(e) {
			return null == e ? String(e) : pt[J.call(e)] || "object"
		},
		isPlainObject: function(e) {
			if (!e || "object" !== G.type(e) || e.nodeType || G.isWindow(e)) return !1;
			try {
				if (e.constructor && !Y.call(e, "constructor") && !Y.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (n) {
				return !1
			}
			var i;
			for (i in e);
			return i === t || Y.call(e, i)
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		error: function(e) {
			throw new Error(e)
		},
		parseHTML: function(e, t, n) {
			var i;
			return e && "string" == typeof e ? ("boolean" == typeof t && (n = t, t = 0), t = t || W, (i = rt.exec(e)) ? [t.createElement(i[1])] : (i = G.buildFragment([e], t, n ? null : []), G.merge([], (i.cacheable ? G.clone(i.fragment) : i.fragment).childNodes))) : null
		},
		parseJSON: function(t) {
			return t && "string" == typeof t ? (t = G.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : ot.test(t.replace(at, "@").replace(lt, "]").replace(st, "")) ? new Function("return " + t)() : (G.error("Invalid JSON: " + t), void 0)) : null
		},
		parseXML: function(n) {
			var i, r;
			if (!n || "string" != typeof n) return null;
			try {
				e.DOMParser ? (r = new DOMParser, i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
			} catch (o) {
				i = t
			}
			return i && i.documentElement && !i.getElementsByTagName("parsererror").length || G.error("Invalid XML: " + n), i
		},
		noop: function() {},
		globalEval: function(t) {
			t && et.test(t) && (e.execScript || function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(ut, "ms-").replace(ct, dt)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, n, i) {
			var r, o = 0,
				s = e.length,
				a = s === t || G.isFunction(e);
			if (i)
				if (a) {
					for (r in e)
						if (n.apply(e[r], i) === !1) break
				} else
					for (; s > o && n.apply(e[o++], i) !== !1;);
				else
			if (a) {
				for (r in e)
					if (n.call(e[r], r, e[r]) === !1) break
			} else
				for (; s > o && n.call(e[o], o, e[o++]) !== !1;);
			return e
		},
		trim: Q && !Q.call("﻿ ") ? function(e) {
			return null == e ? "" : Q.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(nt, "")
		},
		makeArray: function(e, t) {
			var n, i = t || [];
			return null != e && (n = G.type(e), null == e.length || "string" === n || "function" === n || "regexp" === n || G.isWindow(e) ? X.call(i, e) : G.merge(i, e)), i
		},
		inArray: function(e, t, n) {
			var i;
			if (t) {
				if (K) return K.call(t, e, n);
				for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
					if (n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function(e, n) {
			var i = n.length,
				r = e.length,
				o = 0;
			if ("number" == typeof i)
				for (; i > o; o++) e[r++] = n[o];
			else
				for (; n[o] !== t;) e[r++] = n[o++];
			return e.length = r, e
		},
		grep: function(e, t, n) {
			var i, r = [],
				o = 0,
				s = e.length;
			for (n = !! n; s > o; o++) i = !! t(e[o], o), n !== i && r.push(e[o]);
			return r
		},
		map: function(e, n, i) {
			var r, o, s = [],
				a = 0,
				l = e.length,
				u = e instanceof G || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || G.isArray(e));
			if (u)
				for (; l > a; a++) r = n(e[a], a, i), null != r && (s[s.length] = r);
			else
				for (o in e) r = n(e[o], o, i), null != r && (s[s.length] = r);
			return s.concat.apply([], s)
		},
		guid: 1,
		proxy: function(e, n) {
			var i, r, o;
			return "string" == typeof n && (i = e[n], n = e, e = i), G.isFunction(e) ? (r = V.call(arguments, 2), o = function() {
				return e.apply(n, r.concat(V.call(arguments)))
			}, o.guid = e.guid = e.guid || G.guid++, o) : t
		},
		access: function(e, n, i, r, o, s, a) {
			var l, u = null == i,
				c = 0,
				d = e.length;
			if (i && "object" == typeof i) {
				for (c in i) G.access(e, n, c, i[c], 1, s, r);
				o = 1
			} else if (r !== t) {
				if (l = a === t && G.isFunction(r), u && (l ? (l = n, n = function(e, t, n) {
					return l.call(G(e), n)
				}) : (n.call(e, r), n = null)), n)
					for (; d > c; c++) n(e[c], i, l ? r.call(e[c], c, n(e[c], i)) : r, a);
				o = 1
			}
			return o ? e : u ? n.call(e) : d ? n(e[0], i) : s
		},
		now: function() {
			return (new Date).getTime()
		}
	}), G.ready.promise = function(t) {
		if (!B)
			if (B = G.Deferred(), "complete" === W.readyState) setTimeout(G.ready, 1);
			else
		if (W.addEventListener) W.addEventListener("DOMContentLoaded", ft, !1), e.addEventListener("load", G.ready, !1);
		else {
			W.attachEvent("onreadystatechange", ft), e.attachEvent("onload", G.ready);
			var n = !1;
			try {
				n = null == e.frameElement && W.documentElement
			} catch (i) {}
			n && n.doScroll && ! function r() {
				if (!G.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return setTimeout(r, 50)
					}
					G.ready()
				}
			}()
		}
		return B.promise(t)
	}, G.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
		pt["[object " + t + "]"] = t.toLowerCase()
	}), q = G(W);
	var ht = {};
	G.Callbacks = function(e) {
		e = "string" == typeof e ? ht[e] || n(e) : G.extend({}, e);
		var i, r, o, s, a, l, u = [],
			c = !e.once && [],
			d = function(t) {
				for (i = e.memory && t, r = !0, l = s || 0, s = 0, a = u.length, o = !0; u && a > l; l++)
					if (u[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
						i = !1;
						break
					}
				o = !1, u && (c ? c.length && d(c.shift()) : i ? u = [] : f.disable())
			}, f = {
				add: function() {
					if (u) {
						var t = u.length;
						! function n(t) {
							G.each(t, function(t, i) {
								var r = G.type(i);
								"function" === r ? e.unique && f.has(i) || u.push(i) : i && i.length && "string" !== r && n(i)
							})
						}(arguments), o ? a = u.length : i && (s = t, d(i))
					}
					return this
				},
				remove: function() {
					return u && G.each(arguments, function(e, t) {
						for (var n;
							(n = G.inArray(t, u, n)) > -1;) u.splice(n, 1), o && (a >= n && a--, l >= n && l--)
					}), this
				},
				has: function(e) {
					return G.inArray(e, u) > -1
				},
				empty: function() {
					return u = [], this
				},
				disable: function() {
					return u = c = i = t, this
				},
				disabled: function() {
					return !u
				},
				lock: function() {
					return c = t, i || f.disable(), this
				},
				locked: function() {
					return !c
				},
				fireWith: function(e, t) {
					return t = t || [], t = [e, t.slice ? t.slice() : t], !u || r && !c || (o ? c.push(t) : d(t)), this
				},
				fire: function() {
					return f.fireWith(this, arguments), this
				},
				fired: function() {
					return !!r
				}
			};
		return f
	}, G.extend({
		Deferred: function(e) {
			var t = [
				["resolve", "done", G.Callbacks("once memory"), "resolved"],
				["reject", "fail", G.Callbacks("once memory"), "rejected"],
				["notify", "progress", G.Callbacks("memory")]
			],
				n = "pending",
				i = {
					state: function() {
						return n
					},
					always: function() {
						return r.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return G.Deferred(function(n) {
							G.each(t, function(t, i) {
								var o = i[0],
									s = e[t];
								r[i[1]](G.isFunction(s) ? function() {
									var e = s.apply(this, arguments);
									e && G.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n : this, [e])
								} : n[o])
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? G.extend(e, i) : i
					}
				}, r = {};
			return i.pipe = i.then, G.each(t, function(e, o) {
				var s = o[2],
					a = o[3];
				i[o[1]] = s.add, a && s.add(function() {
					n = a
				}, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = s.fire, r[o[0] + "With"] = s.fireWith
			}), i.promise(r), e && e.call(r, r), r
		},
		when: function(e) {
			var t, n, i, r = 0,
				o = V.call(arguments),
				s = o.length,
				a = 1 !== s || e && G.isFunction(e.promise) ? s : 0,
				l = 1 === a ? e : G.Deferred(),
				u = function(e, n, i) {
					return function(r) {
						n[e] = this, i[e] = arguments.length > 1 ? V.call(arguments) : r, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
					}
				};
			if (s > 1)
				for (t = new Array(s), n = new Array(s), i = new Array(s); s > r; r++) o[r] && G.isFunction(o[r].promise) ? o[r].promise().done(u(r, i, o)).fail(l.reject).progress(u(r, n, t)) : --a;
			return a || l.resolveWith(i, o), l.promise()
		}
	}), G.support = function() {
		var t, n, i, r, o, s, a, l, u, c, d, f = W.createElement("div");
		if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*"), i = f.getElementsByTagName("a")[0], !n || !i || !n.length) return {};
		r = W.createElement("select"), o = r.appendChild(W.createElement("option")), s = f.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", t = {
			leadingWhitespace: 3 === f.firstChild.nodeType,
			tbody: !f.getElementsByTagName("tbody").length,
			htmlSerialize: !! f.getElementsByTagName("link").length,
			style: /top/.test(i.getAttribute("style")),
			hrefNormalized: "/a" === i.getAttribute("href"),
			opacity: /^0.5/.test(i.style.opacity),
			cssFloat: !! i.style.cssFloat,
			checkOn: "on" === s.value,
			optSelected: o.selected,
			getSetAttribute: "t" !== f.className,
			enctype: !! W.createElement("form").enctype,
			html5Clone: "<:nav></:nav>" !== W.createElement("nav").cloneNode(!0).outerHTML,
			boxModel: "CSS1Compat" === W.compatMode,
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		}, s.checked = !0, t.noCloneChecked = s.cloneNode(!0).checked, r.disabled = !0, t.optDisabled = !o.disabled;
		try {
			delete f.test
		} catch (p) {
			t.deleteExpando = !1
		}
		if (!f.addEventListener && f.attachEvent && f.fireEvent && (f.attachEvent("onclick", d = function() {
			t.noCloneEvent = !1
		}), f.cloneNode(!0).fireEvent("onclick"), f.detachEvent("onclick", d)), s = W.createElement("input"), s.value = "t", s.setAttribute("type", "radio"), t.radioValue = "t" === s.value, s.setAttribute("checked", "checked"), s.setAttribute("name", "t"), f.appendChild(s), a = W.createDocumentFragment(), a.appendChild(f.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = s.checked, a.removeChild(s), a.appendChild(f), f.attachEvent)
			for (u in {
				submit: !0,
				change: !0,
				focusin: !0
			}) l = "on" + u, c = l in f, c || (f.setAttribute(l, "return;"), c = "function" == typeof f[l]), t[u + "Bubbles"] = c;
		return G(function() {
			var n, i, r, o, s = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
				a = W.getElementsByTagName("body")[0];
			a && (n = W.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), i = W.createElement("div"), n.appendChild(i), i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = i.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === r[0].offsetHeight, i.innerHTML = "", i.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === i.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== a.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
				width: "4px"
			}).width, o = W.createElement("div"), o.style.cssText = i.style.cssText = s, o.style.marginRight = o.style.width = "0", i.style.width = "1px", i.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), "undefined" != typeof i.style.zoom && (i.innerHTML = "", i.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === i.offsetWidth, i.style.display = "block", i.style.overflow = "visible", i.innerHTML = "<div></div>", i.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== i.offsetWidth, n.style.zoom = 1), a.removeChild(n), n = i = r = o = null)
		}), a.removeChild(f), n = i = r = o = s = a = f = null, t
	}();
	var mt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		gt = /([A-Z])/g;
	G.extend({
		cache: {},
		deletedIds: [],
		uuid: 0,
		expando: "jQuery" + (G.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(e) {
			return e = e.nodeType ? G.cache[e[G.expando]] : e[G.expando], !! e && !r(e)
		},
		data: function(e, n, i, r) {
			if (G.acceptData(e)) {
				var o, s, a = G.expando,
					l = "string" == typeof n,
					u = e.nodeType,
					c = u ? G.cache : e,
					d = u ? e[a] : e[a] && a;
				if (d && c[d] && (r || c[d].data) || !l || i !== t) return d || (u ? e[a] = d = G.deletedIds.pop() || G.guid++ : d = a), c[d] || (c[d] = {}, u || (c[d].toJSON = G.noop)), ("object" == typeof n || "function" == typeof n) && (r ? c[d] = G.extend(c[d], n) : c[d].data = G.extend(c[d].data, n)), o = c[d], r || (o.data || (o.data = {}), o = o.data), i !== t && (o[G.camelCase(n)] = i), l ? (s = o[n], null == s && (s = o[G.camelCase(n)])) : s = o, s
			}
		},
		removeData: function(e, t, n) {
			if (G.acceptData(e)) {
				var i, o, s, a = e.nodeType,
					l = a ? G.cache : e,
					u = a ? e[G.expando] : G.expando;
				if (l[u]) {
					if (t && (i = n ? l[u] : l[u].data)) {
						G.isArray(t) || (t in i ? t = [t] : (t = G.camelCase(t), t = t in i ? [t] : t.split(" ")));
						for (o = 0, s = t.length; s > o; o++) delete i[t[o]];
						if (!(n ? r : G.isEmptyObject)(i)) return
					}(n || (delete l[u].data, r(l[u]))) && (a ? G.cleanData([e], !0) : G.support.deleteExpando || l != l.window ? delete l[u] : l[u] = null)
				}
			}
		},
		_data: function(e, t, n) {
			return G.data(e, t, n, !0)
		},
		acceptData: function(e) {
			var t = e.nodeName && G.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), G.fn.extend({
		data: function(e, n) {
			var r, o, s, a, l, u = this[0],
				c = 0,
				d = null;
			if (e === t) {
				if (this.length && (d = G.data(u), 1 === u.nodeType && !G._data(u, "parsedAttrs"))) {
					for (s = u.attributes, l = s.length; l > c; c++) a = s[c].name, a.indexOf("data-") || (a = G.camelCase(a.substring(5)), i(u, a, d[a]));
					G._data(u, "parsedAttrs", !0)
				}
				return d
			}
			return "object" == typeof e ? this.each(function() {
				G.data(this, e)
			}) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", o = r[1] + "!", G.access(this, function(n) {
				return n === t ? (d = this.triggerHandler("getData" + o, [r[0]]), d === t && u && (d = G.data(u, e), d = i(u, e, d)), d === t && r[1] ? this.data(r[0]) : d) : (r[1] = n, this.each(function() {
					var t = G(this);
					t.triggerHandler("setData" + o, r), G.data(this, e, n), t.triggerHandler("changeData" + o, r)
				}), void 0)
			}, null, n, arguments.length > 1, null, !1))
		},
		removeData: function(e) {
			return this.each(function() {
				G.removeData(this, e)
			})
		}
	}), G.extend({
		queue: function(e, t, n) {
			var i;
			return e ? (t = (t || "fx") + "queue", i = G._data(e, t), n && (!i || G.isArray(n) ? i = G._data(e, t, G.makeArray(n)) : i.push(n)), i || []) : void 0
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = G.queue(e, t),
				i = n.length,
				r = n.shift(),
				o = G._queueHooks(e, t),
				s = function() {
					G.dequeue(e, t)
				};
			"inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, s, o)), !i && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return G._data(e, n) || G._data(e, n, {
				empty: G.Callbacks("once memory").add(function() {
					G.removeData(e, t + "queue", !0), G.removeData(e, n, !0)
				})
			})
		}
	}), G.fn.extend({
		queue: function(e, n) {
			var i = 2;
			return "string" != typeof e && (n = e, e = "fx", i--), arguments.length < i ? G.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = G.queue(this, e, n);
				G._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && G.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				G.dequeue(this, e)
			})
		},
		delay: function(e, t) {
			return e = G.fx ? G.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var i = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(i)
				}
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, n) {
			var i, r = 1,
				o = G.Deferred(),
				s = this,
				a = this.length,
				l = function() {
					--r || o.resolveWith(s, [s])
				};
			for ("string" != typeof e && (n = e, e = t), e = e || "fx"; a--;) i = G._data(s[a], e + "queueHooks"), i && i.empty && (r++, i.empty.add(l));
			return l(), o.promise(n)
		}
	});
	var vt, yt, wt, bt = /[\t\r\n]/g,
		xt = /\r/g,
		Ct = /^(?:button|input)$/i,
		Tt = /^(?:button|input|object|select|textarea)$/i,
		kt = /^a(?:rea|)$/i,
		Nt = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		Et = G.support.getSetAttribute;
	G.fn.extend({
		attr: function(e, t) {
			return G.access(this, G.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				G.removeAttr(this, e)
			})
		},
		prop: function(e, t) {
			return G.access(this, G.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = G.propFix[e] || e, this.each(function() {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		addClass: function(e) {
			var t, n, i, r, o, s, a;
			if (G.isFunction(e)) return this.each(function(t) {
				G(this).addClass(e.call(this, t, this.className))
			});
			if (e && "string" == typeof e)
				for (t = e.split(tt), n = 0, i = this.length; i > n; n++)
					if (r = this[n], 1 === r.nodeType)
						if (r.className || 1 !== t.length) {
							for (o = " " + r.className + " ", s = 0, a = t.length; a > s; s++) o.indexOf(" " + t[s] + " ") < 0 && (o += t[s] + " ");
							r.className = G.trim(o)
						} else r.className = e;
			return this
		},
		removeClass: function(e) {
			var n, i, r, o, s, a, l;
			if (G.isFunction(e)) return this.each(function(t) {
				G(this).removeClass(e.call(this, t, this.className))
			});
			if (e && "string" == typeof e || e === t)
				for (n = (e || "").split(tt), a = 0, l = this.length; l > a; a++)
					if (r = this[a], 1 === r.nodeType && r.className) {
						for (i = (" " + r.className + " ").replace(bt, " "), o = 0, s = n.length; s > o; o++)
							for (; i.indexOf(" " + n[o] + " ") >= 0;) i = i.replace(" " + n[o] + " ", " ");
						r.className = e ? G.trim(i) : ""
					}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e,
				i = "boolean" == typeof t;
			return G.isFunction(e) ? this.each(function(n) {
				G(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if ("string" === n)
					for (var r, o = 0, s = G(this), a = t, l = e.split(tt); r = l[o++];) a = i ? a : !s.hasClass(r), s[a ? "addClass" : "removeClass"](r);
				else("undefined" === n || "boolean" === n) && (this.className && G._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : G._data(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
				if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(bt, " ").indexOf(t) >= 0) return !0;
			return !1
		},
		val: function(e) {
			var n, i, r, o = this[0]; {
				if (arguments.length) return r = G.isFunction(e), this.each(function(i) {
					var o, s = G(this);
					1 === this.nodeType && (o = r ? e.call(this, i, s.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : G.isArray(o) && (o = G.map(o, function(e) {
						return null == e ? "" : e + ""
					})), n = G.valHooks[this.type] || G.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
				});
				if (o) return n = G.valHooks[o.type] || G.valHooks[o.nodeName.toLowerCase()], n && "get" in n && (i = n.get(o, "value")) !== t ? i : (i = o.value, "string" == typeof i ? i.replace(xt, "") : null == i ? "" : i)
			}
		}
	}), G.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select: {
				get: function(e) {
					for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, s = o ? null : [], a = o ? r + 1 : i.length, l = 0 > r ? a : o ? r : 0; a > l; l++)
						if (n = i[l], !(!n.selected && l !== r || (G.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && G.nodeName(n.parentNode, "optgroup"))) {
							if (t = G(n).val(), o) return t;
							s.push(t)
						}
					return s
				},
				set: function(e, t) {
					var n = G.makeArray(t);
					return G(e).find("option").each(function() {
						this.selected = G.inArray(G(this).val(), n) >= 0
					}), n.length || (e.selectedIndex = -1), n
				}
			}
		},
		attrFn: {},
		attr: function(e, n, i, r) {
			var o, s, a, l = e.nodeType;
			if (e && 3 !== l && 8 !== l && 2 !== l) return r && G.isFunction(G.fn[n]) ? G(e)[n](i) : "undefined" == typeof e.getAttribute ? G.prop(e, n, i) : (a = 1 !== l || !G.isXMLDoc(e), a && (n = n.toLowerCase(), s = G.attrHooks[n] || (Nt.test(n) ? yt : vt)), i !== t ? null === i ? (G.removeAttr(e, n), void 0) : s && "set" in s && a && (o = s.set(e, i, n)) !== t ? o : (e.setAttribute(n, i + ""), i) : s && "get" in s && a && null !== (o = s.get(e, n)) ? o : (o = e.getAttribute(n), null === o ? t : o))
		},
		removeAttr: function(e, t) {
			var n, i, r, o, s = 0;
			if (t && 1 === e.nodeType)
				for (i = t.split(tt); s < i.length; s++) r = i[s], r && (n = G.propFix[r] || r, o = Nt.test(r), o || G.attr(e, r, ""), e.removeAttribute(Et ? r : n), o && n in e && (e[n] = !1))
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (Ct.test(e.nodeName) && e.parentNode) G.error("type property can't be changed");
					else if (!G.support.radioValue && "radio" === t && G.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			},
			value: {
				get: function(e, t) {
					return vt && G.nodeName(e, "button") ? vt.get(e, t) : t in e ? e.value : null
				},
				set: function(e, t, n) {
					return vt && G.nodeName(e, "button") ? vt.set(e, t, n) : (e.value = t, void 0)
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(e, n, i) {
			var r, o, s, a = e.nodeType;
			if (e && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !G.isXMLDoc(e), s && (n = G.propFix[n] || n, o = G.propHooks[n]), i !== t ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : e[n] = i : o && "get" in o && null !== (r = o.get(e, n)) ? r : e[n]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : Tt.test(e.nodeName) || kt.test(e.nodeName) && e.href ? 0 : t
				}
			}
		}
	}), yt = {
		get: function(e, n) {
			var i, r = G.prop(e, n);
			return r === !0 || "boolean" != typeof r && (i = e.getAttributeNode(n)) && i.nodeValue !== !1 ? n.toLowerCase() : t
		},
		set: function(e, t, n) {
			var i;
			return t === !1 ? G.removeAttr(e, n) : (i = G.propFix[n] || n, i in e && (e[i] = !0), e.setAttribute(n, n.toLowerCase())), n
		}
	}, Et || (wt = {
		name: !0,
		id: !0,
		coords: !0
	}, vt = G.valHooks.button = {
		get: function(e, n) {
			var i;
			return i = e.getAttributeNode(n), i && (wt[n] ? "" !== i.value : i.specified) ? i.value : t
		},
		set: function(e, t, n) {
			var i = e.getAttributeNode(n);
			return i || (i = W.createAttribute(n), e.setAttributeNode(i)), i.value = t + ""
		}
	}, G.each(["width", "height"], function(e, t) {
		G.attrHooks[t] = G.extend(G.attrHooks[t], {
			set: function(e, n) {
				return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
			}
		})
	}), G.attrHooks.contenteditable = {
		get: vt.get,
		set: function(e, t, n) {
			"" === t && (t = "false"), vt.set(e, t, n)
		}
	}), G.support.hrefNormalized || G.each(["href", "src", "width", "height"], function(e, n) {
		G.attrHooks[n] = G.extend(G.attrHooks[n], {
			get: function(e) {
				var i = e.getAttribute(n, 2);
				return null === i ? t : i
			}
		})
	}), G.support.style || (G.attrHooks.style = {
		get: function(e) {
			return e.style.cssText.toLowerCase() || t
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	}), G.support.optSelected || (G.propHooks.selected = G.extend(G.propHooks.selected, {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	})), G.support.enctype || (G.propFix.enctype = "encoding"), G.support.checkOn || G.each(["radio", "checkbox"], function() {
		G.valHooks[this] = {
			get: function(e) {
				return null === e.getAttribute("value") ? "on" : e.value
			}
		}
	}), G.each(["radio", "checkbox"], function() {
		G.valHooks[this] = G.extend(G.valHooks[this], {
			set: function(e, t) {
				return G.isArray(t) ? e.checked = G.inArray(G(e).val(), t) >= 0 : void 0
			}
		})
	});
	var St = /^(?:textarea|input|select)$/i,
		$t = /^([^\.]*|)(?:\.(.+)|)$/,
		_t = /(?:^|\s)hover(\.\S+|)\b/,
		At = /^key/,
		jt = /^(?:mouse|contextmenu)|click/,
		Dt = /^(?:focusinfocus|focusoutblur)$/,
		Lt = function(e) {
			return G.event.special.hover ? e : e.replace(_t, "mouseenter$1 mouseleave$1")
		};
	G.event = {
		add: function(e, n, i, r, o) {
			var s, a, l, u, c, d, f, p, h, m, g;
			if (3 !== e.nodeType && 8 !== e.nodeType && n && i && (s = G._data(e))) {
				for (i.handler && (h = i, i = h.handler, o = h.selector), i.guid || (i.guid = G.guid++), l = s.events, l || (s.events = l = {}), a = s.handle, a || (s.handle = a = function(e) {
					return "undefined" == typeof G || e && G.event.triggered === e.type ? t : G.event.dispatch.apply(a.elem, arguments)
				}, a.elem = e), n = G.trim(Lt(n)).split(" "), u = 0; u < n.length; u++) c = $t.exec(n[u]) || [], d = c[1], f = (c[2] || "").split(".").sort(), g = G.event.special[d] || {}, d = (o ? g.delegateType : g.bindType) || d, g = G.event.special[d] || {}, p = G.extend({
					type: d,
					origType: c[1],
					data: r,
					handler: i,
					guid: i.guid,
					selector: o,
					needsContext: o && G.expr.match.needsContext.test(o),
					namespace: f.join(".")
				}, h), m = l[d], m || (m = l[d] = [], m.delegateCount = 0, g.setup && g.setup.call(e, r, f, a) !== !1 || (e.addEventListener ? e.addEventListener(d, a, !1) : e.attachEvent && e.attachEvent("on" + d, a))), g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = i.guid)), o ? m.splice(m.delegateCount++, 0, p) : m.push(p), G.event.global[d] = !0;
				e = null
			}
		},
		global: {},
		remove: function(e, t, n, i, r) {
			var o, s, a, l, u, c, d, f, p, h, m, g = G.hasData(e) && G._data(e);
			if (g && (f = g.events)) {
				for (t = G.trim(Lt(t || "")).split(" "), o = 0; o < t.length; o++)
					if (s = $t.exec(t[o]) || [], a = l = s[1], u = s[2], a) {
						for (p = G.event.special[a] || {}, a = (i ? p.delegateType : p.bindType) || a, h = f[a] || [], c = h.length, u = u ? new RegExp("(^|\\.)" + u.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = 0; d < h.length; d++) m = h[d], !r && l !== m.origType || n && n.guid !== m.guid || u && !u.test(m.namespace) || i && i !== m.selector && ("**" !== i || !m.selector) || (h.splice(d--, 1), m.selector && h.delegateCount--, p.remove && p.remove.call(e, m));
						0 === h.length && c !== h.length && (p.teardown && p.teardown.call(e, u, g.handle) !== !1 || G.removeEvent(e, a, g.handle), delete f[a])
					} else
						for (a in f) G.event.remove(e, a + t[o], n, i, !0);
				G.isEmptyObject(f) && (delete g.handle, G.removeData(e, "events", !0))
			}
		},
		customEvent: {
			getData: !0,
			setData: !0,
			changeData: !0
		},
		trigger: function(n, i, r, o) {
			if (!r || 3 !== r.nodeType && 8 !== r.nodeType) {
				var s, a, l, u, c, d, f, p, h, m, g = n.type || n,
					v = [];
				if (!Dt.test(g + G.event.triggered) && (g.indexOf("!") >= 0 && (g = g.slice(0, -1), a = !0), g.indexOf(".") >= 0 && (v = g.split("."), g = v.shift(), v.sort()), r && !G.event.customEvent[g] || G.event.global[g]))
					if (n = "object" == typeof n ? n[G.expando] ? n : new G.Event(g, n) : new G.Event(g), n.type = g, n.isTrigger = !0, n.exclusive = a, n.namespace = v.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = g.indexOf(":") < 0 ? "on" + g : "", r) {
						if (n.result = t, n.target || (n.target = r), i = null != i ? G.makeArray(i) : [], i.unshift(n), f = G.event.special[g] || {}, !f.trigger || f.trigger.apply(r, i) !== !1) {
							if (h = [
								[r, f.bindType || g]
							], !o && !f.noBubble && !G.isWindow(r)) {
								for (m = f.delegateType || g, u = Dt.test(m + g) ? r : r.parentNode, c = r; u; u = u.parentNode) h.push([u, m]), c = u;
								c === (r.ownerDocument || W) && h.push([c.defaultView || c.parentWindow || e, m])
							}
							for (l = 0; l < h.length && !n.isPropagationStopped(); l++) u = h[l][0], n.type = h[l][1], p = (G._data(u, "events") || {})[n.type] && G._data(u, "handle"), p && p.apply(u, i), p = d && u[d], p && G.acceptData(u) && p.apply && p.apply(u, i) === !1 && n.preventDefault();
							return n.type = g, o || n.isDefaultPrevented() || f._default && f._default.apply(r.ownerDocument, i) !== !1 || "click" === g && G.nodeName(r, "a") || !G.acceptData(r) || d && r[g] && ("focus" !== g && "blur" !== g || 0 !== n.target.offsetWidth) && !G.isWindow(r) && (c = r[d], c && (r[d] = null), G.event.triggered = g, r[g](), G.event.triggered = t, c && (r[d] = c)), n.result
						}
					} else {
						s = G.cache;
						for (l in s) s[l].events && s[l].events[g] && G.event.trigger(n, i, s[l].handle.elem, !0)
					}
			}
		},
		dispatch: function(n) {
			n = G.event.fix(n || e.event);
			var i, r, o, s, a, l, u, c, d, f = (G._data(this, "events") || {})[n.type] || [],
				p = f.delegateCount,
				h = V.call(arguments),
				m = !n.exclusive && !n.namespace,
				g = G.event.special[n.type] || {}, v = [];
			if (h[0] = n, n.delegateTarget = this, !g.preDispatch || g.preDispatch.call(this, n) !== !1) {
				if (p && (!n.button || "click" !== n.type))
					for (o = n.target; o != this; o = o.parentNode || this)
						if (o.disabled !== !0 || "click" !== n.type) {
							for (a = {}, u = [], i = 0; p > i; i++) c = f[i], d = c.selector, a[d] === t && (a[d] = c.needsContext ? G(d, this).index(o) >= 0 : G.find(d, this, null, [o]).length), a[d] && u.push(c);
							u.length && v.push({
								elem: o,
								matches: u
							})
						}
				for (f.length > p && v.push({
					elem: this,
					matches: f.slice(p)
				}), i = 0; i < v.length && !n.isPropagationStopped(); i++)
					for (l = v[i], n.currentTarget = l.elem, r = 0; r < l.matches.length && !n.isImmediatePropagationStopped(); r++) c = l.matches[r], (m || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) && (n.data = c.data, n.handleObj = c, s = ((G.event.special[c.origType] || {}).handle || c.handler).apply(l.elem, h), s !== t && (n.result = s, s === !1 && (n.preventDefault(), n.stopPropagation())));
				return g.postDispatch && g.postDispatch.call(this, n), n.result
			}
		},
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, n) {
				var i, r, o, s = n.button,
					a = n.fromElement;
				return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || W, r = i.documentElement, o = i.body, e.pageX = n.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
			}
		},
		fix: function(e) {
			if (e[G.expando]) return e;
			var t, n, i = e,
				r = G.event.fixHooks[e.type] || {}, o = r.props ? this.props.concat(r.props) : this.props;
			for (e = G.Event(i), t = o.length; t;) n = o[--t], e[n] = i[n];
			return e.target || (e.target = i.srcElement || W), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, r.filter ? r.filter(e, i) : e
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
			beforeunload: {
				setup: function(e, t, n) {
					G.isWindow(this) && (this.onbeforeunload = n)
				},
				teardown: function(e, t) {
					this.onbeforeunload === t && (this.onbeforeunload = null)
				}
			}
		},
		simulate: function(e, t, n, i) {
			var r = G.extend(new G.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			i ? G.event.trigger(r, null, t) : G.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
		}
	}, G.event.handle = G.event.dispatch, G.removeEvent = W.removeEventListener ? function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function(e, t, n) {
		var i = "on" + t;
		e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n))
	}, G.Event = function(e, t) {
		return this instanceof G.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? s : o) : this.type = e, t && G.extend(this, t), this.timeStamp = e && e.timeStamp || G.now(), this[G.expando] = !0, void 0) : new G.Event(e, t)
	}, G.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = s;
			var e = this.originalEvent;
			e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function() {
			this.isPropagationStopped = s;
			var e = this.originalEvent;
			e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = s, this.stopPropagation()
		},
		isDefaultPrevented: o,
		isPropagationStopped: o,
		isImmediatePropagationStopped: o
	}, G.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(e, t) {
		G.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				{
					var n, i = this,
						r = e.relatedTarget,
						o = e.handleObj;
					o.selector
				}
				return (!r || r !== i && !G.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), G.support.submitBubbles || (G.event.special.submit = {
		setup: function() {
			return G.nodeName(this, "form") ? !1 : (G.event.add(this, "click._submit keypress._submit", function(e) {
				var n = e.target,
					i = G.nodeName(n, "input") || G.nodeName(n, "button") ? n.form : t;
				i && !G._data(i, "_submit_attached") && (G.event.add(i, "submit._submit", function(e) {
					e._submit_bubble = !0
				}), G._data(i, "_submit_attached", !0))
			}), void 0)
		},
		postDispatch: function(e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && G.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown: function() {
			return G.nodeName(this, "form") ? !1 : (G.event.remove(this, "._submit"), void 0)
		}
	}), G.support.changeBubbles || (G.event.special.change = {
		setup: function() {
			return St.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (G.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), G.event.add(this, "click._change", function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1), G.event.simulate("change", this, e, !0)
			})), !1) : (G.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				St.test(t.nodeName) && !G._data(t, "_change_attached") && (G.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || G.event.simulate("change", this.parentNode, e, !0)
				}), G._data(t, "_change_attached", !0))
			}), void 0)
		},
		handle: function(e) {
			var t = e.target;
			return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
		},
		teardown: function() {
			return G.event.remove(this, "._change"), !St.test(this.nodeName)
		}
	}), G.support.focusinBubbles || G.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = 0,
			i = function(e) {
				G.event.simulate(t, e.target, G.event.fix(e), !0)
			};
		G.event.special[t] = {
			setup: function() {
				0 === n++ && W.addEventListener(e, i, !0)
			},
			teardown: function() {
				0 === --n && W.removeEventListener(e, i, !0)
			}
		}
	}), G.fn.extend({
		on: function(e, n, i, r, s) {
			var a, l;
			if ("object" == typeof e) {
				"string" != typeof n && (i = i || n, n = t);
				for (l in e) this.on(l, n, i, e[l], s);
				return this
			}
			if (null == i && null == r ? (r = n, i = n = t) : null == r && ("string" == typeof n ? (r = i, i = t) : (r = i, i = n, n = t)), r === !1) r = o;
			else if (!r) return this;
			return 1 === s && (a = r, r = function(e) {
				return G().off(e), a.apply(this, arguments)
			}, r.guid = a.guid || (a.guid = G.guid++)), this.each(function() {
				G.event.add(this, e, r, i, n)
			})
		},
		one: function(e, t, n, i) {
			return this.on(e, t, n, i, 1)
		},
		off: function(e, n, i) {
			var r, s;
			if (e && e.preventDefault && e.handleObj) return r = e.handleObj, G(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
			if ("object" == typeof e) {
				for (s in e) this.off(s, n, e[s]);
				return this
			}
			return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = o), this.each(function() {
				G.event.remove(this, e, i, n)
			})
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		live: function(e, t, n) {
			return G(this.context).on(e, this.selector, t, n), this
		},
		die: function(e, t) {
			return G(this.context).off(e, this.selector || "**", t), this
		},
		delegate: function(e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		},
		trigger: function(e, t) {
			return this.each(function() {
				G.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			return this[0] ? G.event.trigger(e, t, this[0], !0) : void 0
		},
		toggle: function(e) {
			var t = arguments,
				n = e.guid || G.guid++,
				i = 0,
				r = function(n) {
					var r = (G._data(this, "lastToggle" + e.guid) || 0) % i;
					return G._data(this, "lastToggle" + e.guid, r + 1), n.preventDefault(), t[r].apply(this, arguments) || !1
				};
			for (r.guid = n; i < t.length;) t[i++].guid = n;
			return this.click(r)
		},
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	}), G.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		G.fn[t] = function(e, n) {
			return null == n && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}, At.test(t) && (G.event.fixHooks[t] = G.event.keyHooks), jt.test(t) && (G.event.fixHooks[t] = G.event.mouseHooks)
	}),
	function(e, t) {
		function n(e, t, n, i) {
			n = n || [], t = t || j;
			var r, o, s, a, l = t.nodeType;
			if (!e || "string" != typeof e) return n;
			if (1 !== l && 9 !== l) return [];
			if (s = x(t), !s && !i && (r = nt.exec(e)))
				if (a = r[1]) {
					if (9 === l) {
						if (o = t.getElementById(a), !o || !o.parentNode) return n;
						if (o.id === a) return n.push(o), n
					} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && C(t, o) && o.id === a) return n.push(o), n
				} else {
					if (r[2]) return M.apply(n, P.call(t.getElementsByTagName(e), 0)), n;
					if ((a = r[3]) && ft && t.getElementsByClassName) return M.apply(n, P.call(t.getElementsByClassName(a), 0)), n
				}
			return m(e.replace(Q, "$1"), t, n, i, s)
		}

		function i(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return "input" === n && t.type === e
			}
		}

		function r(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}

		function o(e) {
			return q(function(t) {
				return t = +t, q(function(n, i) {
					for (var r, o = e([], n.length, t), s = o.length; s--;) n[r = o[s]] && (n[r] = !(i[r] = n[r]))
				})
			})
		}

		function s(e, t, n) {
			if (e === t) return n;
			for (var i = e.nextSibling; i;) {
				if (i === t) return -1;
				i = i.nextSibling
			}
			return 1
		}

		function a(e, t) {
			var i, r, o, s, a, l, u, c = R[_][e + " "];
			if (c) return t ? 0 : c.slice(0);
			for (a = e, l = [], u = w.preFilter; a;) {
				(!i || (r = Z.exec(a))) && (r && (a = a.slice(r[0].length) || a), l.push(o = [])), i = !1, (r = et.exec(a)) && (o.push(i = new A(r.shift())), a = a.slice(i.length), i.type = r[0].replace(Q, " "));
				for (s in w.filter)!(r = at[s].exec(a)) || u[s] && !(r = u[s](r)) || (o.push(i = new A(r.shift())), a = a.slice(i.length), i.type = s, i.matches = r);
				if (!i) break
			}
			return t ? a.length : a ? n.error(e) : R(e, l).slice(0)
		}

		function l(e, t, n) {
			var i = t.dir,
				r = n && "parentNode" === t.dir,
				o = H++;
			return t.first ? function(t, n, o) {
				for (; t = t[i];)
					if (r || 1 === t.nodeType) return e(t, n, o)
			} : function(t, n, s) {
				if (s) {
					for (; t = t[i];)
						if ((r || 1 === t.nodeType) && e(t, n, s)) return t
				} else
					for (var a, l = L + " " + o + " ", u = l + v; t = t[i];)
						if (r || 1 === t.nodeType) {
							if ((a = t[_]) === u) return t.sizset;
							if ("string" == typeof a && 0 === a.indexOf(l)) {
								if (t.sizset) return t
							} else {
								if (t[_] = u, e(t, n, s)) return t.sizset = !0, t;
								t.sizset = !1
							}
						}
			}
		}

		function u(e) {
			return e.length > 1 ? function(t, n, i) {
				for (var r = e.length; r--;)
					if (!e[r](t, n, i)) return !1;
				return !0
			} : e[0]
		}

		function c(e, t, n, i, r) {
			for (var o, s = [], a = 0, l = e.length, u = null != t; l > a; a++)(o = e[a]) && (!n || n(o, i, r)) && (s.push(o), u && t.push(a));
			return s
		}

		function d(e, t, n, i, r, o) {
			return i && !i[_] && (i = d(i)), r && !r[_] && (r = d(r, o)), q(function(o, s, a, l) {
				var u, d, f, p = [],
					m = [],
					g = s.length,
					v = o || h(t || "*", a.nodeType ? [a] : a, []),
					y = !e || !o && t ? v : c(v, p, e, a, l),
					w = n ? r || (o ? e : g || i) ? [] : s : y;
				if (n && n(y, w, a, l), i)
					for (u = c(w, m), i(u, [], a, l), d = u.length; d--;)(f = u[d]) && (w[m[d]] = !(y[m[d]] = f));
				if (o) {
					if (r || e) {
						if (r) {
							for (u = [], d = w.length; d--;)(f = w[d]) && u.push(y[d] = f);
							r(null, w = [], u, l)
						}
						for (d = w.length; d--;)(f = w[d]) && (u = r ? O.call(o, f) : p[d]) > -1 && (o[u] = !(s[u] = f))
					}
				} else w = c(w === s ? w.splice(g, w.length) : w), r ? r(null, s, w, l) : M.apply(s, w)
			})
		}

		function f(e) {
			for (var t, n, i, r = e.length, o = w.relative[e[0].type], s = o || w.relative[" "], a = o ? 1 : 0, c = l(function(e) {
					return e === t
				}, s, !0), p = l(function(e) {
					return O.call(t, e) > -1
				}, s, !0), h = [
					function(e, n, i) {
						return !o && (i || n !== E) || ((t = n).nodeType ? c(e, n, i) : p(e, n, i))
					}
				]; r > a; a++)
				if (n = w.relative[e[a].type]) h = [l(u(h), n)];
				else {
					if (n = w.filter[e[a].type].apply(null, e[a].matches), n[_]) {
						for (i = ++a; r > i && !w.relative[e[i].type]; i++);
						return d(a > 1 && u(h), a > 1 && e.slice(0, a - 1).join("").replace(Q, "$1"), n, i > a && f(e.slice(a, i)), r > i && f(e = e.slice(i)), r > i && e.join(""))
					}
					h.push(n)
				}
			return u(h)
		}

		function p(e, t) {
			var i = t.length > 0,
				r = e.length > 0,
				o = function(s, a, l, u, d) {
					var f, p, h, m = [],
						g = 0,
						y = "0",
						b = s && [],
						x = null != d,
						C = E,
						T = s || r && w.find.TAG("*", d && a.parentNode || a),
						k = L += null == C ? 1 : Math.E;
					for (x && (E = a !== j && a, v = o.el); null != (f = T[y]); y++) {
						if (r && f) {
							for (p = 0; h = e[p]; p++)
								if (h(f, a, l)) {
									u.push(f);
									break
								}
							x && (L = k, v = ++o.el)
						}
						i && ((f = !h && f) && g--, s && b.push(f))
					}
					if (g += y, i && y !== g) {
						for (p = 0; h = t[p]; p++) h(b, m, a, l);
						if (s) {
							if (g > 0)
								for (; y--;) b[y] || m[y] || (m[y] = F.call(u));
							m = c(m)
						}
						M.apply(u, m), x && !s && m.length > 0 && g + t.length > 1 && n.uniqueSort(u)
					}
					return x && (L = k, E = C), b
				};
			return o.el = 0, i ? q(o) : o
		}

		function h(e, t, i) {
			for (var r = 0, o = t.length; o > r; r++) n(e, t[r], i);
			return i
		}

		function m(e, t, n, i, r) {
			{
				var o, s, l, u, c, d = a(e);
				d.length
			}
			if (!i && 1 === d.length) {
				if (s = d[0] = d[0].slice(0), s.length > 2 && "ID" === (l = s[0]).type && 9 === t.nodeType && !r && w.relative[s[1].type]) {
					if (t = w.find.ID(l.matches[0].replace(st, ""), t, r)[0], !t) return n;
					e = e.slice(s.shift().length)
				}
				for (o = at.POS.test(e) ? -1 : s.length - 1; o >= 0 && (l = s[o], !w.relative[u = l.type]); o--)
					if ((c = w.find[u]) && (i = c(l.matches[0].replace(st, ""), it.test(s[0].type) && t.parentNode || t, r))) {
						if (s.splice(o, 1), e = i.length && s.join(""), !e) return M.apply(n, P.call(i, 0)), n;
						break
					}
			}
			return T(e, d)(i, t, r, n, it.test(e)), n
		}

		function g() {}
		var v, y, w, b, x, C, T, k, N, E, S = !0,
			$ = "undefined",
			_ = ("sizcache" + Math.random()).replace(".", ""),
			A = String,
			j = e.document,
			D = j.documentElement,
			L = 0,
			H = 0,
			F = [].pop,
			M = [].push,
			P = [].slice,
			O = [].indexOf || function(e) {
				for (var t = 0, n = this.length; n > t; t++)
					if (this[t] === e) return t;
				return -1
			}, q = function(e, t) {
				return e[_] = null == t || t, e
			}, B = function() {
				var e = {}, t = [];
				return q(function(n, i) {
					return t.push(n) > w.cacheLength && delete e[t.shift()], e[n + " "] = i
				}, e)
			}, W = B(),
			R = B(),
			I = B(),
			z = "[\\x20\\t\\r\\n\\f]",
			U = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
			X = U.replace("w", "w#"),
			V = "([*^$|!~]?=)",
			K = "\\[" + z + "*(" + U + ")" + z + "*(?:" + V + z + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + X + ")|)|)" + z + "*\\]",
			J = ":(" + U + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + K + ")|[^:]|\\\\.)*|.*))\\)|)",
			Y = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + z + "*((?:-\\d)?\\d*)" + z + "*\\)|)(?=[^-]|$)",
			Q = new RegExp("^" + z + "+|((?:^|[^\\\\])(?:\\\\.)*)" + z + "+$", "g"),
			Z = new RegExp("^" + z + "*," + z + "*"),
			et = new RegExp("^" + z + "*([\\x20\\t\\r\\n\\f>+~])" + z + "*"),
			tt = new RegExp(J),
			nt = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
			it = /[\x20\t\r\n\f]*[+~]/,
			rt = /h\d/i,
			ot = /input|select|textarea|button/i,
			st = /\\(?!\\)/g,
			at = {
				ID: new RegExp("^#(" + U + ")"),
				CLASS: new RegExp("^\\.(" + U + ")"),
				NAME: new RegExp("^\\[name=['\"]?(" + U + ")['\"]?\\]"),
				TAG: new RegExp("^(" + U.replace("w", "w*") + ")"),
				ATTR: new RegExp("^" + K),
				PSEUDO: new RegExp("^" + J),
				POS: new RegExp(Y, "i"),
				CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + z + "*(even|odd|(([+-]|)(\\d*)n|)" + z + "*(?:([+-]|)" + z + "*(\\d+)|))" + z + "*\\)|)", "i"),
				needsContext: new RegExp("^" + z + "*[>+~]|" + Y, "i")
			}, lt = function(e) {
				var t = j.createElement("div");
				try {
					return e(t)
				} catch (n) {
					return !1
				} finally {
					t = null
				}
			}, ut = lt(function(e) {
				return e.appendChild(j.createComment("")), !e.getElementsByTagName("*").length
			}),
			ct = lt(function(e) {
				return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== $ && "#" === e.firstChild.getAttribute("href")
			}),
			dt = lt(function(e) {
				e.innerHTML = "<select></select>";
				var t = typeof e.lastChild.getAttribute("multiple");
				return "boolean" !== t && "string" !== t
			}),
			ft = lt(function(e) {
				return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
			}),
			pt = lt(function(e) {
				e.id = _ + 0, e.innerHTML = "<a name='" + _ + "'></a><div name='" + _ + "'></div>", D.insertBefore(e, D.firstChild);
				var t = j.getElementsByName && j.getElementsByName(_).length === 2 + j.getElementsByName(_ + 0).length;
				return y = !j.getElementById(_), D.removeChild(e), t
			});
		try {
			P.call(D.childNodes, 0)[0].nodeType
		} catch (ht) {
			P = function(e) {
				for (var t, n = []; t = this[e]; e++) n.push(t);
				return n
			}
		}
		n.matches = function(e, t) {
			return n(e, null, null, t)
		}, n.matchesSelector = function(e, t) {
			return n(t, null, null, [e]).length > 0
		}, b = n.getText = function(e) {
			var t, n = "",
				i = 0,
				r = e.nodeType;
			if (r) {
				if (1 === r || 9 === r || 11 === r) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += b(e)
				} else if (3 === r || 4 === r) return e.nodeValue
			} else
				for (; t = e[i]; i++) n += b(t);
			return n
		}, x = n.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		}, C = n.contains = D.contains ? function(e, t) {
			var n = 9 === e.nodeType ? e.documentElement : e,
				i = t && t.parentNode;
			return e === i || !! (i && 1 === i.nodeType && n.contains && n.contains(i))
		} : D.compareDocumentPosition ? function(e, t) {
			return t && !! (16 & e.compareDocumentPosition(t))
		} : function(e, t) {
			for (; t = t.parentNode;)
				if (t === e) return !0;
			return !1
		}, n.attr = function(e, t) {
			var n, i = x(e);
			return i || (t = t.toLowerCase()), (n = w.attrHandle[t]) ? n(e) : i || dt ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? "boolean" == typeof e[t] ? e[t] ? t : null : n.specified ? n.value : null : null)
		}, w = n.selectors = {
			cacheLength: 50,
			createPseudo: q,
			match: at,
			attrHandle: ct ? {} : {
				href: function(e) {
					return e.getAttribute("href", 2)
				},
				type: function(e) {
					return e.getAttribute("type")
				}
			},
			find: {
				ID: y ? function(e, t, n) {
					if (typeof t.getElementById !== $ && !n) {
						var i = t.getElementById(e);
						return i && i.parentNode ? [i] : []
					}
				} : function(e, n, i) {
					if (typeof n.getElementById !== $ && !i) {
						var r = n.getElementById(e);
						return r ? r.id === e || typeof r.getAttributeNode !== $ && r.getAttributeNode("id").value === e ? [r] : t : []
					}
				},
				TAG: ut ? function(e, t) {
					return typeof t.getElementsByTagName !== $ ? t.getElementsByTagName(e) : void 0
				} : function(e, t) {
					var n = t.getElementsByTagName(e);
					if ("*" === e) {
						for (var i, r = [], o = 0; i = n[o]; o++) 1 === i.nodeType && r.push(i);
						return r
					}
					return n
				},
				NAME: pt && function(e, t) {
					return typeof t.getElementsByName !== $ ? t.getElementsByName(name) : void 0
				},
				CLASS: ft && function(e, t, n) {
					return typeof t.getElementsByClassName === $ || n ? void 0 : t.getElementsByClassName(e)
				}
			},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(st, ""), e[3] = (e[4] || e[5] || "").replace(st, ""), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1] ? (e[2] || n.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && n.error(e[0]), e
				},
				PSEUDO: function(e) {
					var t, n;
					return at.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (t = e[4]) && (tt.test(t) && (n = a(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t), e.slice(0, 3))
				}
			},
			filter: {
				ID: y ? function(e) {
					return e = e.replace(st, ""),
					function(t) {
						return t.getAttribute("id") === e
					}
				} : function(e) {
					return e = e.replace(st, ""),
					function(t) {
						var n = typeof t.getAttributeNode !== $ && t.getAttributeNode("id");
						return n && n.value === e
					}
				},
				TAG: function(e) {
					return "*" === e ? function() {
						return !0
					} : (e = e.replace(st, "").toLowerCase(), function(t) {
						return t.nodeName && t.nodeName.toLowerCase() === e
					})
				},
				CLASS: function(e) {
					var t = W[_][e + " "];
					return t || (t = new RegExp("(^|" + z + ")" + e + "(" + z + "|$)")) && W(e, function(e) {
						return t.test(e.className || typeof e.getAttribute !== $ && e.getAttribute("class") || "")
					})
				},
				ATTR: function(e, t, i) {
					return function(r) {
						var o = n.attr(r, e);
						return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === i : "!=" === t ? o !== i : "^=" === t ? i && 0 === o.indexOf(i) : "*=" === t ? i && o.indexOf(i) > -1 : "$=" === t ? i && o.substr(o.length - i.length) === i : "~=" === t ? (" " + o + " ").indexOf(i) > -1 : "|=" === t ? o === i || o.substr(0, i.length + 1) === i + "-" : !1) : !0
					}
				},
				CHILD: function(e, t, n, i) {
					return "nth" === e ? function(e) {
						var t, r, o = e.parentNode;
						if (1 === n && 0 === i) return !0;
						if (o)
							for (r = 0, t = o.firstChild; t && (1 !== t.nodeType || (r++, e !== t)); t = t.nextSibling);
						return r -= i, r === n || r % n === 0 && r / n >= 0
					} : function(t) {
						var n = t;
						switch (e) {
							case "only":
							case "first":
								for (; n = n.previousSibling;)
									if (1 === n.nodeType) return !1;
								if ("first" === e) return !0;
								n = t;
							case "last":
								for (; n = n.nextSibling;)
									if (1 === n.nodeType) return !1;
								return !0
						}
					}
				},
				PSEUDO: function(e, t) {
					var i, r = w.pseudos[e] || w.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
					return r[_] ? r(t) : r.length > 1 ? (i = [e, e, "", t], w.setFilters.hasOwnProperty(e.toLowerCase()) ? q(function(e, n) {
						for (var i, o = r(e, t), s = o.length; s--;) i = O.call(e, o[s]), e[i] = !(n[i] = o[s])
					}) : function(e) {
						return r(e, 0, i)
					}) : r
				}
			},
			pseudos: {
				not: q(function(e) {
					var t = [],
						n = [],
						i = T(e.replace(Q, "$1"));
					return i[_] ? q(function(e, t, n, r) {
						for (var o, s = i(e, null, r, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
					}) : function(e, r, o) {
						return t[0] = e, i(t, null, o, n), !n.pop()
					}
				}),
				has: q(function(e) {
					return function(t) {
						return n(e, t).length > 0
					}
				}),
				contains: q(function(e) {
					return function(t) {
						return (t.textContent || t.innerText || b(t)).indexOf(e) > -1
					}
				}),
				enabled: function(e) {
					return e.disabled === !1
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !! e.checked || "option" === t && !! e.selected
				},
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				parent: function(e) {
					return !w.pseudos.empty(e)
				},
				empty: function(e) {
					var t;
					for (e = e.firstChild; e;) {
						if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t) return !1;
						e = e.nextSibling
					}
					return !0
				},
				header: function(e) {
					return rt.test(e.nodeName)
				},
				text: function(e) {
					var t, n;
					return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (n = e.getAttribute("type")) || n.toLowerCase() === t)
				},
				radio: i("radio"),
				checkbox: i("checkbox"),
				file: i("file"),
				password: i("password"),
				image: i("image"),
				submit: r("submit"),
				reset: r("reset"),
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				input: function(e) {
					return ot.test(e.nodeName)
				},
				focus: function(e) {
					var t = e.ownerDocument;
					return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
				},
				active: function(e) {
					return e === e.ownerDocument.activeElement
				},
				first: o(function() {
					return [0]
				}),
				last: o(function(e, t) {
					return [t - 1]
				}),
				eq: o(function(e, t, n) {
					return [0 > n ? n + t : n]
				}),
				even: o(function(e, t) {
					for (var n = 0; t > n; n += 2) e.push(n);
					return e
				}),
				odd: o(function(e, t) {
					for (var n = 1; t > n; n += 2) e.push(n);
					return e
				}),
				lt: o(function(e, t, n) {
					for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
					return e
				}),
				gt: o(function(e, t, n) {
					for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
					return e
				})
			}
		}, k = D.compareDocumentPosition ? function(e, t) {
			return e === t ? (N = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
		} : function(e, t) {
			if (e === t) return N = !0, 0;
			if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
			var n, i, r = [],
				o = [],
				a = e.parentNode,
				l = t.parentNode,
				u = a;
			if (a === l) return s(e, t);
			if (!a) return -1;
			if (!l) return 1;
			for (; u;) r.unshift(u), u = u.parentNode;
			for (u = l; u;) o.unshift(u), u = u.parentNode;
			n = r.length, i = o.length;
			for (var c = 0; n > c && i > c; c++)
				if (r[c] !== o[c]) return s(r[c], o[c]);
			return c === n ? s(e, o[c], -1) : s(r[c], t, 1)
		}, [0, 0].sort(k), S = !N, n.uniqueSort = function(e) {
			var t, n = [],
				i = 1,
				r = 0;
			if (N = S, e.sort(k), N) {
				for (; t = e[i]; i++) t === e[i - 1] && (r = n.push(i));
				for (; r--;) e.splice(n[r], 1)
			}
			return e
		}, n.error = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		}, T = n.compile = function(e, t) {
			var n, i = [],
				r = [],
				o = I[_][e + " "];
			if (!o) {
				for (t || (t = a(e)), n = t.length; n--;) o = f(t[n]), o[_] ? i.push(o) : r.push(o);
				o = I(e, p(r, i))
			}
			return o
		}, j.querySelectorAll && ! function() {
			var e, t = m,
				i = /'|\\/g,
				r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
				o = [":focus"],
				s = [":active"],
				l = D.matchesSelector || D.mozMatchesSelector || D.webkitMatchesSelector || D.oMatchesSelector || D.msMatchesSelector;
			lt(function(e) {
				e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || o.push("\\[" + z + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || o.push(":checked")
			}), lt(function(e) {
				e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && o.push("[*^$]=" + z + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled")
			}), o = new RegExp(o.join("|")), m = function(e, n, r, s, l) {
				if (!s && !l && !o.test(e)) {
					var u, c, d = !0,
						f = _,
						p = n,
						h = 9 === n.nodeType && e;
					if (1 === n.nodeType && "object" !== n.nodeName.toLowerCase()) {
						for (u = a(e), (d = n.getAttribute("id")) ? f = d.replace(i, "\\$&") : n.setAttribute("id", f), f = "[id='" + f + "'] ", c = u.length; c--;) u[c] = f + u[c].join("");
						p = it.test(e) && n.parentNode || n, h = u.join(",")
					}
					if (h) try {
						return M.apply(r, P.call(p.querySelectorAll(h), 0)), r
					} catch (m) {} finally {
						d || n.removeAttribute("id")
					}
				}
				return t(e, n, r, s, l)
			}, l && (lt(function(t) {
				e = l.call(t, "div");
				try {
					l.call(t, "[test!='']:sizzle"), s.push("!=", J)
				} catch (n) {}
			}), s = new RegExp(s.join("|")), n.matchesSelector = function(t, i) {
				if (i = i.replace(r, "='$1']"), !x(t) && !s.test(i) && !o.test(i)) try {
					var a = l.call(t, i);
					if (a || e || t.document && 11 !== t.document.nodeType) return a
				} catch (u) {}
				return n(i, null, null, [t]).length > 0
			})
		}(), w.pseudos.nth = w.pseudos.eq, w.filters = g.prototype = w.pseudos, w.setFilters = new g, n.attr = G.attr, G.find = n, G.expr = n.selectors, G.expr[":"] = G.expr.pseudos, G.unique = n.uniqueSort, G.text = n.getText, G.isXMLDoc = n.isXML, G.contains = n.contains
	}(e);
	var Ht = /Until$/,
		Ft = /^(?:parents|prev(?:Until|All))/,
		Mt = /^.[^:#\[\.,]*$/,
		Pt = G.expr.match.needsContext,
		Ot = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	G.fn.extend({
		find: function(e) {
			var t, n, i, r, o, s, a = this;
			if ("string" != typeof e) return G(e).filter(function() {
				for (t = 0, n = a.length; n > t; t++)
					if (G.contains(a[t], this)) return !0
			});
			for (s = this.pushStack("", "find", e), t = 0, n = this.length; n > t; t++)
				if (i = s.length, G.find(e, this[t], s), t > 0)
					for (r = i; r < s.length; r++)
						for (o = 0; i > o; o++)
							if (s[o] === s[r]) {
								s.splice(r--, 1);
								break
							}
			return s
		},
		has: function(e) {
			var t, n = G(e, this),
				i = n.length;
			return this.filter(function() {
				for (t = 0; i > t; t++)
					if (G.contains(this, n[t])) return !0
			})
		},
		not: function(e) {
			return this.pushStack(u(this, e, !1), "not", e)
		},
		filter: function(e) {
			return this.pushStack(u(this, e, !0), "filter", e)
		},
		is: function(e) {
			return !!e && ("string" == typeof e ? Pt.test(e) ? G(e, this.context).index(this[0]) >= 0 : G.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest: function(e, t) {
			for (var n, i = 0, r = this.length, o = [], s = Pt.test(e) || "string" != typeof e ? G(e, t || this.context) : 0; r > i; i++)
				for (n = this[i]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
					if (s ? s.index(n) > -1 : G.find.matchesSelector(n, e)) {
						o.push(n);
						break
					}
					n = n.parentNode
				}
			return o = o.length > 1 ? G.unique(o) : o, this.pushStack(o, "closest", e)
		},
		index: function(e) {
			return e ? "string" == typeof e ? G.inArray(this[0], G(e)) : G.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
		},
		add: function(e, t) {
			var n = "string" == typeof e ? G(e, t) : G.makeArray(e && e.nodeType ? [e] : e),
				i = G.merge(this.get(), n);
			return this.pushStack(a(n[0]) || a(i[0]) ? i : G.unique(i))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), G.fn.andSelf = G.fn.addBack, G.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return G.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return G.dir(e, "parentNode", n)
		},
		next: function(e) {
			return l(e, "nextSibling")
		},
		prev: function(e) {
			return l(e, "previousSibling")
		},
		nextAll: function(e) {
			return G.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return G.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return G.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return G.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return G.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return G.sibling(e.firstChild)
		},
		contents: function(e) {
			return G.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : G.merge([], e.childNodes)
		}
	}, function(e, t) {
		G.fn[e] = function(n, i) {
			var r = G.map(this, t, n);
			return Ht.test(e) || (i = n), i && "string" == typeof i && (r = G.filter(i, r)), r = this.length > 1 && !Ot[e] ? G.unique(r) : r, this.length > 1 && Ft.test(e) && (r = r.reverse()), this.pushStack(r, e, V.call(arguments).join(","))
		}
	}), G.extend({
		filter: function(e, t, n) {
			return n && (e = ":not(" + e + ")"), 1 === t.length ? G.find.matchesSelector(t[0], e) ? [t[0]] : [] : G.find.matches(e, t)
		},
		dir: function(e, n, i) {
			for (var r = [], o = e[n]; o && 9 !== o.nodeType && (i === t || 1 !== o.nodeType || !G(o).is(i));) 1 === o.nodeType && r.push(o), o = o[n];
			return r
		},
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	var qt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Bt = / jQuery\d+="(?:null|\d+)"/g,
		Wt = /^\s+/,
		Rt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		It = /<([\w:]+)/,
		zt = /<tbody/i,
		Ut = /<|&#?\w+;/,
		Xt = /<(?:script|style|link)/i,
		Vt = /<(?:script|object|embed|option|style)/i,
		Kt = new RegExp("<(?:" + qt + ")[\\s/>]", "i"),
		Jt = /^(?:checkbox|radio)$/,
		Yt = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Qt = /\/(java|ecma)script/i,
		Gt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
		Zt = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		}, en = c(W),
		tn = en.appendChild(W.createElement("div"));
	Zt.optgroup = Zt.option, Zt.tbody = Zt.tfoot = Zt.colgroup = Zt.caption = Zt.thead, Zt.th = Zt.td, G.support.htmlSerialize || (Zt._default = [1, "X<div>", "</div>"]), G.fn.extend({
		text: function(e) {
			return G.access(this, function(e) {
				return e === t ? G.text(this) : this.empty().append((this[0] && this[0].ownerDocument || W).createTextNode(e))
			}, null, e, arguments.length)
		},
		wrapAll: function(e) {
			if (G.isFunction(e)) return this.each(function(t) {
				G(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = G(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return G.isFunction(e) ? this.each(function(t) {
				G(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = G(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = G.isFunction(e);
			return this.each(function(n) {
				G(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				G.nodeName(this, "body") || G(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0, function(e) {
				(1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0, function(e) {
				(1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
			})
		},
		before: function() {
			if (!a(this[0])) return this.domManip(arguments, !1, function(e) {
				this.parentNode.insertBefore(e, this)
			});
			if (arguments.length) {
				var e = G.clean(arguments);
				return this.pushStack(G.merge(e, this), "before", this.selector)
			}
		},
		after: function() {
			if (!a(this[0])) return this.domManip(arguments, !1, function(e) {
				this.parentNode.insertBefore(e, this.nextSibling)
			});
			if (arguments.length) {
				var e = G.clean(arguments);
				return this.pushStack(G.merge(this, e), "after", this.selector)
			}
		},
		remove: function(e, t) {
			for (var n, i = 0; null != (n = this[i]); i++)(!e || G.filter(e, [n]).length) && (t || 1 !== n.nodeType || (G.cleanData(n.getElementsByTagName("*")), G.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++)
				for (1 === e.nodeType && G.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
			return this
		},
		clone: function(e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
				return G.clone(this, e, t)
			})
		},
		html: function(e) {
			return G.access(this, function(e) {
				var n = this[0] || {}, i = 0,
					r = this.length;
				if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Bt, "") : t;
				if (!("string" != typeof e || Xt.test(e) || !G.support.htmlSerialize && Kt.test(e) || !G.support.leadingWhitespace && Wt.test(e) || Zt[(It.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(Rt, "<$1></$2>");
					try {
						for (; r > i; i++) n = this[i] || {}, 1 === n.nodeType && (G.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
						n = 0
					} catch (o) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function(e) {
			return a(this[0]) ? this.length ? this.pushStack(G(G.isFunction(e) ? e() : e), "replaceWith", e) : this : G.isFunction(e) ? this.each(function(t) {
				var n = G(this),
					i = n.html();
				n.replaceWith(e.call(this, t, i))
			}) : ("string" != typeof e && (e = G(e).detach()), this.each(function() {
				var t = this.nextSibling,
					n = this.parentNode;
				G(this).remove(), t ? G(t).before(e) : G(n).append(e)
			}))
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, n, i) {
			e = [].concat.apply([], e);
			var r, o, s, a, l = 0,
				u = e[0],
				c = [],
				f = this.length;
			if (!G.support.checkClone && f > 1 && "string" == typeof u && Yt.test(u)) return this.each(function() {
				G(this).domManip(e, n, i)
			});
			if (G.isFunction(u)) return this.each(function(r) {
				var o = G(this);
				e[0] = u.call(this, r, n ? o.html() : t), o.domManip(e, n, i)
			});
			if (this[0]) {
				if (r = G.buildFragment(e, this, c), s = r.fragment, o = s.firstChild, 1 === s.childNodes.length && (s = o), o)
					for (n = n && G.nodeName(o, "tr"), a = r.cacheable || f - 1; f > l; l++) i.call(n && G.nodeName(this[l], "table") ? d(this[l], "tbody") : this[l], l === a ? s : G.clone(s, !0, !0));
				s = o = null, c.length && G.each(c, function(e, t) {
					t.src ? G.ajax ? G.ajax({
						url: t.src,
						type: "GET",
						dataType: "script",
						async: !1,
						global: !1,
						"throws": !0
					}) : G.error("no ajax") : G.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Gt, "")), t.parentNode && t.parentNode.removeChild(t)
				})
			}
			return this
		}
	}), G.buildFragment = function(e, n, i) {
		var r, o, s, a = e[0];
		return n = n || W, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, !(1 === e.length && "string" == typeof a && a.length < 512 && n === W && "<" === a.charAt(0)) || Vt.test(a) || !G.support.checkClone && Yt.test(a) || !G.support.html5Clone && Kt.test(a) || (o = !0, r = G.fragments[a], s = r !== t), r || (r = n.createDocumentFragment(), G.clean(e, n, r, i), o && (G.fragments[a] = s && r)), {
			fragment: r,
			cacheable: o
		}
	}, G.fragments = {}, G.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		G.fn[e] = function(n) {
			var i, r = 0,
				o = [],
				s = G(n),
				a = s.length,
				l = 1 === this.length && this[0].parentNode;
			if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === a) return s[t](this[0]), this;
			for (; a > r; r++) i = (r > 0 ? this.clone(!0) : this).get(), G(s[r])[t](i), o = o.concat(i);
			return this.pushStack(o, e, s.selector)
		}
	}), G.extend({
		clone: function(e, t, n) {
			var i, r, o, s;
			if (G.support.html5Clone || G.isXMLDoc(e) || !Kt.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (tn.innerHTML = e.outerHTML, tn.removeChild(s = tn.firstChild)), !(G.support.noCloneEvent && G.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || G.isXMLDoc(e)))
				for (p(e, s), i = h(e), r = h(s), o = 0; i[o]; ++o) r[o] && p(i[o], r[o]);
			if (t && (f(e, s), n))
				for (i = h(e), r = h(s), o = 0; i[o]; ++o) f(i[o], r[o]);
			return i = r = null, s
		},
		clean: function(e, t, n, i) {
			var r, o, s, a, l, u, d, f, p, h, g, v = t === W && en,
				y = [];
			for (t && "undefined" != typeof t.createDocumentFragment || (t = W), r = 0; null != (s = e[r]); r++)
				if ("number" == typeof s && (s += ""), s) {
					if ("string" == typeof s)
						if (Ut.test(s)) {
							for (v = v || c(t), d = t.createElement("div"), v.appendChild(d), s = s.replace(Rt, "<$1></$2>"), a = (It.exec(s) || ["", ""])[1].toLowerCase(), l = Zt[a] || Zt._default, u = l[0], d.innerHTML = l[1] + s + l[2]; u--;) d = d.lastChild;
							if (!G.support.tbody)
								for (f = zt.test(s), p = "table" !== a || f ? "<table>" !== l[1] || f ? [] : d.childNodes : d.firstChild && d.firstChild.childNodes, o = p.length - 1; o >= 0; --o) G.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o]);
							!G.support.leadingWhitespace && Wt.test(s) && d.insertBefore(t.createTextNode(Wt.exec(s)[0]), d.firstChild), s = d.childNodes, d.parentNode.removeChild(d)
						} else s = t.createTextNode(s);
					s.nodeType ? y.push(s) : G.merge(y, s)
				}
			if (d && (s = d = v = null), !G.support.appendChecked)
				for (r = 0; null != (s = y[r]); r++) G.nodeName(s, "input") ? m(s) : "undefined" != typeof s.getElementsByTagName && G.grep(s.getElementsByTagName("input"), m);
			if (n)
				for (h = function(e) {
					return !e.type || Qt.test(e.type) ? i ? i.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e) : void 0
				}, r = 0; null != (s = y[r]); r++) G.nodeName(s, "script") && h(s) || (n.appendChild(s), "undefined" != typeof s.getElementsByTagName && (g = G.grep(G.merge([], s.getElementsByTagName("script")), h), y.splice.apply(y, [r + 1, 0].concat(g)), r += g.length));
			return y
		},
		cleanData: function(e, t) {
			for (var n, i, r, o, s = 0, a = G.expando, l = G.cache, u = G.support.deleteExpando, c = G.event.special; null != (r = e[s]); s++)
				if ((t || G.acceptData(r)) && (i = r[a], n = i && l[i])) {
					if (n.events)
						for (o in n.events) c[o] ? G.event.remove(r, o) : G.removeEvent(r, o, n.handle);
					l[i] && (delete l[i], u ? delete r[a] : r.removeAttribute ? r.removeAttribute(a) : r[a] = null, G.deletedIds.push(i))
				}
		}
	}),
	function() {
		var e, t;
		G.uaMatch = function(e) {
			e = e.toLowerCase();
			var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
			return {
				browser: t[1] || "",
				version: t[2] || "0"
			}
		}, e = G.uaMatch(I.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), G.browser = t, G.sub = function() {
			function e(t, n) {
				return new e.fn.init(t, n)
			}
			G.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(n, i) {
				return i && i instanceof G && !(i instanceof e) && (i = e(i)), G.fn.init.call(this, n, i, t)
			}, e.fn.init.prototype = e.fn;
			var t = e(W);
			return e
		}
	}();
	var nn, rn, on, sn = /alpha\([^)]*\)/i,
		an = /opacity=([^)]*)/,
		ln = /^(top|right|bottom|left)$/,
		un = /^(none|table(?!-c[ea]).+)/,
		cn = /^margin/,
		dn = new RegExp("^(" + Z + ")(.*)$", "i"),
		fn = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"),
		pn = new RegExp("^([-+])=(" + Z + ")", "i"),
		hn = {
			BODY: "block"
		}, mn = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		}, gn = {
			letterSpacing: 0,
			fontWeight: 400
		}, vn = ["Top", "Right", "Bottom", "Left"],
		yn = ["Webkit", "O", "Moz", "ms"],
		wn = G.fn.toggle;
	G.fn.extend({
		css: function(e, n) {
			return G.access(this, function(e, n, i) {
				return i !== t ? G.style(e, n, i) : G.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show: function() {
			return y(this, !0)
		},
		hide: function() {
			return y(this)
		},
		toggle: function(e, t) {
			var n = "boolean" == typeof e;
			return G.isFunction(e) && G.isFunction(t) ? wn.apply(this, arguments) : this.each(function() {
				(n ? e : v(this)) ? G(this).show() : G(this).hide()
			})
		}
	}), G.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = nn(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": G.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, n, i, r) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, s, a, l = G.camelCase(n),
					u = e.style;
				if (n = G.cssProps[l] || (G.cssProps[l] = g(u, l)), a = G.cssHooks[n] || G.cssHooks[l], i === t) return a && "get" in a && (o = a.get(e, !1, r)) !== t ? o : u[n];
				if (s = typeof i, "string" === s && (o = pn.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(G.css(e, n)), s = "number"), !(null == i || "number" === s && isNaN(i) || ("number" !== s || G.cssNumber[l] || (i += "px"), a && "set" in a && (i = a.set(e, i, r)) === t))) try {
					u[n] = i
				} catch (c) {}
			}
		},
		css: function(e, n, i, r) {
			var o, s, a, l = G.camelCase(n);
			return n = G.cssProps[l] || (G.cssProps[l] = g(e.style, l)), a = G.cssHooks[n] || G.cssHooks[l], a && "get" in a && (o = a.get(e, !0, r)), o === t && (o = nn(e, n)), "normal" === o && n in gn && (o = gn[n]), i || r !== t ? (s = parseFloat(o), i || G.isNumeric(s) ? s || 0 : o) : o
		},
		swap: function(e, t, n) {
			var i, r, o = {};
			for (r in t) o[r] = e.style[r], e.style[r] = t[r];
			i = n.call(e);
			for (r in t) e.style[r] = o[r];
			return i
		}
	}), e.getComputedStyle ? nn = function(t, n) {
		var i, r, o, s, a = e.getComputedStyle(t, null),
			l = t.style;
		return a && (i = a.getPropertyValue(n) || a[n], "" !== i || G.contains(t.ownerDocument, t) || (i = G.style(t, n)), fn.test(i) && cn.test(n) && (r = l.width, o = l.minWidth, s = l.maxWidth, l.minWidth = l.maxWidth = l.width = i, i = a.width, l.width = r, l.minWidth = o, l.maxWidth = s)), i
	} : W.documentElement.currentStyle && (nn = function(e, t) {
		var n, i, r = e.currentStyle && e.currentStyle[t],
			o = e.style;
		return null == r && o && o[t] && (r = o[t]), fn.test(r) && !ln.test(t) && (n = o.left, i = e.runtimeStyle && e.runtimeStyle.left, i && (e.runtimeStyle.left = e.currentStyle.left), o.left = "fontSize" === t ? "1em" : r, r = o.pixelLeft + "px", o.left = n, i && (e.runtimeStyle.left = i)), "" === r ? "auto" : r
	}), G.each(["height", "width"], function(e, t) {
		G.cssHooks[t] = {
			get: function(e, n, i) {
				return n ? 0 === e.offsetWidth && un.test(nn(e, "display")) ? G.swap(e, mn, function() {
					return x(e, t, i)
				}) : x(e, t, i) : void 0
			},
			set: function(e, n, i) {
				return w(e, n, i ? b(e, t, i, G.support.boxSizing && "border-box" === G.css(e, "boxSizing")) : 0)
			}
		}
	}), G.support.opacity || (G.cssHooks.opacity = {
		get: function(e, t) {
			return an.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				i = e.currentStyle,
				r = G.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = i && i.filter || n.filter || "";
			n.zoom = 1, t >= 1 && "" === G.trim(o.replace(sn, "")) && n.removeAttribute && (n.removeAttribute("filter"), i && !i.filter) || (n.filter = sn.test(o) ? o.replace(sn, r) : o + " " + r)
		}
	}), G(function() {
		G.support.reliableMarginRight || (G.cssHooks.marginRight = {
			get: function(e, t) {
				return G.swap(e, {
					display: "inline-block"
				}, function() {
					return t ? nn(e, "marginRight") : void 0
				})
			}
		}), !G.support.pixelPosition && G.fn.position && G.each(["top", "left"], function(e, t) {
			G.cssHooks[t] = {
				get: function(e, n) {
					if (n) {
						var i = nn(e, t);
						return fn.test(i) ? G(e).position()[t] + "px" : i
					}
				}
			}
		})
	}), G.expr && G.expr.filters && (G.expr.filters.hidden = function(e) {
		return 0 === e.offsetWidth && 0 === e.offsetHeight || !G.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || nn(e, "display"))
	}, G.expr.filters.visible = function(e) {
		return !G.expr.filters.hidden(e)
	}), G.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		G.cssHooks[e + t] = {
			expand: function(n) {
				var i, r = "string" == typeof n ? n.split(" ") : [n],
					o = {};
				for (i = 0; 4 > i; i++) o[e + vn[i] + t] = r[i] || r[i - 2] || r[0];
				return o
			}
		}, cn.test(e) || (G.cssHooks[e + t].set = w)
	});
	var bn = /%20/g,
		xn = /\[\]$/,
		Cn = /\r?\n/g,
		Tn = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		kn = /^(?:select|textarea)/i;
	G.fn.extend({
		serialize: function() {
			return G.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? G.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || kn.test(this.nodeName) || Tn.test(this.type))
			}).map(function(e, t) {
				var n = G(this).val();
				return null == n ? null : G.isArray(n) ? G.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(Cn, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Cn, "\r\n")
				}
			}).get()
		}
	}), G.param = function(e, n) {
		var i, r = [],
			o = function(e, t) {
				t = G.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (n === t && (n = G.ajaxSettings && G.ajaxSettings.traditional), G.isArray(e) || e.jquery && !G.isPlainObject(e)) G.each(e, function() {
			o(this.name, this.value)
		});
		else
			for (i in e) T(i, e[i], n, o);
		return r.join("&").replace(bn, "+")
	};
	var Nn, En, Sn = /#.*$/,
		$n = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		_n = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		An = /^(?:GET|HEAD)$/,
		jn = /^\/\//,
		Dn = /\?/,
		Ln = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		Hn = /([?&])_=[^&]*/,
		Fn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		Mn = G.fn.load,
		Pn = {}, On = {}, qn = ["*/"] + ["*"];
	try {
		En = R.href
	} catch (Bn) {
		En = W.createElement("a"), En.href = "", En = En.href
	}
	Nn = Fn.exec(En.toLowerCase()) || [], G.fn.load = function(e, n, i) {
		if ("string" != typeof e && Mn) return Mn.apply(this, arguments);
		if (!this.length) return this;
		var r, o, s, a = this,
			l = e.indexOf(" ");
		return l >= 0 && (r = e.slice(l, e.length), e = e.slice(0, l)), G.isFunction(n) ? (i = n, n = t) : n && "object" == typeof n && (o = "POST"), G.ajax({
			url: e,
			type: o,
			dataType: "html",
			data: n,
			complete: function(e, t) {
				i && a.each(i, s || [e.responseText, t, e])
			}
		}).done(function(e) {
			s = arguments, a.html(r ? G("<div>").append(e.replace(Ln, "")).find(r) : e)
		}), this
	}, G.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
		G.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), G.each(["get", "post"], function(e, n) {
		G[n] = function(e, i, r, o) {
			return G.isFunction(i) && (o = o || r, r = i, i = t), G.ajax({
				type: n,
				url: e,
				data: i,
				success: r,
				dataType: o
			})
		}
	}), G.extend({
		getScript: function(e, n) {
			return G.get(e, t, n, "script")
		},
		getJSON: function(e, t, n) {
			return G.get(e, t, n, "json")
		},
		ajaxSetup: function(e, t) {
			return t ? E(e, G.ajaxSettings) : (t = e, e = G.ajaxSettings), E(e, t), e
		},
		ajaxSettings: {
			url: En,
			isLocal: _n.test(Nn[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": qn
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": e.String,
				"text html": !0,
				"text json": G.parseJSON,
				"text xml": G.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: k(Pn),
		ajaxTransport: k(On),
		ajax: function(e, n) {
			function i(e, n, i, s) {
				var u, d, y, w, x, T = n;
				2 !== b && (b = 2, l && clearTimeout(l), a = t, o = s || "", C.readyState = e > 0 ? 4 : 0, i && (w = S(f, C, i)), e >= 200 && 300 > e || 304 === e ? (f.ifModified && (x = C.getResponseHeader("Last-Modified"), x && (G.lastModified[r] = x), x = C.getResponseHeader("Etag"), x && (G.etag[r] = x)), 304 === e ? (T = "notmodified", u = !0) : (u = $(f, w), T = u.state, d = u.data, y = u.error, u = !y)) : (y = T, (!T || e) && (T = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || T) + "", u ? m.resolveWith(p, [d, T, C]) : m.rejectWith(p, [C, T, y]), C.statusCode(v), v = t, c && h.trigger("ajax" + (u ? "Success" : "Error"), [C, f, u ? d : y]), g.fireWith(p, [C, T]), c && (h.trigger("ajaxComplete", [C, f]), --G.active || G.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			var r, o, s, a, l, u, c, d, f = G.ajaxSetup({}, n),
				p = f.context || f,
				h = p !== f && (p.nodeType || p instanceof G) ? G(p) : G.event,
				m = G.Deferred(),
				g = G.Callbacks("once memory"),
				v = f.statusCode || {}, y = {}, w = {}, b = 0,
				x = "canceled",
				C = {
					readyState: 0,
					setRequestHeader: function(e, t) {
						if (!b) {
							var n = e.toLowerCase();
							e = w[n] = w[n] || e, y[e] = t
						}
						return this
					},
					getAllResponseHeaders: function() {
						return 2 === b ? o : null
					},
					getResponseHeader: function(e) {
						var n;
						if (2 === b) {
							if (!s)
								for (s = {}; n = $n.exec(o);) s[n[1].toLowerCase()] = n[2];
							n = s[e.toLowerCase()]
						}
						return n === t ? null : n
					},
					overrideMimeType: function(e) {
						return b || (f.mimeType = e), this
					},
					abort: function(e) {
						return e = e || x, a && a.abort(e), i(0, e), this
					}
				};
			if (m.promise(C), C.success = C.done, C.error = C.fail, C.complete = g.add, C.statusCode = function(e) {
				if (e) {
					var t;
					if (2 > b)
						for (t in e) v[t] = [v[t], e[t]];
					else t = e[C.status], C.always(t)
				}
				return this
			}, f.url = ((e || f.url) + "").replace(Sn, "").replace(jn, Nn[1] + "//"), f.dataTypes = G.trim(f.dataType || "*").toLowerCase().split(tt), null == f.crossDomain && (u = Fn.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === Nn[1] && u[2] === Nn[2] && (u[3] || ("http:" === u[1] ? 80 : 443)) == (Nn[3] || ("http:" === Nn[1] ? 80 : 443)))), f.data && f.processData && "string" != typeof f.data && (f.data = G.param(f.data, f.traditional)), N(Pn, f, n, C), 2 === b) return C;
			if (c = f.global, f.type = f.type.toUpperCase(), f.hasContent = !An.test(f.type), c && 0 === G.active++ && G.event.trigger("ajaxStart"), !f.hasContent && (f.data && (f.url += (Dn.test(f.url) ? "&" : "?") + f.data, delete f.data), r = f.url, f.cache === !1)) {
				var T = G.now(),
					k = f.url.replace(Hn, "$1_=" + T);
				f.url = k + (k === f.url ? (Dn.test(f.url) ? "&" : "?") + "_=" + T : "")
			}(f.data && f.hasContent && f.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", f.contentType), f.ifModified && (r = r || f.url, G.lastModified[r] && C.setRequestHeader("If-Modified-Since", G.lastModified[r]), G.etag[r] && C.setRequestHeader("If-None-Match", G.etag[r])), C.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + qn + "; q=0.01" : "") : f.accepts["*"]);
			for (d in f.headers) C.setRequestHeader(d, f.headers[d]);
			if (f.beforeSend && (f.beforeSend.call(p, C, f) === !1 || 2 === b)) return C.abort();
			x = "abort";
			for (d in {
				success: 1,
				error: 1,
				complete: 1
			}) C[d](f[d]);
			if (a = N(On, f, n, C)) {
				C.readyState = 1, c && h.trigger("ajaxSend", [C, f]), f.async && f.timeout > 0 && (l = setTimeout(function() {
					C.abort("timeout")
				}, f.timeout));
				try {
					b = 1, a.send(y, i)
				} catch (E) {
					if (!(2 > b)) throw E;
					i(-1, E)
				}
			} else i(-1, "No Transport");
			return C
		},
		active: 0,
		lastModified: {},
		etag: {}
	});
	var Wn = [],
		Rn = /\?/,
		In = /(=)\?(?=&|$)|\?\?/,
		zn = G.now();
	G.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = Wn.pop() || G.expando + "_" + zn++;
			return this[e] = !0, e
		}
	}), G.ajaxPrefilter("json jsonp", function(n, i, r) {
		var o, s, a, l = n.data,
			u = n.url,
			c = n.jsonp !== !1,
			d = c && In.test(u),
			f = c && !d && "string" == typeof l && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && In.test(l);
		return "jsonp" === n.dataTypes[0] || d || f ? (o = n.jsonpCallback = G.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, s = e[o], d ? n.url = u.replace(In, "$1" + o) : f ? n.data = l.replace(In, "$1" + o) : c && (n.url += (Rn.test(u) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
			return a || G.error(o + " was not called"), a[0]
		}, n.dataTypes[0] = "json", e[o] = function() {
			a = arguments
		}, r.always(function() {
			e[o] = s, n[o] && (n.jsonpCallback = i.jsonpCallback, Wn.push(o)), a && G.isFunction(s) && s(a[0]), a = s = t
		}), "script") : void 0
	}), G.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(e) {
				return G.globalEval(e), e
			}
		}
	}), G.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), G.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, i = W.head || W.getElementsByTagName("head")[0] || W.documentElement;
			return {
				send: function(r, o) {
					n = W.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, r) {
						(r || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, i && n.parentNode && i.removeChild(n), n = t, r || o(200, "success"))
					}, i.insertBefore(n, i.firstChild)
				},
				abort: function() {
					n && n.onload(0, 1)
				}
			}
		}
	});
	var Un, Xn = e.ActiveXObject ? function() {
			for (var e in Un) Un[e](0, 1)
		} : !1,
		Vn = 0;
	G.ajaxSettings.xhr = e.ActiveXObject ? function() {
		return !this.isLocal && _() || A()
	} : _,
	function(e) {
		G.extend(G.support, {
			ajax: !! e,
			cors: !! e && "withCredentials" in e
		})
	}(G.ajaxSettings.xhr()), G.support.ajax && G.ajaxTransport(function(n) {
		if (!n.crossDomain || G.support.cors) {
			var i;
			return {
				send: function(r, o) {
					var s, a, l = n.xhr();
					if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
						for (a in n.xhrFields) l[a] = n.xhrFields[a];
					n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (a in r) l.setRequestHeader(a, r[a])
					} catch (u) {}
					l.send(n.hasContent && n.data || null), i = function(e, r) {
						var a, u, c, d, f;
						try {
							if (i && (r || 4 === l.readyState))
								if (i = t, s && (l.onreadystatechange = G.noop, Xn && delete Un[s]), r) 4 !== l.readyState && l.abort();
								else {
									a = l.status, c = l.getAllResponseHeaders(), d = {}, f = l.responseXML, f && f.documentElement && (d.xml = f);
									try {
										d.text = l.responseText
									} catch (p) {}
									try {
										u = l.statusText
									} catch (p) {
										u = ""
									}
									a || !n.isLocal || n.crossDomain ? 1223 === a && (a = 204) : a = d.text ? 200 : 404
								}
						} catch (h) {
							r || o(-1, h)
						}
						d && o(a, u, d, c)
					}, n.async ? 4 === l.readyState ? setTimeout(i, 0) : (s = ++Vn, Xn && (Un || (Un = {}, G(e).unload(Xn)), Un[s] = i), l.onreadystatechange = i) : i()
				},
				abort: function() {
					i && i(0, 1)
				}
			}
		}
	});
	var Kn, Jn, Yn = /^(?:toggle|show|hide)$/,
		Qn = new RegExp("^(?:([-+])=|)(" + Z + ")([a-z%]*)$", "i"),
		Gn = /queueHooks$/,
		Zn = [F],
		ei = {
			"*": [
				function(e, t) {
					var n, i, r = this.createTween(e, t),
						o = Qn.exec(t),
						s = r.cur(),
						a = +s || 0,
						l = 1,
						u = 20;
					if (o) {
						if (n = +o[2], i = o[3] || (G.cssNumber[e] ? "" : "px"), "px" !== i && a) {
							a = G.css(r.elem, e, !0) || n || 1;
							do l = l || ".5", a /= l, G.style(r.elem, e, a + i); while (l !== (l = r.cur() / s) && 1 !== l && --u)
						}
						r.unit = i, r.start = a, r.end = o[1] ? a + (o[1] + 1) * n : n
					}
					return r
				}
			]
		};
	G.Animation = G.extend(L, {
		tweener: function(e, t) {
			G.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, i = 0, r = e.length; r > i; i++) n = e[i], ei[n] = ei[n] || [], ei[n].unshift(t)
		},
		prefilter: function(e, t) {
			t ? Zn.unshift(e) : Zn.push(e)
		}
	}), G.Tween = M, M.prototype = {
		constructor: M,
		init: function(e, t, n, i, r, o) {
			this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (G.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = M.propHooks[this.prop];
			return e && e.get ? e.get(this) : M.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = M.propHooks[this.prop];
			return this.pos = t = this.options.duration ? G.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
		}
	}, M.prototype.init.prototype = M.prototype, M.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = G.css(e.elem, e.prop, !1, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set: function(e) {
				G.fx.step[e.prop] ? G.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[G.cssProps[e.prop]] || G.cssHooks[e.prop]) ? G.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, G.each(["toggle", "show", "hide"], function(e, t) {
		var n = G.fn[t];
		G.fn[t] = function(i, r, o) {
			return null == i || "boolean" == typeof i || !e && G.isFunction(i) && G.isFunction(r) ? n.apply(this, arguments) : this.animate(P(t, !0), i, r, o)
		}
	}), G.fn.extend({
		fadeTo: function(e, t, n, i) {
			return this.filter(v).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, i)
		},
		animate: function(e, t, n, i) {
			var r = G.isEmptyObject(e),
				o = G.speed(t, n, i),
				s = function() {
					var t = L(this, G.extend({}, e), o);
					r && t.stop(!0)
				};
			return r || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
		},
		stop: function(e, n, i) {
			var r = function(e) {
				var t = e.stop;
				delete e.stop, t(i)
			};
			return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					n = null != e && e + "queueHooks",
					o = G.timers,
					s = G._data(this);
				if (n) s[n] && s[n].stop && r(s[n]);
				else
					for (n in s) s[n] && s[n].stop && Gn.test(n) && r(s[n]);
				for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(i), t = !1, o.splice(n, 1));
				(t || !i) && G.dequeue(this, e)
			})
		}
	}), G.each({
		slideDown: P("show"),
		slideUp: P("hide"),
		slideToggle: P("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		G.fn[e] = function(e, n, i) {
			return this.animate(t, e, n, i)
		}
	}), G.speed = function(e, t, n) {
		var i = e && "object" == typeof e ? G.extend({}, e) : {
			complete: n || !n && t || G.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !G.isFunction(t) && t
		};
		return i.duration = G.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in G.fx.speeds ? G.fx.speeds[i.duration] : G.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
			G.isFunction(i.old) && i.old.call(this), i.queue && G.dequeue(this, i.queue)
		}, i
	}, G.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, G.timers = [], G.fx = M.prototype.init, G.fx.tick = function() {
		var e, n = G.timers,
			i = 0;
		for (Kn = G.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
		n.length || G.fx.stop(), Kn = t
	}, G.fx.timer = function(e) {
		e() && G.timers.push(e) && !Jn && (Jn = setInterval(G.fx.tick, G.fx.interval))
	}, G.fx.interval = 13, G.fx.stop = function() {
		clearInterval(Jn), Jn = null
	}, G.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, G.fx.step = {}, G.expr && G.expr.filters && (G.expr.filters.animated = function(e) {
		return G.grep(G.timers, function(t) {
			return e === t.elem
		}).length
	});
	var ti = /^(?:body|html)$/i;
	G.fn.offset = function(e) {
		if (arguments.length) return e === t ? this : this.each(function(t) {
			G.offset.setOffset(this, e, t)
		});
		var n, i, r, o, s, a, l, u = {
				top: 0,
				left: 0
			}, c = this[0],
			d = c && c.ownerDocument;
		if (d) return (i = d.body) === c ? G.offset.bodyOffset(c) : (n = d.documentElement, G.contains(n, c) ? ("undefined" != typeof c.getBoundingClientRect && (u = c.getBoundingClientRect()), r = O(d), o = n.clientTop || i.clientTop || 0, s = n.clientLeft || i.clientLeft || 0, a = r.pageYOffset || n.scrollTop, l = r.pageXOffset || n.scrollLeft, {
			top: u.top + a - o,
			left: u.left + l - s
		}) : u)
	}, G.offset = {
		bodyOffset: function(e) {
			var t = e.offsetTop,
				n = e.offsetLeft;
			return G.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(G.css(e, "marginTop")) || 0, n += parseFloat(G.css(e, "marginLeft")) || 0), {
				top: t,
				left: n
			}
		},
		setOffset: function(e, t, n) {
			var i = G.css(e, "position");
			"static" === i && (e.style.position = "relative");
			var r, o, s = G(e),
				a = s.offset(),
				l = G.css(e, "top"),
				u = G.css(e, "left"),
				c = ("absolute" === i || "fixed" === i) && G.inArray("auto", [l, u]) > -1,
				d = {}, f = {};
			c ? (f = s.position(), r = f.top, o = f.left) : (r = parseFloat(l) || 0, o = parseFloat(u) || 0), G.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (d.top = t.top - a.top + r), null != t.left && (d.left = t.left - a.left + o), "using" in t ? t.using.call(e, d) : s.css(d)
		}
	}, G.fn.extend({
		position: function() {
			if (this[0]) {
				var e = this[0],
					t = this.offsetParent(),
					n = this.offset(),
					i = ti.test(t[0].nodeName) ? {
						top: 0,
						left: 0
					} : t.offset();
				return n.top -= parseFloat(G.css(e, "marginTop")) || 0, n.left -= parseFloat(G.css(e, "marginLeft")) || 0, i.top += parseFloat(G.css(t[0], "borderTopWidth")) || 0, i.left += parseFloat(G.css(t[0], "borderLeftWidth")) || 0, {
					top: n.top - i.top,
					left: n.left - i.left
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || W.body; e && !ti.test(e.nodeName) && "static" === G.css(e, "position");) e = e.offsetParent;
				return e || W.body
			})
		}
	}), G.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var i = /Y/.test(n);
		G.fn[e] = function(r) {
			return G.access(this, function(e, r, o) {
				var s = O(e);
				return o === t ? s ? n in s ? s[n] : s.document.documentElement[r] : e[r] : (s ? s.scrollTo(i ? G(s).scrollLeft() : o, i ? o : G(s).scrollTop()) : e[r] = o, void 0)
			}, e, r, arguments.length, null)
		}
	}), G.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		G.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function(i, r) {
			G.fn[r] = function(r, o) {
				var s = arguments.length && (i || "boolean" != typeof r),
					a = i || (r === !0 || o === !0 ? "margin" : "border");
				return G.access(this, function(n, i, r) {
					var o;
					return G.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : r === t ? G.css(n, i, r, a) : G.style(n, i, r, a)
				}, n, s ? r : t, s, null)
			}
		})
	}), e.jQuery = e.$ = G, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return G
	})
}(window),
function(e) {
	function t(e) {
		return "object" == typeof e ? e : {
			top: e,
			left: e
		}
	}
	var n = e.scrollTo = function(t, n, i) {
		e(window).scrollTo(t, n, i)
	};
	n.defaults = {
		axis: "xy",
		duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
		limit: !0
	}, n.window = function() {
		return e(window)._scrollable()
	}, e.fn._scrollable = function() {
		return this.map(function() {
			var t = this,
				n = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
			if (!n) return t;
			var i = (t.contentWindow || t).document || t.ownerDocument || t;
			return /webkit/i.test(navigator.userAgent) || "BackCompat" == i.compatMode ? i.body : i.documentElement
		})
	}, e.fn.scrollTo = function(i, r, o) {
		return "object" == typeof r && (o = r, r = 0), "function" == typeof o && (o = {
			onAfter: o
		}), "max" == i && (i = 9e9), o = e.extend({}, n.defaults, o), r = r || o.duration, o.queue = o.queue && o.axis.length > 1, o.queue && (r /= 2), o.offset = t(o.offset), o.over = t(o.over), this._scrollable().each(function() {
			function s(e) {
				u.animate(d, r, o.easing, e && function() {
					e.call(this, i, o)
				})
			}
			if (null != i) {
				var a, l = this,
					u = e(l),
					c = i,
					d = {}, f = u.is("html,body");
				switch (typeof c) {
					case "number":
					case "string":
						if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(c)) {
							c = t(c);
							break
						}
						if (c = e(c, this), !c.length) return;
					case "object":
						(c.is || c.style) && (a = (c = e(c)).offset())
				}
				e.each(o.axis.split(""), function(e, t) {
					var i = "x" == t ? "Left" : "Top",
						r = i.toLowerCase(),
						p = "scroll" + i,
						h = l[p],
						m = n.max(l, t);
					if (a) d[p] = a[r] + (f ? 0 : h - u.offset()[r]), o.margin && (d[p] -= parseInt(c.css("margin" + i)) || 0, d[p] -= parseInt(c.css("border" + i + "Width")) || 0), d[p] += o.offset[r] || 0, o.over[r] && (d[p] += c["x" == t ? "width" : "height"]() * o.over[r]);
					else {
						var g = c[r];
						d[p] = g.slice && "%" == g.slice(-1) ? parseFloat(g) / 100 * m : g
					}
					o.limit && /^\d+$/.test(d[p]) && (d[p] = d[p] <= 0 ? 0 : Math.min(d[p], m)), !e && o.queue && (h != d[p] && s(o.onAfterFirst), delete d[p])
				}), s(o.onAfter)
			}
		}).end()
	}, n.max = function(t, n) {
		var i = "x" == n ? "Width" : "Height",
			r = "scroll" + i;
		if (!e(t).is("html,body")) return t[r] - e(t)[i.toLowerCase()]();
		var o = "client" + i,
			s = t.ownerDocument.documentElement,
			a = t.ownerDocument.body;
		return Math.max(s[r], a[r]) - Math.min(s[o], a[o])
	}
}(jQuery), $(function() {
	protocol = "//", domain = location.host, null != window.localStorage && localStorage.clear(), $(".navbar-link a").click(function() {
		$(".nav-collapse").collapse("hide")
	});
	$(".signin-entry").click(function() {
		$("#popup .warn").not("input").hide(), $("#popup").addClass("show-popup"), $("#popup>.box").hide(), $("#login-box").show(0, function() {
			t()
		}), $("#username").focus()
	}), $(".signup-entry").click(function() {
		$("#popup .warn").not("input").not("input").hide(), $("#popup").addClass("show-popup"), $("#popup>.box").hide(), $("#signup-box").show(), $("#set-username").val($("#username").val()), $("#set-username").focus()
	}), $("#error_no_user_sign_up").click(function() {
		$("#popup .warn").not("input").hide(), $("#popup").addClass("show-popup"), $("#popup>.box").hide(), $("#signup-box").show(), $("#set-username").focus(), $("#set-username").val($("#username").val()), t()
	}), $("#popup").click(function(e) {
		"popup" == e.target.id && $("#popup").removeClass("show-popup")
	}), $("#popup .close").click(function() {
		$("#popup").removeClass("show-popup")
	}), $(".text-input-wrapper input").on("input", function(t) {
		e(t)
	}), $(".text-input-wrapper input").on("blur", function(t) {
		e(t)
	}), $(".text-input-wrapper input").on("focus", function(t) {
		e(t)
	}), $(".text-input-wrapper input").on("keyup", function(t) {
		e(t)
	}), $(".social-signin .more").click(function() {
		$(".more .text").hide(), $(".more a").animate({
			width: "29px"
		}, 200)
	});
	var e = function(e) {
		"" !== $(e.target).val() ? $(e.target).siblings("label").hide() : $(e.target).siblings("label").show()
	}, t = function() {
			for (var e = $(".text-input-wrapper input"), t = e.length - 1; t >= 0; t--) "" != e.eq(t).val() ? e.eq(t).siblings("label").hide() : e.eq(t).siblings("label").show()
		}
});
var loginView = {
	password: "",
	email: "",
	isPasswordOK: !1,
	isEmailValid: !1,
	dom: $("#login-box"),
	find: function(e) {
		return this.dom.find(e)
	},
	init: function() {
		var e = this;
		this.find("#username").blur(function() {
			e.checkEmailFormat()
		}), this.find("#username").keyup(function() {
			e.checkingEmailFormat()
		}), this.find("#password").blur(function() {
			e.checkPassword1()
		}), this.find("#password").keyup(function() {
			e.checkingPassword1()
		}), this.find("#login-form").submit(function(t) {
			t && t.preventDefault(), e.checkEmailFormat(), e.checkPassword1(), e.postLogin()
		}), this.find("#forget-password").click(function() {
			e.resetPassword()
		})
	},
	checkEmailFormat: function() {
		this.email = this.find("#username").val(), this.find("#error_no_user_info").slideUp(), this.isEmailValid = !1;
		var e = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
			t = this.email.match(e);
		t ? (this.find("#email_invalid_warn").slideUp(), this.find("#username").removeClass("warn"), this.isEmailValid = !0) : this.email.length > 0 ? (this.find("#email_invalid_warn").slideDown(), this.find("#username").addClass("warn")) : (this.find("#email_invalid_warn").slideUp(), this.find("#username").removeClass("warn"))
	},
	checkingEmailFormat: function() {
		this.email = this.find("#username").val();
		var e = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
			t = this.email.match(e);
		return t && (this.find("#email_invalid_warn").slideUp(), this.find("#username").removeClass("warn")), t
	},
	checkPassword1: function() {
		this.password = this.find("#password").val(), this.isPasswordOK = !1;
		var e = this.password.length >= 6;
		e ? (this.find("#login_length_warn").slideUp(), this.find("#password").removeClass("warn"), this.isPasswordOK = !0) : this.password.length > 0 ? (this.find("#login_length_warn").slideDown(), this.find("#password").addClass("warn")) : (this.find("#login_length_warn").slideUp(), this.find("#password").removeClass("warn"))
	},
	checkingPassword1: function() {
		this.password = this.find("#password").val(), (this.password.length >= 6 || 0 == this.password.length) && (this.find("#login_length_warn").slideUp(), this.find("#password").removeClass("warn"))
	},
	postLogin: function() {
		if (this.isPasswordOK && this.isEmailValid) {
			$("#popup .error .warn").slideUp(), this.find("#signin-info").addClass("waiting");
			var e = protocol + domain + "/api/v2/user/signon?wc=true&remember=true",
				t = this;
			$.ajax({
				type: "POST",
				url: e,
				contentType: "application/json",
				data: JSON.stringify({
					username: this.email,
					password: this.password
				}),
				success: function() {
					window.location.reload()
				},
				error: function(e) {
					t.loginError(e)
				}
			})
		}
	},
	needSwitchDomain: function() {
		var e = this,
			t = " /api/v2/user/sign/available/brothersite?username=" + this.email;
		$.get(t, function(t) {
			t ? ($("#error_no_user_info").slideDown(), e.find("#username").addClass("warn")) : (DOMAIN.match(/dida/) ? $("#need_switch_domain_to_com").slideDown() : $("#need_switch_domain_to_cn").slideDown(), e.find("#username").addClass("warn")), e.find("#signin-info").removeClass("waiting")
		})
	},
	loginError: function(e) {
		var t = this,
			n = $.parseJSON(e.responseText);
		"username_not_exist" == n.errorCode ? this.needSwitchDomain() : "username_password_not_match" == n.errorCode ? ($("#error_username_password").slideDown(), this.find("#password").addClass("warn"), t.find("#signin-info").removeClass("waiting")) : "unknown_exception" == n.errorCode && $("#login_server_error").slideDown()
	},
	resetPassword: function() {
		var e = $("#username").val(),
			t = "/sign/requestRestPassword";
		e && (t += "?username=" + e), window.location.href = t
	}
}, signupView = {
		email: "",
		password1: "",
		password2: "",
		inviteCode: null,
		isEmailValid: !1,
		isPasswordOK: !1,
		isPasswordMatch: !1,
		canShowShareAccount: $("#share_user_account").length,
		dom: $("#signup-box"),
		init: function() {
			var e = this;
			this.loadInviteCode(), this.find(".warn").hide(), this.find("#set-username").blur(function() {
				e.checkEmail()
			}), this.find("#set-username").keyup(function() {
				e.checkingEmailFormat()
			}), this.find("#set-password").blur(function() {
				e.checkPassword1(), e.checkPasswordMatch()
			}), this.find("#set-password").keyup(function() {
				e.checkingPassword1(), e.checkingPasswordMatch()
			}), this.find("#confirm-password").blur(function() {
				e.checkPasswordMatch()
			}), this.find("#signup-form").submit(function(t) {
				t.preventDefault(), e.checkAll(), e.postSignup()
			}), this.find(".switch-login").click(function(t) {
				t.preventDefault(), e.switchToLogin()
			})
		},
		checkAll: function() {
			this.checkEmailFormat(), this.checkPassword1(), this.checkPasswordMatch()
		},
		postSignup: function() {
			if (this.isEmailValid && this.isPasswordOK && this.isPasswordMatch) {
				var e = protocol + domain + "/api/v2/user/signup/?invitecode=" + this.inveteCode,
					t = {
						username: this.email,
						password: this.password1
					};
				this.find("#signup-info").addClass("waiting");
				var n = this;
				$.ajax({
					url: e,
					type: "POST",
					data: JSON.stringify(t),
					contentType: "application/json",
					success: function() {
						n.signupSuccess()
					},
					error: function(e) {
						n.singupError(e), n.find("#signup-info").removeClass("waiting")
					}
				})
			}
		},
		signupSuccess: function() {
			window.location.reload()
		},
		singupError: function() {
			this.find("#server_error").slideDown(), this.find("#set-username").addClass("warn")
		},
		checkEmail: function() {
			if (this.email = this.find("#set-username").val(), this.isEmailValid = !1, this.checkEmailFormat()) {
				var e = this,
					t = "/api/v1/user/sign/available?username=" + this.email;
				$.get(t, function(t) {
					e.handleEmail(t)
				})
			}
		},
		handleEmail: function(e) {
			e.available ? (this.isEmailValid = !0, this.find(".email-warn .warn").slideUp(), this.find("#set-username").removeClass("warn")) : e.share_user_account && this.canShowShareAccount ? (this.find("#share_user_account").slideDown(), this.find("#taken_warn").slideUp(), this.find("#invalid_warn").slideUp(), this.find("#set-username").removeClass("warn"), $("#username").val(this.email)) : (this.canShowShareAccount && this.find("#share_user_account").slideUp(), this.find("#taken_warn").slideDown(), this.find("#set-username").addClass("warn"), this.email.length > 0 ? this.find("#invalid_warn").slideUp() : (this.find("#invalid_warn").slideDown(), this.find("#set-username").addClass("warn")))
		},
		find: function(e) {
			return this.dom.find(e)
		},
		checkEmailFormat: function() {
			var e = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
				t = this.email.match(e);
			return t ? (this.find("#invalid_warn").slideUp(), this.find("#set-username").removeClass("warn")) : this.email.length > 0 ? (this.find("#invalid_warn").slideDown(), this.find("#set-username").addClass("warn")) : (this.find("#invalid_warn").slideUp(), this.find("#set-username").removeClass("warn")), t
		},
		checkingEmailFormat: function() {
			this.find("#taken_warn").slideUp(), this.canShowShareAccount && this.find("#share_user_account").slideUp(), this.email = this.find("#set-username").val();
			var e = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
				t = this.email.match(e);
			return t && (this.find("#invalid_warn").slideUp(), this.find("#set-username").removeClass("warn")), t
		},
		checkPassword1: function() {
			this.password1 = this.find("#set-password").val(), this.isPasswordOK = !1;
			var e = this.password1.length >= 6,
				t = this.password1.length <= 20;
			return e && t ? (this.find("#length_warn1").slideUp(), this.find("#set-password").removeClass("warn"), this.isPasswordOK = !0) : this.password1.length > 0 ? (this.find("#length_warn1").slideDown(), this.find("#set-password").addClass("warn")) : (this.find("#length_warn1").slideUp(), this.find("#set-password").removeClass("warn")), e
		},
		checkingPassword1: function() {
			this.password1 = this.find("#set-password").val(), (this.password1.length >= 6 || 0 == this.password1.length) && this.find("#length_warn1").slideUp()
		},
		checkPasswordMatch: function() {
			this.isPasswordMatch = !1, this.password2 = this.find("#confirm-password").val();
			var e = this.password1 == this.password2;
			e ? (this.find("#pw_match_warn").slideUp(), this.find("#confirm-password").removeClass("warn"), this.isPasswordMatch = !0) : this.password2.length > 0 ? (this.find("#pw_match_warn").slideDown(), this.find("#confirm-password").addClass("warn")) : (this.find("#pw_match_warn").slideUp(), this.find("#confirm-password").removeClass("warn"))
		},
		checkingPasswordMatch: function() {
			this.password2 == this.password1 && (this.find("#pw_match_warn").slideUp(), this.find("#confirm-password").removeClass("warn"))
		},
		loadInviteCode: function() {
			var e = this;
			this.inveteCode || $.get("/api/v2/user/signup/inviteCode", function(t) {
				e.inveteCode = t
			})
		},
		switchToLogin: function() {
			var e = this.find("#set-username").val();
			$("#username").val(e), $("#signup-box").hide(), $("#login-box").show(), initInputView()
		}
	};
$(function() {
	loginView.init(), signupView.init()
}), $(function() {
	$("body").keydown(function(e) {
		27 == e.keyCode && $("#popup").removeClass("show-popup")
	})
}), ! function(e) {
	"use strict";
	var t = function(t, n) {
		var i = this;
		this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle(), e("body").on("touchmove click", ".btn-navbar", function(e) {
			e.stopPropagation()
		}), e("body").on("touchmove click", function() {
			i.hide()
		})
	};
	t.prototype = {
		constructor: t,
		dimension: function() {
			var e = this.$element.hasClass("width");
			return e ? "width" : "height"
		},
		show: function() {
			var t, n, i, r;
			if (!this.transitioning) {
				if (t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), i = this.$parent && this.$parent.find("> .accordion-group > .in"), i && i.length) {
					if (r = i.data("collapse"), r && r.transitioning) return;
					i.collapse("hide"), r || i.data("collapse", null)
				}
				this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), this.$element[t](this.$element[0][n])
			}
		},
		hide: function() {
			var t;
			this.transitioning || (t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0))
		},
		reset: function(e) {
			var t = this.dimension();
			return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[null !== e ? "addClass" : "removeClass"]("collapse"), this
		},
		transition: function(t, n, i) {
			var r = this,
				o = function() {
					"show" == n.type && r.reset(), r.transitioning = 0, r.$element.trigger(i)
				};
			this.$element.trigger(n), n.isDefaultPrevented() || (this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, o) : o())
		},
		toggle: function() {
			this[this.$element.hasClass("in") ? "hide" : "show"]()
		}
	}, e.fn.collapse = function(n) {
		return this.each(function() {
			var i = e(this),
				r = i.data("collapse"),
				o = "object" == typeof n && n;
			r || i.data("collapse", r = new t(this, o)), "string" == typeof n && r[n]()
		})
	}, e.fn.collapse.defaults = {
		toggle: !0
	}, e.fn.collapse.Constructor = t, e(function() {
		e("body").on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
			var n, i = e(this),
				r = i.attr("data-target") || t.preventDefault() || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
				o = e(r).data("collapse") ? "toggle" : i.data();
			e(r).collapse(o)
		})
	})
}(window.jQuery), $(function() {
	"use strict";
	! function() {
		var e = function() {};
		$("#nav-scroll").on("click", "li", function(t) {
			var n, i, r;
			n = $(t.target), i = $(n.attr("data-nav-scroll")), i.length && (e(n), r = i.position().top - $(".navbar").height(), $(window).width() < 980 ? $("body").scrollTo(r, 0) : $("body").scrollTo(r, 400))
		})
	}(),
	function() {
		navigator.userAgent.match(/Android/i) ? ($("#mobile-android").removeClass("icon-android-blue").addClass("icon-android-orange"), $("#mobile-iphone").removeClass("icon-iphone-orange").addClass("icon-iphone-blue")) : navigator.userAgent.match(/iPhone|iPad|iPod/i) && ($("#mobile-android").removeClass("icon-android-orange").addClass("icon-android-blue"), $("#mobile-iphone").removeClass("icon-iphone-blue").addClass("icon-iphone-orange"))
	}(),
	function() {
		$(".wechat i").hover(function() {
			var e = $(".wechat i").offset().top,
				t = $(".wechat i").offset().left,
				n = $(".wechat-show").outerHeight(),
				i = $(".wechat-show").outerWidth(),
				r = $(".wechat i").offset().top - $(".navbar").offset().top - n > 40;
			r ? $(".wechat-show").addClass("top").removeClass("bottom").css({
				top: e - n - 12,
				left: t - i / 2 + 25
			}).show(10) : $(".wechat-show").addClass("bottom").removeClass("top").css({
				top: e + $(".wechat i").outerHeight() + 12,
				left: t - i / 2 + 25
			}).show(10)
		}, function() {
			$(".wechat-show").hide(10)
		})
	}()
});