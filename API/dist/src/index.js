"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _server = require("./server");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _bodyparser = /*#__PURE__*/ _interop_require_default(require("body-parser"));
const _bookRoutes = /*#__PURE__*/ _interop_require_default(require("./view/bookRoutes"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
const app = (0, _express.default)();
app.use(_bodyparser.default.json());
app.use('/api', _bookRoutes.default);
(0, _server.server)(app);
const _default = app;
