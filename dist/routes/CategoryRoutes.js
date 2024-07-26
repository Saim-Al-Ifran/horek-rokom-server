"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/categories');
router.get('/categories/:id');
router.post('/category');
router.put('/categories/:id');
router.delete('/categories/:id');
exports.default = router;
