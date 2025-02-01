import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB
export interface IContact extends Document {
    fullname: string;
    email: string;
    message: string;
    date?: Date;
}

// Define the schema
const contactSchema = new Schema<IContact>({
    fullname: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minLength: [2, "Name must be larger than 2 characters"],
        maxLength: [50, "Name must be lesser than 50 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
    },

    message: {
        type: String,
        required: [true, "Message is required."],
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

// Define the model with proper typings
const Contact: Model<IContact> =
    mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;