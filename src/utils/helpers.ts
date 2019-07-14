function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function _objectAssign(target) {
  if(target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  let output = Object(target);
  let idx = 1;
  let length = arguments.length;
  while(idx < length) {
    var source = arguments[idx];
    if(source != null) {
      for(var nextKey in source) {
        if(_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}

const _isArray = Array.isArray || function _isArray(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

const _isArrayLike = _curry1(function _isArrayLike(x) {
  if(_isArray(x)) { return true; }
  if (!x) { return false; }
  if(typeof x !== 'object') { return false; }
  if(_isString(x)) { return false; }
  if(x.nodeType === 1) { return !!x.length; }
  if(x.length === 0) { return true; }
  if(x.length > 0) { return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1); }
  return false;
});

function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while(idx < ilen) {
      if(_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while(j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}

const _objectAssign$1 = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

function _isPlaceholder(a) {
  return a != null &&
    typeof a === 'object' &&
    a['@@functional/placeholder'] === true;
}

function _curry1(fn) {
  return function f1(a) {
    if(arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

export const contains = function contains(a, list) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === a) {
      return true;
    }
    idx += 1;
  }
  return false;
}

export const mergeAll = _curry1(function mergeAll(list) {
  return _objectAssign$1.apply(null, [{}].concat(list));
});

export const flatten = _curry1(_makeFlat(true));

export const isNil = _curry1(function isNil(x) { return x == null; });