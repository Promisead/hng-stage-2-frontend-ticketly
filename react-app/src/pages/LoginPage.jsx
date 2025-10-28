import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import AppContainer from "../components/AppContainer";
import { useAuth } from "../contexts/AuthProvider";

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const { login } = useAuth();

	const onSubmit = (data) => {
		if (data.email && data.password) {
			login(data);
		}
	};

	return (
		<AppContainer>
			<div className="flex w-full items-center justify-center min-h-screen bg-[#f1f5f9] relative">
				{/* Back Button */}
				<button
					onClick={() => navigate(-1)}
					className="absolute top-6 left-6 md:top-8 md:left-8 text-slate-500 hover:text-[#06b6d4] transition-colors"
					aria-label="Go back">
					<HiArrowLeft size={28} />
				</button>

				{/* Login Card */}
				<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-200">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-[#0f172a]">
							Welcome Back to <span className="text-[#06b6d4]">Ticketly</span>
						</h1>
						<p className="mt-2 text-slate-600">
							Please sign in to your account.
						</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-slate-700">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^\S+@\S+$/i,
										message: "Invalid email address",
									},
								})}
								className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm 
                                focus:outline-none focus:ring-[#06b6d4] focus:border-[#06b6d4]
                                ${
																	errors.email
																		? "border-red-500"
																		: "border-slate-300"
																}`}
							/>
							{errors.email && (
								<p className="mt-1 text-xs text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-slate-700">
								Password
							</label>
							<input
								id="password"
								type="password"
								{...register("password", {
									required: "Password is required",
								})}
								className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm 
                                focus:outline-none focus:ring-[#06b6d4] focus:border-[#06b6d4]
                                ${
																	errors.password
																		? "border-red-500"
																		: "border-slate-300"
																}`}
							/>
							{errors.password && (
								<p className="mt-1 text-xs text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<div>
							<button
								type="submit"
								className="w-full px-4 py-2 font-medium text-white bg-[#06b6d4] rounded-md 
                                hover:bg-[#0891b2] focus:outline-none focus:ring-2 
                                focus:ring-[#06b6d4] focus:ring-offset-2 transition-colors">
								Sign In
							</button>
						</div>
					</form>

					{/* Sign Up Link */}
					<p className="text-sm text-center text-slate-600">
						Don't have an account?{" "}
						<Link
							to="/auth/signup"
							className="font-medium text-[#06b6d4] hover:underline">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</AppContainer>
	);
}
