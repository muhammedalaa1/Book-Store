import { Document, Schema, model } from "mongoose";

export interface IBook extends Document {
	name: string;
	price: number;
	quantity: number;
	author: string;
	publisher: string;
	category: string;
	description: string;
	image: string;
	css: { font?: number; boxShadowValue?: string }[];
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
		description: {
			type: String,
			required: [true, "Please Write the description"],
		},
		css: [
			{
				font: {
					type: Number,
				},
				boxShadowValue: {
					type: String,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Book = model<IBook>("Books", bookSchema);

export default Book;
