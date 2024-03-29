var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(['@media (', ': ', 'px) {\n      ', '\n    }'], ['@media (', ': ', 'px) {\n      ', '\n    }']),
    _templateObject2 = _taggedTemplateLiteral(['@media (min-width: ', 'px) and (max-width: ', 'px) {\n      ', '\n    }'], ['@media (min-width: ', 'px) and (max-width: ', 'px) {\n      ', '\n    }']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global process */
import { css } from 'styled-components';

// eslint-disable-line no-undef

function convertPxToEm(pixels) {
  // @media is always calculated off 16px regardless of whether the root font size is the default or not
  return pixels ;
}

function getValueFromName(breakpoints, name) {
  var value = breakpoints[name];
  if (process.env.NODE_ENV !== 'production' && typeof value === 'undefined') {
    console.error('A breakpoint named "' + name + '" does not exist.'); // eslint-disable-line no-console
    return 0;
  }
  return value;
}

function withSingleCriteria(breakpoints, name, operator) {
  var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var value = getValueFromName(breakpoints, name);

  // special case for 0 to avoid wrapping styles in an unnecessary @media block
  // FIXME: typings
  // if (operator === 'max-width' && value === 0) {
  //   return () => '';
  // }

  // special case for 0 to avoid wrapping styles in an unnecessary @media block
  if (operator === 'min-width' && value === 0) {
    return function (strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return css.apply(undefined, [strings].concat(_toConsumableArray(interpolations)));
    };
  }

  return function (strings) {
    for (var _len2 = arguments.length, interpolations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      interpolations[_key2 - 1] = arguments[_key2];
    }

    return css(_templateObject, operator, convertPxToEm(value + offset), css.apply(undefined, [strings].concat(_toConsumableArray(interpolations))));
  };
}

export function _gt(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'min-width', +1);
}

export function _gte(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'min-width');
}

export function _lt(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'max-width', -1);
}

export function _lte(breakpoints, name) {
  return withSingleCriteria(breakpoints, name, 'max-width');
}

export function _between(breakpoints, gte, lt) {
  var gteValue = getValueFromName(breakpoints, gte);
  var ltValue = getValueFromName(breakpoints, lt);
  return function (strings) {
    for (var _len3 = arguments.length, interpolations = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      interpolations[_key3 - 1] = arguments[_key3];
    }

    return css(_templateObject2, convertPxToEm(gteValue), convertPxToEm(ltValue - 1), css.apply(undefined, [strings].concat(_toConsumableArray(interpolations))));
  };
}

export function _breakpoint(breakpoints, gte, lt) {
  if (typeof lt === 'undefined') {
    return _gte(breakpoints, gte);
  } else {
    return _between(breakpoints, gte, lt);
  }
};

// TODO: allow the operator to be customised
export function _map(breakpoints, value, mapValueToCSS) {
  var values = value;

  if (values === null || (typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') {
    return mapValueToCSS(values);
  }

  return [
  // eslint-disable-next-line no-undefined
  mapValueToCSS(undefined)].concat(_toConsumableArray(Object.keys(values).map(function (name) {
    var tag = _gte(breakpoints, name);
    var val = values[name];
    var styles = tag([], [].concat(mapValueToCSS(val)));
    return styles;
  })));
};
