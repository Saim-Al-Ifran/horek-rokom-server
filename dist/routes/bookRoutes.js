"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/bookRoutes.ts
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../controllers/book/bookController"));
const authenticate_1 = __importDefault(require("../middlewares/auth/authenticate"));
const authorizeAdmin_1 = __importDefault(require("../middlewares/auth/authorizeAdmin"));
const upload_1 = __importDefault(require("../middlewares/uploadFile/upload"));
const router = express_1.default.Router();
router.get('/books', bookController_1.default.getBooks);
router.get('/books/:id', bookController_1.default.getBook);
//routes for admin 
router.post('/books', authenticate_1.default, authorizeAdmin_1.default, upload_1.default.single('image'), bookController_1.default.addBook);
router.put('/books/:id', authenticate_1.default, authorizeAdmin_1.default, upload_1.default.single('image'), bookController_1.default.updateBook);
router.delete('/books/:id', authenticate_1.default, authorizeAdmin_1.default, bookController_1.default.deleteBook);
exports.default = router;
