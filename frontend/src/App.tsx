import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImagesList from './components/ImagesList';
import { Toaster } from './components/ui/sonner';
import UploadCards from './components/UploadCards';
import VideosList from './components/VideosList';

const API_URL = import.meta.env.VITE_API_URL;

const getImages = async (): Promise<string[]> => {
	const response = await axios.get(`${API_URL}/image`);
	return response.data;
};

const getVideos = async (): Promise<string[]> => {
	const response = await axios.get(`${API_URL}/video`);
	return response.data;
};

function App() {
	const {
		data: images,
		error: imageError,
		isLoading: isImageLoading,
		isFetching: isImageFetching,
	} = useQuery<string[]>({
		queryKey: ['images'],
		queryFn: getImages,
		refetchInterval: 1_000 * 60 * 10, // 10 minutes
	});

	const {
		data: videos,
		error: videoError,
		isLoading: isVideoLoading,
		isFetching: isVideoFetching,
	} = useQuery<string[]>({
		queryKey: ['videos'],
		queryFn: getVideos,
		refetchInterval: 1_000 * 60 * 10, // 10 minutes
	});

	return (
		<main className="pb-32 overflow-x-auto mx-auto px-6 md:px-8 pt-6 lg:pt-12 flex flex-col min-h-screen max-w-4xl space-y-4">
			<h1 className="font-roboto-mono scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center md:mb-6">
				Media Vault
			</h1>

			<UploadCards />

			<ImagesList
				images={images}
				isLoading={isImageLoading}
				isError={imageError}
				isFetching={isImageFetching}
			/>

			<VideosList
				videos={videos}
				isLoading={isVideoLoading}
				isError={videoError}
				isFetching={isVideoFetching}
			/>

			<Toaster />
		</main>
	);
}

export default App;
