class APIError extends Error {
	statusCode: number;

	/**
	 * @param {string} message
	 * @param {number} statusCode
	 */
	constructor(message: string, statusCode: number) {
		super(message);
		super.name = "APIError";
		this.statusCode = statusCode;
	}
}

const validationError = () => new APIError("Validation failed.", 400);
const quantityError = () =>
	new APIError("Invalid quantity requested or book out of stock", 422);

const searchError = () => new APIError("Name is required", 400);
const cartUserError = () => new APIError("UserId is required", 400);

export { APIError, validationError, quantityError, searchError, cartUserError };
