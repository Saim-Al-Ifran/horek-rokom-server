// services/bookService.ts
import Book, { IBook } from '../models/Book';

// Create a new book
export const createNewBook = async (bookData: IBook): Promise<IBook> => {
  try {
    const newBook = new Book(bookData);
    const savedBook = await newBook.save();
    return savedBook;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error creating new book: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while creating the book.');
    }
  }
};

// Get all books
export const getAllBooks = async (): Promise<IBook[]> => {
  try {
    return await Book.find();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error fetching books: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while fetching the books.');
    }
  }
};

// Get a book by ID
export const getBookById = async (id: string): Promise<IBook | null> => {
  try {
    return await Book.findById(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error fetching book by ID: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while fetching the book by ID.');
    }
  }
};

// Update a book by ID
export const updateBookById = async (id: string, bookData: Partial<IBook>): Promise<IBook | null> => {
  try {
      return await Book.findByIdAndUpdate(id, bookData, { new: true });
  } catch (error) {

    if (error instanceof Error) {
      throw new Error('Error updating book: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while updating the book.');
    }
    
  }
};

// Delete a book by ID
export const deleteBookById = async (id: string): Promise<IBook | null> => {
  try {
    return await Book.findByIdAndDelete(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error deleting book: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while deleting the book.');
    }
  }
};
