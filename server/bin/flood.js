"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _flooders, _floods, _times, _resetTime, _waitTime, _fail, _getKey;
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
        _flooders.set(this, void 0);
        _floods.set(this, void 0);
        _times.set(this, void 0);
        _resetTime.set(this, void 0);
        _waitTime.set(this, void 0);
        _fail.set(this, void 0);
        _getKey.set(this, void 0);
        options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        __classPrivateFieldSet(this, _floods, new Map());
        __classPrivateFieldSet(this, _flooders, new Map());
        __classPrivateFieldSet(this, _times, options.times);
        __classPrivateFieldSet(this, _resetTime, options.resetTime);
        __classPrivateFieldSet(this, _waitTime, options.waitTime);
        __classPrivateFieldSet(this, _fail, options.ifFail);
        __classPrivateFieldSet(this, _getKey, options.getKey);
    }
    check(key) {
        if (__classPrivateFieldGet(this, _flooders).has(key) &&
            !this..call(this, __classPrivateFieldGet(this, _flooders).get(key)))
            return false;
        if (!__classPrivateFieldGet(this, _floods).has(key))
            __classPrivateFieldGet(this, _floods).set(key, []);
        __classPrivateFieldGet(this, _floods).get(key).push(this..call(this));
        const triesArray = this..call(this, __classPrivateFieldGet(this, _floods).get(key));
        __classPrivateFieldGet(this, _floods).set(key, triesArray);
        const _c = triesArray.length < __classPrivateFieldGet(this, _times);
        if (!_c)
            __classPrivateFieldGet(this, _flooders).set(key, this..call(this));
        return _c;
    }
    middleware() {
        return (req, res, next) => {
            const _ = this.check(__classPrivateFieldGet(this, _getKey).call(this, req));
            if (!_)
                return __classPrivateFieldGet(this, _fail).call(this, req, res, next);
            next();
        };
    }
    (zxc) {
        return zxc <= this..call(this);
    }
    () {
        return this..call(this) + __classPrivateFieldGet(this, _waitTime);
    }
    (arr) {
        return arr.filter((d) => d + __classPrivateFieldGet(this, _resetTime) > this..call(this));
    }
    () {
        return Math.floor(new Date().getTime() / 1000);
    }
}
_flooders = new WeakMap(), _floods = new WeakMap(), _times = new WeakMap(), _resetTime = new WeakMap(), _waitTime = new WeakMap(), _fail = new WeakMap(), _getKey = new WeakMap();
exports.default = Flood;
