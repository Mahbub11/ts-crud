"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controller/postController");
const router = (0, express_1.Router)();
router.get('/', postController_1.showMessage);
exports.default = router;
