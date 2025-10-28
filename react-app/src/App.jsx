import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import TicketsPage from "./pages/TicketsPage";
import { TicketsProvider } from "./contexts/TicketsProvider";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<TicketsProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/auth/login" element={<LoginPage />} />
						<Route path="/auth/signup" element={<SignupPage />} />
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/tickets" element={<TicketsPage />} />
						</Route>
					</Routes>
					<ToastContainer
						position="bottom-right"
						autoClose={3000}
						theme="light"
					/>
				</TicketsProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}
