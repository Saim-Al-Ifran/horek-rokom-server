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
exports.loginAdminService = exports.loginUserService = exports.registerUserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = __importDefault(require("../errors/customError"));
const secret_1 = require("../secret");
const userService_1 = require("./userService");
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = userData;
    if (!email) {
        throw new customError_1.default('Email is required', 400);
    }
    const existingUser = yield (0, userService_1.findUserByProperty)('email', email);
    if (existingUser) {
        throw new customError_1.default('User already exists with this email', 400);
    }
    const newUser = yield (0, userService_1.createNewUser)({ username, email, password });
    return newUser;
});
exports.registerUserService = registerUserService;
const loginUserService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    if (!email) {
        throw new customError_1.default('Email is required', 400);
    }
    if (!password) {
        throw new customError_1.default('Password is required', 400);
    }
    const user = yield (0, userService_1.findUserByProperty)('email', email);
    if (!user) {
        throw new customError_1.default('Invalid email or password', 401);
    }
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        throw new customError_1.default('Invalid email or password', 401);
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secret_1.secretKey, { expiresIn: '1h' });
    return token;
});
exports.loginUserService = loginUserService;
const loginAdminService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const user = yield (0, userService_1.findUserByProperty)('email', email);
    console.log((user === null || user === void 0 ? void 0 : user.role) !== 'admin');
    if (!user || user.role !== 'admin') {
        throw new customError_1.default('Only admins are allowed to login', 401);
    }
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        throw new customError_1.default('Invalid email or password', 401);
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secret_1.secretKey, { expiresIn: '1h' });
    return token;
});
exports.loginAdminService = loginAdminService;
