import { Card } from './components/ui/card';
import { Toaster } from './components/ui/sonner';

function App() {
	return (
		<main className="pb-32 overflow-x-auto mx-auto px-6 md:px-8 pt-6 lg:pt-12 flex flex-col items-center min-h-screen max-w-5xl space-y-4">
			<h1 className="font-roboto-mono scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
				Media Vault
			</h1>

			<Card className="p-4 gap-4"></Card>

			<Toaster />
		</main>
	);
}

export default App;
