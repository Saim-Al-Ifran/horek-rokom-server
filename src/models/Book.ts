import mongoose, { Document, Schema } from 'mongoose';

 
export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    description: string;
    price: number;
    imageUrl?: string;
    publicationDate: Date;
    rating: number;
    stockQuantity: number;
    createdAt: Date;
    updatedAt: Date;
}
 
const BookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    publicationDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true  
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true  
    }
});

 
const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;
