export interface IUser {
	username: string;
	fullName?: string;
	pfp?: string;
}

interface IReturn {
	data: any;
	error: any;
}

export const loginService = async (): Promise<IReturn> => {
	return { data: "data", error: "error" };
};
export const registerService = async (): Promise<IReturn> => {
	return { data: "data", error: "error" };
};
export const checkAuthService = async (): Promise<IReturn> => {
	return { data: "data", error: "error" };
};
