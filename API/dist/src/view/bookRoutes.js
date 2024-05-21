// src/routes/bookRoutes.ts
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
const _express = require("express");
const _bookController = require("../controllers/bookController");
const router = (0, _express.Router)();
router.post('/books', _bookController.createBook);
const _default = router;
