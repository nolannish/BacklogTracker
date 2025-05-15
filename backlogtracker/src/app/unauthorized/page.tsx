import LoginButton from "@/components/LoginButton";
import RegisterButton from "@/components/RegisterButton";

export default function Unauthorized() {
	return (
		<main className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
			<div className="flex flex-col items-center text-center mt-12 space-y-6">
				<h1 className="text-4xl font-bold text-center mt-8">
					401: Unauthorized
				</h1>
				<h2 className="text-2xl font-semibold text-center mt-4">
					Please log in or register to access this page.
				</h2>
				<LoginButton />
				<RegisterButton />
			</div>
		</main>
	);
}