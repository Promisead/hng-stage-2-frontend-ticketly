import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
	const { getUser } = useAuth();
	const { user } = getUser();
	const { isAuthenticated } = user;
	console.log("Protected", isAuthenticated);
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuthenticated) {
			toast.error("Please login to continue");
			navigate("/", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	if (isAuthenticated) return <div>{children}</div>;
}
