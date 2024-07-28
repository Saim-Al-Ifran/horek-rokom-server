"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("../middlewares/auth/authenticate"));
const authorizeAdmin_1 = __importDefault(require("../middlewares/auth/authorizeAdmin"));
const categoryController_1 = __importDefault(require("../controllers/category/categoryController"));
const upload_1 = __importDefault(require("../middlewares/uploadFile/upload"));
const router = express_1.default.Router();
router.get('/categories', categoryController_1.default.getCategories);
router.get('/categories/:id', authenticate_1.default, authorizeAdmin_1.default, categoryController_1.default.getCategory);
router.post('/category', authenticate_1.default, authorizeAdmin_1.default, upload_1.default.single('image'), categoryController_1.default.createCategory);
router.put('/categories/:id', authenticate_1.default, authorizeAdmin_1.default, upload_1.default.single('image'), categoryController_1.default.updateCategory);
router.delete('/categories/:id', authenticate_1.default, authorizeAdmin_1.default, categoryController_1.default.deleteCategory);
exports.default = router;
