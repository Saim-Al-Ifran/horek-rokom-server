"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/user/auth/authController"));
const router = express_1.default.Router();
// User Registration
router.post('/register', authController_1.default.registerUser);
// User Login
router.post('/login', authController_1.default.loginUser);
// Admin Login
router.post('/admin/login', authController_1.default.loginAdmin);
router.post('/refresh-token', authController_1.default.refreshTokenController);
exports.default = router;
