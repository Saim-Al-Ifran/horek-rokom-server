"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryService_1 = require("../../services/categoryService");
const customError_1 = __importDefault(require("../../errors/customError"));
const delFileFromCloudinary_1 = require("../../utils/delFileFromCloudinary");
class CategoryController {
    getCategories(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield (0, categoryService_1.getAllCategories)();
                res.status(200).json(categories);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const category = yield (0, categoryService_1.getCategoryById)(categoryId);
                res.status(200).json(category);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryData = req.body;
                const imageFile = req.file;
                const newCategory = yield (0, categoryService_1.createCategory)(categoryData, imageFile);
                res.status(201).json(newCategory);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const categoryData = req.body;
                const imageFile = req.file;
                const updatedCategory = yield (0, categoryService_1.updateCategoryById)(categoryId, categoryData, imageFile);
                res.status(200).json(updatedCategory);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const category = yield (0, categoryService_1.getCategoryById)(categoryId);
                if (category && category.imageUrl) {
                    yield (0, delFileFromCloudinary_1.deleteFileFromCloudinary)(category.imageUrl);
                }
                yield (0, categoryService_1.deleteCategoryById)(categoryId);
                res.status(200).json({ message: 'Category deleted successfully' });
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
}
exports.default = new CategoryController();
