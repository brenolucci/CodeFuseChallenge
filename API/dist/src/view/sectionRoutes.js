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
const _sectionController = require("../controllers/sectionController");
const router = (0, _express.Router)();
router.post('/sections', _sectionController.createSection);
router.get('/sections', _sectionController.getSectionsByBook);
const _default = router;
