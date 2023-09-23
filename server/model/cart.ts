import { Document, Schema, model } from "mongoose";

interface IBookItem {
	bookId: string;
	quantity: number;
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
			},
		],
	},
	{
		timestamps: true,
	}
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
