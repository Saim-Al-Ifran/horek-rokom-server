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
const bookService_1 = require("../../services/bookService");
const fileUpload_1 = require("../../utils/fileUpload");
const customError_1 = __importDefault(require("../../errors/customError"));
const delFileFromCloudinary_1 = require("../../utils/delFileFromCloudinary");
const paginate_1 = __importDefault(require("../../utils/paginate"));
const Book_1 = __importDefault(require("../../models/Book"));
class BookController {
    // Create a new book  
    addBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookData = req.body;
                console.log(req.body);
                if (req.file) {
                    const result = yield (0, fileUpload_1.uploadFileToCloudinary)(req.file);
                    bookData.imageUrl = result.secure_url;
                }
                const savedBook = yield (0, bookService_1.createNewBook)(bookData);
                res.status(201).json(savedBook);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    // Get all books 
    getBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author, title, search, sortBy } = req.query;
                const { page, limit } = req.pagination;
                const query = {}; // Initialize query object
                // Add filters to the query object
                if (author) {
                    query.author = author;
                }
                if (title) {
                    query.title = { $regex: new RegExp(title, 'i') };
                }
                else if (search) {
                    // General search across multiple fields
                    query.$or = [
                        { title: { $regex: new RegExp(search, 'i') } },
                        { author: { $regex: new RegExp(search, 'i') } },
                        { description: { $regex: new RegExp(search, 'i') } },
                    ];
                }
                // Define sorting options
                const sort = {};
                if (sortBy === 'price_asc') {
                    sort.price = 1;
                }
                else if (sortBy === 'price_desc') {
                    sort.price = -1;
                }
                else if (sortBy === 'rating_asc') {
                    sort.rating = 1;
                }
                else if (sortBy === 'rating_desc') {
                    sort.rating = -1;
                }
                // Paginate and sort the results
                const books = yield (0, paginate_1.default)(Book_1.default, query, page, limit, sort);
                res.status(200).json(books);
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status || 500));
            }
        });
    }
    // Get a book by ID
    getBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.id;
                const book = yield (0, bookService_1.getBookById)(bookId);
                if (book) {
                    res.status(200).json(book);
                }
                else {
                    next(new customError_1.default('Book not found', 404));
                }
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    // Update a book by ID
    updateBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.id;
                const bookData = req.body;
                const imageFile = req.file;
                if (imageFile) {
                    const result = yield (0, fileUpload_1.uploadFileToCloudinary)(imageFile);
                    bookData.imageUrl = result.secure_url;
                    // If the book already has an imageUrl, delete the old one from Cloudinary
                    const existingBook = yield (0, bookService_1.getBookById)(bookId);
                    if (existingBook && existingBook.imageUrl) {
                        yield (0, delFileFromCloudinary_1.deleteFileFromCloudinary)(existingBook.imageUrl);
                    }
                }
                const updatedBook = yield (0, bookService_1.updateBookById)(bookId, bookData);
                if (updatedBook) {
                    res.status(200).json(updatedBook);
                }
                else {
                    res.status(404).json({ message: 'Book not found' });
                }
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
    // Delete a book by ID
    deleteBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.id;
                const book = yield (0, bookService_1.getBookById)(bookId);
                if (book && book.imageUrl) {
                    yield (0, delFileFromCloudinary_1.deleteFileFromCloudinary)(book.imageUrl);
                }
                const deletedBook = yield (0, bookService_1.deleteBookById)(bookId);
                if (deletedBook) {
                    res.status(200).json({ message: 'Book deleted successfully' });
                }
                else {
                    next(new customError_1.default('Book not found', 404));
                }
            }
            catch (error) {
                next(new customError_1.default(error.message, error.status));
            }
        });
    }
}
exports.default = new BookController();
