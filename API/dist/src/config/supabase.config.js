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
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _supabasejs = require("@supabase/supabase-js");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (0, _supabasejs.createClient)(supabaseUrl, supabaseKey);
const _default = supabase;
