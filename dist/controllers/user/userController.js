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
const userService_1 = require("../../services/userService");
const customError_1 = __importDefault(require("../../errors/customError"));
const fileUpload_1 = require("../../utils/fileUpload");
class UserController {
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const user = yield (0, userService_1.findUserByProperty)('_id', userId);
                res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof customError_1.default) {
                    res.status(error.status).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred while fetching the user profile.' });
                }
            }
        });
    }
    updateUserProfileImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const file = req.file;
                if (!file) {
                    throw new customError_1.default('No file uploaded', 400);
                }
                const uploadResult = yield (0, fileUpload_1.uploadFileToCloudinary)(file);
                const updatedUser = yield (0, userService_1.updateUserProfileImage)(userId, uploadResult.secure_url);
                res.status(200).json(updatedUser);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    getUsers(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, userService_1.findUsers)();
                res.status(200).json(user);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    deactivateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield (0, userService_1.deactivateUser)(userId);
                res.status(200).json(user);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    updateUserRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const { role } = req.body;
                const user = yield (0, userService_1.updateUserRole)(userId, role);
                res.status(200).json(user);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updateData = req.body;
                const user = yield (0, userService_1.updateUser)(userId, updateData);
                res.status(200).json(user);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield (0, userService_1.deleteUser)(userId);
                res.status(200).json({ message: 'User deleted successfully' });
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
}
exports.default = new UserController();
