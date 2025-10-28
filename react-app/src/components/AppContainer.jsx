import Footer from "./Footer";

export default function AppContainer({ children }) {
	return (
		<div className="m-[0_auto] max-w-[1440px] overflow-hidden">
			{children}
			<Footer />
		</div>
	);
}
