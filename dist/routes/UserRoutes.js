"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("../middlewares/auth/authenticate"));
const authorizeAdmin_1 = __importDefault(require("../middlewares/auth/authorizeAdmin"));
const userController_1 = __importDefault(require("../controllers/user/userController"));
const upload_1 = __importDefault(require("../middlewares/uploadFile/upload"));
const router = express_1.default.Router();
router.get('/user/profile', authenticate_1.default, userController_1.default.getUserProfile);
router.put('/user/:id/profile', authenticate_1.default, userController_1.default.updateUser);
router.patch('/user/profile/image', authenticate_1.default, upload_1.default.single('image'), userController_1.default.updateUserProfileImage);
//routes for admin
router.get('/users', authenticate_1.default, authorizeAdmin_1.default, userController_1.default.getUsers);
router.patch('/user/:id/deactivate', authenticate_1.default, authorizeAdmin_1.default, userController_1.default.deactivateUser);
router.patch('/user/:id/role', authenticate_1.default, authorizeAdmin_1.default, userController_1.default.updateUserRole);
router.put('/user/:id', authenticate_1.default, authorizeAdmin_1.default, userController_1.default.updateUser);
router.delete('/user/:id', authenticate_1.default, authorizeAdmin_1.default, userController_1.default.deleteUser);
exports.default = router;
