import type { IUser } from "./model/user";

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ACCESS_TOKEN_SECRET: string;
			AUTH_COOKIE: string;
			PUBLIC_KEY: string;
			PRIVATE_KEY: string;
			IMAGEKIT_ENDPOINT: string;
			NODE_ENV:string;
			STRIPE_SECRET_KEY:string;
			
		}
	}

	namespace Express {
		export interface Request {
			user: IUser | null;
		}
	}
}
