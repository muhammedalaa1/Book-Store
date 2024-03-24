"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Flood_instances, _Flood_flooders, _Flood_floods, _Flood_times, _Flood_resetTime, _Flood_waitTime, _Flood_fail, _Flood_getKey, _Flood_isWaitExpired, _Flood_getWaitNow, _Flood_removedExpired, _Flood_getNow;
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_OPTIONS = {
    times: 3,
    resetTime: 30,
    waitTime: 60 * 25,
    ifFail: (req, res, next) => res.sendStatus(429),
    getKey: (req) => req.ip,
};
class Flood {
    constructor(options = DEFAULT_OPTIONS) {
        _Flood_instances.add(this);
        _Flood_flooders.set(this, void 0);
        _Flood_floods.set(this, void 0);
        _Flood_times.set(this, void 0);
        _Flood_resetTime.set(this, void 0);
        _Flood_waitTime.set(this, void 0);
        _Flood_fail.set(this, void 0);
        _Flood_getKey.set(this, void 0);
        options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        __classPrivateFieldSet(this, _Flood_floods, new Map(), "f");
        __classPrivateFieldSet(this, _Flood_flooders, new Map(), "f");
        __classPrivateFieldSet(this, _Flood_times, options.times, "f");
        __classPrivateFieldSet(this, _Flood_resetTime, options.resetTime, "f");
        __classPrivateFieldSet(this, _Flood_waitTime, options.waitTime, "f");
        __classPrivateFieldSet(this, _Flood_fail, options.ifFail, "f");
        __classPrivateFieldSet(this, _Flood_getKey, options.getKey, "f");
    }
    check(key) {
        if (__classPrivateFieldGet(this, _Flood_flooders, "f").has(key) &&
            !__classPrivateFieldGet(this, _Flood_instances, "m", _Flood_isWaitExpired).call(this, __classPrivateFieldGet(this, _Flood_flooders, "f").get(key)))
            return false;
        if (!__classPrivateFieldGet(this, _Flood_floods, "f").has(key))
            __classPrivateFieldGet(this, _Flood_floods, "f").set(key, []);
        __classPrivateFieldGet(this, _Flood_floods, "f").get(key).push(__classPrivateFieldGet(this, _Flood_instances, "m", _Flood_getNow).call(this));
        const triesArray = __classPrivateFieldGet(this, _Flood_instances, "m", _Flood_removedExpired).call(this, __classPrivateFieldGet(this, _Flood_floods, "f").get(key));
        __classPrivateFieldGet(this, _Flood_floods, "f").set(key, triesArray);
        const _c = triesArray.length < __classPrivateFieldGet(this, _Flood_times, "f");
        if (!_c)
            __classPrivateFieldGet(this, _Flood_flooders, "f").set(key, __classPrivateFieldGet(this, _Flood_instances, "m", _Flood_getWaitNow).call(this));
        return _c;
    }
    middleware() {
        return (req, res, next) => {
            const _ = this.check(__classPrivateFieldGet(this, _Flood_getKey, "f").call(this, req));
            if (!_)
                return __classPrivateFieldGet(this, _Flood_fail, "f").call(this, req, res, next);
            next();
        };
    }
}
_Flood_flooders = new WeakMap(), _Flood_floods = new WeakMap(), _Flood_times = new WeakMap(), _Flood_resetTime = new WeakMap(), _Flood_waitTime = new WeakMap(), _Flood_fail = new WeakMap(), _Flood_getKey = new WeakMap(), _Flood_instances = new WeakSet(), _Flood_isWaitExpired = function _Flood_isWaitExpired(zxc) {
    return zxc <= __classPrivateFieldGet(this, _Flood_instances, "m", _Flood_getNow).call(this);
}, _Flood_getWaitNow = function _Flood_getWaitNow() {
    return __classPrivateFieldGet(this, _Flood_instances, "m", _Flood_getNow).call(this) + __classPrivateFieldGet(this, _Flood_waitTime, "f");
}, _Flood_removedExpired = function _Flood_removedExpired(arr) {
    return arr.filter((d) => d + __classPrivateFieldGet(this, _Flood_resetTime, "f") > __classPrivateFieldGet(this, _Flood_instances, "m", _Flood_getNow).call(this));
}, _Flood_getNow = function _Flood_getNow() {
    return Math.floor(new Date().getTime() / 1000);
};
exports.default = Flood;
