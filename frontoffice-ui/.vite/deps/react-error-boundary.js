import {
  _inheritsLoose
} from "./chunk-TMKJMMJP.js";
import {
  require_react
} from "./chunk-7JZAKNLV.js";
import {
  __toESM
} from "./chunk-2TUXWMP5.js";

// node_modules/react-error-boundary/dist/react-error-boundary.esm.js
var React = __toESM(require_react());
var changedArray = function changedArray2(a, b) {
  if (a === void 0) {
    a = [];
  }
  if (b === void 0) {
    b = [];
  }
  return a.length !== b.length || a.some(function(item, index) {
    return !Object.is(item, b[index]);
  });
};
var initialState = {
  error: null
};
var ErrorBoundary = function(_React$Component) {
  _inheritsLoose(ErrorBoundary2, _React$Component);
  function ErrorBoundary2() {
    var _this;
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.state = initialState;
    _this.resetErrorBoundary = function() {
      var _this$props;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _this.props.onReset == null ? void 0 : (_this$props = _this.props).onReset.apply(_this$props, args);
      _this.reset();
    };
    return _this;
  }
  ErrorBoundary2.getDerivedStateFromError = function getDerivedStateFromError(error) {
    return {
      error
    };
  };
  var _proto = ErrorBoundary2.prototype;
  _proto.reset = function reset() {
    this.setState(initialState);
  };
  _proto.componentDidCatch = function componentDidCatch(error, info) {
    var _this$props$onError, _this$props2;
    (_this$props$onError = (_this$props2 = this.props).onError) == null ? void 0 : _this$props$onError.call(_this$props2, error, info);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var error = this.state.error;
    var resetKeys = this.props.resetKeys;
    if (error !== null && prevState.error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      var _this$props$onResetKe, _this$props3;
      (_this$props$onResetKe = (_this$props3 = this.props).onResetKeysChange) == null ? void 0 : _this$props$onResetKe.call(_this$props3, prevProps.resetKeys, resetKeys);
      this.reset();
    }
  };
  _proto.render = function render() {
    var error = this.state.error;
    var _this$props4 = this.props, fallbackRender = _this$props4.fallbackRender, FallbackComponent = _this$props4.FallbackComponent, fallback = _this$props4.fallback;
    if (error !== null) {
      var _props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (React.isValidElement(fallback)) {
        return fallback;
      } else if (typeof fallbackRender === "function") {
        return fallbackRender(_props);
      } else if (FallbackComponent) {
        return React.createElement(FallbackComponent, _props);
      } else {
        throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
      }
    }
    return this.props.children;
  };
  return ErrorBoundary2;
}(React.Component);
function withErrorBoundary(Component2, errorBoundaryProps) {
  var Wrapped = function Wrapped2(props) {
    return React.createElement(ErrorBoundary, errorBoundaryProps, React.createElement(Component2, props));
  };
  var name = Component2.displayName || Component2.name || "Unknown";
  Wrapped.displayName = "withErrorBoundary(" + name + ")";
  return Wrapped;
}
function useErrorHandler(givenError) {
  var _React$useState = React.useState(null), error = _React$useState[0], setError = _React$useState[1];
  if (givenError != null) throw givenError;
  if (error != null) throw error;
  return setError;
}
export {
  ErrorBoundary,
  useErrorHandler,
  withErrorBoundary
};
//# sourceMappingURL=react-error-boundary.js.map
