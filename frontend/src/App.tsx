import axios from 'axios';
import { Image, Loader, Video } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';

function App() {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [isImageUploading, setIsImageUploading] = useState(false);
	const [isVideoUploading, setIsVideoUploading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setVideoFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent, mode: 'image' | 'video') => {
		e.preventDefault();

		try {
			if (mode === 'image' && imageFile) {
				setIsImageUploading(true);

				const formData = new FormData();
				formData.append('image', imageFile);

				await axios.post('http://localhost:5000/api/image', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});

				toast.success('Image uploaded successfully!');
				setImageFile(null);
			} else if (mode === 'video' && videoFile) {
				setIsVideoUploading(true);

				const formData = new FormData();
				formData.append('video', videoFile);

				await axios.post('http://localhost:5000/api/video', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});

				toast.success('Video uploaded successfully!');
				setVideoFile(null);
			}
		} catch (err) {
			console.log(err);

			console.error(err);
			toast.error('Upload failed, please try again.');
		} finally {
			setIsImageUploading(false);
			setIsVideoUploading(false);
		}
	};

	return (
		<main className="pb-32 overflow-x-auto mx-auto px-6 md:px-8 pt-6 lg:pt-12 flex flex-col items-center min-h-screen max-w-4xl space-y-4">
			<h1 className="font-roboto-mono scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center md:mb-6">
				Media Vault
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
				{/* Image Upload Card */}

				<form className="grid grid-cols-1 gap-4 w-full">
					<label
						tabIndex={0}
						htmlFor="imageInput"
						className="border-2 border-dashed p-6 flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl h-48"
					>
						<input
							tabIndex={-1}
							id="imageInput"
							type="file"
							accept=".png,.jpg,.jpeg"
							className="sr-only"
							onChange={handleImageChange}
						/>

						<div className="flex flex-col items-center justify-center space-y-4 w-full">
							<Image className="size-8 text-muted-foreground" />

							<p className="text-muted-foreground truncate w-full text-center">
								{imageFile ? imageFile.name : 'Attach an Image'}
							</p>
						</div>
					</label>

					{/* Submit */}
					<Button
						disabled={!imageFile || isImageUploading}
						type="submit"
						onClick={(e) => handleSubmit(e, 'image')}
					>
						{isImageUploading ? <Loader className="animate-spin" /> : 'Upload'}
					</Button>
				</form>

				<form className="grid grid-cols-1 gap-4 w-full">
					{/* Video Upload Card */}
					<label
						tabIndex={0}
						htmlFor="videoInput"
						className="border-2 border-border border-dashed p-6 flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl h-48"
					>
						<input
							tabIndex={-1}
							id="videoInput"
							type="file"
							accept=".mp4,.mov,.mkv"
							className="sr-only"
							onChange={handleVideoChange}
						/>

						<div className="flex flex-col items-center justify-center space-y-4 w-full">
							<Video className="size-8 text-muted-foreground" />

							<p className="text-muted-foreground truncate w-full text-center">
								{videoFile ? videoFile.name : 'Attach a Video'}
							</p>
						</div>
					</label>

					{/* Submit */}
					<Button
						disabled={!videoFile || isVideoUploading}
						type="submit"
						onClick={(e) => handleSubmit(e, 'video')}
					>
						{isVideoUploading ? <Loader className="animate-spin" /> : 'Upload'}
					</Button>
				</form>
			</div>

			<Toaster />
		</main>
	);
}

export default App;
