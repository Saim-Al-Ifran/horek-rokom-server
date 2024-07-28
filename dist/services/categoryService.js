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
exports.deleteCategoryById = exports.updateCategoryById = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../models/Category")); // Adjust the path as needed
const customError_1 = __importDefault(require("../errors/customError"));
const fileUpload_1 = require("../utils/fileUpload");
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category_1.default.find();
    return categories;
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_1.default.findById(id);
    if (!category) {
        throw new customError_1.default('Category not found', 404);
    }
    return category;
});
exports.getCategoryById = getCategoryById;
const createCategory = (categoryData, imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (imageFile) {
        const uploadResult = yield (0, fileUpload_1.uploadFileToCloudinary)(imageFile);
        categoryData.imageUrl = uploadResult.secure_url;
    }
    const category = new Category_1.default(categoryData);
    return yield category.save();
});
exports.createCategory = createCategory;
const updateCategoryById = (id, categoryData, imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (imageFile) {
        const uploadResult = yield (0, fileUpload_1.uploadFileToCloudinary)(imageFile);
        categoryData.imageUrl = uploadResult.secure_url;
    }
    const category = yield Category_1.default.findByIdAndUpdate(id, categoryData, { new: true, runValidators: true });
    if (!category) {
        throw new customError_1.default('Category not found', 404);
    }
    return category;
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_1.default.findByIdAndDelete(id);
    if (!category) {
        throw new customError_1.default('Category not found', 404);
    }
    return category;
});
exports.deleteCategoryById = deleteCategoryById;
