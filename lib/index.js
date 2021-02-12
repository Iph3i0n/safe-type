"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsString = IsString;
exports.IsNumber = IsNumber;
exports.IsBigInt = IsBigInt;
exports.IsSymbol = IsSymbol;
exports.IsBoolean = IsBoolean;
exports.IsFunction = IsFunction;
exports.IsDate = IsDate;
exports.IsLiteral = IsLiteral;
exports.IsArray = IsArray;
exports.IsTuple = IsTuple;
exports.IsUnion = IsUnion;
exports.IsIntersection = IsIntersection;
exports.IsObject = IsObject;
exports.IsDictionary = IsDictionary;
exports.Optional = Optional;
exports.DoNotCare = DoNotCare;
exports.Assert = Assert;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function IsString(arg) {
  return typeof arg === "string";
}

function IsNumber(arg) {
  return typeof arg === "number";
}

function IsBigInt(arg) {
  return typeof arg === "bigint";
}

function IsSymbol(arg) {
  return _typeof(arg) === "symbol";
}

function IsBoolean(arg) {
  return typeof arg === "boolean";
}

function IsFunction(arg) {
  return typeof arg === "function";
}

function IsDate(arg) {
  return arg instanceof Date;
}

function IsLiteral(value) {
  return function (arg) {
    return arg === value;
  };
}

function IsArray(checker) {
  return function (arg) {
    if (!Array.isArray(arg)) {
      return false;
    }

    return !arg.find(function (a, i) {
      var result = checker(a, true);

      if (!result) {
        return true;
      }

      return false;
    });
  };
}

function IsTuple() {
  for (var _len = arguments.length, checkers = new Array(_len), _key = 0; _key < _len; _key++) {
    checkers[_key] = arguments[_key];
  }

  return function (arg) {
    return checkers.find(function (v, i) {
      return !v(arg[i]);
    }) == null;
  };
}

function IsUnion() {
  for (var _len2 = arguments.length, checkers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    checkers[_key2] = arguments[_key2];
  }

  return function (arg) {
    return checkers.filter(function (c) {
      return c(arg, true);
    }).length > 0;
  };
}

function IsIntersection() {
  for (var _len3 = arguments.length, checkers = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    checkers[_key3] = arguments[_key3];
  }

  return function (arg) {
    return checkers.filter(function (c) {
      return c(arg, false);
    }).length === checkers.length;
  };
}

function IsObject(checker) {
  return function (arg) {
    var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    for (var _key4 in checker) {
      if (!checker.hasOwnProperty(_key4)) {
        continue;
      }

      if (!checker[_key4](arg[_key4], true)) {
        return false;
      }
    }

    if (strict) {
      for (var _key5 in arg) {
        if (!arg.hasOwnProperty(_key5)) {
          continue;
        }

        if (!checker[_key5]) {
          return false;
        }
      }
    }

    return true;
  };
}

function IsDictionary(c) {
  return function (arg) {
    var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var anyMatch = false;

    for (var _key6 in arg) {
      if (!arg.hasOwnProperty(_key6)) {
        continue;
      }

      if (!IsString(_key6)) {
        return false;
      }

      if (!arg[_key6] || !c(arg[_key6], true)) {
        if (strict) {
          return false;
        }

        continue;
      }

      anyMatch = true;
    }

    return anyMatch;
  };
}

function Optional(c) {
  return function (arg) {
    return typeof arg === "undefined" || arg === null || c(arg, true);
  };
}

function DoNotCare(arg) {
  return true;
}

