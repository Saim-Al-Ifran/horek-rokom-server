"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/user/:id/profile');
router.put('/user/:id/profile');
//routes for admin
router.get('/users');
router.patch('/user/:id/deactivate');
router.patch('/user/:id/role');
router.put('/user/:id');
router.delete('/user/:id');
exports.default = router;
