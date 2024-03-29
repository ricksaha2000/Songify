/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-animation-appearance-audio-audioloop-backgroundblendmode-backgroundcliptext-borderradius-boxsizing-canvas-checked-contenteditable-contextmenu-cookies-cssanimations-csscolumns-cssgradients-csspositionsticky-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-emoji-filereader-flash-flexbox-flexboxlegacy-fontface-fullscreen-geolocation-hashchange-history-ie8compat-inlinesvg-inputtypes-json-lastchild-mediaqueries-multiplebgs-nthchild-objectfit-opacity-search-smil-svg-svgasimg-svgclippaths-textshadow-touchevents-unicode-video-videoautoplay-webgl-xdomainrequest-setclasses !*/
! function(e, t, A) {
    function n(e, t) {
        return typeof e === t
    }

    function o() {
        var e, t, A, o, i, a, r;
        for (var s in T)
            if (T.hasOwnProperty(s)) {
                if (e = [], t = T[s], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                    for (A = 0; A < t.options.aliases.length; A++) e.push(t.options.aliases[A].toLowerCase());
                for (o = n(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) a = e[i], r = a.split("."), 1 === r.length ? Modernizr[r[0]] = o : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = o), w.push((o ? "" : "no-") + r.join("-"))
            }
    }

    function i(e) {
        var t = b.className,
            A = Modernizr._config.classPrefix || "";
        if (R && (t = t.baseVal), Modernizr._config.enableJSClass) {
            var n = new RegExp("(^|\\s)" + A + "no-js(\\s|$)");
            t = t.replace(n, "$1" + A + "js$2")
        }
        Modernizr._config.enableClasses && (t += " " + A + e.join(" " + A), R ? b.className.baseVal = t : b.className = t)
    }

    function a() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : R ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }

    function r() {
        var e = t.body;
        return e || (e = a(R ? "svg" : "body"), e.fake = !0), e
    }

    function s(e, t) {
        return e - 1 === t || e === t || e + 1 === t
    }

    function d(e, t) {
        if ("object" == typeof e)
            for (var A in e) P(e, A) && d(A, e[A]);
        else {
            e = e.toLowerCase();
            var n = e.split("."),
                o = Modernizr[n[0]];
            if (2 == n.length && (o = o[n[1]]), "undefined" != typeof o) return Modernizr;
            t = "function" == typeof t ? t() : t, 1 == n.length ? Modernizr[n[0]] = t : (!Modernizr[n[0]] || Modernizr[n[0]] instanceof Boolean || (Modernizr[n[0]] = new Boolean(Modernizr[n[0]])), Modernizr[n[0]][n[1]] = t), i([(t && 0 != t ? "" : "no-") + n.join("-")]), Modernizr._trigger(e, t)
        }
        return Modernizr
    }

    function l(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, A) {
            return t + A.toUpperCase()
        }).replace(/^-/, "")
    }

    function c(e, A, n, o) {
        var i, s, d, l, c = "modernizr",
            u = a("div"),
            p = r();
        if (parseInt(n, 10))
            for (; n--;) d = a("div"), d.id = o ? o[n] : c + (n + 1), u.appendChild(d);
        return i = a("style"), i.type = "text/css", i.id = "s" + c, (p.fake ? p : u).appendChild(i), p.appendChild(u), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), u.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", l = b.style.overflow, b.style.overflow = "hidden", b.appendChild(p)), s = A(u, e), p.fake ? (p.parentNode.removeChild(p), b.style.overflow = l, b.offsetHeight) : u.parentNode.removeChild(u), !!s
    }

    function u(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function p(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }

    function f(e, t, A) {
        var o;
        for (var i in e)
            if (e[i] in t) return A === !1 ? e[i] : (o = t[e[i]], n(o, "function") ? p(o, A || t) : o);
        return !1
    }

    function h(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function m(t, n) {
        var o = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; o--;)
                if (e.CSS.supports(h(t[o]), n)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var i = []; o--;) i.push("(" + h(t[o]) + ":" + n + ")");
            return i = i.join(" or "), c("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == getComputedStyle(e, null).position
            })
        }
        return A
    }

    function g(e, t, o, i) {
        function r() {
            d && (delete H.style, delete H.modElem)
        }
        if (i = n(i, "undefined") ? !1 : i, !n(o, "undefined")) {
            var s = m(e, o);
            if (!n(s, "undefined")) return s
        }
        for (var d, c, p, f, h, g = ["modernizr", "tspan"]; !H.style;) d = !0, H.modElem = a(g.shift()), H.style = H.modElem.style;
        for (p = e.length, c = 0; p > c; c++)
            if (f = e[c], h = H.style[f], u(f, "-") && (f = l(f)), H.style[f] !== A) {
                if (i || n(o, "undefined")) return r(), "pfx" == t ? f : !0;
                try {
                    H.style[f] = o
                } catch (v) {}
                if (H.style[f] != h) return r(), "pfx" == t ? f : !0
            }
        return r(), !1
    }

    function v(e, t, A, o, i) {
        var a = e.charAt(0).toUpperCase() + e.slice(1),
            r = (e + " " + V.join(a + " ") + a).split(" ");
        return n(t, "string") || n(t, "undefined") ? g(r, t, o, i) : (r = (e + " " + U.join(a + " ") + a).split(" "), f(r, t, A))
    }

    function y(e, t, n) {
        return v(e, A, A, t, n)
    }
    var w = [],
        T = [],
        x = {
            _version: "3.3.1",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var A = this;
                setTimeout(function() {
                    t(A[e])
                }, 0)
            },
            addTest: function(e, t, A) {
                T.push({
                    name: e,
                    fn: t,
                    options: A
                })
            },
            addAsyncTest: function(e) {
                T.push({
                    name: null,
                    fn: e
                })
            }
        },
        Modernizr = function() {};
    Modernizr.prototype = x, Modernizr = new Modernizr, Modernizr.addTest("cookies", function() {
        try {
            t.cookie = "cookietest=1";
            var e = -1 != t.cookie.indexOf("cookietest=");
            return t.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", e
        } catch (A) {
            return !1
        }
    }), Modernizr.addTest("geolocation", "geolocation" in navigator), Modernizr.addTest("history", function() {
        var t = navigator.userAgent;
        return -1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") ? e.history && "pushState" in e.history : !1
    }), Modernizr.addTest("ie8compat", !e.addEventListener && !!t.documentMode && 7 === t.documentMode), Modernizr.addTest("json", "JSON" in e && "parse" in JSON && "stringify" in JSON), Modernizr.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), Modernizr.addTest("xdomainrequest", "XDomainRequest" in e), Modernizr.addTest("filereader", !!(e.File && e.FileList && e.FileReader));
    var b = t.documentElement;
    Modernizr.addTest("contextmenu", "contextMenu" in b && "HTMLMenuItemElement" in e);
    var R = "svg" === b.nodeName.toLowerCase();
    Modernizr.addTest("audio", function() {
        var e = a("audio"),
            t = !1;
        try {
            (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (A) {}
        return t
    }), Modernizr.addTest("canvas", function() {
        var e = a("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    }), Modernizr.addTest("contenteditable", function() {
        if ("contentEditable" in b) {
            var e = a("div");
            return e.contentEditable = !0, "true" === e.contentEditable
        }
    }), Modernizr.addTest("video", function() {
        var e = a("video"),
            t = !1;
        try {
            (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
        } catch (A) {}
        return t
    }), Modernizr.addTest("webanimations", "animate" in a("div")), Modernizr.addTest("webgl", function() {
        var t = a("canvas"),
            A = "probablySupportsContext" in t ? "probablySupportsContext" : "supportsContext";
        return A in t ? t[A]("webgl") || t[A]("experimental-webgl") : "WebGLRenderingContext" in e
    }), Modernizr.addTest("audioloop", "loop" in a("audio")), Modernizr.addTest("multiplebgs", function() {
        var e = a("a").style;
        return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
    }), Modernizr.addTest("inlinesvg", function() {
        var e = a("div");
        return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI)
    }), Modernizr.addTest("canvastext", function() {
        return Modernizr.canvas === !1 ? !1 : "function" == typeof a("canvas").getContext("2d").fillText
    }), Modernizr.addTest("emoji", function() {
        if (!Modernizr.canvastext) return !1;
        var t = e.devicePixelRatio || 1,
            A = 12 * t,
            n = a("canvas"),
            o = n.getContext("2d");
        return o.fillStyle = "#f00", o.textBaseline = "top", o.font = "32px Arial", o.fillText("🐨", 0, 0), 0 !== o.getImageData(A, A, 1, 1).data[0]
    });
    var C = function() {
        function e(e, t) {
            var o;
            return e ? (t && "string" != typeof t || (t = a(t || "div")), e = "on" + e, o = e in t, !o && n && (t.setAttribute || (t = a("div")), t.setAttribute(e, ""), o = "function" == typeof t[e], t[e] !== A && (t[e] = A), t.removeAttribute(e)), o) : !1
        }
        var n = !("onblur" in t.documentElement);
        return e
    }();
    x.hasEvent = C, Modernizr.addTest("hashchange", function() {
        return C("hashchange", e) === !1 ? !1 : t.documentMode === A || t.documentMode > 7
    }), Modernizr.addTest("inputsearchevent", C("search"));
    var E = a("input"),
        S = "search tel url email datetime date month week time datetime-local number range color".split(" "),
        B = {};
    Modernizr.inputtypes = function(e) {
        for (var n, o, i, a = e.length, r = "1)", s = 0; a > s; s++) E.setAttribute("type", n = e[s]), i = "text" !== E.type && "style" in E, i && (E.value = r, E.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(n) && E.style.WebkitAppearance !== A ? (b.appendChild(E), o = t.defaultView, i = o.getComputedStyle && "textfield" !== o.getComputedStyle(E, null).WebkitAppearance && 0 !== E.offsetHeight, b.removeChild(E)) : /^(search|tel)$/.test(n) || (i = /^(url|email)$/.test(n) ? E.checkValidity && E.checkValidity() === !1 : E.value != r)), B[e[s]] = !!i;
        return B
    }(S);
    var k = x._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    x._prefixes = k, Modernizr.addTest("cssgradients", function() {
        for (var e, t = "background-image:", A = "gradient(linear,left top,right bottom,from(#9f9),to(white));", n = "", o = 0, i = k.length - 1; i > o; o++) e = 0 === o ? "to " : "", n += t + k[o] + "linear-gradient(" + e + "left top, #9f9, white);";
        Modernizr._config.usePrefixes && (n += t + "-webkit-" + A);
        var r = a("a"),
            s = r.style;
        return s.cssText = n, ("" + s.backgroundImage).indexOf("gradient") > -1
    }), Modernizr.addTest("opacity", function() {
        var e = a("a").style;
        return e.cssText = k.join("opacity:.55;"), /^0.55$/.test(e.opacity)
    }), Modernizr.addTest("csspositionsticky", function() {
        var e = "position:",
            t = "sticky",
            A = a("a"),
            n = A.style;
        return n.cssText = e + k.join(t + ";" + e).slice(0, -e.length), -1 !== n.position.indexOf(t)
    });
    var F = "CSS" in e && "supports" in e.CSS,
        G = "supportsCSS" in e;
    Modernizr.addTest("supports", F || G);
    var M = {}.toString;
    Modernizr.addTest("svgclippaths", function() {
        return !!t.createElementNS && /SVGClipPath/.test(M.call(t.createElementNS("http://www.w3.org/2000/svg", "clipPath")))
    });
    var P;
    ! function() {
        var e = {}.hasOwnProperty;
        P = n(e, "undefined") || n(e.call, "undefined") ? function(e, t) {
            return t in e && n(e.constructor.prototype[t], "undefined")
        } : function(t, A) {
            return e.call(t, A)
        }
    }(), x._l = {}, x.on = function(e, t) {
        this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function() {
            Modernizr._trigger(e, Modernizr[e])
        }, 0)
    }, x._trigger = function(e, t) {
        if (this._l[e]) {
            var A = this._l[e];
            setTimeout(function() {
                var e, n;
                for (e = 0; e < A.length; e++)(n = A[e])(t)
            }, 0), delete this._l[e]
        }
    }, Modernizr._q.push(function() {
        x.addTest = d
    }), Modernizr.addAsyncTest(function() {
        var A, n, o = function(e) {
                b.contains(e) || b.appendChild(e)
            },
            i = function(e) {
                e.fake && e.parentNode && e.parentNode.removeChild(e)
            },
            s = function(e, t) {
                var A = !!e;
                if (A && (A = new Boolean(A), A.blocked = "blocked" === e), d("flash", function() {
                        return A
                    }), t && f.contains(t)) {
                    for (; t.parentNode !== f;) t = t.parentNode;
                    f.removeChild(t)
                }
            };
        try {
            n = "ActiveXObject" in e && "Pan" in new e.ActiveXObject("ShockwaveFlash.ShockwaveFlash")
        } catch (l) {}
        if (A = !("plugins" in navigator && "Shockwave Flash" in navigator.plugins || n), A || R) s(!1);
        else {
            var c, u, p = a("embed"),
                f = r();
            if (p.type = "application/x-shockwave-flash", f.appendChild(p), !("Pan" in p || n)) return o(f), s("blocked", p), void i(f);
            c = function() {
                return o(f), b.contains(f) ? (b.contains(p) ? (u = p.style.cssText, "" !== u ? s("blocked", p) : s(!0, p)) : s("blocked"), void i(f)) : (f = t.body || f, p = a("embed"), p.type = "application/x-shockwave-flash", f.appendChild(p), setTimeout(c, 1e3))
            }, setTimeout(c, 10)
        }
    }), Modernizr.addTest("svgasimg", t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")), Modernizr.addAsyncTest(function() {
        function e(A) {
            clearTimeout(t), n.removeEventListener("playing", e, !1), d("videoautoplay", A && "playing" === A.type || 0 !== n.currentTime), n.parentNode.removeChild(n)
        }
        var t, A = 300,
            n = a("video"),
            o = n.style;
        if (!(Modernizr.video && "autoplay" in n)) return void d("videoautoplay", !1);
        o.position = "absolute", o.height = 0, o.width = 0;
        try {
            if (Modernizr.video.ogg) n.src = "data:video/ogg;base64,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";
            else {
                if (!Modernizr.video.h264) return void d("videoautoplay", !1);
                n.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="
            }
        } catch (i) {
            return void d("videoautoplay", !1)
        }
        n.setAttribute("autoplay", ""), n.style.cssText = "display:none", b.appendChild(n), setTimeout(function() {
            n.addEventListener("playing", e, !1), t = setTimeout(e, A)
        }, 0)
    });
    var Q = x.testStyles = c;
    Modernizr.addTest("touchevents", function() {
        var A;
        if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) A = !0;
        else {
            var n = ["@media (", k.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            Q(n, function(e) {
                A = 9 === e.offsetTop
            })
        }
        return A
    }), Modernizr.addTest("unicode", function() {
        var e, t = a("span"),
            A = a("span");
        return Q("#modernizr{font-family:Arial,sans;font-size:300em;}", function(n) {
            t.innerHTML = R ? "妇" : "&#5987;", A.innerHTML = R ? "☆" : "&#9734;", n.appendChild(t), n.appendChild(A), e = "offsetWidth" in t && t.offsetWidth !== A.offsetWidth
        }), e
    }), Modernizr.addTest("checked", function() {
        return Q("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(e) {
            var t = a("input");
            return t.setAttribute("type", "checkbox"), t.setAttribute("checked", "checked"), e.appendChild(t), 20 === t.offsetLeft
        })
    });
    var I = function() {
        var e = navigator.userAgent,
            t = e.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1),
            A = e.match(/w(eb)?osbrowser/gi),
            n = e.match(/windows phone/gi) && e.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9,
            o = 533 > t && e.match(/android/gi);
        return A || o || n
    }();
    I ? Modernizr.addTest("fontface", !1) : Q('@font-face {font-family:"font";src:url("https://")}', function(e, A) {
        var n = t.getElementById("smodernizr"),
            o = n.sheet || n.styleSheet,
            i = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "",
            a = /src/i.test(i) && 0 === i.indexOf(A.split(" ")[0]);
        Modernizr.addTest("fontface", a)
    }), Q("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(e) {
        Modernizr.addTest("lastchild", e.lastChild.offsetWidth > e.firstChild.offsetWidth)
    }, 2), Q("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(e) {
        for (var t = e.getElementsByTagName("div"), A = !0, n = 0; 5 > n; n++) A = A && t[n].offsetWidth === n % 2 + 1;
        Modernizr.addTest("nthchild", A)
    }, 5), Q("#modernizr { height: 50vh; }", function(t) {
        var A = parseInt(e.innerHeight / 2, 10),
            n = parseInt((e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).height, 10);
        Modernizr.addTest("cssvhunit", n == A)
    }), Q("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}", function(t) {
        var A = t.childNodes[2],
            n = t.childNodes[1],
            o = t.childNodes[0],
            i = parseInt((n.offsetWidth - n.clientWidth) / 2, 10),
            a = o.clientWidth / 100,
            r = o.clientHeight / 100,
            d = parseInt(50 * Math.max(a, r), 10),
            l = parseInt((e.getComputedStyle ? getComputedStyle(A, null) : A.currentStyle).width, 10);
        Modernizr.addTest("cssvmaxunit", s(d, l) || s(d, l - i))
    }, 3), Q("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}", function(t) {
        var A = t.childNodes[2],
            n = t.childNodes[1],
            o = t.childNodes[0],
            i = parseInt((n.offsetWidth - n.clientWidth) / 2, 10),
            a = o.clientWidth / 100,
            r = o.clientHeight / 100,
            d = parseInt(50 * Math.min(a, r), 10),
            l = parseInt((e.getComputedStyle ? getComputedStyle(A, null) : A.currentStyle).width, 10);
        Modernizr.addTest("cssvminunit", s(d, l) || s(d, l - i))
    }, 3), Q("#modernizr { width: 50vw; }", function(t) {
        var A = parseInt(e.innerWidth / 2, 10),
            n = parseInt((e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).width, 10);
        Modernizr.addTest("cssvwunit", n == A)
    });
    var N = function() {
        var t = e.matchMedia || e.msMatchMedia;
        return t ? function(e) {
            var A = t(e);
            return A && A.matches || !1
        } : function(t) {
            var A = !1;
            return c("@media " + t + " { #modernizr { position: absolute; } }", function(t) {
                A = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
            }), A
        }
    }();
    x.mq = N, Modernizr.addTest("mediaqueries", N("only all"));
    var Z = "Moz O ms Webkit",
        V = x._config.usePrefixes ? Z.split(" ") : [];
    x._cssomPrefixes = V;
    var Y = function(t) {
        var n, o = k.length,
            i = e.CSSRule;
        if ("undefined" == typeof i) return A;
        if (!t) return !1;
        if (t = t.replace(/^@/, ""), n = t.replace(/-/g, "_").toUpperCase() + "_RULE", n in i) return "@" + t;
        for (var a = 0; o > a; a++) {
            var r = k[a],
                s = r.toUpperCase() + "_" + n;
            if (s in i) return "@-" + r.toLowerCase() + "-" + t
        }
        return !1
    };
    x.atRule = Y;
    var U = x._config.usePrefixes ? Z.toLowerCase().split(" ") : [];
    x._domPrefixes = U, Modernizr.addTest("smil", function() {
        return !!t.createElementNS && /SVGAnimate/.test(M.call(t.createElementNS("http://www.w3.org/2000/svg", "animate")))
    });
    var W = {
        elem: a("modernizr")
    };
    Modernizr._q.push(function() {
        delete W.elem
    });
    var H = {
        style: W.elem.style
    };
    Modernizr._q.unshift(function() {
        delete H.style
    });
    var j = x.testProp = function(e, t, n) {
        return g([e], A, t, n)
    };
    Modernizr.addTest("textshadow", j("textShadow", "1px 1px")), x.testAllProps = v;
    var z = x.prefixed = function(e, t, A) {
        return 0 === e.indexOf("@") ? Y(e) : (-1 != e.indexOf("-") && (e = l(e)), t ? v(e, t, A) : v(e, "pfx"))
    };
    Modernizr.addTest("fullscreen", !(!z("exitFullscreen", t, !1) && !z("cancelFullScreen", t, !1))), Modernizr.addTest("backgroundblendmode", z("backgroundBlendMode", "text")), Modernizr.addTest("objectfit", !!z("objectFit"), {
            aliases: ["object-fit"]
        }), x.testAllProps = y, Modernizr.addTest("cssanimations", y("animationName", "a", !0)), Modernizr.addTest("appearance", y("appearance")), Modernizr.addTest("backgroundcliptext", function() {
            return y("backgroundClip", "text")
        }), Modernizr.addTest("borderradius", y("borderRadius", "0px", !0)), Modernizr.addTest("boxsizing", y("boxSizing", "border-box", !0) && (t.documentMode === A || t.documentMode > 7)),
        function() {
            Modernizr.addTest("csscolumns", function() {
                var e = !1,
                    t = y("columnCount");
                try {
                    (e = !!t) && (e = new Boolean(e))
                } catch (A) {}
                return e
            });
            for (var e, t, A = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], n = 0; n < A.length; n++) e = A[n].toLowerCase(), t = y("column" + A[n]), ("breakbefore" === e || "breakafter" === e || "breakinside" == e) && (t = t || y(A[n])), Modernizr.addTest("csscolumns." + e, t)
        }(), Modernizr.addTest("flexbox", y("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", y("boxDirection", "reverse", !0)), Modernizr.addTest("csstransforms", function() {
            return -1 === navigator.userAgent.indexOf("Android 2.") && y("transform", "scale(1)", !0)
        }), Modernizr.addTest("csstransforms3d", function() {
            var e = !!y("perspective", "1px", !0),
                t = Modernizr._config.usePrefixes;
            if (e && (!t || "webkitPerspective" in b.style)) {
                var A, n = "#modernizr{width:0;height:0}";
                Modernizr.supports ? A = "@supports (perspective: 1px)" : (A = "@media (transform-3d)", t && (A += ",(-webkit-transform-3d)")), A += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", Q(n + A, function(t) {
                    e = 7 === t.offsetWidth && 18 === t.offsetHeight
                })
            }
            return e
        }), Modernizr.addTest("csstransitions", y("transition", "all", !0)), o(), i(w), delete x.addTest, delete x.addAsyncTest;
    for (var D = 0; D < Modernizr._q.length; D++) Modernizr._q[D]();
    e.Modernizr = Modernizr
}(window, document);