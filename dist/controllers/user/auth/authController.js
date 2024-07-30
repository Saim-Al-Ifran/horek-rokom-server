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
const authService_1 = require("../../../services/authService");
const customError_1 = __importDefault(require("../../../errors/customError"));
class AuthController {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const newUser = yield (0, authService_1.registerUserService)(userData);
                const response = {
                    username: newUser.username,
                    email: newUser.email
                };
                res.status(201).json({ message: 'User registered successfully', response });
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = req.body;
                const { accessToken, refreshToken } = yield (0, authService_1.loginUserService)(loginData);
                res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 });
                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
                res.status(200).json({ message: 'Login Successfull', accessToken, refreshToken });
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    loginAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = req.body;
                const { accessToken, refreshToken } = yield (0, authService_1.loginAdminService)(loginData);
                res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 });
                res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
                res.status(200).json({ message: 'Login Successfull', accessToken, refreshToken });
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    refreshTokenController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    throw new customError_1.default('Refresh token not provided', 403);
                }
                const tokens = yield (0, authService_1.refreshTokenService)(refreshToken);
                res.cookie('accessToken', tokens.accessToken, { httpOnly: true, maxAge: 3600000 });
                res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
                res.json(tokens);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
}
exports.default = new AuthController();
