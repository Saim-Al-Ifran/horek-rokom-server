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
exports.updateUserProfileImage = exports.deleteUser = exports.updateUser = exports.updateUserRole = exports.deactivateUser = exports.createNewUser = exports.findUserByProperty = exports.findUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const customError_1 = __importDefault(require("../errors/customError"));
// Utility function to find all users
const findUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.find();
    }
    catch (error) {
        throw new customError_1.default('Error fetching users', 500);
    }
});
exports.findUsers = findUsers;
const findUserByProperty = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (key === '_id') {
            return yield User_1.default.findById(value).select('-password');
        }
        return yield User_1.default.findOne({ [key]: value });
    }
    catch (error) {
        throw new customError_1.default(`Error finding user by ${key}`, 500);
    }
});
exports.findUserByProperty = findUserByProperty;
// Utility function to create a new user
const createNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(userData);
        return yield user.save();
    }
    catch (error) {
        throw new customError_1.default('Failed to create new user', 500);
    }
});
exports.createNewUser = createNewUser;
// Utility function to activate/deactivate user
const deactivateUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new customError_1.default('User not found', 404);
    }
    user.isActive = false;
    yield user.save();
    return user;
});
exports.deactivateUser = deactivateUser;
// Utility function to update user role
const updateUserRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new customError_1.default('User not found', 404);
    }
    user.role = role;
    yield user.save();
    return user;
});
exports.updateUserRole = updateUserRole;
// Utility function to update user 
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    if (!user) {
        throw new customError_1.default('User not found', 404);
    }
    return user;
});
exports.updateUser = updateUser;
// Utility function to delete user 
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByIdAndDelete(userId);
    if (!user) {
        throw new customError_1.default('User not found', 404);
    }
    return user;
});
exports.deleteUser = deleteUser;
// Utility function for user to upload profile image
const updateUserProfileImage = (userId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByIdAndUpdate(userId, { $set: { imageUrl } }, { new: true, runValidators: true }).select('-password'); // Exclude the password field
    if (!user) {
        throw new customError_1.default('User not found', 404);
    }
    return user;
});
exports.updateUserProfileImage = updateUserProfileImage;
