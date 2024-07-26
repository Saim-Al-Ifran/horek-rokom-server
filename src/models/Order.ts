import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
    transactionId: string;
    amount: number;
    currency: string;
    email: string;
    date: Date;
}


const OrderSchema = new Schema<IOrder>({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// Define and export the Order model
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
