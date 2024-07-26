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
Object.defineProperty(exports, "__esModule", { value: true });
const bookService_1 = require("../../services/bookService");
const fileUpload_1 = require("../../utils/fileUpload");
class BookController {
    // Create a new book  
    addBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookData = req.body;
                if (req.file) {
                    const result = yield (0, fileUpload_1.uploadFileToCloudinary)(req.file);
                    bookData.imageUrl = result.secure_url;
                }
                const savedBook = yield (0, bookService_1.createNewBook)(bookData);
                res.status(201).json(savedBook);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred while creating the book.' });
                }
            }
        });
    }
    // Get all books 
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield (0, bookService_1.getAllBooks)();
                res.status(200).json(books);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred while fetching the books.' });
                }
            }
        });
    }
    // Get a book by ID
    getBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.id;
                const book = yield (0, bookService_1.getBookById)(bookId);
                if (book) {
                    res.status(200).json(book);
                }
                else {
                    res.status(404).json({ message: 'Book not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred while fetching the book by ID.' });
                }
            }
        });
    }
    // Update a book by ID
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.id;
                const bookData = req.body;
                const updatedBook = yield (0, bookService_1.updateBookById)(bookId, bookData);
                if (updatedBook) {
                    res.status(200).json(updatedBook);
                }
                else {
                    res.status(404).json({ message: 'Book not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred while updating the book.' });
                }
            }
        });
    }
    // Delete a book by ID
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.id;
                const deletedBook = yield (0, bookService_1.deleteBookById)(bookId);
                if (deletedBook) {
                    res.status(200).json({ message: 'Book deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Book not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred while deleting the book.' });
                }
            }
        });
    }
}
exports.default = new BookController();
