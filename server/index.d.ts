import type { IUser } from "./model/user";

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ACCESS_TOKEN_SECRET: string;
			AUTH_COOKIE: string;
		}
	}

	namespace Express {
		export interface Request {
			user: IUser | null;
		}
	}
}
