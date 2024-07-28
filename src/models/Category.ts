import mongoose, { Document, Schema } from 'mongoose';

 
export interface ICategory extends Document {
    title: string;
    description: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

 
const CategorySchema = new Schema<ICategory>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String  
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
 
const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
