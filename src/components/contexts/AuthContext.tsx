import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { IUser } from "services/auth.utils";
import { loginService, registerService, checkAuthService } from "services/auth.utils";

interface IAuthContext {
	isAuthLoading: boolean;
	isAuthenticated: boolean;
	userData?: IUser;
	login: () => Promise<void>;
	register: () => Promise<void>;
}

const defaultAuthValues: IAuthContext = {
	isAuthLoading: true,
	isAuthenticated: false,
	login: async () => {},
	register: async () => {},
};

const authContext = createContext<IAuthContext>(defaultAuthValues);

interface Props {
	children: JSX.Element;
}

const AuthProvider = ({ children }: Props) => {
	const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [userData, setUserData] = useState();

	useEffect(() => {
		(async () => {
			const { data, error } = await checkAuthService();

			if (!!error) return toast.error(error.message);

			setIsAuthLoading(false);
			setIsAuthenticated(true);
			setUserData(data.data);
		})();
	}, []);

	const login = useCallback(async () => {
		setIsAuthLoading(true);

		const { data, error } = await loginService();

		setIsAuthLoading(false);

		if (!!error) {
			toast.error(error.message);
			return;
		}

		setIsAuthenticated(true);
		setUserData(data.data);
	}, []);

	const register = useCallback(async () => {
		setIsAuthLoading(true);

		const { data, error } = await registerService();

		setIsAuthLoading(false);

		if (!!error) {
			toast.error(error.message);
			return;
		}

		setIsAuthenticated(true);
		setUserData(data.data);
	}, []);

	return (
		<authContext.Provider value={{ isAuthLoading, isAuthenticated, userData, login, register }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => {
	const data = useContext(authContext);
	return data;
};

export default AuthProvider;
