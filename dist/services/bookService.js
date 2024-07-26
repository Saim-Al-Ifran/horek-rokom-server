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
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createNewBook = void 0;
// services/bookService.ts
const Book_1 = __importDefault(require("../models/Book"));
// Create a new book
const createNewBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = new Book_1.default(bookData);
        const savedBook = yield newBook.save();
        return savedBook;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error creating new book: ' + error.message);
        }
        else {
            throw new Error('An unknown error occurred while creating the book.');
        }
    }
});
exports.createNewBook = createNewBook;
// Get all books
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Book_1.default.find();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching books: ' + error.message);
        }
        else {
            throw new Error('An unknown error occurred while fetching the books.');
        }
    }
});
exports.getAllBooks = getAllBooks;
// Get a book by ID
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Book_1.default.findById(id);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching book by ID: ' + error.message);
        }
        else {
            throw new Error('An unknown error occurred while fetching the book by ID.');
        }
    }
});
exports.getBookById = getBookById;
// Update a book by ID
const updateBookById = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Book_1.default.findByIdAndUpdate(id, bookData, { new: true });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error updating book: ' + error.message);
        }
        else {
            throw new Error('An unknown error occurred while updating the book.');
        }
    }
});
exports.updateBookById = updateBookById;
// Delete a book by ID
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Book_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error deleting book: ' + error.message);
        }
        else {
            throw new Error('An unknown error occurred while deleting the book.');
        }
    }
});
exports.deleteBookById = deleteBookById;
