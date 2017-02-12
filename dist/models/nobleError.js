'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NobleError = function (_Error) {
    _inherits(NobleError, _Error);

    function NobleError(message) {
        _classCallCheck(this, NobleError);

        var _this = _possibleConstructorReturn(this, (NobleError.__proto__ || Object.getPrototypeOf(NobleError)).call(this, message));

        _this.message = message;
        _this.name = 'Noble Error';
        return _this;
    }

    return NobleError;
}(Error);

exports.default = NobleError;