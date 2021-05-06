"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

require("./AutoSizeBackground.css");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AutoSizeBackground = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(AutoSizeBackground, _React$Component);

  var _super = _createSuper(AutoSizeBackground);

  function AutoSizeBackground() {
    var _this;

    (0, _classCallCheck2["default"])(this, AutoSizeBackground);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      innerWidth: 0,
      calcHeight: 0,
      calcWidth: 0,
      innerHeight: 0
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "requestRef", undefined);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleResize", function () {
      var dtl = _this.props.dtl;
      var innerWidth = window.innerWidth;
      var innerHeight = window.innerHeight;
      var screenWidth = window.screen.width;
      var screenHeight = window.screen.height;
      var widthRatio = innerWidth / screenWidth;
      var heightRatio = innerHeight / screenHeight;
      var calcWidth = 0;
      var calcHeight = 0;

      if (dtl === "vertical") {
        calcWidth = widthRatio * screenWidth;
        calcHeight = heightRatio * screenHeight;
      } else {
        calcWidth = heightRatio * screenWidth;
        calcHeight = widthRatio * screenHeight;
      }

      _this.setState({
        innerWidth: innerWidth,
        calcHeight: calcHeight,
        calcWidth: calcWidth,
        innerHeight: innerHeight
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "calculateImgStyle", function (dtl) {
      var _this$state = _this.state,
          innerWidth = _this$state.innerWidth,
          calcHeight = _this$state.calcHeight,
          calcWidth = _this$state.calcWidth,
          innerHeight = _this$state.innerHeight;
      var styleInherit = {
        width: "".concat(innerWidth, "px"),
        height: "".concat(calcHeight, "px"),
        marginLeft: 0,
        top: "".concat(innerHeight - calcHeight, "px"),
        left: 0,
        position: "inherit"
      };
      var styleAbsolute = {
        width: "".concat(calcWidth, "px"),
        height: "".concat(innerHeight, "px"),
        left: "50%",
        top: 0,
        marginLeft: "".concat(-calcWidth / 2, "px"),
        position: "absolute"
      };

      switch (dtl) {
        case "vertical":
          if (calcWidth < innerHeight) {
            return styleInherit;
          }

          return styleAbsolute;

        default:
          if (calcWidth > innerHeight) {
            return styleInherit;
          }

          return styleAbsolute;
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(AutoSizeBackground, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.handleResize();
      window.addEventListener("resize", function () {
        _this2.requestRef = requestAnimationFrame(function () {
          return _this2.handleResize();
        });
      }, {
        passive: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.requestRef) {
        window.cancelAnimationFrame(this.requestRef);
      }

      window.removeEventListener("resize", this.handleResize);

      if (this.resize) {
        this.resize.cancel();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          style = _this$props.style,
          src = _this$props.src,
          dtl = _this$props.dtl;
      var imageStyle = this.calculateImgStyle(dtl);
      return src ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        id: "skin-bg",
        className: "auto-size-background-style",
        style: style
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: src,
        alt: "",
        style: imageStyle
      })), children) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children);
    }
  }]);
  return AutoSizeBackground;
}(_react["default"].Component);

(0, _defineProperty2["default"])(AutoSizeBackground, "defaultProps", {
  src: null,
  dtl: "horizontal"
});
var _default = AutoSizeBackground;
exports["default"] = _default;