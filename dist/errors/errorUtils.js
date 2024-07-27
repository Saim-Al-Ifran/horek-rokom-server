"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAsyncError = void 0;
const customError_1 = __importDefault(require("./customError"));
const handleAsyncError = (error, next) => {
    const errorMessage = error.message || 'An unknown error occurred during user registration.';
    const statusCode = error.status || 500;
    next(new customError_1.default(errorMessage, statusCode));
};
exports.handleAsyncError = handleAsyncError;
// for readability for developers(junior/med) im not using handleAsyncError function 
