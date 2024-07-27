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
exports.createNewUser = exports.findUserByProperty = exports.findUsers = void 0;
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
            return yield User_1.default.findById(value);
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
