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
// export const supabase = createClient<Database>(
//   // 'https://edlfjhydoxufvdhfeive.supabase.co',
//   // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbGZqaHlkb3h1ZnZkaGZlaXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjI5ODksImV4cCI6MjAzMTc5ODk4OX0.bGKl-WMYv8aMnz1XpE4b8iokvafR6tyyugpr2vDBhK4'
//     process.env.SUPABASE_URL as string,
//     process.env.SUPABASE_ANON_KEY as string
//   )
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (0, _supabasejs.createClient)(supabaseUrl, supabaseKey);
const _default = supabase;
