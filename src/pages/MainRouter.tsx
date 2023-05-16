import { useAuth } from "components/contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./home/HomePage";

const AuthRouter = () => {
	return (
		<>
			<Route path="/login" element={<HomePage />} />
			<Route path="/register" element={<HomePage />} />
		</>
	);
};

const ProtectedRoutes = () => {
	return (
		<>
			<Route path="/dashboard" element={<HomePage />} />
			<Route path="/account" element={<HomePage />} />
		</>
	);
};

const DefaultRoutes = () => {
	return (
		<>
			<Route path="/" element={<HomePage />} />
		</>
	);
};

function MainRouter() {
	const { isAuthLoading, isAuthenticated } = useAuth();

	if (isAuthLoading) return <h1>Loading...</h1>;

	return (
		<>
			<Routes>
				{!isAuthenticated ? <AuthRouter /> : <ProtectedRoutes />}
				<DefaultRoutes />
			</Routes>
			<ToastContainer />
		</>
	);
}

export default MainRouter;
