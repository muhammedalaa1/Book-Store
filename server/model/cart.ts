import { Document, Schema, model } from "mongoose";

interface IBookItem {
	bookId: string;
	quantity: number;
	price: number;
	image: string;
	name: string;
	description: string;
}
interface ICart extends Document {
	userId: string;
	books: IBookItem[];
}

const cartSchema: Schema = new Schema(
	{
		userId: {
			type: String,
			required: [true],
		},
		books: [
			{
				bookId: {
					type: String,
				},
				quantity: {
					type: Number,
					default: 1,
				},
				price: {
					type: Number,
				},
				name: {
					type: String,
				},
				image: {
					type: String,
				},
				description: {
					type: String,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
