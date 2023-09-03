import { Document, Schema, model } from "mongoose";

interface IBook extends Document {
	name: string;
	price: number;
	quantity: number;
	author: string;
	publisher: string;
}

const bookSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter the book name"],
		},
		price: {
			type: Number,
			required: [true, "Please enter the price of the book"],
		},
		quantity: {
			type: Number,
			required: [true, "Please enter the quantity of the book"],
		},
		category: {
			type: String,
			required: [true, "Please enter the author of the book"],
		},
		author: {
			type: String,
			required: [true, "Please enter the author of the book"],
		},
		publisher: {
			type: String,
			required: [true, "Please enter the publisher of the book"],
		},
		image: {
			type: String,
			required: [true, "Please upload the image"],
		},
	},
	{
		timestamps: true,
	}
);

const Book = model<IBook>("Books", bookSchema);

export default Book;