function Assert(checker, subject, message) {
  if (!checker(subject)) {
    throw new Error(message ? message : "Invalid type of " + JSON.stringify(subject));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJc1N0cmluZyIsImFyZyIsIklzTnVtYmVyIiwiSXNCaWdJbnQiLCJJc1N5bWJvbCIsIklzQm9vbGVhbiIsIklzRnVuY3Rpb24iLCJJc0RhdGUiLCJEYXRlIiwiSXNMaXRlcmFsIiwidmFsdWUiLCJJc0FycmF5IiwiY2hlY2tlciIsIkFycmF5IiwiaXNBcnJheSIsImZpbmQiLCJhIiwiaSIsInJlc3VsdCIsIklzVHVwbGUiLCJjaGVja2VycyIsInYiLCJJc1VuaW9uIiwiZmlsdGVyIiwiYyIsImxlbmd0aCIsIklzSW50ZXJzZWN0aW9uIiwiSXNPYmplY3QiLCJzdHJpY3QiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIklzRGljdGlvbmFyeSIsImFueU1hdGNoIiwiT3B0aW9uYWwiLCJEb05vdENhcmUiLCJBc3NlcnQiLCJzdWJqZWN0IiwibWVzc2FnZSIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNPLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQTJDO0FBQ2hELFNBQU8sT0FBT0EsR0FBUCxLQUFlLFFBQXRCO0FBQ0Q7O0FBRU0sU0FBU0MsUUFBVCxDQUFrQkQsR0FBbEIsRUFBMkM7QUFDaEQsU0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEI7QUFDRDs7QUFFTSxTQUFTRSxRQUFULENBQWtCRixHQUFsQixFQUEyQztBQUNoRCxTQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0QjtBQUNEOztBQUVNLFNBQVNHLFFBQVQsQ0FBa0JILEdBQWxCLEVBQTJDO0FBQ2hELFNBQU8sUUFBT0EsR0FBUCxNQUFlLFFBQXRCO0FBQ0Q7O0FBRU0sU0FBU0ksU0FBVCxDQUFtQkosR0FBbkIsRUFBNkM7QUFDbEQsU0FBTyxPQUFPQSxHQUFQLEtBQWUsU0FBdEI7QUFDRDs7QUFFTSxTQUFTSyxVQUFULENBQW9CTCxHQUFwQixFQUErQztBQUNwRCxTQUFP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LEtBQUosQ0FDSkQsT0FBTyxHQUFHQSxPQUFILEdBQWEscUJBQXFCRSxJQUFJLENBQUNDLFNBQUwsQ0FBZUosT0FBZixDQURyQyxDQUFOO0FBR0Q7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIElzVHlwZTxUPiA9IFQgZXh0ZW5kcyAoYXJnOiBhbnkpID0+IGFyZyBpcyBpbmZlciBUID8gVCA6IG5ldmVyO1xyXG5leHBvcnQgdHlwZSBDaGVja2VyPFQ+ID0gKGFyZzogYW55LCBzdHJpY3Q/OiBib29sZWFuKSA9PiBhcmcgaXMgVDtcclxuXHJcbnR5cGUgQ2hlY2tlck9iamVjdCA9IHsgW2tleTogc3RyaW5nXTogQ2hlY2tlcjxhbnk+IH07XHJcbnR5cGUgT2JqZWN0Q2hlY2tlcjxUIGV4dGVuZHMgQ2hlY2tlck9iamVjdD4gPSAoXHJcbiAgYXJnOiBhbnksXHJcbiAgc3RyaWN0PzogYm9vbGVhblxyXG4pID0+IGFyZyBpcyB7IFtUS2V5IGluIGtleW9mIFRdOiBJc1R5cGU8VFtUS2V5XT4gfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc1N0cmluZyhhcmc6IGFueSk6IGFyZyBpcyBzdHJpbmcge1xyXG4gIHJldHVybiB0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSXNOdW1iZXIoYXJnOiBhbnkpOiBhcmcgaXMgbnVtYmVyIHtcclxuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJudW1iZXJcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzQmlnSW50KGFyZzogYW55KTogYXJnIGlzIGJpZ2ludCB7XHJcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09IFwiYmlnaW50XCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc1N5bWJvbChhcmc6IGFueSk6IGFyZyBpcyBzeW1ib2wge1xyXG4gIHJldHVybiB0eXBlb2YgYXJnID09PSBcInN5bWJvbFwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSXNCb29sZWFuKGFyZzogYW55KTogYXJnIGlzIGJvb2xlYW4ge1xyXG4gIHJldHVybiB0eXBlb2YgYXJnID09PSBcImJvb2xlYW5cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzRnVuY3Rpb24oYXJnOiBhbnkpOiBhcmcgaXMgRnVuY3Rpb24ge1xyXG4gIHJldHVybiB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc0RhdGUoYXJnOiBhbnkpOiBhcmcgaXMgRGF0ZSB7XHJcbiAgcmV0dXJuIGFyZyBpbnN0YW5jZW9mIERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc0xpdGVyYWw8VCBleHRlbmRzIHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4+KFxyXG4gIHZhbHVlOiBUXHJcbik6IChhcmc6IGFueSkgPT4gYXJnIGlzIFQge1xyXG4gIHJldHVybiAoYXJnKTogYXJnIGlzIFQgPT4gYXJnID09PSB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzQXJyYXk8VD4oY2hlY2tlcjogQ2hlY2tlcjxUPik6IENoZWNrZXI8VFtdPiB7XHJcbiAgcmV0dXJuIChhcmcpOiBhcmcgaXMgVFtdID0+IHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShhcmcpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIWFyZy5maW5kKChhLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGNoZWNrZXIoYSwgdHJ1ZSk7XHJcbiAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc1R1cGxlPFQgZXh0ZW5kcyBhbnlbXT4oXHJcbiAgLi4uY2hlY2tlcnM6IHsgW0sgaW4ga2V5b2YgVF06IENoZWNrZXI8VFtLXT4gfVxyXG4pIHtcclxuICByZXR1cm4gKGFyZzogYW55KTogYXJnIGlzIFQgPT4ge1xyXG4gICAgcmV0dXJuIGNoZWNrZXJzLmZpbmQoKHYsIGkpID0+ICF2KGFyZ1tpXSkpID09IG51bGw7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzVW5pb248VCBleHRlbmRzIGFueVtdPihcclxuICAuLi5jaGVja2VyczogeyBbSyBpbiBrZXlvZiBUXTogQ2hlY2tlcjxUW0tdPiB9XHJcbikge1xyXG4gIHJldHVybiAoYXJnOiBhbnkpOiBhcmcgaXMgVFtudW1iZXJdID0+XHJcbiAgICBjaGVja2Vycy5maWx0ZXIoKGMpID0+IGMoYXJnLCB0cnVlKSkubGVuZ3RoID4gMDtcclxufVxyXG5cclxudHlwZSBVbmlvblRvSW50ZXJzZWN0aW9uPFU+ID0gKFUgZXh0ZW5kcyBhbnkgPyAoazogVSkgPT4gdm9pZCA6IG5ldmVyKSBleHRlbmRzIChcclxuICBrOiBpbmZlciBJXHJcbikgPT4gdm9pZFxyXG4gID8gSVxyXG4gIDogbmV2ZXI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSXNJbnRlcnNlY3Rpb248VCBleHRlbmRzIGFueVtdPihcclxuICAuLi5jaGVja2VyczogeyBbSyBpbiBrZXlvZiBUXTogQ2hlY2tlcjxUW0tdPiB9XHJcbikge1xyXG4gIHJldHVybiAoYXJnOiBhbnkpOiBhcmcgaXMgVW5pb25Ub0ludGVyc2VjdGlvbjxUW251bWJlcl0+ID0+XHJcbiAgICBjaGVja2Vycy5maWx0ZXIoKGMpID0+IGMoYXJnLCBmYWxzZSkpLmxlbmd0aCA9PT0gY2hlY2tlcnMubGVuZ3RoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSXNPYmplY3Q8VCBleHRlbmRzIENoZWNrZXJPYmplY3Q+KFxyXG4gIGNoZWNrZXI6IFRcclxuKTogT2JqZWN0Q2hlY2tlcjxUPiB7XHJcbiAgcmV0dXJuICgoYXJnOiBhbnksIHN0cmljdDogYm9vbGVhbiA9IHRydWUpID0+IHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoZWNrZXIpIHtcclxuICAgICAgaWYgKCFjaGVja2VyLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjaGVja2VyW2tleV0oYXJnW2tleV0sIHRydWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0cmljdCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBhcmcpIHtcclxuICAgICAgICBpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY2hlY2tlcltrZXldKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSkgYXMgT2JqZWN0Q2hlY2tlcjxUPjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzRGljdGlvbmFyeTxUPihjOiBDaGVja2VyPFQ+KTogQ2hlY2tlcjx7IFtrZXk6IHN0cmluZ106IFQgfT4ge1xyXG4gIHJldHVybiAoYXJnOiBhbnksIHN0cmljdDogYm9vbGVhbiA9IHRydWUpOiBhcmcgaXMgeyBba2V5OiBzdHJpbmddOiBUIH0gPT4ge1xyXG4gICAgbGV0IGFueU1hdGNoID0gZmFsc2U7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhcmcpIHtcclxuICAgICAgaWYgKCFhcmcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIUlzU3RyaW5nKGtleSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYXJnW2tleV0gfHwgIWMoYXJnW2tleV0sIHRydWUpKSB7XHJcbiAgICAgICAgaWYgKHN0cmljdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFueU1hdGNoID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYW55TWF0Y2g7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE9wdGlvbmFsPFQ+KGM6IENoZWNrZXI8VD4pOiBDaGVja2VyPFQgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgcmV0dXJuIChhcmc6IGFueSk6IGFyZyBpcyBUIHwgbnVsbCB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhcmcgPT09IG51bGwgfHwgYyhhcmcsIHRydWUpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEb05vdENhcmUoYXJnOiBhbnkpOiBhcmcgaXMgdW5rbm93biB7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBc3NlcnQ8VD4oXHJcbiAgY2hlY2tlcjogQ2hlY2tlcjxUPixcclxuICBzdWJqZWN0OiBhbnksXHJcbiAgbWVzc2FnZT86IHN0cmluZ1xyXG4pOiBhc3NlcnRzIHN1YmplY3QgaXMgVCB7XHJcbiAgaWYgKCFjaGVja2VyKHN1YmplY3QpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIG1lc3NhZ2UgPyBtZXNzYWdlIDogXCJJbnZhbGlkIHR5cGUgb2YgXCIgKyBKU09OLnN0cmluZ2lmeShzdWJqZWN0KVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19