"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const router = (0, express_1.Router)();
router.use('/api/v1/auth', authRoutes_1.default);
router.use('/api/v1', userRoutes_1.default);
router.use('/api/v1', categoryRoutes_1.default);
router.use('/api/v1', bookRoutes_1.default);
exports.default = router;
