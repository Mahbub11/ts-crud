"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postRoute_1 = __importDefault(require("./postRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const router = (0, express_1.Router)();
router.use('/api/v1/post', postRoute_1.default);
router.use('/api/v1/user', userRoute_1.default);
exports.default = router;
